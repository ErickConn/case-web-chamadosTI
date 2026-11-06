import 'dotenv/config';
import database from '../database/export.js';

async function getChamados(excludeUserId) {
    try {
        const query = database('chamado').select("*");

        if (excludeUserId) {
            query.where(function () {
                this.whereNull('userId').orWhereNot('userId', excludeUserId);
            });
        }

        const chamados = await query;

        if (chamados) {
            return {
                status: 200,
                chamados,
                message: "ok"
            };
        }

        return {
            status: 404,
            message: "Chamados not found"
        };

    } catch (error) {
        return {
            status: 500,
            message: error.message || "Internal server error"
        };
    }
}

async function getChamadosByUser(userId) {
    if (!userId) {
        return {
            status: 400,
            message: "User ID is required"
        };
    }

    try {
        const chamados = await database('chamado').select("*").where({ userId });

        return {
            status: 200,
            chamados,
            message: "ok"
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message || "Internal server error"
        };
    }
}

async function getChamado(chamadoId) {
    if (!chamadoId) {
        return {
            status: 400,
            message: "Chamado ID is required"
        };
    }

    try {
        const chamado = await database('chamado').select("*").where({ id: chamadoId }).first();

        if (!chamado) {
            return {
                status: 404,
                message: "Chamado not found"
            };
        }

        const solicitante = chamado.userId
            ? await database('usuario').select('id', 'nome', 'email').where({ id: chamado.userId }).first()
            : null;

        const tecnico = chamado.tecnicoId
            ? await database('usuario').select('id', 'nome', 'email').where({ id: chamado.tecnicoId }).first()
            : null;

        const solucoes = await database('solucao')
            .select("*")
            .where({ chamadoId: chamado.id })
            .orderBy('id', 'asc');

        const solucaoIds = solucoes.map((s) => s.id);
        const avaliacoes = solucaoIds.length > 0
            ? await database('avaliacao')
                .select("*")
                .whereIn('solucaoId', solucaoIds)
                .orderBy('id', 'asc')
            : [];

        const solucoesComAvaliacoes = solucoes.map((s) => ({
            ...s,
            avaliacoes: avaliacoes.filter((a) => Number(a.solucaoId) === Number(s.id))
        }));

        const avaliacaoComNota = [...avaliacoes].reverse().find((a) => a.nota != null);

        return {
            status: 200,
            chamado: {
                ...chamado,
                solicitanteNome: solicitante?.nome || null,
                tecnicoNome: tecnico?.nome || null,
                nota: avaliacaoComNota?.nota || null,
                solucoes: solucoesComAvaliacoes
            },
            message: "ok"
        };

    } catch (error) {
        return {
            status: 500,
            message: error.message || "Internal server error"
        };
    }
}

async function atribuirChamado(chamadoId, tecnicoId) {
    if (!chamadoId || !tecnicoId) {
        return {
            status: 400,
            message: "Chamado ID and Tecnico ID are required"
        };
    }

    try {
        const chamadoExistente = await database('chamado').select("*").where({ id: chamadoId }).first();

        if (!chamadoExistente) {
            return {
                status: 404,
                message: "Chamado not found"
            };
        }

        if (Number(chamadoExistente.userId) === Number(tecnicoId)) {
            return {
                status: 403,
                message: "Um técnico não pode atender seu próprio chamado"
            };
        }

        if (chamadoExistente.tecnicoId) {
            return {
                status: 409,
                message: "Este chamado já está sendo atendido por um técnico"
            };
        }

        await database('chamado')
            .where({ id: chamadoId })
            .update({
                tecnicoId,
                status: 'aguardando resposta'
            });

        const chamado = await database('chamado').select("*").where({ id: chamadoId }).first();
        return {
            status: 200,
            chamado,
            message: "Chamado atribuído com sucesso"
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message || "Internal server error"
        };
    }
}

async function criarSolucao(chamadoId, dados) {
    const { descricao, marcarResolvido } = dados || {};

    if (!chamadoId || !descricao) {
        return {
            status: 400,
            message: "Chamado ID e descrição da solução são obrigatórios"
        };
    }

    try {
        const chamadoExistente = await database('chamado').select("*").where({ id: chamadoId }).first();
        if (!chamadoExistente) {
            return {
                status: 404,
                message: "Chamado não encontrado"
            };
        }

        const [novaSolucao] = await database('solucao')
            .insert({
                descricao,
                data: new Date(),
                status: 'aguardando resposta',
                chamadoId: Number(chamadoId)
            })
            .returning('*');

        if (marcarResolvido) {
            await database('chamado')
                .where({ id: chamadoId })
                .update({ status: 'resolvido' });
        }

        return {
            status: 201,
            solucao: novaSolucao,
            message: "Solução enviada com sucesso"
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message || "Internal server error"
        };
    }
}

async function responderSolucao(chamadoId, solucaoId, acao) {
    if (!chamadoId || !solucaoId || !['aceitar', 'rejeitar'].includes(acao)) {
        return {
            status: 400,
            message: "Parâmetros inválidos para responder solução"
        };
    }

    try {
        const chamadoExistente = await database('chamado').select("*").where({ id: chamadoId }).first();
        if (!chamadoExistente || chamadoExistente.status?.toLowerCase() !== 'resolvido') {
            return {
                status: 400,
                message: "A solução só pode ser aceita ou rejeitada quando o técnico marcar como resolvido"
            };
        }

        const solucaoExistente = await database('solucao')
            .select("*")
            .where({ id: solucaoId, chamadoId })
            .first();

        if (!solucaoExistente) {
            return {
                status: 404,
                message: "Solução não encontrada"
            };
        }

        const novoStatusSolucao = acao === 'aceitar' ? 'aceita' : 'rejeitada';
        const novoStatusChamado = acao === 'aceitar' ? 'fechado' : 'aguardando resposta';

        await database('solucao')
            .where({ chamadoId, status: 'aguardando resposta' })
            .update({ status: novoStatusSolucao });

        await database('chamado')
            .where({ id: chamadoId })
            .update({ status: novoStatusChamado });

        if (acao === 'rejeitar') {
            const solucoesDoChamado = await database('solucao').select('id').where({ chamadoId });
            const ids = solucoesDoChamado.map((s) => s.id);
            if (ids.length > 0) {
                await database('avaliacao').whereIn('solucaoId', ids).update({ nota: null });
            }
        }

        return {
            status: 200,
            statusChamado: novoStatusChamado,
            statusSolucao: novoStatusSolucao,
            message: acao === 'aceitar'
                ? "Solução aceita e chamado fechado"
                : "Solução rejeitada"
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message || "Internal server error"
        };
    }
}

async function criarAvaliacao(chamadoId, dados) {
    const { comentario, nota, solucaoId } = dados || {};

    if (!chamadoId || !comentario) {
        return {
            status: 400,
            message: "Comentário é obrigatório"
        };
    }

    try {
        const chamadoExistente = await database('chamado').select("*").where({ id: chamadoId }).first();
        if (!chamadoExistente) {
            return {
                status: 404,
                message: "Chamado não encontrado"
            };
        }

        if (chamadoExistente.status?.toLowerCase() !== 'resolvido') {
            return {
                status: 400,
                message: "O solicitante só pode deixar uma avaliação quando o chamado estiver marcado como resolvido"
            };
        }

        let targetSolucaoId = solucaoId;

        if (!targetSolucaoId) {
            const ultimaSolucao = await database('solucao')
                .select("*")
                .where({ chamadoId })
                .orderBy('id', 'desc')
                .first();

            if (!ultimaSolucao) {
                return {
                    status: 400,
                    message: "Ainda não há solução do técnico para avaliar neste chamado"
                };
            }
            targetSolucaoId = ultimaSolucao.id;
        }

        const payload = {
            comentario,
            data: new Date(),
            solucaoId: Number(targetSolucaoId),
            ...(nota != null ? { nota: Number(nota) } : {})
        };

        const [novaAvaliacao] = await database('avaliacao')
            .insert(payload)
            .returning('*');

        return {
            status: 201,
            avaliacao: novaAvaliacao,
            message: "Avaliação enviada com sucesso"
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message || "Internal server error"
        };
    }
}

async function salvarNota(chamadoId, dados) {
    const { nota, avaliacaoId, solucaoId } = dados || {};

    if (!chamadoId || nota == null) {
        return {
            status: 400,
            message: "Chamado ID e nota são obrigatórios"
        };
    }

    try {
        const chamadoExistente = await database('chamado').select("*").where({ id: chamadoId }).first();
        if (!chamadoExistente) {
            return {
                status: 404,
                message: "Chamado não encontrado"
            };
        }

        const statusAtual = chamadoExistente.status?.toLowerCase();
        if (statusAtual !== 'resolvido' && statusAtual !== 'fechado') {
            return {
                status: 400,
                message: "A solução só pode ser avaliada após o técnico marcar o chamado como resolvido"
            };
        }

        if (avaliacaoId) {
            await database('avaliacao')
                .where({ id: avaliacaoId })
                .update({ nota: Number(nota) });

            return {
                status: 200,
                nota: Number(nota),
                message: "Nota atualizada com sucesso"
            };
        }

        let targetSolucaoId = solucaoId;
        if (!targetSolucaoId) {
            const ultimaSolucao = await database('solucao')
                .select("*")
                .where({ chamadoId })
                .orderBy('id', 'desc')
                .first();

            if (!ultimaSolucao) {
                return {
                    status: 400,
                    message: "Ainda não há solução para avaliar neste chamado"
                };
            }
            targetSolucaoId = ultimaSolucao.id;
        }

        const avaliacaoExistente = await database('avaliacao')
            .select("*")
            .where({ solucaoId: targetSolucaoId })
            .orderBy('id', 'desc')
            .first();

        if (avaliacaoExistente) {
            await database('avaliacao')
                .where({ id: avaliacaoExistente.id })
                .update({ nota: Number(nota) });
        } else {
            await database('avaliacao').insert({
                comentario: '',
                data: new Date(),
                solucaoId: Number(targetSolucaoId),
                nota: Number(nota)
            });
        }

        return {
            status: 200,
            nota: Number(nota),
            message: "Nota salva com sucesso"
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message || "Internal server error"
        };
    }
}

async function updateChamado(chamadoId, updateData) {
    if (!chamadoId) {
        return {
            status: 400,
            message: "Chamado ID is required"
        };
    }

    try {
        const chamadoExistente = await database('chamado').select("*").where({ id: chamadoId }).first();
        if (!chamadoExistente) {
            return {
                status: 404,
                message: "Chamado não encontrado"
            };
        }

        if (chamadoExistente.status?.toLowerCase() === 'fechado') {
            return {
                status: 400,
                message: "Um chamado fechado não pode ser editado"
            };
        }

        const { titulo, descricao, categoria, prioridade, status } = updateData || {};
        const payload = {
            ...(titulo !== undefined ? { titulo } : {}),
            ...(descricao !== undefined ? { descricao } : {}),
            ...(categoria !== undefined ? { categoria } : {}),
            ...(prioridade !== undefined ? { prioridade } : {}),
            ...(status !== undefined ? { status } : {}),
        };

        await database('chamado').where({ id: chamadoId }).update(payload);

        const chamadoAtualizado = await getChamado(chamadoId);
        return {
            status: 200,
            chamado: chamadoAtualizado.chamado,
            message: "Chamado atualizado com sucesso"
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message || "Internal server error"
        };
    }
}

async function deleteChamado(chamadoId) {
    if (!chamadoId) {
        return {
            status: 400,
            message: "Chamado ID is required"
        };
    }

    try {
        const chamadoExistente = await database('chamado').select("*").where({ id: chamadoId }).first();
        if (!chamadoExistente) {
            return {
                status: 404,
                message: "Chamado não encontrado"
            };
        }

        if (chamadoExistente.status?.toLowerCase() === 'fechado') {
            return {
                status: 400,
                message: "Um chamado fechado não pode ser excluído"
            };
        }

        const solucoes = await database('solucao').select('id').where({ chamadoId });
        const solucaoIds = solucoes.map((s) => s.id);

        if (solucaoIds.length > 0) {
            await database('avaliacao').whereIn('solucaoId', solucaoIds).delete();
            await database('solucao').where({ chamadoId }).delete();
        }

        await database('chamado').where({ id: chamadoId }).delete();

        return {
            status: 200,
            message: "Chamado excluído com sucesso"
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message || "Internal server error"
        };
    }
}

const chamadoService = {
    getChamados,
    getChamadosByUser,
    getChamado,
    atribuirChamado,
    criarSolucao,
    responderSolucao,
    criarAvaliacao,
    salvarNota,
    updateChamado,
    deleteChamado
}

export default chamadoService;

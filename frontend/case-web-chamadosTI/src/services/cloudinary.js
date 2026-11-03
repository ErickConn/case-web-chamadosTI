const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || ''
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || ''

export async function uploadImagemCloudinary(file) {
    if (!file) return ''

    if (!CLOUD_NAME || !UPLOAD_PRESET) {
        throw new Error(
            'Configure VITE_CLOUDINARY_CLOUD_NAME e VITE_CLOUDINARY_UPLOAD_PRESET no arquivo .env do frontend.'
        )
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', UPLOAD_PRESET)

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
            method: 'POST',
            body: formData,
        }
    )

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error?.message || 'Erro ao enviar imagem para o Cloudinary.')
    }

    return data.secure_url
}


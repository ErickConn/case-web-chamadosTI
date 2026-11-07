import authService from '../services/authService.js';

const register = async (req, res) => {
    try{
        const response = await authService.register(req.body);
        res.status(response.status).json(response);
    } catch (e) {
        res.status(500).json({ erro: e.message });
        console.error(e);
    }
};

const login = async (req, res) => {
  try {
    const response = await authService.login(req.body);
    res.status(response.status).json(response);
  } catch (e) {
    res.status(500).json({ erro: e.message });
    console.error(e);
  }
};

const resetPassword = async (req, res) => {
  try {
    const response = await authService.resetPassword(req.body);
    res.status(response.status).json(response);
  } catch (e) {
    res.status(500).json({ erro: e.message });
    console.error(e);
  }
};


const authController = {
    register,
    login,
    resetPassword
};

export default authController;
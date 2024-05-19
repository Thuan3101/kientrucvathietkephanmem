const AuthService = require("./../services/auth.service");

class AuthController {
    register = async (req, res, next) => {
        try {
            const { firstName, lastName, email, password } = req.body;
            const data = await AuthService.signUp(firstName, lastName, email, password);
            const userData = {
                id: data._id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
            };
            return res.json({
                status: 200,
                message: "User registered successfully!",
                data: userData,
            });
        } catch (err) {
            return res.json({
                status: 500,
                message: err.message,
            });
        }
    };

    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const data = await AuthService.singin({ email, password });
            console.log(data);
            return res.json({
                status: 200,
                message: "OK",
                data,
            });
        } catch (err) {
            return res.json({
                status: 500,
                message: err.message,
            });
        }
    };

    getMe = async (req, res) => {
        try {
            const { id } = req.user;
            if (!id) {
                throw new Error("Unauthorized");
            }
            const user = await AuthService.getUserById(id);
            if (!user) {
                throw new Error("Unauthorized");
            }
            return res.json({
                status: 200,
                message: "OK",
                data: user,
            });
        } catch (err) {
            return res.json({
                status: 500,
                message: err.message,
            });
        }
    };
}

module.exports = new AuthController();

const User = require("../model/user.model");
const UserRepository = require("./../repository/user.repository");
const { signAccessToken, signRefreshToken } = require("../utils/jwtUtil");
class AuthService {
    async signUp(firstName, lastName, email, password) {
        const data = await UserRepository.createCustomer({ firstName, lastName, email, password });
        return data;
    }

    async singin({ email, password }) {
        const user = await UserRepository.findByEmail(email);

        if (!email || !password) {
            throw new Error("Email and password must be provided");
        }
        if (user == null) {
            throw new Error("Unauthorized");
        }

        if (!(await User.compare(password, user.password))) {
            throw new Error("Wrong password");
        }

        const token = signAccessToken(user);
        const refreshToken = signRefreshToken(user);
        user.password = undefined;
        const data = {
            token,
            refreshToken,
            user,
        };
        return data;
    }

    async getUserById(id) {
        const userDb = await User.findById(id);
        return userDb;
    }
}

module.exports = new AuthService();

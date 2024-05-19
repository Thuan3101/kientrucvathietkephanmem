const User = require("./../model/user.model")

class UserRepository {
  
    async createCustomer({firstName,lastName, email, password}) {
        const data = {
            firstName,
            lastName,
            email,
            password
        }
        let result = await User.create(data)
        return result;
    }

    async findByEmail(email) {
        const userDb = await User.findOne({email: email})
        return userDb
    }
}

module.exports = new UserRepository()
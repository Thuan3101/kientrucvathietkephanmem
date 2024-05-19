const Inquiry = require("../model/inquiry.model")

class InquiryRepository {
    async createNew(data) {
        const rs = Inquiry.create(data)
        return rs
    }

    async getAll() {
        const rs = Inquiry.find({})
        return rs

    }

    async getById(id) {
        const rs = await Inquiry.findById(id)
        return rs
    }

    async updateById(id, newData) {
        const rs = await Inquiry.findByIdAndUpdate(id, newData)
        return rs
    }
}
module.exports = new InquiryRepository()

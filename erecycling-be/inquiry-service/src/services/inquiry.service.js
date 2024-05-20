
const InquiryRepository = require('../repository/inquiry.repository')
class InquiryService {

    async createNewInquiry(dto) {
        const data = await InquiryRepository.createNew(dto)
        return data
    }

    async getAllInquiries() {
        const data = await InquiryRepository.getAll()
        return data
    }

    async getById(id) {
        const inquiry = await InquiryRepository.getById(id)
        return inquiry
    }

    async updateInquiry(id, newData) {
        const inquiry = await InquiryRepository.updateById(id, newData)
        return inquiry
    }
}

module.exports = new InquiryService()
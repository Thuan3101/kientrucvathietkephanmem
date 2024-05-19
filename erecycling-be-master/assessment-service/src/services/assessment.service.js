const AssessmentRepository = require("./../repository/assessment.repository")
const Assessment = require("../model/assessment.model")
class AssessmentService {

    async createNewAssessment(dto) {
        const data = await AssessmentRepository.createNew(dto)
        return data
    }

    async getAllAssessments() {
        const data = await AssessmentRepository.getAll()
        return data
    }

    async getById(assessmentId) {
        const data = await AssessmentRepository.getById(assessmentId)
        return data
    }

    async updateAssessment(id, modifedData) {
        const filter = { _id: id }
        const data = await Assessment.findOneAndUpdate(filter, modifedData);
        return data;
    }
}

module.exports = new AssessmentService()
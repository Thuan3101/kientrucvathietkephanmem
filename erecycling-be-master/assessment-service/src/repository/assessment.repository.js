const Assessment = require("../model/assessment.model")

class AssessmentRepository {
    async createNew(data) {
        const rs = Assessment.create(data)
        return rs
    }

    async getAll() {
        const rs = Assessment.find({}).populate('product')
        return rs

    }

    async getById(id) {
        const assessmentDb = Assessment.findOne({ _id: id }).populate('product')
        if (!assessmentDb) {
            throw new Error("Assessment not found!")
        }
        return assessmentDb
    }

    async updateById(id, updateData) {
        const doc = await Assessment.findOneAndUpdate({ _id: id }, updateData)
        return doc
    }
}
module.exports = new AssessmentRepository()

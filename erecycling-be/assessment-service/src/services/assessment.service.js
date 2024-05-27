const AssessmentRepository = require("./../repository/assessment.repository");
const Assessment = require("../model/assessment.model");
const fetch = require("node-fetch");
const { INTERNAL_API_KEY } = require("./../common/app-constant");
class AssessmentService {
  async getInquiryInfo(id, token) {
    const options = {
      method: "GET", // or 'POST', 'PUT', etc. depending on your use case
      headers: {
        "Content-Type": "application/json", // Set the content type if you're sending JSON data
        internal_api_key: INTERNAL_API_KEY,
        Authorization: `${token}`,
      },
    };
    const rs = await fetch(`http://localhost:9090/api/inquiry/${id}`, options);
    console.log("haha");
    const data = await rs.json();
    // console.log(data)
    return data.data;
  }

  async createNewAssessment(dto) {
    const data = await AssessmentRepository.createNew(dto);
    return data;
  }

  async getAllAssessments(token) {
    const data = await AssessmentRepository.getAll();

    const dtos = await Promise.all(
      data.map(async (entity) => {
        const inquiryInfo = await this.getInquiryInfo(entity.inquiry, token);
        return {
          ...entity._doc,
          inquiry: inquiryInfo,
        };
      })
    );

    return dtos;
  }

  async getById(assessmentId, token) {
    let data = await AssessmentRepository.getById(assessmentId);
    console.log(data)
    const inquiryInfo = await this.getInquiryInfo(data.inquiry, token);
    // console.log(data.inquiry)
    const dto = {
      ...data._doc,
      inquiry: inquiryInfo,
    };
    // console.log(dto)
    return dto;
  }

  async updateAssessment(id, modifedData, token) {
    const filter = { _id: id };
    const data = await Assessment.findOneAndUpdate(filter, modifedData);
    return data;
  }
}

module.exports = new AssessmentService();

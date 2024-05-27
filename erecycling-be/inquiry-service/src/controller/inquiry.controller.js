const InquiryService = require("./../services/inquiry.service");
class InquiryControler {
  createNew = async (req, res, next) => {
    try {
      console.log(req.body);
      const data = {
        title: req.body.title,
        maker: {
          id: req.user.id,
          firstName: req.user.firstName,
          lastName: req.user.lastName,
        },
        status: req.body.status,
        product: {
          name: req.body.product.name,
          model: req.body.product.model,
          attributes: req.body.product.attributes,
          images: req.body.product.images,
        },
      };
      const result = await InquiryService.createNewInquiry(data);

      return res.json({
        status: 200,
        message: "Inquiry created!",
        data: result,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  };
  getAllInquiry = async (req, res, next) => {
    try {
      const result = await InquiryService.getAllInquiries();
      return res.json({
        status: 200,
        message: "OK",
        data: result,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  };

  updateStatus = async (req, res, next) => {
    try {
      return res.json({
        status: 200,
        message: "Inquiry created!",
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  };

  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const inquiry = await InquiryService.getById(id);

      return res.json({
        status: 200,
        message: "Inquiry created!",
        data: inquiry,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  };

  updateInquiry = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = await InquiryService.updateInquiry(id, req.body);
      return res.json({
        status: 200,
        message: "Inquiry created!",
        data: updatedData,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  };

  getMyInquiry = async (req, res) => {
    try {
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  };
}

module.exports = new InquiryControler();

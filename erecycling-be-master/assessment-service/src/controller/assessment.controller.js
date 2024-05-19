const AssessmentService = require("./../services/assessment.service")
const ProductService = require("./../services/product.service")
class AssessmentController {
    createNew = async (req, res, next) => {
        try {
            const { inquiryId, product } = req.body
            const { sku, name, description, model, likeNewPercent, cost, price, images, dateOfPurchase } = product
            const newProduct = await ProductService.createNewProduct(product)

            const data = {
                inquiry: inquiryId,
                checker: {
                    id: "664245a9c456a8718c59fe3c",
                    firstName: "Thắng",
                    lastName: "Hà Duyên"
                },
                product: newProduct._id
            }

            const result = await AssessmentService.createNewAssessment(data)

            return res.json({
                status: 200,
                message: "Inquiry created!",
                data: result

            });
        } catch (err) {
            return res.json({
                status: 500,
                message: err.message,
            });
        }
    }
    getAllAssessment = async (req, res, next) => {
        try {
            const result = await AssessmentService.getAllAssessments()
            return res.json({
                status: 200,
                message: "OK",
                data: result

            });
        } catch (err) {
            console.log(err.message)
            return res.json({
                status: 500,
                message: err.message,
            });
        }
    }

    updateById = async (req, res, next) => {
        try {
            const id = req.params.id
            const doc = await AssessmentService.updateAssessment(id, req.body)
            return res.json({
                status: 200,
                message: "data updated",
                data: doc

            });
        } catch (err) {
            console.log(err.message)
            return res.json({
                status: 500,
                message: err.message,
            });
        }
    }

    getById = async (req, res, next) => {
        try {
            const { id } = req.params
            const data = await AssessmentService.getById(id)
            return res.json({
                status: 200,
                message: "OK",
                data

            });
        } catch (err) {
            console.log(err.message)
            return res.json({
                status: 500,
                message: err.message,
            });
        }
    }

    restrictTo =
        (...roles) =>
            (req, res, next) => {
                //roles ['admin', 'lead-guide']
                if (!roles.includes(req.user.role)) {
                    return next(
                        new AppError(
                            'You do not have permission to perform this action',
                            403
                        )
                    );
                }
                next();
            };

}

module.exports = new AssessmentController()
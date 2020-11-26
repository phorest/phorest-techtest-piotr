import Joi from "joi";

export default Joi.object({
  clientId: Joi.string().required(),
  creatingBranchId: Joi.string().required(),
  originalBalance: Joi.number().integer().min(1).required(),
  issueDate: Joi.date().less(Joi.ref("expiryDate")).iso().required(),
  expiryDate: Joi.date().iso().required()
});

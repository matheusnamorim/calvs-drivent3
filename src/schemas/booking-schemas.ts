import Joi from "joi";

export const bookingSchemas = Joi.object({
  roomId: Joi.number().greater(-1).required()
});

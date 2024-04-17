const Joi=require("joi");
let reviewsschema=Joi.object({
    review:Joi.object(
        {
            comment:Joi.string().required(),
            rating:Joi.number().required().min(0).max(5),
        }
    ).required(),

})

module.exports={reviewsschema};
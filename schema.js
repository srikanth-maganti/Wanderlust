const Joi=require("joi");

let listingschema=Joi.object({
    list:Joi.object(
        {
            title:Joi.string().required(),
            price:Joi.number().required().min(0),
            description:Joi.string().required(),
            country:Joi.string().required(),
            location:Joi.string().required(),
            image:Joi.string().allow(null,""),
            category:Joi.string(),

        }
    ).required(),
})


module.exports={listingschema};
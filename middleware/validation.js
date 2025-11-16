import Joi from 'joi';

// Post validation schema
export const validatePost = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required().max(200).trim(),
    content: Joi.string().required().trim(),
    category: Joi.string().required(),
    featuredImage: Joi.string().allow('').trim(),
  });

  // If file is uploaded, featuredImage is optional in body
  // If no file, featuredImage can be URL or empty string
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  next();
};

// Category validation schema
export const validateCategory = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().max(50).trim(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  next();
};


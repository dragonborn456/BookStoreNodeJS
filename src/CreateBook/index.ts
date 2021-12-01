const aws = require("aws-sdk");
const Joi = require("@hapi/joi");
import { v4 as uuidv4 } from "uuid";

// * Function
const bookValid = (data) => {
  const bookSchema = Joi.object({
    title: Joi.string().min(2).max(30).trim().required(),
    authorName: Joi.string().min(2).max(30).trim().required(),
    publishedAt: Joi.number().min(1).required(),
  }).options({ abortEarly: false });

  return bookSchema.validate(data);
};



// * Handler
export const handler = async (ev) => {
  const dynamo = new aws.DynamoDB.DocumentClient();
  const body = JSON.parse(ev.body);

  const { value, error } = bookValid(body);
  if (error) {
    const message = error.message;
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: message,
      }),
    };
  }

  const now = new Date();
  value.id = uuidv4();
  value.createdAt = now.getTime();
  value.updatedAt = now.getTime();

  try {
    const categories = await dynamo
      .put({
        TableName: "Books",
        Item: value,
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        insertedId: value.id,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Something wrong???",
      }),
    };
  }
};

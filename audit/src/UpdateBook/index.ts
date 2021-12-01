const aws = require("aws-sdk");
const Joi = require("@hapi/joi");

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
  const paramsId = ev.pathParameters.id;

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

  const { Item: exist } = await dynamo
    .get({
      TableName: "Books",
      Key: {
        id: paramsId,
      },
    })
    .promise();

  if (!exist) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "Book not exists",
      }),
    };
  }

  const update = { ...exist, ...value };

  const now = new Date();
  update.updatedAt = now.getTime();

  try {
    const books = await dynamo
      .put({
        TableName: "Books",
        Item: update,
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Update success",
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

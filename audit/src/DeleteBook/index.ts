// const aws = require('aws-sdk')
// const Joi = require('@hapi/joi')

// * Handler
exports.handler = async (ev) => {
    const dynamo = new aws.DynamoDB.DocumentClient();
    const body = JSON.parse(JSON.stringify(ev));
    const paramsId = ev.pathParameters.id;
  
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
  
    try {
      const books = await dynamo
        .delete({
          TableName: "Books",
          Key: {
            id: paramsId,
          },
        })
        .promise();
  
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Delete Success!",
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
  
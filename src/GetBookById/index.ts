const aws = require('aws-sdk')

// * Handler
exports.handler = async (ev) => {
    const dynamo = new aws.DynamoDB.DocumentClient();
    const paramsId = ev.pathParameters.id;
  
    try {
      const books = await dynamo
        .get({
          TableName: "Books",
          Key: {
            id: paramsId,
          },
        })
        .promise();
  
      return {
        statusCode: 200,
        body: JSON.stringify({
            data: books || [],
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
  
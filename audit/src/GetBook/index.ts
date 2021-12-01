const aws = require("aws-sdk");

// * Handler
export const handler = async (ev: any) => {
  const dynamo = new aws.DynamoDB.DocumentClient();

  const books = await dynamo
    .scan({
      TableName: "Books",
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: books || [],
    }),
  };
};

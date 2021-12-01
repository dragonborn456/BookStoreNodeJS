import { CognitoIdentityServiceProvider } from "aws-sdk";

// * Handler
export const handler = async (ev) => {
  const cognito = new CognitoIdentityServiceProvider();
  const body = JSON.parse(ev.body);
  const result = await cognito
    .signUp({
      ClientId: "6im1m0p012njegnscplmiuckg",
      Username: body.username,
      Password: body.password,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "SUCCESS!" }),
  };
};

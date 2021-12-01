import { CognitoIdentityServiceProvider } from "aws-sdk";

// * Handler
export const handler = async (ev) => {
  const cognito = new CognitoIdentityServiceProvider();
  const body = JSON.parse(ev.body);
  const result = await cognito
    .initiateAuth({
      ClientId: "6im1m0p012njegnscplmiuckg",
      AuthFlow: "USER_PASSWORD_AUTH",
      AuthParameters: {
        USERNAME: body.username,
        PASSWORD: body.password,
      },
    })
    .promise();
  const idToken = result.AuthenticationResult?.IdToken;
  const accesstoken = result.AuthenticationResult?.IdToken;
  const refreshToken = result.AuthenticationResult?.IdToken;

  return {
    statusCode: 200,
    body: JSON.stringify({ idToken, accesstoken, refreshToken }),
  };
};

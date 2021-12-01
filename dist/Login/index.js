"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = require("aws-sdk");
// * Handler
const handler = (ev) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const cognito = new aws_sdk_1.CognitoIdentityServiceProvider();
    const body = JSON.parse(ev.body);
    const result = yield cognito
        .initiateAuth({
        ClientId: "6im1m0p012njegnscplmiuckg",
        AuthFlow: "USER_PASSWORD_AUTH",
        AuthParameters: {
            USERNAME: body.username,
            PASSWORD: body.password,
        },
    })
        .promise();
    const idToken = (_a = result.AuthenticationResult) === null || _a === void 0 ? void 0 : _a.IdToken;
    const accesstoken = (_b = result.AuthenticationResult) === null || _b === void 0 ? void 0 : _b.IdToken;
    const refreshToken = (_c = result.AuthenticationResult) === null || _c === void 0 ? void 0 : _c.IdToken;
    return {
        statusCode: 200,
        body: JSON.stringify({ idToken, accesstoken, refreshToken }),
    };
});
exports.handler = handler;

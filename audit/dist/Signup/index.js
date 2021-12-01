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
    const cognito = new aws_sdk_1.CognitoIdentityServiceProvider();
    const body = JSON.parse(ev.body);
    const result = yield cognito
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
});
exports.handler = handler;

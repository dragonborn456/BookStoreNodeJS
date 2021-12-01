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
const aws = require("aws-sdk");
// * Handler
const handler = (ev) => __awaiter(void 0, void 0, void 0, function* () {
    const dynamo = new aws.DynamoDB.DocumentClient();
    const books = yield dynamo
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
});
exports.handler = handler;

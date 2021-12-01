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
const Joi = require("@hapi/joi");
const uuid_1 = require("uuid");
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
const handler = (ev) => __awaiter(void 0, void 0, void 0, function* () {
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
    value.id = (0, uuid_1.v4)();
    value.createdAt = now.getTime();
    value.updatedAt = now.getTime();
    try {
        const categories = yield dynamo
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
    }
    catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Something wrong???",
            }),
        };
    }
});
exports.handler = handler;

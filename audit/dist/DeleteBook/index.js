"use strict";
// const aws = require('aws-sdk')
// const Joi = require('@hapi/joi')
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// * Handler
exports.handler = (ev) => __awaiter(void 0, void 0, void 0, function* () {
    const dynamo = new aws.DynamoDB.DocumentClient();
    const body = JSON.parse(JSON.stringify(ev));
    const paramsId = ev.pathParameters.id;
    const { Item: exist } = yield dynamo
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
        const books = yield dynamo
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

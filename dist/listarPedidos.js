"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarPedidos = void 0;
const aws_sdk_1 = require("aws-sdk");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
});
const listarPedidos = async () => {
    try {
        const result = await dynamoDb.scan({
            TableName: 'Pedidos',
        }).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(result.Items),
        };
    }
    catch (error) {
        console.error("Erro ao listar pedidos:", JSON.stringify(error, null, 2));
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Erro ao listar pedidos'
            }),
        };
    }
};
exports.listarPedidos = listarPedidos;

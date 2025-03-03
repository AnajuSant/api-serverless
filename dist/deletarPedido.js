"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletarPedido = void 0;
const aws_sdk_1 = require("aws-sdk");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000', // Conexão com o DynamoDB Local
});
const deletarPedido = async (event) => {
    const { id } = event.pathParameters || {};
    if (!id) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'ID do pedido é obrigatório' }),
        };
    }
    try {
        await dynamoDb.delete({
            TableName: 'Pedidos',
            Key: { id },
        }).promise();
        return {
            statusCode: 204,
            body: JSON.stringify({}),
        };
    }
    catch (error) {
        console.error("Erro ao deletar pedido:", JSON.stringify(error, null, 2));
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Erro ao deletar pedido' }),
        };
    }
};
exports.deletarPedido = deletarPedido;

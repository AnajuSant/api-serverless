"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obterDetalhesPedido = void 0;
const aws_sdk_1 = require("aws-sdk");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000', // Conexão com o DynamoDB Local
});
const obterDetalhesPedido = async (event) => {
    const { id } = event.pathParameters || {};
    if (!id) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'ID do pedido é obrigatório' }),
        };
    }
    try {
        const result = await dynamoDb.get({
            TableName: 'Pedidos',
            Key: { id },
        }).promise();
        if (!result.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Pedido não encontrado' }),
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify(result.Item),
        };
    }
    catch (error) {
        console.error("Erro ao obter detalhes do pedido:", JSON.stringify(error, null, 2));
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Erro ao obter detalhes do pedido' }),
        };
    }
};
exports.obterDetalhesPedido = obterDetalhesPedido;

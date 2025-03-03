"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.atualizarStatusPedido = void 0;
const aws_sdk_1 = require("aws-sdk");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000', // Conexão com o DynamoDB Local
});
const atualizarStatusPedido = async (event) => {
    const { id } = event.pathParameters || {};
    const { status } = JSON.parse(event.body || '{}');
    if (!id) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'ID do pedido é obrigatório' }),
        };
    }
    if (!status) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Status é obrigatório' }),
        };
    }
    try {
        const result = await dynamoDb.update({
            TableName: 'Pedidos',
            Key: { id },
            UpdateExpression: 'set #status = :status, data_atualizacao = :data_atualizacao',
            ExpressionAttributeNames: { '#status': 'status' },
            ExpressionAttributeValues: {
                ':status': status,
                ':data_atualizacao': new Date().toISOString(),
            },
            ReturnValues: 'ALL_NEW',
        }).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(result.Attributes),
        };
    }
    catch (error) {
        console.error("Erro ao atualizar status do pedido:", JSON.stringify(error, null, 2));
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Erro ao atualizar status do pedido' }),
        };
    }
};
exports.atualizarStatusPedido = atualizarStatusPedido;

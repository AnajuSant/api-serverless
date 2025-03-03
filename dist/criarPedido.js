"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarPedido = void 0;
const uuid_1 = require("uuid");
const aws_sdk_1 = require("aws-sdk");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
});
const criarPedido = async (event) => {
    console.log("Evento recebido:", JSON.stringify(event, null, 2)); // Log do evento recebido
    const { cliente, email, itens } = JSON.parse(event.body || '{}');
    const total = itens.reduce((acc, item) => acc + item.quantidade * item.preco, 0);
    const id = (0, uuid_1.v4)();
    const timestamp = new Date().toISOString();
    const pedido = {
        id,
        cliente,
        email,
        itens,
        total,
        status: 'PENDENTE',
        data_criacao: timestamp,
        data_atualizacao: timestamp,
    };
    console.log("Pedido a ser criado:", JSON.stringify(pedido, null, 2)); // Log do pedido
    try {
        await dynamoDb.put({
            TableName: 'Pedidos',
            Item: pedido,
        }).promise();
        console.log("Pedido inserido com sucesso!"); // Log de sucesso
        return {
            statusCode: 201,
            body: JSON.stringify({
                id,
                status: 'PENDENTE',
                total,
                data_criacao: timestamp,
            }),
        };
    }
    catch (error) {
        console.error("Erro ao criar pedido:", JSON.stringify(error, null, 2)); // Log de erro
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Erro ao criar pedido'
            }),
        };
    }
};
exports.criarPedido = criarPedido;

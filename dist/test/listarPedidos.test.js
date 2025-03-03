"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const listarPedidos_1 = require("../listarPedidos");
// Mock do DynamoDB
const mockDynamoDb = {
    scan: jest.fn().mockReturnValue({
        promise: jest.fn().mockResolvedValueOnce({ Items: [] })
    }),
};
jest.mock('aws-sdk', () => ({
    DynamoDB: {
        DocumentClient: jest.fn(() => mockDynamoDb),
    },
}));
describe('listarPedidos', () => {
    it('deve listar os pedidos com sucesso', async () => {
        const event = {
            body: JSON.stringify({ status: 'CONCLUÍDO' }),
            pathParameters: { id: '123' },
            headers: {},
            multiValueHeaders: {},
            httpMethod: 'PUT',
            isBase64Encoded: false,
            path: '/pedidos/123',
            queryStringParameters: null,
            multiValueQueryStringParameters: null,
            stageVariables: null, // Adicionado
            requestContext: {},
            resource: '',
        };
        const context = {
            callbackWaitsForEmptyEventLoop: false,
            functionName: 'listarPedidos',
            functionVersion: '$LATEST',
            invokedFunctionArn: 'arn:aws:lambda:us-east-1:123456789012:function:listarPedidos',
            memoryLimitInMB: '128',
            awsRequestId: 'request-id',
            logGroupName: '/aws/lambda/listarPedidos',
            logStreamName: 'log-stream',
            getRemainingTimeInMillis: () => 1000,
            done: () => { },
            fail: () => { },
            succeed: () => { },
        };
        const response = (await (0, listarPedidos_1.listarPedidos)(event, context, () => { }));
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual([]);
    });
    it('deve retornar erro 500 em caso de falha no DynamoDB', async () => {
        mockDynamoDb.scan.mockReturnValueOnce({
            promise: jest.fn().mockRejectedValueOnce(new Error('Erro no DynamoDB'))
        });
        const event = {
            body: null,
            pathParameters: null,
            headers: {},
            multiValueHeaders: {},
            httpMethod: 'GET',
            isBase64Encoded: false,
            path: '/pedidos',
            queryStringParameters: null,
            multiValueQueryStringParameters: null,
            stageVariables: null,
            requestContext: {},
            resource: '',
        };
        const context = {
            callbackWaitsForEmptyEventLoop: false,
            functionName: 'listarPedidos',
            functionVersion: '$LATEST',
            invokedFunctionArn: 'arn:aws:lambda:us-east-1:123456789012:function:listarPedidos',
            memoryLimitInMB: '128',
            awsRequestId: 'request-id',
            logGroupName: '/aws/lambda/listarPedidos',
            logStreamName: 'log-stream',
            getRemainingTimeInMillis: () => 1000,
            done: () => { },
            fail: () => { },
            succeed: () => { },
        };
        const response = (await (0, listarPedidos_1.listarPedidos)(event, context, () => { }));
        expect(response.statusCode).toBe(500);
        expect(JSON.parse(response.body).message).toBe('Erro ao listar pedidos');
    });
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const obterDetalhesPedido_1 = require("../obterDetalhesPedido");
// Mock do DynamoDB
const mockDynamoDb = {
    get: jest.fn().mockReturnValue({
        promise: jest.fn().mockResolvedValueOnce({ Item: { id: '123', cliente: 'João' } })
    }),
};
jest.mock('aws-sdk', () => ({
    DynamoDB: {
        DocumentClient: jest.fn(() => mockDynamoDb),
    },
}));
describe('obterDetalhesPedido', () => {
    it('deve retornar os detalhes do pedido com sucesso', async () => {
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
            requestContext: {
                accountId: '123456789012',
                apiId: 'apiId',
                authorizer: null,
                protocol: 'HTTP/1.1',
                httpMethod: 'PUT',
                identity: {
                    accessKey: null,
                    accountId: null,
                    apiKey: null,
                    apiKeyId: null,
                    caller: null,
                    clientCert: null,
                    cognitoAuthenticationProvider: null,
                    cognitoAuthenticationType: null,
                    cognitoIdentityId: null,
                    cognitoIdentityPoolId: null,
                    principalOrgId: null,
                    sourceIp: '192.168.0.1',
                    user: null,
                    userAgent: null,
                    userArn: null,
                },
                path: '/pedidos/123',
                stage: 'dev',
                requestId: 'requestId',
                requestTimeEpoch: 0,
                resourceId: 'resourceId',
                resourcePath: '/pedidos/{id}',
            },
            resource: '',
        };
        const context = {
            callbackWaitsForEmptyEventLoop: true,
            functionName: 'testFunction',
            functionVersion: '$LATEST',
            invokedFunctionArn: 'arn:aws:lambda:us-east-1:123456789012:function:testFunction',
            memoryLimitInMB: '128',
            awsRequestId: 'requestId',
            logGroupName: '/aws/lambda/testFunction',
            logStreamName: 'logStreamName',
            getRemainingTimeInMillis: () => 30000,
            done: () => { },
            fail: () => { },
            succeed: () => { },
        };
        const callback = () => { };
        const response = (await (0, obterDetalhesPedido_1.obterDetalhesPedido)(event, context, callback));
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).id).toBe('123');
    });
    it('deve retornar erro 404 se o pedido não for encontrado', async () => {
        mockDynamoDb.get.mockReturnValueOnce({
            promise: jest.fn().mockResolvedValueOnce({})
        });
        const event = {
            pathParameters: { id: '123' },
            headers: {},
            multiValueHeaders: {},
            httpMethod: 'GET',
            isBase64Encoded: false,
            path: '/pedidos/123',
            queryStringParameters: null,
            multiValueQueryStringParameters: null,
            stageVariables: null,
            requestContext: {
                accountId: '123456789012',
                apiId: 'apiId',
                authorizer: null,
                protocol: 'HTTP/1.1',
                httpMethod: 'GET',
                identity: {
                    accessKey: null,
                    accountId: null,
                    apiKey: null,
                    apiKeyId: null,
                    caller: null,
                    clientCert: null,
                    cognitoAuthenticationProvider: null,
                    cognitoAuthenticationType: null,
                    cognitoIdentityId: null,
                    cognitoIdentityPoolId: null,
                    principalOrgId: null,
                    sourceIp: '192.168.0.1',
                    user: null,
                    userAgent: null,
                    userArn: null,
                },
                path: '/pedidos/123',
                stage: 'dev',
                requestId: 'requestId',
                requestTimeEpoch: 0,
                resourceId: 'resourceId',
                resourcePath: '/pedidos/{id}',
            },
            resource: '',
            body: null
        };
        const context = {
            callbackWaitsForEmptyEventLoop: true,
            functionName: 'testFunction',
            functionVersion: '$LATEST',
            invokedFunctionArn: 'arn:aws:lambda:us-east-1:123456789012:function:testFunction',
            memoryLimitInMB: '128',
            awsRequestId: 'requestId',
            logGroupName: '/aws/lambda/testFunction',
            logStreamName: 'logStreamName',
            getRemainingTimeInMillis: () => 30000,
            done: () => { },
            fail: () => { },
            succeed: () => { },
        };
        const callback = () => { };
        const response = (await (0, obterDetalhesPedido_1.obterDetalhesPedido)(event, context, callback));
        expect(response.statusCode).toBe(404);
        expect(JSON.parse(response.body).message).toBe('Pedido não encontrado');
    });
    it('deve retornar erro 500 em caso de falha no DynamoDB', async () => {
        mockDynamoDb.get.mockReturnValueOnce({
            promise: jest.fn().mockRejectedValueOnce(new Error('Erro no DynamoDB'))
        });
        const event = {
            pathParameters: { id: '123' },
            headers: {},
            multiValueHeaders: {},
            httpMethod: 'GET',
            isBase64Encoded: false,
            path: '/pedidos/123',
            queryStringParameters: null,
            multiValueQueryStringParameters: null,
            stageVariables: null,
            requestContext: {
                accountId: '123456789012',
                apiId: 'apiId',
                authorizer: null,
                protocol: 'HTTP/1.1',
                httpMethod: 'GET',
                identity: {
                    accessKey: null,
                    accountId: null,
                    apiKey: null,
                    apiKeyId: null,
                    caller: null,
                    clientCert: null,
                    cognitoAuthenticationProvider: null,
                    cognitoAuthenticationType: null,
                    cognitoIdentityId: null,
                    cognitoIdentityPoolId: null,
                    principalOrgId: null,
                    sourceIp: '192.168.0.1',
                    user: null,
                    userAgent: null,
                    userArn: null,
                },
                path: '/pedidos/123',
                stage: 'dev',
                requestId: 'requestId',
                requestTimeEpoch: 0,
                resourceId: 'resourceId',
                resourcePath: '/pedidos/{id}',
            },
            resource: '',
            body: null
        };
        const context = {
            callbackWaitsForEmptyEventLoop: true,
            functionName: 'testFunction',
            functionVersion: '$LATEST',
            invokedFunctionArn: 'arn:aws:lambda:us-east-1:123456789012:function:testFunction',
            memoryLimitInMB: '128',
            awsRequestId: 'requestId',
            logGroupName: '/aws/lambda/testFunction',
            logStreamName: 'logStreamName',
            getRemainingTimeInMillis: () => 30000,
            done: () => { },
            fail: () => { },
            succeed: () => { },
        };
        const callback = () => { };
        const response = (await (0, obterDetalhesPedido_1.obterDetalhesPedido)(event, context, callback));
        expect(response.statusCode).toBe(500);
        expect(JSON.parse(response.body).message).toBe('Erro ao obter detalhes do pedido');
    });
});

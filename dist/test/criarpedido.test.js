"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const criarPedido_1 = require("../criarPedido");
// Mock do DynamoDB
const mockDynamoDb = {
    put: jest.fn().mockReturnValue({
        promise: jest.fn().mockResolvedValueOnce({})
    }),
};
jest.mock('aws-sdk', () => ({
    DynamoDB: {
        DocumentClient: jest.fn(() => mockDynamoDb),
    },
}));
describe('criarPedido', () => {
    it('deve criar um pedido com sucesso', async () => {
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
        const response = (await (0, criarPedido_1.criarPedido)(event, context, callback));
        expect(response.statusCode).toBe(201);
        expect(JSON.parse(response.body).status).toBe('PENDENTE');
    });
});

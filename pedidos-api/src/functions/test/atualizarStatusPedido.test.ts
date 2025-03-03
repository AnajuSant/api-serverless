import { APIGatewayProxyResult, APIGatewayProxyEvent, Context } from 'aws-lambda';
import { atualizarStatusPedido } from '../atualizarStatusPedido';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

// Mock do DynamoDB
const mockDynamoDb = {
  update: jest.fn().mockReturnValue({
    promise: jest.fn().mockResolvedValueOnce({ Attributes: { id: '123', status: 'CONCLUÍDO' } })
  }),
};

jest.mock('aws-sdk', () => ({
  DynamoDB: {
    DocumentClient: jest.fn(() => mockDynamoDb),
  },
}));

describe('atualizarStatusPedido', () => {
  it('deve atualizar o status do pedido com sucesso', async () => {
    const event: APIGatewayProxyEvent = {
      body: JSON.stringify({ status: 'CONCLUÍDO' }),
      pathParameters: { id: '123' },
      headers: {},
      multiValueHeaders: {},
      httpMethod: 'PUT',
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

    const context: Context = {
      callbackWaitsForEmptyEventLoop: true,
      functionName: 'testFunction',
      functionVersion: '$LATEST',
      invokedFunctionArn: 'arn:aws:lambda:us-east-1:123456789012:function:testFunction',
      memoryLimitInMB: '128',
      awsRequestId: 'requestId',
      logGroupName: '/aws/lambda/testFunction',
      logStreamName: 'logStreamName',
      getRemainingTimeInMillis: () => 30000,
      done: () => {},
      fail: () => {},
      succeed: () => {},
    };

    const callback = () => {};

    const response = (await atualizarStatusPedido(event, context, callback)) as APIGatewayProxyResult;

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).status).toBe('CONCLUÍDO');
  });
});
import { APIGatewayProxyResult, APIGatewayProxyEvent, Context } from 'aws-lambda';
import { deletarPedido } from '../deletarPedido';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

// Mock do DynamoDB
const mockDynamoDb = {
  delete: jest.fn().mockReturnValue({
    promise: jest.fn().mockResolvedValueOnce({})
  }),
};

jest.mock('aws-sdk', () => ({
  DynamoDB: {
    DocumentClient: jest.fn(() => mockDynamoDb),
  },
}));

describe('deletarPedido', () => {
  it('deve deletar um pedido com sucesso', async () => {
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

    const response = (await deletarPedido(event, context, callback)) as APIGatewayProxyResult;

    expect(response.statusCode).toBe(204);
  });

  it('deve retornar erro 400 se o ID não for fornecido', async () => {
    const event: APIGatewayProxyEvent = {
      pathParameters: {},
      headers: {},
      multiValueHeaders: {},
      httpMethod: 'DELETE',
      isBase64Encoded: false,
      path: '/pedidos',
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      stageVariables: null,
      requestContext: {
        accountId: '123456789012',
        apiId: 'apiId',
        authorizer: null,
        protocol: 'HTTP/1.1',
        httpMethod: 'DELETE',
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
        path: '/pedidos',
        stage: 'dev',
        requestId: 'requestId',
        requestTimeEpoch: 0,
        resourceId: 'resourceId',
        resourcePath: '/pedidos',
      },
      resource: '',
      body: null
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

    const response = (await deletarPedido(event, context, callback)) as APIGatewayProxyResult;

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body).message).toBe('ID do pedido é obrigatório');
  });

  it('deve retornar erro 500 em caso de falha no DynamoDB', async () => {
    mockDynamoDb.delete.mockReturnValueOnce({
      promise: jest.fn().mockRejectedValueOnce(new Error('Erro no DynamoDB'))
    });

    const event: APIGatewayProxyEvent = {
      pathParameters: { id: '123' },
      headers: {},
      multiValueHeaders: {},
      httpMethod: 'DELETE',
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
        httpMethod: 'DELETE',
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

    const response = (await deletarPedido(event, context, callback)) as APIGatewayProxyResult;

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body).message).toBe('Erro ao deletar pedido');
  });
});
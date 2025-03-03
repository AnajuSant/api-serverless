import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000',
});

export const listarPedidos: APIGatewayProxyHandler = async () => {
  try {
    const result = await dynamoDb.scan({
      TableName: 'Pedidos',
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    console.error("Erro ao listar pedidos:", JSON.stringify(error, null, 2));

    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Erro ao listar pedidos'
      }),
    };
  }
};
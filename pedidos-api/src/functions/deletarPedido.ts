import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000', // Conexão com o DynamoDB Local
});

export const deletarPedido: APIGatewayProxyHandler = async (event) => {
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
  } catch (error) {
    console.error("Erro ao deletar pedido:", JSON.stringify(error, null, 2));
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro ao deletar pedido' }),
    };
  }
};
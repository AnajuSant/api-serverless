import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000', // Conexão com o DynamoDB Local
});

export const atualizarStatusPedido: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters || {};
  const { status }: { status: string } = JSON.parse(event.body || '{}');

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
  } catch (error) {
    console.error("Erro ao atualizar status do pedido:", JSON.stringify(error, null, 2));
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro ao atualizar status do pedido' }),
    };
  }
};
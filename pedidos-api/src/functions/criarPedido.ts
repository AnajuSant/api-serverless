import { APIGatewayProxyHandler } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000',
});

export const criarPedido: APIGatewayProxyHandler = async (event) => {
  console.log("Evento recebido:", JSON.stringify(event, null, 2)); // Log do evento recebido

  const { cliente, email, itens }: { cliente: string; email: string; itens: any[] } = JSON.parse(event.body || '{}');
  
  const total = itens.reduce((acc, item) => acc + item.quantidade * item.preco, 0);
  const id = uuidv4();
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
  } catch (error) {
    console.error("Erro ao criar pedido:", JSON.stringify(error, null, 2)); // Log de erro

    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Erro ao criar pedido'
      }),
    };
  }
};
// @ts-ignore
import dynalite from 'dynalite';

// Inicialize o DynamoDB Local com dynalite
const dynamoDB = dynalite({
  createTableMs: 50, // O tempo de criação das tabelas
  // Outras configurações podem ser passadas, se necessário
});

// Inicia o DynamoDB Local na porta 8000
dynamoDB.listen(8000, () => {
  console.log('DynamoDB Local está rodando na porta 8000');
});
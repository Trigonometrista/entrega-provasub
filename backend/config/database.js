const { Sequelize } = require('sequelize');

// Configuração do banco de dados
const sequelize = new Sequelize('banco1', 'postgres', 'alex1995', {
  host: 'localhost',
  dialect: 'postgres',
});

// Função para conectar e sincronizar o banco de dados
async function connectDB() {
  try {
    // Autentica a conexão
    await sequelize.authenticate();
    console.log('Conexão ao banco de dados foi bem-sucedida');

    // Sincroniza os modelos com o banco de dados (force: false evita recriar as tabelas)
    await sequelize.sync({ force: false }); // Agora force: false para não recriar as tabelas
    console.log('Sincronização com o banco de dados concluída (force: false)');
    
  } catch (error) {
    console.error('Erro ao conectar ao banco:', error);
  }
}

module.exports = connectDB;
module.exports.sequelize = sequelize;

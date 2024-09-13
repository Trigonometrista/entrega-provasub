// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Importar CORS

const app = express();

// Habilitar CORS para todas as rotas
app.use(cors());

// Middleware para o body parser
app.use(bodyParser.json());

// Conectar ao banco de dados
require('./config/database')();

// Rotas
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

// Iniciar o servidor
app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});

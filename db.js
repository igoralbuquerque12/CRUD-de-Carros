const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('carros', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

async function validarBanco() { 
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco estabelecida com sucesso.');
      } catch (error) {
        console.error('Erro ao conectar-se com o DB: ', error.message);
      }    
}

validarBanco()

module.exports = sequelize

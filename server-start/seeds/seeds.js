const sequelize = require('../config/connection');
const {Login} = require('../models');

const loginData = require('./loginData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await Login.bulkCreate(loginData, {
    individualHooks: true,
    returning: true,
    member_id: users[Math.floor(Math.random() * users.length)].id,
  });

  process.exit(0);
}; 

seedDatabase();

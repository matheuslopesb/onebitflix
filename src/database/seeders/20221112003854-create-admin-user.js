'use strict';

const bcrypt = require("bcrypt");

module.exports = {
  async up (queryInterface) {
    const hashedPassword = await bcrypt.hash("123456", 10);

    await queryInterface.bulkInsert('users', [
      {
        first_name: 'Admin', 
        last_name: 'User', 
        phone: '555-5555', 
        birth: '1990-01-01', 
        email: 'admin@gmail.com', 
        password: hashedPassword, 
        role: 'admin', 
        created_at: new Date(), 
        updated_at: new Date()
      }
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('People', null, { where: { email: "admin@gmail.com" } });
  }
};

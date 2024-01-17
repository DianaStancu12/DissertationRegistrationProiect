'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Request',
      'thesisDetails',
    Sequelize.STRING
    );
  },

  async down (queryInterface, Sequelize) {
    
  }
};

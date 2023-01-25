'use strict'; 
//   --> ask why commenting 'use strict;' fixes the error <--
// --> ERROR: Octal literals are not allowed in strict mode. <--
const bcrypt = require("bcryptjs");
let options = {}
if(process.env.NODE_ENV === 'developement') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 11,
        userId: 13,
        startDate: '2023-05-22',
        endDate: '2023-06-16'
      },
      {
        spotId: 13,
        userId: 14,
        startDate: '2023-08-28',
        endDate: '2023-09-20'
      },
      {
        spotId: 7,
        userId: 20,
        startDate: '2023-01-09',
        endDate: '2023-01-20'
      },
      {
        spotId: 6,
        userId: 2,
        startDate: '2023-09-23',
        endDate: '2023-10-09'
      },
      {
        spotId: 19,
        userId: 20,
        startDate: '2023-01-03',
        endDate: '2023-01-18'
      },
      {
        spotId: 7,
        userId: 15,
        startDate: '2023-11-01',
        endDate: '2023-11-29'
      },
      {
        spotId: 14,
        userId: 3,
        startDate: '2023-05-10',
        endDate: '2023-06-02'
      },
      {
        spotId: 18,
        userId: 9,
        startDate: '2023-06-02',
        endDate: '2023-06-05'
      },
      {
        spotId: 3,
        userId: 8,
        startDate: '2023-01-12',
        endDate: '2023-01-12'
      },
      {
        spotId: 9,
        userId: 6,
        startDate: '2023-04-06',
        endDate: '2023-04-13'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});
  }
};

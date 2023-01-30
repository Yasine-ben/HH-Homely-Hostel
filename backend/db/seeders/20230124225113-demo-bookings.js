'use strict'; 
//   --> ask why commenting 'use strict;' fixes the error <--
// --> ERROR: Octal literals are not allowed in strict mode. <--
const bcrypt = require("bcryptjs");
let options = {}
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        startDate: new Date('January 19, 2023'),
        endDate: new Date('January 22, 2023')
      },
      {
        spotId: 2,
        userId: 1,
        startDate: new Date('February 12, 2023'),
        endDate: new Date('February 18, 2023')
      },
      {
        spotId: 1,
        userId: 2,
        startDate: new Date('June 9, 2023'),
        endDate: new Date('July 1, 2023')
      },
      {
        spotId: 1,
        userId: 3,
        startDate: new Date('December 1, 2023'),
        endDate: new Date('December 25, 2023')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});
  }
};

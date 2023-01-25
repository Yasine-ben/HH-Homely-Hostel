'use strict';
const bcrypt = require("bcryptjs");
let options = {}
if(process.env.NODE_ENV === 'developement') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      { reviewId: 2, url: 'https://loremflickr.com/640/480/cats' },
      { reviewId: 5, url: 'https://loremflickr.com/640/480/cats' },
      { reviewId: 10, url: 'https://loremflickr.com/640/480/cats' },
      { reviewId: 1, url: 'https://loremflickr.com/640/480/cats' },
      { reviewId: 4, url: 'https://loremflickr.com/640/480/cats' },
      { reviewId: 9, url: 'https://loremflickr.com/640/480/cats' },
      { reviewId: 7, url: 'https://loremflickr.com/640/480/cats' },
      { reviewId: 9, url: 'https://loremflickr.com/640/480/cats' },
      { reviewId: 10, url: 'https://loremflickr.com/640/480/cats' },
      { reviewId: 7, url: 'https://loremflickr.com/640/480/cats' }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});
  }
};

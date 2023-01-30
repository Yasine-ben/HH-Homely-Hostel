'use strict';
const bcrypt = require("bcryptjs");
let options = {}
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: '1',
        url: 'https://loremflickr.com/640/480/cats',
        preview: true
      },
      {
        spotId: '2',
        url: 'https://loremflickr.com/640/480/cats',
        preview: true
      },
      {
        spotId: '3',
        url: 'https://loremflickr.com/640/480/cats',
        preview: true
      },
      {
        spotId: '4',
        url: 'https://loremflickr.com/640/480/cats',
        preview: true
      },
      {
        spotId: '5',
        url: 'https://loremflickr.com/640/480/cats',
        preview: true
      },
      {
        spotId: '6',
        url: 'https://loremflickr.com/640/480/cats',
        preview: true
      },
      {
        spotId: '7',
        url: 'https://loremflickr.com/640/480/cats',
        preview: true
      },
      {
        spotId: '8',
        url: 'https://loremflickr.com/640/480/cats',
        preview: true
      },
      {
        spotId: '9',
        url: 'https://loremflickr.com/640/480/cats',
        preview: true
      },
      {
        spotId: '10',
        url: 'https://loremflickr.com/640/480/cats',
        preview: true
      },
      {
        spotId: '11',
        url: 'https://loremflickr.com/640/480/cats',
        preview: true
      },
      {
        spotId: '12',
        url: 'https://loremflickr.com/640/480/cats',
        preview: true
      },
      {
        spotId: '13',
        url: 'https://loremflickr.com/640/480/cats',
        preview: true
      },
      {
        spotId: '14',
        url: 'https://loremflickr.com/640/480/cats',
        preview: true
      },
      {
        spotId: '15',
        url: 'https://loremflickr.com/640/480/cats',
        preview: true
      },
      {
        spotId: '16',
        url: 'https://loremflickr.com/640/480/cats',
        preview: true
      },
      {
        spotId: '17',
        url: 'https://loremflickr.com/640/480/cats',
        preview: true
      },
      {
        spotId: '18',
        url: 'https://loremflickr.com/640/480/cats',
        preview: true
      },
      {
        spotId: '19',
        url: 'https://loremflickr.com/640/480/cats',
        preview: true
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});
  }
};

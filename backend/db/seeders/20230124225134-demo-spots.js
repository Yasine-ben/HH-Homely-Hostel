'use strict';
const bcrypt = require("bcryptjs");
let options = {}
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: '1',
        address: '2596 Ryan Bridge',
        city: 'Fort Marquiscester',
        state: 'Alabama',
        country: 'United States of America',
        lat: '-80.2511',
        lng: '68.7191',
        name: 'Luxury 18th Century Mannor',
        description: 'Elegant 7-room 4-bath mansion with multiple ameneites including tennis court, large pool, fitness center!',
        price: '1200.00'
      },
      {
        ownerId: '2',
        address: '8400 Kaleb Ramp',
        city: 'Wisozkfort',
        state: 'Kentucky',
        country: 'United States of America',
        lat: '65.8858',
        lng: '31.3470',
        name: 'Cute+Cozy newly renovated schoolhouse turned bnb',
        description: 'Cozy 1-bed 1/2-bath bnb perfect for you and your Significant other. Ammentites include large yard (to play amongus irl),retro school desks,tree,4 windows :)!',
        price: '82.00'
      },
      {
        ownerId: '3',
        address: '16805 stort triangelhus',
        city: 'stora tuttar',
        state: 'kissa kissa',
        country: 'Sweeden',
        lat: '-13.6323',
        lng: '92.1882',
        name: 'White A-Frame festival house',
        description: 'Recently renovated A-Frame House. Renovated due to prior book-ees arson. Red stains on the floors and walls from. . . paint accident. Huge field free use you and your friends to dance and party. Many other small outhouses available as well for extra addon(please inquire for more information)',
        price: '999.00'
      },
      {
        ownerId: '4',
        address: '65699 onde tvillinger',
        city: 'Rohanfield',
        state: 'skinner',
        country: 'Norway',
        lat: '-71.0692',
        lng: '-44.1019',
        name: 'Gigantic decomissioned hotel turned party mansion',
        description: 'Massive Decomission hotel due to past "spooky events" for you and your friends to enjoy. In the middle of no where so no one can her YOU SCREAM',
        price: '22912.00'
      },
      {
        ownerId: '5',
        address: '51148 arriba ln',
        city: 'Fort Hazlecester',
        state: 'binguos ',
        country: 'Spain',
        lat: '-75.9143',
        lng: '-9.0344',
        name: 'ugo',
        description: 'ugly house.',
        price: '41.00'
      },
      {
        ownerId: '6',
        address: '08348 Boyer Shore drive',
        city: 'Orlando',
        state: 'Florida',
        country: 'United States of America',
        lat: '-89.5812',
        lng: '-81.3761',
        name: 'Boarded up house',
        description: 'Boarded up house.',
        price: '24.00'
      },
      {
        ownerId: '7',
        address: '18 Hope Rd',
        city: 'Crays Hill',
        state: 'Billericay',
        country: 'United Kingdom',
        lat: '-26.3868',
        lng: '-175.5318',
        name: 'Small Cozy Essex cottage',
        description: 'Close to many local bars/parks/shops. Get to london in about an hour with local transit',
        price: '315.00'
      },
      {
        ownerId: '8',
        address: '29864 Reynolds Forest',
        city: 'Kokaua',
        state: 'Hawaii',
        country: 'United Atates of America',
        lat: '12.0842',
        lng: '54.1174',
        name: 'necessitatibus omnis distinctio',
        description: 'Fuga quam omnis fuga expedita et nostrum repudiandae.',
        price: '390.00'
      },
      {
        ownerId: '9',
        address: '875 Ashly Manors',
        city: 'New Catalina',
        state: 'Connecticut',
        country: 'United States of America',
        lat: '43.9018',
        lng: '34.7736',
        name: 'american horror story house',
        description: 'Nemo veniam ut ut quae.',
        price: '791.00'
      },
      {
        ownerId: '10',
        address: '04502 shed rd',
        city: 'Fountain Valley',
        state: 'Mississippi',
        country: 'United States of America',
        lat: '35.6263',
        lng: '152.6729',
        name: 'Shack',
        description: 'Voluptates in cupiditate earum occaecati repellat sapiente ab.',
        price: '1.02'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});
  }
};

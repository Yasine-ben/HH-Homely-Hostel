'use strict';
const bcrypt = require("bcryptjs");
let options = {}
if(process.env.NODE_ENV === 'developement') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '78254 Bosco Land',
        city: 'Murphycester',
        state: 'Iowa',
        country: 'Bhutan',
        lat: '-42.1341',
        lng: '-97.5086',
        name: 'corrupti mollitia ut',
        description: 'Reiciendis minima modi cumque.'
      },
      {
        ownerId: 6,
        address: '6168 Lafayette Hill',
        city: 'Oro Valley',
        state: 'South Carolina',
        country: 'Togo',
        lat: '-88.3583',
        lng: '172.8446',
        name: 'architecto perspiciatis excepturi',
        description: 'Ipsum libero nihil magni ea nesciunt natus dolorum assumenda.'
      },
      {
        ownerId: 3,
        address: '4695 Emile Shore',
        city: 'Lake Ken',
        state: 'Minnesota',
        country: 'Guinea-Bissau',
        lat: '60.8508',
        lng: '163.5163',
        name: 'explicabo ipsum maxime',
        description: 'Assumenda corporis dolorum explicabo eum molestiae facilis et perspiciatis.'
      },
      {
        ownerId: 9,
        address: '314 Franey Ferry',
        city: 'Port Cielo',
        state: 'Virginia',
        country: 'Kazakhstan',
        lat: '-77.4066',
        lng: '-53.4371',
        name: 'pariatur sunt perspiciatis',
        description: 'Aut voluptatum debitis perferendis deserunt velit.'
      },
      {
        ownerId: 7,
        address: '7820 Cormier Manor',
        city: 'Sacramento',
        state: 'South Carolina',
        country: 'Algeria',
        lat: '-74.6555',
        lng: '-161.3785',
        name: 'similique sit voluptate',
        description: 'Sapiente sed nemo minima sunt sequi labore perspiciatis ad sunt.'
      },
      {
        ownerId: 8,
        address: '76841 Shad Canyon',
        city: 'Lake Candida',
        state: 'South Carolina',
        country: 'Burkina Faso',
        lat: '-62.1018',
        lng: '92.9930',
        name: 'odio minima magnam',
        description: 'Tenetur nulla architecto aperiam quis expedita.'
      },
      {
        ownerId: 9,
        address: '59128 Daniel Underpass',
        city: 'Rosenbaumton',
        state: 'Kansas',
        country: 'Japan',
        lat: '27.4619',
        lng: '132.1367',
        name: 'ipsam excepturi eveniet',
        description: 'Nihil quidem illo distinctio.'
      },
      {
        ownerId: 10,
        address: '5719 Lura Heights',
        city: 'Koeppfurt',
        state: 'New Hampshire',
        country: 'Dominica',
        lat: '-84.5221',
        lng: '105.2546',
        name: 'exercitationem perspiciatis occaecati',
        description: 'Nihil sint reiciendis ducimus repudiandae.'
      },
      {
        ownerId: 3,
        address: '8306 Lehner Rapids',
        city: 'West Elenora',
        state: 'Texas',
        country: 'Saudi Arabia',
        lat: '-53.5925',
        lng: '16.6962',
        name: 'odio natus numquam',
        description: 'Dignissimos porro dolorum nulla neque.'
      },
      {
        ownerId: 4,
        address: '864 Barrows Shoal',
        city: 'Fort Sarahland',
        state: 'Wisconsin',
        country: 'Yemen',
        lat: '64.0180',
        lng: '-145.6934',
        name: 'sequi excepturi hic',
        description: 'Laudantium quidem excepturi veritatis impedit maiores.'
      },
      {
        ownerId: 8,
        address: '850 Nolan Streets',
        city: 'Ricoside',
        state: 'New Jersey',
        country: 'San Marino',
        lat: '5.7160',
        lng: '-75.0812',
        name: 'ducimus adipisci exercitationem',
        description: 'Repellendus itaque suscipit voluptatum dolorem inventore nulla.'
      },
      {
        ownerId: 5,
        address: '148 Maymie Knolls',
        city: 'East Arvillaberg',
        state: 'Ohio',
        country: 'Norway',
        lat: '-46.0613',
        lng: '-124.0944',
        name: 'dolore a sapiente',
        description: 'Repellat magni animi ut tenetur quidem.'
      },
      {
        ownerId: 2,
        address: '07930 Jena Rue',
        city: 'Schadenberg',
        state: 'Virginia',
        country: 'Chile',
        lat: '-78.4938',
        lng: '33.8911',
        name: 'quo sequi ex',
        description: 'Perferendis culpa eligendi quasi dignissimos.'
      },
      {
        ownerId: 5,
        address: '6105 Abdullah Overpass',
        city: 'Coachella',
        state: 'California',
        country: 'Maldives',
        lat: '20.4713',
        lng: '-161.4826',
        name: 'adipisci necessitatibus magnam',
        description: 'Dignissimos cumque illum reprehenderit.'
      },
      {
        ownerId: 8,
        address: '813 Kub Square',
        city: 'Cassidyside',
        state: 'Louisiana',
        country: 'United Arab Emirates',
        lat: '-54.9127',
        lng: '155.4914',
        name: 'mollitia laboriosam corrupti',
        description: 'Aliquid tempore repellendus.'
      },
      {
        ownerId: 7,
        address: '01653 Leuschke Harbor',
        city: 'Columbuscester',
        state: 'North Dakota',
        country: 'Saint Lucia',
        lat: '18.9337',
        lng: '-128.8333',
        name: 'consequatur sunt iure',
        description: 'Provident tempore officia fugit nihil quasi.'
      },
      {
        ownerId: 4,
        address: '4921 Jarrett Park',
        city: 'Hilpertbury',
        state: 'Alaska',
        country: 'Saudi Arabia',
        lat: '78.2174',
        lng: '60.9413',
        name: 'saepe magni facilis',
        description: 'Cum optio repudiandae dolores neque recusandae esse distinctio magnam.'
      },
      {
        ownerId: 4,
        address: '9242 Carter Bridge',
        city: 'North Maximillian',
        state: 'Nebraska',
        country: 'Guadeloupe',
        lat: '39.8159',
        lng: '-168.8189',
        name: 'magnam illum doloremque',
        description: 'Quam dolorum ab tenetur fugit.'
      },
      {
        ownerId: 3,
        address: '392 Ritchie Overpass',
        city: 'Laneyshire',
        state: 'Maine',
        country: 'Sri Lanka',
        lat: '-49.6111',
        lng: '74.5346',
        name: 'facere dicta soluta',
        description: 'Cumque quasi nam reprehenderit.'
      },
      {
        ownerId: 7,
        address: '9043 Emily Key',
        city: 'East Ben',
        state: 'Idaho',
        country: 'Martinique',
        lat: '61.3916',
        lng: '-97.1650',
        name: 'ea delectus id',
        description: 'Praesentium error quam soluta aut deleniti assumenda ab.'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});
  }
};

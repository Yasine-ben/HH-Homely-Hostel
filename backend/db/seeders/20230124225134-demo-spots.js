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
        ownerId: '1',
        address: '2596 Ryan Bridge',
        city: 'Fort Marquiscester',
        state: 'Alabama',
        country: 'Japan',
        lat: '-80.2511',
        lng: '68.7191',
        name: 'non labore nesciunt',
        description: 'Necessitatibus animi hic corporis.',
        price: '721.00'
      },
      {
        ownerId: '2',
        address: '8400 Kaleb Ramp',
        city: 'Wisozkfort',
        state: 'Kentucky',
        country: 'Sri Lanka',
        lat: '65.8858',
        lng: '31.3470',
        name: 'quasi quidem debitis',
        description: 'Hic doloribus nam maxime voluptate consequuntur iure fugit.',
        price: '676.00'
      },
      {
        ownerId: '3',
        address: '16805 Ian Shoal',
        city: 'San Jacinto',
        state: 'North Carolina',
        country: 'France',
        lat: '-13.6323',
        lng: '92.1882',
        name: 'quo explicabo hic',
        description: 'Similique earum nostrum minus eius ex commodi harum voluptatum accusantium.',
        price: '330.00'
      },
      {
        ownerId: '4',
        address: '65699 Hyman Islands',
        city: 'Rohanfield',
        state: 'Wyoming',
        country: 'Japan',
        lat: '-71.0692',
        lng: '-44.1019',
        name: 'doloribus inventore debitis',
        description: 'Optio et eum esse dolorem placeat animi ea commodi a.',
        price: '412.00'
      },
      {
        ownerId: '5',
        address: '51148 McCullough Overpass',
        city: 'Fort Hazlecester',
        state: 'Alaska',
        country: 'Spain',
        lat: '-75.9143',
        lng: '-9.0344',
        name: 'quod aut tempore',
        description: 'Impedit dolorum atque assumenda reiciendis.',
        price: '473.00'
      },
      {
        ownerId: '6',
        address: '08348 Boyer Shore',
        city: 'Douglasshire',
        state: 'Kansas',
        country: 'Western Sahara',
        lat: '-89.5812',
        lng: '-81.3761',
        name: 'culpa deserunt veritatis',
        description: 'Fugiat dolorum natus omnis nihil optio molestias suscipit.',
        price: '306.00'
      },
      {
        ownerId: '7',
        address: '5754 Emiliano Tunnel',
        city: 'Neomamouth',
        state: 'Montana',
        country: 'Guam',
        lat: '-26.3868',
        lng: '-175.5318',
        name: 'ex iste natus',
        description: 'Soluta iusto iste ea rerum aliquid culpa.',
        price: '814.00'
      },
      {
        ownerId: '8',
        address: '29864 Reynolds Forest',
        city: 'Lake Garrisonville',
        state: 'Kentucky',
        country: 'Faroe Islands',
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
        country: 'Fiji',
        lat: '43.9018',
        lng: '34.7736',
        name: 'labore culpa ab',
        description: 'Nemo veniam ut ut quae.',
        price: '791.00'
      },
      {
        ownerId: '10',
        address: '04502 Alexie Ports',
        city: 'Fountain Valley',
        state: 'Mississippi',
        country: 'Turks and Caicos Islands',
        lat: '35.6263',
        lng: '152.6729',
        name: 'saepe labore fuga',
        description: 'Voluptates in cupiditate earum occaecati repellat sapiente ab.',
        price: '293.00'
      },
      {
        ownerId: '11',
        address: '97552 Von Causeway',
        city: 'Joanneburgh',
        state: 'West Virginia',
        country: 'Greenland',
        lat: '28.5316',
        lng: '-7.6385',
        name: 'dolore suscipit quasi',
        description: 'Consequatur ducimus cupiditate ipsa labore eligendi corporis.',
        price: '829.00'
      },
      {
        ownerId: '12',
        address: '681 Weissnat Neck',
        city: 'Ratkestead',
        state: 'Arizona',
        country: 'Saint Martin',
        lat: '-54.5338',
        lng: '34.8937',
        name: 'earum veniam voluptatum',
        description: 'Laborum quam laudantium molestiae.',
        price: '205.00'
      },
      {
        ownerId: '13',
        address: '258 Brennon Point',
        city: 'New Sarah',
        state: 'Missouri',
        country: 'New Zealand',
        lat: '37.8982',
        lng: '119.3593',
        name: 'dolores reprehenderit ex',
        description: 'Non quibusdam sequi accusamus nemo sint quibusdam.',
        price: '87.00'
      },
      {
        ownerId: '14',
        address: '0819 Langosh Bridge',
        city: 'Savannah',
        state: 'Louisiana',
        country: 'Western Sahara',
        lat: '-28.9307',
        lng: '-29.4832',
        name: 'laboriosam molestiae maxime',
        description: 'Minus vel nobis fugit labore odit quasi assumenda aut corporis.',
        price: '376.00'
      },
      {
        ownerId: '15',
        address: '61474 Reina Crest',
        city: 'Columbia',
        state: 'Montana',
        country: 'Sierra Leone',
        lat: '89.5419',
        lng: '132.3420',
        name: 'accusantium sit porro',
        description: 'Delectus aliquam cum sed eos assumenda unde officia vitae doloremque.',
        price: '121.00'
      },
      {
        ownerId: '16',
        address: '46104 Bryana Estates',
        city: 'West Sacramento',
        state: 'Wisconsin',
        country: 'Germany',
        lat: '-71.5924',
        lng: '-134.1921',
        name: 'beatae quasi veritatis',
        description: 'Repudiandae nesciunt quos dolorum exercitationem culpa iure ullam.',
        price: '301.00'
      },
      {
        ownerId: '17',
        address: '85484 Donnelly Lock',
        city: 'South Missouriport',
        state: 'Tennessee',
        country: 'Madagascar',
        lat: '72.1257',
        lng: '-54.6028',
        name: 'culpa eaque earum',
        description: 'Eum et numquam deleniti quam dignissimos nisi commodi.',
        price: '150.00'
      },
      {
        ownerId: '18',
        address: '21085 Tremblay Ridge',
        city: 'Fort Murraymouth',
        state: 'Texas',
        country: 'Mozambique',
        lat: '68.6535',
        lng: '84.9888',
        name: 'aspernatur ipsum sequi',
        description: 'Rerum minima laboriosam.',
        price: '382.00'
      },
      {
        ownerId: '19',
        address: '22063 Smitham Shore',
        city: 'South Kiratown',
        state: 'Alabama',
        country: 'Maldives',
        lat: '26.3659',
        lng: '117.5315',
        name: 'inventore reprehenderit quas',
        description: 'Fugiat illo velit sed veritatis fugit est esse provident.',
        price: '28.00'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});
  }
};

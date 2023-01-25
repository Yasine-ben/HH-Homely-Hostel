'use strict';
const bcrypt = require("bcryptjs");
const {seedUsers} = require('../../utils/fakerSeed.js') //importing fake seeds
let options = {};
if (process.env.NODE_ENV === 'development') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
//let users = seedUsers(100) //
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'demo',
        lastName: 'user',
        username: 'demo_user123',
        email: 'demo_user_123@demo.com',
        hashedPassword: '$2a$10$o6MS2Gn.ZTMSmXJWRvo6wOu1Rnk5CK7XpH1QyFAZ0CB1acFVE9k2q'
        //password = "password"
      },
      {
        firstName: 'Bartholome',
        lastName: 'Bechtelar',
        username: '30_Block67',
        email: '256_Baumbach99@gmail.com',
        hashedPassword: '$2a$10$QMS4FEkyl1AILxcGXSvWQ.sfG4iBXR1Jl1oaYSvvcR9FH5mj0dtTS'
      },
      {
        firstName: 'Etha',
        lastName: 'Labadie',
        username: '3018',
        email: '256_Hoeger@yahoo.com',
        hashedPassword: '$2a$10$PWwjmoWHCmsuo9U3u17EK.CK6JWsJom.389nmoPFwLvRLzTq0DY8G'
      },
      {
        firstName: 'Raul',
        lastName: 'Cremin',
        username: '30.Dietrich24',
        email: '256_Bahringer41@hotmail.com',
        hashedPassword: '$2a$10$CJK2bF7tj82CfCsm4yIwAuwoOjVxJ.IvovNtgVgRgQ/39CnQo4Ys2'
      },
      {
        firstName: 'Janick',
        lastName: 'Ferry',
        username: '30_Romaguera91',
        email: '25626@yahoo.com',
        hashedPassword: '$2a$10$tGOBMgSwe7X8fNKB57Y1AOA/EHVyc1/Lc7xukK8lZT0OxEklLPPfG'
      },
      {
        firstName: 'Sydnee',
        lastName: 'Rosenbaum',
        username: '30_Gerhold92',
        email: '256.Braun@yahoo.com',
        hashedPassword: '$2a$10$w3Vcj.1SEw787NrQKZCKx.ylsEvql5Yxyym/wJsL0eLHYL.yTKXAG'
      },
      {
        firstName: 'Forest',
        lastName: 'Goldner',
        username: '30.Schneider',
        email: '25652@gmail.com',
        hashedPassword: '$2a$10$ElT..1G8glF.OEvzmxtayekXRWapKbnVEXU9jwoFFiuKe4voKqdUa'
      },
      {
        firstName: 'Malvina',
        lastName: 'McKenzie',
        username: '3056',
        email: '256.Keeling92@gmail.com',
        hashedPassword: '$2a$10$b4h0nv/XH/gokLTfa7E8ee.66i0HxhmxAe/lsHhV3h1vGVPKUZiGi'
      },
      {
        firstName: 'Vernon',
        lastName: 'Macejkovic',
        username: '30_Bernhard69',
        email: '256.Reilly@yahoo.com',
        hashedPassword: '$2a$10$1WTwtnfVfevzhD6cPsA7Ney0CTu2SH8RlQaYjAHYLztNVMiNsLwPK'
      },
      {
        firstName: 'Ralph',
        lastName: 'Stiedemann',
        username: '30.Koss',
        email: '25640@yahoo.com',
        hashedPassword: '$2a$10$uu4E3nmWP6/Hipy.gIb6DepHvj2U.u12u93WjhHrapwz4g7JDEpJO'
      },
      {
        firstName: 'Lesley',
        lastName: 'Conroy',
        username: '30_Gulgowski55',
        email: '256.Sanford@hotmail.com',
        hashedPassword: '$2a$10$CQan5v/GgNN7LvH3u0EXiOHuAeSV51b8wZ4lleniY.t2mKrzoqk8i'
      },
      {
        firstName: 'Lacey',
        lastName: 'Franey',
        username: '30_Dicki73',
        email: '256.Osinski96@gmail.com',
        hashedPassword: '$2a$10$NewYL.W6nRqHBzybgYNBIOmlo4u7lia303dPqxjbGo/U1Aed4Ozj6'
      },
      {
        firstName: 'Roger',
        lastName: 'Cartwright',
        username: '305',
        email: '25641@gmail.com',
        hashedPassword: '$2a$10$gDSEEkFlAVsEAPZQLuNzYeytbEx4hleOEoc9/lp29OdV5.noEuB1i'
      },
      {
        firstName: 'Rebeca',
        lastName: 'Kautzer',
        username: '3051',
        email: '256_Greenfelder@yahoo.com',
        hashedPassword: '$2a$10$Psn4avqkNVl7iOHUOE8G4.GFEOGOLmP2k8HFF4B7QhJRQwpNLb2/a'
      },
      {
        firstName: 'Kim',
        lastName: 'Gorczany',
        username: '3031',
        email: '256.Smith79@yahoo.com',
        hashedPassword: '$2a$10$X0CTGmzx75TRIl.DjxoAOOwcr7xZnbilfD1o11NlJdrWYva257ibG'
      },
      {
        firstName: 'Randi',
        lastName: 'Pouros',
        username: '303',
        email: '256.Macejkovic@gmail.com',
        hashedPassword: '$2a$10$OaTAQ9pzcZSmrPsQ8GcPSuBoMYg7Pzhsrv87nmRLzGfqRlW6pkS22'
      },
      {
        firstName: 'Magali',
        lastName: 'Feest',
        username: '30_Kemmer',
        email: '256.Hettinger61@gmail.com',
        hashedPassword: '$2a$10$cy46o25p1dG2jWxISlT3IOsv4ukeV0kvIG/sEpA4h97uBhRcOzMqa'
      },
      {
        firstName: 'Darrick',
        lastName: 'Simonis',
        username: '30_Tremblay14',
        email: '25672@gmail.com',
        hashedPassword: '$2a$10$aK/Loqe5cwNkVTnYY2bd/eGLJaeSWsILGkGl4h9RGi1M6M6dsqapS'
      },
      {
        firstName: 'Maribel',
        lastName: 'Smith',
        username: '30_Nicolas26',
        email: '256.Zulauf@yahoo.com',
        hashedPassword: '$2a$10$pDkwXuMQqpjPuKRtELBgE.LsljqbJtqjNOLtYdOCukPEag94HkwQi'
      },
      {
        firstName: 'Jaylin',
        lastName: 'Schiller',
        username: '30.Jenkins85',
        email: '256_Legros69@gmail.com',
        hashedPassword: '$2a$10$XLh0PEhVgFHAVwc2m45jZOcAvPAd9Ak..Z3zaA96Z/gZ/QRn7VYvy'
      }
    ]
    , {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});
  }
};
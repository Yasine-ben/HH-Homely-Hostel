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
        url: 'https://images.pexels.com/photos/1694360/pexels-photo-1694360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', //nice house
        preview: true
      },
      {
        spotId: '2',
        url: 'https://images.freeimages.com/images/large-previews/0c0/one-room-schoolhouse-2-1617839.jpg', //schoolhouse
        preview: true
      },
      {
        spotId: '3',
        url: 'https://cdna.artstation.com/p/assets/images/images/039/163/282/large/ahmed-ali-37-midsommar-yellow-temple-clay.jpg?1625112056', //midsomar house
        preview: true
      },
      {
        spotId: '4',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/The_Stanley_Hotel_in_Estes_Park%2C_a_town_on_the_eastern_edge_of_Rocky_Mountain_National_Park_in_north-central_Colorado_LCCN2015633407.tif/lossy-page1-1200px-The_Stanley_Hotel_in_Estes_Park%2C_a_town_on_the_eastern_edge_of_Rocky_Mountain_National_Park_in_north-central_Colorado_LCCN2015633407.tif.jpg',//shining hotel
        preview: true
      },
      {
        spotId: '5',
        url: 'https://media.istockphoto.com/id/490451739/photo/old-abandoned-house.jpg?s=612x612&w=0&k=20&c=ydFn4yK4E9oU2wpayP-KqtzkRY_9JGO1vObWHP0kLIg=', //rundown house w branches
        preview: true
      },
      {
        spotId: '6',
        url: 'https://www.phillymag.com/wp-content/uploads/sites/3/2017/02/l_suburban-blight-1200x675.jpg', //boarded up house w pink accents
        preview: true
      },
      {
        spotId: '7',
        url: 'https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=aRUkm9xAY4l6PcWpQ2YVRw&cb_client=search.gws-prod.gps&w=408&h=240&yaw=269.83844&pitch=0&thumbfov=100', //https://st.depositphotos.com/1796022/1576/i/450/depositphotos_15764961-stock-photo-bed-breakfast-accommodation-in-england.jpg alternate
        preview: true
      },
      {
        spotId: '8',
        url: 'https://preview.redd.it/32cl4f76vea71.jpg?width=960&crop=smart&auto=webp&v=enabled&s=c966b42455881f29e89e5a139847c9fce5ab7f8b', //lilo and stitch house
        preview: true
      },
      {
        spotId: '9',
        url: 'https://s1.r29static.com/bin/entry/248/0,0,460,552/960xbm,70/1383720/image.jpg', //ahs house
        preview: true
      },
      {
        spotId: '10',
        url: 'https://static7.depositphotos.com/1252160/758/i/950/depositphotos_7588755-stock-photo-ugly-house.jpg', //ugo house
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

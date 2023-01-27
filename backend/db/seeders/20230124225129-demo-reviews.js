'use strict';
const bcrypt = require("bcryptjs");
let options = {}
if(process.env.NODE_ENV === 'developement') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   options.tableName = 'Reviews';
   return queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      userId: 1,
      review: 'Architecto maiores ratione animi odit nisi pariatur explicabo ratione. Suscipit blanditiis consectetur numquam labore explicabo. Eaque eum voluptatibus.',
      stars: 3
    },
    {
      spotId: 2,
      userId: 2,
      review: 'Sapiente adipisci temporibus. Incidunt fugiat quisquam veritatis fugit et natus accusamus. Libero quam explicabo cumque totam laborum aperiam id.',
      stars: 2
    },
    {
      spotId: 3,
      userId: 3,
      review: 'Quasi expedita nihil doloremque aliquid quod voluptatum. Voluptatum aliquid omnis expedita saepe. Fugit aperiam corporis.',
      stars: 2
    },
    {
      spotId: 4,
      userId: 4,
      review: 'Odit nulla nihil. Iusto omnis animi impedit. Enim dicta eaque a facere.',
      stars: 3
    },
    {
      spotId: 5,
      userId: 5,
      review: 'Voluptatibus provident ducimus labore laboriosam aperiam ipsa nesciunt. Totam totam odio repellat dolorem corrupti nesciunt perspiciatis dignissimos eos. Aspernatur officia consequuntur facilis.',
      stars: 1
    },
    {
      spotId: 6,
      userId: 6,
      review: 'Ipsum sed cupiditate illo sit harum nulla et velit. Quos nihil doloremque nostrum cupiditate laborum deleniti magnam illo cum. Incidunt rerum quo vitae veniam ullam tempora nesciunt.',
      stars: 5
    },
    {
      spotId: 7,
      userId: 7,
      review: 'Quisquam iusto laudantium est. Aut architecto ea vero beatae excepturi iste ducimus. Eos a tenetur magni recusandae.',
      stars: 4
    },
    {
      spotId: 8,
      userId: 8,
      review: 'Laudantium sit corrupti illo. Expedita reiciendis eligendi consectetur deserunt quae minima. Omnis similique tempore quisquam error blanditiis.',
      stars: 1
    },
    {
      spotId: 9,
      userId: 9,
      review: 'Dolor ducimus necessitatibus perspiciatis. Nostrum architecto alias doloremque. Perspiciatis ducimus sapiente ullam minus quam culpa expedita similique corporis.',
      stars: 3
    },
    {
      spotId: 10,
      userId: 10,
      review: 'Ipsa perspiciatis commodi. Ex rem sed voluptatibus sed. Beatae molestiae unde nihil culpa.',
      stars: 4
    },
    {
      spotId: 11,
      userId: 11,
      review: 'At provident nostrum. Eius ea aliquid illo minus architecto iste eos dignissimos. Et maiores in facere.',
      stars: 5
    },
    {
      spotId: 12,
      userId: 12,
      review: 'Reiciendis eos rem ratione voluptas nesciunt delectus. Dolores molestiae dolorem atque error. Itaque ea ipsa nulla culpa iure corporis ex recusandae tempore.',
      stars: 5
    },
    {
      spotId: 13,
      userId: 13,
      review: 'Magni fugiat mollitia eum commodi asperiores harum neque reprehenderit. Sed saepe atque adipisci nulla eaque blanditiis id mollitia. Quisquam porro quia eum consequatur commodi dignissimos iusto assumenda.',
      stars: 2
    },
    {
      spotId: 14,
      userId: 14,
      review: 'Magni tempora quae ullam autem necessitatibus rerum magnam libero possimus. Illo fugiat porro dolor. Nisi sapiente magni provident vero.',
      stars: 4
    },
    {
      spotId: 15,
      userId: 15,
      review: 'Tempora quaerat praesentium vitae quis porro a modi. Repellat natus numquam voluptatum quod nihil. Perferendis est vitae quos quibusdam.',
      stars: 4
    },
    {
      spotId: 16,
      userId: 16,
      review: 'Quam illum pariatur saepe quae quam totam animi expedita quasi. Praesentium dolore veniam. Iure ex doloremque enim iste soluta.',
      stars: 4
    },
    {
      spotId: 17,
      userId: 17,
      review: 'Pariatur doloribus voluptatem incidunt dolor. Nesciunt iure perspiciatis. Ea reprehenderit molestias eligendi commodi modi maiores quis perferendis.',
      stars: 1
    },
    {
      spotId: 18,
      userId: 18,
      review: 'Perferendis temporibus minus sint voluptatibus illo autem iure. Necessitatibus eius tenetur repellendus perferendis quos veritatis delectus. Rerum incidunt possimus totam.',
      stars: 4
    },
    {
      spotId: 19,
      userId: 19,
      review: 'Aperiam eius alias similique quidem blanditiis qui accusamus. Expedita sequi sed eveniet a nemo sit. Assumenda repellendus eveniet soluta eos iste ex corrupti.',
      stars: 2
    },
    {
      spotId: 20,
      userId: 20,
      review: 'Recusandae nulla odio sapiente vero cum hic exercitationem deserunt. Laborum molestias totam debitis ipsa ratione ad beatae perferendis. Labore sed laborum quis.',
      stars: 2
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
   return queryInterface.bulkDelete(options, {});
  }
};

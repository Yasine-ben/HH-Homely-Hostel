const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

//simple random number generator
const rNum = (num) => Math.floor(Math.random() * Math.floor(num) + 1)

const seedUsers = (num) => { //user seeder
    let users = new Array(num).fill('')

    for(const i in users){
        users[i] = {
            firstName: faker.name.firstName(),//fine
            lastName: faker.name.lastName(), //fine
            username: faker.internet.userName(30),
            email:  faker.internet.email(256),
            hashedPassword: bcrypt.hashSync(faker.internet.password()),
        }
    }

    return users
}

console.log(seedUsers(20))
module.exports = {seedUsers}
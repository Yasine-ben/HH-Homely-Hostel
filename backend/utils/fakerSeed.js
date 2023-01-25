const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

//simple random number generator
const rNum = (num) => Math.floor(Math.random() * Math.floor(num) + 1)
const getRand = (max) => {
    return Math.floor(Math.random() * max);
  }
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

const seedSpots = num => {
    let spots = new Array(num).fill('')

    for(const i in spots){
        spots[i] = {
            ownerId: rNum(10),
            address: faker.address.streetAddress(),
            city: faker.address.city(),
            state: faker.address.state(),
            country: faker.address.country(),
            lat: faker.address.latitude(),
            lng: faker.address.longitude(),
            name: faker.lorem.words(3),
            description: faker.lorem.sentence(),
        }
    }
    return spots
}

const seedSpotImages = (num) => {
    let spotImages = new Array(num).fill('')

    for(const i in spotImages){
        
        let boool = true
        if(getRand(2) == 0) boool = false
        else boool = true

        spotImages[i] = {
            spotId: i,
            url: faker.image.cats(), //change later
            preview: boool 
        }
    }
    return spotImages
}

const seedReviewImages = (num) => {
    let reviewImages = new Array(num).fill('')

    for(let i in reviewImages){
        reviewImages[i] = {
            reviewId: rNum(10),
            url: faker.image.cats(),
        }
    }

    return reviewImages
}

const seedReviews = (num) => {
    const reviews = new Array(num).fill('')

    for(let i in reviews){
        reviews[i] = {
            spotId: rNum(20),
            userId: rNum(20), 
            review: faker.lorem.sentences(3),
            stars: rNum(5),
        }
    }

    return reviews
}

const seedBookings = (num) => {
    const bookings = new Array(num).fill('')
    
    for(let i in bookings){

        const startDate = faker.date.between('2023-01-01T00:00:00.000Z', '2023-12-01T00:00:00.000Z')
        const endDate = faker.date.soon(30,startDate)

        //shorten dates later please

        bookings[i] = {
            spotId: rNum(20),
            userId: rNum(20),
            startDate: startDate, 
            endDate: endDate,
        }
    }

    return bookings
}

// console.log(seedUsers(20))
// console.log(seedSpots(20))
// console.log(seedSpotImages(20))
// console.log(seedReviewImages(10))
// console.log(seedReviews())
console.log(seedBookings(2))
module.exports = {seedUsers,seedSpots,seedSpotImages,seedReviewImages,seedReviews,seedBookings}
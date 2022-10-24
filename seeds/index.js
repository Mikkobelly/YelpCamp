const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    // const p = new Campground({ location: cities[1].city });
    // await p.save();
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: "6345473c210f8538c0e67806",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)}, ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, modo consetetur qui id, sit in nobis laboramus ullamcorper. Mei ea tantas postea, usu option suavitate ad.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/duyvb6bd0/image/upload/v1665931701/YelpCamp/p1czxzpizc3bkxcxpl5x.jpg',
                    filename: 'YelpCamp/p1czxzpizc3bkxcxpl5x'
                },
                {
                    url: 'https://res.cloudinary.com/duyvb6bd0/image/upload/v1666083455/YelpCamp/tbecuozhi5cjlugfulgm.jpg',
                    filename: 'YelpCamp/tbecuozhi5cjlugfulgm'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
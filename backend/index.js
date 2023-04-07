const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const fileUpload = require('express-fileupload');
require('dotenv').config()
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.c9qgdog.mongodb.net/?retryWrites=true&w=majority`;
const uri = 'mongodb://localhost:27017'
const app = express()

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('image'));
app.use(fileUpload());

const port = 4200;

app.get('/', (req, res) => {
    res.send("hello from db it's working working")
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const orderCollection = client.db("restBook").collection("allOrder");
    const itemCollection = client.db("restBook").collection("allItem");
    const userCollection = client.db("restBook").collection("allUser");
    const areaCollection = client.db("restBook").collection("allArea");
    const restaurantCollection = client.db("restBook").collection("allRestaurant");
    const tableCollection = client.db("restBook").collection("allTable");
    const layoutCollection = client.db("restBook").collection("allLayout");
    //restaurant 
    app.post('/addRestaurant', (req, res) => {
        const file = req.files.file;
        const image = req.files.file.name;
        const title = req.body.title;
        const location = req.body.area;
        const offDaysList = req.body.offDay;
        const status = req.body.status;
        const openingTime = req.body.openingTime;
        const closingTime = req.body.closingTime;
        const user = req.body.user;
        const address = req.body.address;
        const mobile = req.body.mobile;
        const description = req.body.description;
        const facebook = req.body.facebook;
        const coords = req.body.coords;
        const afterCheckIn = req.body.afterCheckIn;
        const beforeCheckIn = req.body.beforeCheckIn;
        const paymentAmount = req.body.paymentAmount;
        const area = location.split(',')
        const offDay = offDaysList.split(',')
        file.mv(`${__dirname}/image/restaurant/${file.name}`, err => {
            if (err) {
                return res.status(500).send({ msg: 'Failed to upload Image' });
            }
        })

        restaurantCollection.insertOne({
            title, status, user, area, image, address, mobile, description, facebook, coords, openingTime, closingTime,
            afterCheckIn, beforeCheckIn, paymentAmount, offDay
        })
            .then(result => {
                res.send(result.insertedCount > 0);
            })
    })
    app.patch('/updateRestaurant/:id', (req, res) => {
        const title = req.body.data.title;
        const area = req.body.data.area;
        const offDay = req.body.data.offDay;
        const user = req.body.data.user;
        const address = req.body.data.address;
        const mobile = req.body.data.mobile;
        const description = req.body.data.description;
        const facebook = req.body.data.facebook;
        const coords = req.body.data.coords;
        const afterCheckIn = req.body.data.afterCheckIn;
        const beforeCheckIn = req.body.data.beforeCheckIn;
        const paymentAmount = req.body.data.paymentAmount;
        const status = req.body.data.status;
        const openingTime = req.body.data.openingTime;
        const closingTime = req.body.data.closingTime;
        restaurantCollection.updateOne({ _id: ObjectId(req.params.id) },
            {
                $set: {
                    title: title, area: area, user: user, address: address, mobile: mobile, offDay: offDay,
                    description: description, facebook: facebook, coords: coords, afterCheckIn: afterCheckIn,beforeCheckIn: beforeCheckIn,paymentAmount: paymentAmount, status: status, openingTime: openingTime, closingTime: closingTime
                }   
            })
            .then(result => {
                res.send(result.matchedCount > 0);
            })
    })
    app.get('/restaurants', (req, res) => {
        restaurantCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })
    app.get('/restaurantProfile/:id', (req, res) => {
        // console.log(req.params.user)
        restaurantCollection.find({ _id: ObjectId(req.params.id) })
            .toArray((err, documents) => {
                // console.log(documents[0])
                res.send(documents[0]);
            })
    })
    app.post('/restaurantUser', (req, res) => {
        const user = req.body;
        // console.log(req.body)
        restaurantCollection.find({ user: user.user })
            .toArray((err, documents) => {
                res.send(documents);
            })
    })
    app.delete('/deleteRestaurant/:id', (req, res) => {
        restaurantCollection.deleteOne({ _id: ObjectId(req.params.id) })
            .then((result) => {
                res.send(result.deletedCount > 0);
                // console.log(res);
            })
    })

    //item
    app.post('/addItem', (req, res) => {
        const file = req.files.file;
        const image = req.files.file.name;
        const title = req.body.title;
        const price = req.body.price;
        const category = req.body.category;
        const description = req.body.description;
        const shortDescription = req.body.shortDescription;

        file.mv(`${__dirname}/image/item/${file.name}`, err => {
            if (err) {
                return res.status(500).send({ msg: 'Failed to upload Image' });
            }
        })

        itemCollection.insertOne({ title, price, category, description, shortDescription, image })
            .then(result => {
                res.send(result.insertedCount > 0);
            })
    })
    app.patch('/updateItem/:id', (req, res) => {
        const title = req.body.data.title;
        const price = req.body.data.price;
        const category = req.body.data.category;
        const description = req.body.data.description;
        const shortDescription = req.body.data.shortDescription;
        itemCollection.updateOne({ _id: ObjectId(req.params.id) },
            {
                $set: {
                    title: title, price: price, category: category, description: description, shortDescription: shortDescription
                }
            })
            .then(result => {
                res.send(result.matchedCount > 0);
            })
    })
    app.get('/items', (req, res) => {
        itemCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })
    app.delete('/deleteItem/:id', (req, res) => {
        itemCollection.deleteOne({ _id: ObjectId(req.params.id) })
            .then((result) => {
                res.send(result.deletedCount > 0);
                // console.log(res);
            })
    })
    app.get('/item/:id', (req, res) => {
        // console.log(req.params.user)
        itemCollection.find({ _id: ObjectId(req.params.id) })
            .toArray((err, documents) => {
                // console.log(documents[0])
                res.send(documents[0]);
            })
    })

    // layout
    app.post('/addLayout', (req, res) => {
        const layout = req.body.data.layout;
        const restaurantId = req.body.data.restaurantId;
        // console.log(req.body)
        layoutCollection.insertOne({ layout, restaurantId })
            .then(result => {
                res.send(result.insertedCount > 0);
            })
    })
    app.get('/layouts/:id', (req, res) => {
        layoutCollection.find({ restaurantId: req.params.id })
            .toArray((err, documents) => {
                res.send(documents);
            })
    })
    app.delete('/deleteLayout/:id', (req, res) => {
        layoutCollection.deleteOne({ _id: ObjectId(req.params.id) })
            .then((result) => {
                res.send(result.deletedCount > 0);
                // console.log(res);
            })
    })

    //area
    app.post('/addArea', (req, res) => {
        const area = req.body;
        areaCollection.insertOne(area)
            .then(result => {
                res.send(result.insertedCount > 0);
            })
    })
    app.get('/areas', (req, res) => {
        areaCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })
    app.delete('/deleteArea/:id', (req, res) => {
        areaCollection.deleteOne({ _id: ObjectId(req.params.id) })
            .then((result) => {
                res.send(result.deletedCount > 0);
                // console.log(res);
            })
    })
    //table
    app.post('/addTable', (req, res) => {
        const file = req.files.file;
        const image = req.files.file.name;
        const title = req.body.title;
        const price = req.body.price;
        const layout = req.body.layout;
        const description = req.body.description;
        const restaurantId = req.body.restaurantId;

        file.mv(`${__dirname}/image/table/${file.name}`, err => {
            if (err) {
                return res.status(500).send({ msg: 'Failed to upload Image' });
            }
        })

        tableCollection.insertOne({ title, price, layout, description, restaurantId, image })
            .then(result => {
                res.send(result.insertedCount > 0);
            })
    })
    app.patch('/updateTable/:id', (req, res) => {
        const title = req.body.data.title;
        const price = req.body.data.price;
        const layout = req.body.data.layout;
        const description = req.body.data.description;
        tableCollection.updateOne({ _id: ObjectId(req.params.id) },
            {
                $set: {
                    title: title, price: price, layout: layout, description: description
                }
            })
            .then(result => {
                res.send(result.matchedCount > 0);
            })
    })
    app.get('/tables/:id', (req, res) => {
        tableCollection.find({ restaurantId: req.params.id })
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    app.get('/tableDetails/:id', (req, res) => {
        tableCollection.find({ _id: ObjectId(req.params.id) })
            .toArray((err, documents) => {
                res.send(documents[0]);
            })
    })
   
    app.delete('/deleteTable/:id', (req, res) => {
        tableCollection.deleteOne({ _id: ObjectId(req.params.id) })
            .then((result) => {
                res.send(result.deletedCount > 0);
                // console.log(res);
            })
    })
    // app.get('/areas', (req, res) => {
    //     areaCollection.find({})
    //         .toArray((err, documents) => {
    //             res.send(documents);
    //         })
    // })

    //order
    app.post('/addOrder', (req, res) => {
        const order = req.body;
        // console.log(order);
        orderCollection.insertOne(order)
            .then(result => {
                res.send(result.insertedCount > 0);
            })
    })
    app.get('/allOrder', (req, res) => {
        orderCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })
    // app.get('/allOrder', (req, res) => {
    //     orderCollection.find({})
    //         .toArray((err, documents) => {
    //             res.send(documents);
    //         })
    // })

    app.post('/restaurantOrder', (req, res) => {
        const email = req.body.email;
        orderCollection.find({})
            .toArray((err, documents) => {
                res.send(documents.filter(data => data.finalData.garageEmail === email));
            })
    })
    app.patch('/updateOrder/:id', (req, res) => {
        orderCollection.updateOne({ _id: ObjectId(req.params.id) },
            {
                $set: {
                    finalData: req.body
                },
            })
            .then(result => {
                res.send(result.matchedCount > 0);
            })
    })

    app.patch('/updateAmount/:id', (req, res) => {
        orderCollection.updateOne({ _id: ObjectId(req.params.id) },
            {
                $set: {
                    finalData: req.body
                },
            })
            .then(result => {
                res.send(result.matchedCount > 0);
            })
    })



    //user
    app.post('/addUser', (req, res) => {
        const user = req.body;
        userCollection.insertOne(user)
            .then(result => {
                res.send(result.insertedCount > 0);
            })
    })
    app.get('/users', (req, res) => {
        userCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })




    // app.get('/students/:department/:roll', (req, res) => {
    //     studentCollection.find({ roll: req.params.roll, department: req.params.department })
    //         .toArray((err, documents) => {
    //             res.send(documents[0]);
    //         })
    // })

    // app.post('/studentsByRoll', (req, res) => {
    //     const roll = req.body;
    //     studentCollection.find({ roll: roll.roll })
    //         .toArray((err, documents) => {
    //             res.send(documents);
    //         })
    // })




});


app.listen(process.env.PORT || port)
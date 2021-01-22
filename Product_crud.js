'use strict';
const express = require('express');
const { v4: uuid } = require('uuid');
const mongoose = require('mongoose');
const cors = require('cors');
const process = require('process');

mongoose.connect('mongodb://localhost:27017/product', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to Db');
    })
    .catch(() => {
        console.error(error);
        console.error('failed to connect db');
        process.exit(1);
    });

const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
const User = mongoose.model('customer', {
    name: String,
    image: String,
    price: Number,
    availstatus: String,
    description: String,
    id: { type: String, default: uuid }
});

//create new user
app.post('/customers', (req, res) => {
    User.create(req.body)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

//retrive the user list
app.get('/customers', async (req, res) => {
    try {
        const data = await User.find({})
        res.json(data);
    }
    catch (error) {
        res.status(500).json(error);
    }
})

//update the user list
app.get('/customers/:id', async (req, res) => {
    try {
        const data = await User.findOne({ id: req.params.id });
        res.json(data);
    }
    catch (error) {
        res.status(500).json(error);
    }
})

//update the user list
app.put('/customers/:id', async (req, res) => {
    try {
        const data = await User.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        res.json(data);
    }
    catch (error) {
        res.status(500).json(error);
    }
})

//delete the user list
app.delete('/customers/:id', async (req, res) => {
    try {
        const result = await User.findOneAndDelete({ id: req.params.id });
        res.json(data);
    }
    catch (data) {
        res.status(500).json(error);
    }
})

app.listen(3000, () => {
    console.log('server listening at port 3000');
});
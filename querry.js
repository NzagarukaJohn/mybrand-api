const router = require('express').Router();
const Contact = require('./collection/contact');
const bodyParser = require('body-parser');
const { append } = require('express/lib/response');
const verifyToken = require("./verifyToken.js");

router.post('/', async (req, res) => {
 console.log(req.user)
    const querry = new Contact({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });

    try{
        const savedQuerry = await querry.save();
        res.status(201).send(savedQuerry);
    }catch(err){
        res.status(400).send(err);
    }
});

router.get('/',  verifyToken, (req, res) => {
    Contact.find()
    .then((result) => {
        res.status(200).send(result);
    })
    .catch((err) => {
        res.send(404).send({"Message": "Query not Found"})
    })
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Contact.findByIdAndDelete(id)
    .then((result) => {
        res.send('query deleted successfully')
    })
    .catch((err) => {
        console.log(err);
    })
});

module.exports = router;
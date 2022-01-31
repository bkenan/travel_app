var express = require('express');
var router = express.Router();

const Travel = require('../models/travelModel');
//GET for create
router.get('/add', (req, res, next) => {
    res.render('travel/add');
});

//POST for create
router.post('/add', (req, res, next) => {
    const { name, type, star } = req.body;
    const travel = new Travel({
        name: name,
        type: type,
        star: star
    });

    travel.save((err, t) => {
        if (err) {
            console.log("Error saving travel:", err);
        }
        console.log("saved successfully!");
        res.redirect("/travel");
    });
});

//Read
router.get('/', (req, res, next) => {
    Travel.find({}, (err, travel) => {
        if (err) {
            console.log("Error finding travel:", err);
        }
        console.log(travel);
        res.render('travel/list', { travel: travel });
    });
});


//Update

//GET for update
router.get('/:destinationid', (req, res, next) => {
    Travel.findOne({ '_id': req.params.destinationid })
        .then((destination) => {
            res.render('travel/update', {
                destination: destination,
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

// POST for update
router.post('/:destinationid', (req, res, next) => {
    Travel.findOne({'_id': req.params.destinationid})
        .then((destination) => {
            var data = {
                name: req.body.name,
                type: req.body.type,
                star: req.body.star
            }
            destination.set(data);
            destination.save().then(() => {
                res.redirect('/travel');
            });
        })
        .catch((err) => {
            if (err) console.log(err);
        });
});



//Delete
router.get('/delete/:id', (req, res, next) => {
    const destination_id = req.params.id;
    console.log("Delete destination: ", destination_id)
    Travel.findByIdAndDelete(destination_id, function (err, doc) {
        if (err) {
            console.log("Error:", err);
        }
        console.log("Deleted destination:", destination_id);
        res.redirect("/travel");
    });
});


module.exports = router;
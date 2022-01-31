var express = require('express');
var router = express.Router();
const travelData = require('../data_service/travelData');
//Creating service class that can provide services to both the REST API and Web/HTML routes
const TravelService = travelData.TravelService;



router.use((req, res, next)=>{
    res.set({
    // Allow AJAX access from any domain
    'Access-Control-Allow-Origin':'*',
    // Allow methods and headers for 'preflight'
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  // if this is a preflight, we're done and can send the response with our headers
  if(req.method == 'OPTIONS'){
    return res.status(200).end();
    }
    next();
  })


//Create
//body items are saved in json file as destinations
//the method is post
router.post('/', function (req, res, next) {
    console.log("create: ", req.body);
    TravelService.create(req.body).then(function(save_destination){
        console.log("Saved");
        res.json(save_destination);
    });
});

//GET methods
//Read for list
//the array of all travel items are listed using the service class
router.get('/', async function (req, res, next) {
    let travel = []
    try {
        travel = await TravelService.list();
    } catch (err) {
        next(new Error("Error reading list"));
    }
    res.json(travel);
});

//Read for ID
//referring to the destinations id, the items are read from json fileusing the service class
router.get('/:id', async function (req, res, next) {
    const destination_id = req.params.id;
    let destination;
    try {
        destination = await TravelService.read(destination_id);
    } catch (err) {
        next(new Error("Error reading item"));
    }
    res.json(destination);
});

//Update
//PUT methods is applied
//json items are updated using the parameter ids
router.put('/:id', async function (req, res, next) {
 const destination_id = req.params.id;
 const data = req.body;
 try {
     destination = await TravelService.update(destination_id, data);
 } catch(err) {
     next(new Error("Error updating"));
 }
 res.json(destination);
});

//Delete
//applying the delete method
//deleted by referring to the parameter ids
router.delete('/:id', async function (req, res, next) {
    const destination_id = req.params.id;
    try {
        destination = await TravelService.delete(destination_id);
    } catch(err) {
        next(new Error("Error deleting"));
    }
    res.json(destination);
});



module.exports = router;
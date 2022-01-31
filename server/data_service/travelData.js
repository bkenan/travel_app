const Travel = require('../models/travelModel');

//The purpose of this class is to prevent repetition in the code for travel.js and api
//creating static files for the line of codes that appear both in api and non-api codes
//static files refer to the destinations by their ids
class TravelService {
    //  list
    static list() {
        return Travel.find({}).then(function (travel) {
            return travel;
        });
    }

    //read
    static read(id) {
        return Travel.findById(id).then((destination) => {
            return destination;
        })
    }

    //  create
    static create(data) {
        const { name, type, star } = data;
        const destination = new Travel({
            name: name,
            type: type,
            star: star
        });
        return destination.save();
    }

    //  update
    static update(id, data) {
        return Travel.findById(id).then((destination) => {
            destination.set(data);
            return destination.save();
        })
    }

    //  delete
    // returns object upon deleting
    static delete(id) {
        return Travel.deleteOne({ _id: id }).then((obj) => {
            return obj;
        });
    }
}
module.exports.TravelService = TravelService;
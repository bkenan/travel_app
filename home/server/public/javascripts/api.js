// wrap in IIFE to control scope
(function () {
    
    const baseURL = 'http://165.227.234.110:5000';

    //this function creates a json file including name, type, star for the testing purpose such as creating
    function testAPIs() {
        let testJSON = {
            name: 'API destination',
            type: 'API type',
            star: 5
        };


        // Initiating callAPI function for the CRUD operations
        //Listing all destinations
        //CallAPI uses GET method to return the LIST of all api.travel.js destinations
        callAPI("GET", "/api/travel")
            .then((travel) => {
                console.log("list of destinations: ", travel);
                return travel;
            })
            //Creating destinations using POST method
            //The function uses api.travel.js to save the created item by API
            .then(() => {
                return callAPI("POST", "/api/travel", testJSON);
            })
            //callAPI uses GET method by referring to destintion id in order to READ the individual items
            .then((destination) => {
                console.log("saved destination:", destination);
                return callAPI("GET", "/api/travel/" + destination._id);
            })
            //trying to UPDATE the destinations by PUT method
            //returns the updated values by api.travel.js
            .then((destination) => {
                console.log("read destination:", destination);
                destination.name += " , Updated";
                destination.type += " , Updated";
                destination.start = 2;
                return callAPI("PUT", "/api/travel/" + destination._id, destination); 
            })
            //DELETE just uses the destination id to delete the item
            //then console.log the results
            .then((destination) => {
                console.log("updated destination:", destination);
                return callAPI("DELETE", "/api/travel/" + destination._id); 
            })
            .then((destination) => {
                console.log("deleted destination:", destination);
            })

            //error handling
            .catch((err) => {
                console.error(err);
            })
    }

    //handling CRUD urls based on the fetched method, headers and json body
    function callAPI(method, uri, body) {
        let url = baseURL + uri;
        let fetchOptions = {
            method: method,
            headers: {
                'Content-type': 'application/json'
            }
        };
        if (body) {
            fetchOptions.body = JSON.stringify(body);
        }
        return fetch(url, fetchOptions).then((response) => response.json());
    }

    // calling the test function when we click the button
    document.querySelector('#testme').addEventListener("click", () => {
        testAPIs();
    });
})();
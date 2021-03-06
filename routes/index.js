var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();
var api = require('../CFLdatabase');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));





/* GET home page. */
router.post('/create_event', function(req, res, next) {
  console.log(req.body);
  console.log("create_event" + typeof req.body);
  var restaraunt_name = req.body.restaraunt_name,
      restaraunt_long = req.body.restaraunt_long,
      restaraunt_lat  = req.body.restaraunt_lat,
      capacity        = req.body.capacity_of_restaraunt,
      customers       = req.body.number_of_customers,
      event_name      = req.body.event_name,
      image_url       = req.body.image_url,
      yelp_url        = req.body.yelp_url;

  var obj = {"restaraunt_name" : restaraunt_name, "restaraunt_long" : restaraunt_long, "restaraunt_lat" : restaraunt_lat,
             "capacity_of_restaraunt" : capacity, "number_of_customers" : customers, "event_name" : event_name, "image_url" : image_url, "yelp_url" : yelp_url}
  api.add_event(obj, function(err, data){
  	if (err != null) {
  		console.log("ERROR: adding event.")
      res.status(404);
      res.end();
  	} else {
      console.log(data.ops[2]);
      res.send(data);
  		console.log("Succesfully added event.")
  	}
  })


});

router.post('/get_event_id', function(req, res, next){
  var event_id = req.body.id;
  api.return_object_by_id(event_id, function(err, data){
    if (err != null) {
      console.log("ERROR: adding event.")
      res.status(404);
      res.end();
    } else {
      res.send(data);
      console.log("Succesfully added event.")
    }
  });

});


//

module.exports = router;

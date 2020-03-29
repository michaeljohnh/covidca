const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  facilityName: String,
  streetAddress: String,
  city: String,
  zipCode: Number,
  totalBeds: Number,
  coords: {
    type: {type: String},
    coordinates: [Number]
  }
});


// db.locations.find().forEach(
//        function(location) {
// print(location.FACILITY_NAME +": " + location.LONGITUDE);
//            db.locations.update(
//                {_id: location._id},
//                {$set: { coords: {
//                                        type : "Point",
//                                        coordinates : [location.LONGITUDE,location.LATITUDE]
//                                    }
//                        }
//                },{multi:false}
//            )
//        }
//    );
  


locationSchema.index({coords: '2dsphere'});

mongoose.model('Location', locationSchema);

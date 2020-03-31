const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

const locationsListByDistance =
     async (req,res) => {

      const lng = parseFloat(req.query.lng);
      // const lng = -118.603219

      const lat = parseFloat(req.query.lat);
      //const lat = 34.228716;
      //const max = 2000000;

      const max = parseFloat(req.query.max);

      if (!lat || !lng || !max) {
        return res
                .status(404)
                .json({"message" : "need to provide lat lng max"});
      }

      console.log(lat);
      console.log(lng);
      const near = {
        type: "Point",
        coordinates: [lng, lat]
      };
      const geoOptions = {
        distanceField: "distance.calculated",
        spherical: true,
        maxDistance: max
      };

      try {
        const results =  await Loc.aggregate([

          {
            $geoNear: {
              near,
              ...geoOptions
            },
          },
          { $match: {LICENSE_CATEGORY_DESC:"General Acute Care Hospital"} },

          { $limit: 10 }
        ]);
        const locations = results.map(result => {
          return {
            id: result._id,
            name: result.FACILITY_NAME,
            street: result.streetAddress,
            city: result.city,
            zip: result.zipCode,
            totalBeds : result.TOTAL_NUMBER_BEDS,
            distance: `${result.distance.calculated.toFixed()}`
          }
        });

        // console.log(results);

        return res
                .status(200)
                .json(results);
      } catch(err) {
        console.log(err);
      }



    };

const locationsReadOne = (req,res) => {  
        Loc
          .findById(req.params.id)
          .exec((err, location) => {
            if (!location) {
              return res.status(404)
                        .json({"message": "location not found"});
            } else if (err) {
              return res.status(404)
                        .json(err);
            }

            console.log(location);
            res
              .status(200)
              .json(location);
          })
        };

module.exports = {locationsListByDistance,
                  locationsReadOne,
};
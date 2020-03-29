const express =require ('express');
const cors = require ('cors');
const bodyParser =require ('body-parser');
const mongoose = require ('mongoose');

const app = express();
const router = express.Router();

const dbURI = 'mongodb+srv://michaelh:P6LqVssXCO8dMT9M@cluster0-b1ubn.mongodb.net/COVIDCA?retryWrites=true&w=majority';

app.get('/', (req, res) => res.send('Hello World!'));

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(dbURI,{useNewUrlParser:true});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log ('MongoDB database connection established successfully');
});

require ('./models/locations');
const Loc = mongoose.model('Location');

router
    .route('/api/locations')
    .get(  async (req,res) => {

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

        return res
                .status(200)
                .json(results);
      } catch(err) {
        console.log(err);
      }



    });

 router.route('/api/locations/:id')
      .get( (req,res) => {  
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
        });

app.use('/',router);

app.listen(3000, ()=> console.log('Express server running on port 4000!!!'));
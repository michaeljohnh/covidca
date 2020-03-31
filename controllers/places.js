const mongoose = require('mongoose');


const places = (req,res) => {
  res.status(200)
     .send({"message": "success"});
};


// $("#content > div.content-padding > table:nth-child(2) > tbody > tr > th").slice(22,359).each((index,element) => {
//   console.log($(element).text());
//   });

//   $("#content > div.content-padding > table:nth-child(2) > tbody > tr > td").slice(22,359).each((index,element) => {
//     console.log($(element).text());
//     });

module.exports = {
  places
};
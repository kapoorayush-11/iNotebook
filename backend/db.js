const mongoose = require ('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

const connectToMongo = () =>  {
mongoose.connect(mongoURI, () => {
// Callback function. Mongo ko connect hone mei time lgta. jab bhi hum save karte, vo connect hota and callback fire ho jaati. aur itni der mei index.js walla run ho jaata
    console.log("Connected to Mongo successfully");
})
}

module.exports = connectToMongo;

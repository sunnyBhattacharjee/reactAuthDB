// external imports
const mongoose = require("mongoose");
require('dotenv').config()


async function dbConnect () {
    mongoose.connect(process.env.DB_URL).then(()=> console.log("Successfully connected"))
    .catch((error) => {
        console.log("Unable to connect to MongoDB Atlas!");
        console.error(error);
      });
}

module.exports = dbConnect

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://sunny1410:wijeTXb1jAdGuKRW@testdatabase.bzj6wif.mongodb.net/?retryWrites=true&w=majority";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function dbConnect() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// //run().catch(console.dir);
// module.exports = dbConnect


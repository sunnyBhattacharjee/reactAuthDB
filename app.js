const express = require("express");
const jwt = require("jsonwebtoken")
const brcypt = require("bcryptjs");
const app = express();
const bodyParser = require('body-parser');
const dbConnect = require("./db/dbconnect")
const User = require("./db/userModel") 

// body parser configuration
app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

dbConnect()

app.post('/register',(request,response) => {
  brcypt.hash(request.body.password,10).then((hashedPassword)=>{
    const user = new User({
      email: request.body.email,
      password: hashedPassword,
    });

    user.save().then((result)=>{
      response.status(201).send({
        message:"user created Successfully",
        result
      })
    })
    .catch((e)=> {
      response.status(500).send({
        message:"Error in User Creation",
        error
      })
    })
  })
  .catch((e)=> {
    response.status(500).send({
      message: "Password was not hashed successfully",
      e,
    });
  })
})


app.post('/login',(request,response)=> {
  User.findOne({email: request.body.email}).then((user) => {
    brcypt.compare(request.body.password,user.password).then(res => {
      if(!res){
        return response.status(400).send({
          message: "Passwords does not match",
        });
      }

      const token = jwt.sign(
        {
          userId : user._id,
          userEmail:user.email
        },
        "RANDOM-TOKEN",
        {expiresIn : "12h"}
      )

      response.status(200).send({
        message: "Login Successful",
        email: user.email,
        token
      })

    })
  })
  .catch((error)=> {
      response.status(404).send({
        message:"Email not found",
        error
      })
   })
})

module.exports = app;

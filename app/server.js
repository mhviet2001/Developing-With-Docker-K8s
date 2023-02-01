let express = require('express');
let path = require('path');
let fs = require('fs');
let MongoClient = require('mongodb').MongoClient;
let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/profile-picture', function (req, res) {
  res.sendFile(path.join(__dirname, "images/profile.jpg"));
});

let mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017";
let mongoClientOptions = { useUnifiedTopology: true, useNewUrlParser: true }
let databaseName = process.env.DATABASE_NAME || "my-db";

app.post('/update-profile', async function (req, res) {
  let userObj = req.body;

  try {
    let client = await MongoClient.connect(mongoUrl, mongoClientOptions);
    let db = client.db(databaseName);

    userObj['userid'] = 1;

    let myquery = { userid: 1 };
    let newvalues = { $set: userObj };

    await db.collection("users").updateOne(myquery, newvalues, { upsert: true });

    client.close();

    res.send(userObj);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to update profile' });
  }
});

app.get('/get-profile', async function (req, res) {
  try {
    let client = await MongoClient.connect(mongoUrl, mongoClientOptions);
    let db = client.db(databaseName);

    let myquery = { userid: 1 };
    let result = await db.collection("users").findOne(myquery);

    client.close();

    res.send(result || {});
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to retrieve profile' });
  }
});

app.listen(3000, function () {
  console.log("App listening on port 3000!");
});


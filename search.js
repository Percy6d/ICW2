const express = require('express');
const app = express();


const MongoClient = require('mongodb').MongoClient;

let db;

MongoClient.connect('mongodb+srv://Percy6d:josh1998@cluster0.jgsse7p.mongodb.net', (err, client) => {   
     db = client.db('Petstore')
})

app.param('collectionName', (req, res, next, collectionName) => {
    req.collection = db.collection(collectionName)

    return next()
})

// Define a route that handles the search request
app.get("/collection/:collectionName/search", (req, res) => {
  const { query } = req.query;

  // Perform a search based on the query
  const results = performSearch(query);

  // Return the results as a JSON response
  res.json(results);
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// A sample search function that returns some dummy results
function performSearch(query) {
  const items = [
    'subject',
    'location',
    'price',
    'imgURL',
    'space',
    'lessonID',
    'Math',
    'Physics',
    'Chemistry',
    'English',
    'History',
    'London',
    'Munich',
    'Paris',
    'Rome',
    "./math.png",
    "./physics.png",
    "./chemistry.png",
    "./english.png",
    "./history.png"

  ];

  return items.filter(item => item.toLowerCase().includes(query));
}

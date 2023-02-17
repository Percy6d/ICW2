const express = require('express');
const app = express();
// const MongoClient = require('mongodb').MongoClient;

app.use(express.json())
app.set('port', 3000)
app.use ((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

const MongoClient = require('mongodb').MongoClient;

let db;

MongoClient.connect('mongodb+srv://Percy6d:josh1998@cluster0.jgsse7p.mongodb.net', (err, client) => {   
     db = client.db('Petstore')
})


app.get("/", (req, res, next) => {
    res.send('Select a collection, e.g /collection/images')
})

app.param('collectionName', (req, res, next, collectionName) => {
    req.collection = db.collection(collectionName)

    return next()
})

// retrieve all the objects from an collection
app.get('/collection/:collectionName', (req, res, next) => {
    req.collection.find({}).toArray((e, results) => {
        if (e) return next(e)
        res.send(results)
    })
})

// adding post
app.post('/collection/:collectionName', (req, res, next) => {  
    req.collection.insertOne(req.body, (e, results) => {
        if (e) return next(e)    
        res.send(results.ops)  
    })
})

// return with object id

const ObjectID = require('mongodb').ObjectId;

app.get('/collection/:collectionName/:id', (req, res, next) => {
    req.collection.findOne({_id: new ObjectID(req.params.id) }, (e, result) => {
        if (e) return next(e)
        res.send(result)
    })
})

//update an object

app.put('/collection/:collectionName/:id', (req, res, next) => {
    req.collection.updateOne(
        {_id: new ObjectID(req.params.id)},
        {$set: req.body},
        {safe: true, multi: false},
        (e, result) => {
            if (e) return next(e)
            res.send((result) ? {msg: 'success'} : {msg: 'error'})
        })
})

// delete an object

// app.delete('/collection/:collectionName/:id', (req, res, next) => {  
//     req.collection.deleteOne(    
//         {_id: ObjectID(req.params.id)}, 
//         (e, result) => {
//             if (e) return next(e)       
//             res.send((result) ? {msg: 'success'} : {msg: 'error'})  
//         })
// })

// const lessons = require('./lesson.js');

// app.get("/lesson", (req, res) => {
//   console.log(lessons);
//   res.json(lessons);
// });
  
// // POST Route to save new order
// app.post("/order", (req, res) => {
//   const newOrder = req.body;
//   orders.push(newOrder);
//   res.json(orders);
// });
  
//   // PUT Route to update number of available spaces in lesson
//   app.put("/lesson/:subject/:location", (req, res) => {
//     const { subject, location } = req.params;
//     const updatedLesson = lessons.find(
//       lesson => lesson.subject === subject && lesson.location === location
//     );
  
//     if (updatedLesson) {
//       updatedLesson.availableSpaces -= 1;
//       res.json(updatedLesson);
//     } else {
//       res.status(404).send("Lesson not found");
//     }
//   });
// app.get('/search', (req, res) => {
//     const query = req.query.q; 
    
//     // perform the search using MongoDB
//     const searchResults = lessons.filter((lessons) =>
//   lessons.id.toLowerCase().includes(query.toLowerCase())
// );

// res.json(searchResults);
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
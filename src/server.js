const express = require('express');
const app = express();
const cors = require('cors');
const path = require("path");
const bodyParser = require("body-parser");

// use static image file middleware
var imagePath = path.resolve(__dirname, "images");
app.use("/image", express.static(imagePath));

app.use((req, res, next) => {
  const error = new Error("File not found");
  error.status = 404;
  next();
});

// use Logger middleware
app.use(function (req, res, next) {
  console.log("Request URL: " + req.url);
  console.log("Request date: " + new Date());
  return next();
});

app.use(cors())

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

app.put("/lesson/:id", (req, res) => {
    lessonCollection
      .findOneAndUpdate(
        { id: req.params._id },
        {
          $set: {
            subject: req.body.subject,
            price: req.body.price,
            location: req.body.location,
            space: req.body.space,
            imgURL: req.body.imgURL,
          },
        },
        {
          upsert: true,
        }
      )
      .then((result) => res.json("Success"))
      .catch((error) => console.error(error));
  });

// Search Function
app.get("/search", (req, res) => {
    let search_keyword = req.query.search;
    req.lessonCollection.find({}).toArray((err, results) => {
      if (err) return next(err);
      let filteredList = results.filter((subject) => {
        return (
          subject.subjectname
            .toLowerCase()
            .match(search_keyword.toLowerCase()) ||
          subject.location.toLowerCase().match(search_keyword.toLowerCase())
        );
      });
      res.send(filteredList);
    });
  });

// app.use(express.json({ limit:'1mb' }));

// app.post('/collection/:collectionName', (req, res, next) => {  
//     req.collection.insertOne(req.body, (e, results) => {
//         if (e) return next(e)    
//         res.send(results.ops)  
//     })
// })
// const options = {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
// };
// fetch('/api', options);



// delete an object

// app.delete('/collection/:collectionName/:id', (req, res, next) => {  
//     req.collection.deleteOne(    
//         {_id: ObjectID(req.params.id)}, 
//         (e, result) => {
//             if (e) return next(e)       
//             res.send((result) ? {msg: 'success'} : {msg: 'error'})  
//         })
// })


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
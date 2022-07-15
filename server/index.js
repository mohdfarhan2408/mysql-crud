const express = require('express');
const bodyParser = require('body-parser');
const cors =require('cors');
const mysql = require('mysql2'); //npm i mysql2 instead of mysql.
const app = express();


//connect to database:
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'khan1998',
    database: 'crud-mysql'
});

//USE
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


//GET: (client get data from backend)
app.get('/view', (req,res) => {

    const sqlGet = "SELECT * FROM movie_reviews; "

    db.query(sqlGet, (err,result) => {
        res.json(result)
    });
})


//POST (send data to backend):
app.post('/insert', (req,res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    
    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";
    db.query(sqlInsert, [movieName, movieReview] , (err, result) => {
        console.log(err)
    });
})


//PUT (update data):
app.put('/update/id', (req,res) => {
    // const name = req.body.movieName;
    const id = req.params.id;
    const review = req.body.movieReview;

    // const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ? ";
    const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE id = ? ";

    db.query(sqlUpdate, [review, id] , (err, result) => {
        if (err) console.log(err);
    })
    
})

//DELETE (re,move movie)
app.delete('/remove/:id', (req,res) => {
    // const name = req.params.movieName; (if want to delete by movieName)
    const id = req.params.id;

    // const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?" (if want to delete by movieName)
    const sqlDelete = "DELETE FROM movie_reviews WHERE id = ?"

    db.query(sqlDelete, id, (err, result) => {
        if (err) console.log(err);
    })
})


app.listen(3000, () => console.log('server run'));
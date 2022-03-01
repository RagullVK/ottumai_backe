const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');


app.use(cors());
app.use(express.json());

//Creating Connections
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'ottumai',
})

//Connect to db
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected")
})

//Add Event
app.post('/create', (req, res) =>{
    const community = req.body.community;
    const title = req.body.title;
    const cost = req.body.cost;
    const date = req.body.date;
    const addi1 = req.body.addi1;
    const addi2 = req.body.addi2;
    const pobox = req.body.pobox;
    const link = req.body.link;

    db.query(
        "INSERT INTO booking (community, title, cost, date, addi1, addi2, pobox, link) VALUES (?,?,?,?,?,?,?,?)",
        [community, title, cost, date, addi1, addi2, pobox, link],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else{
                res.send('Info Stored');
            }
        }
    );
});

// Get Events
app.get('/events', (req, res) => {
    db.query("SELECT * FROM booking", (err, result) => {
        if (err) {
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})

//Delete Event
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM booking WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

///////////Tracking

//Add Tracking Data
app.post('/createtracking', (req, res) =>{
   const title2 = req.body.title2;
  
    db.query(
        "INSERT INTO tracking (title2) VALUES (?)",
        [title2],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else{
                res.send('Info Stored');
            }
        }
    );
});


//Get Tracking Data
app.get('/tracking', (req, res) => {
    db.query("SELECT * FROM tracking", (err, result) => {
        if (err) {
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})

//Delete Tracking
app.delete("/deletetracking/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM tracking WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

//Edit Tracking

app.put("/updatetracking", (req, res) => {
    const id = req.body.id;
    const wage = req.body.wage;
    db.query(
      "UPDATE employees SET wage = ? WHERE id = ?",
      [wage, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });

app.listen(3001, () => {
    console.log('Server Running')
})
const path = require("path");
const router = require('express').Router();
const DB = require("../db/db.json");
var notes = [];
var createdNote;
//this var will be used later to capture the id of any post we want to delete
var iD ;

//route for posting new data into database
router.post('/notes', (req,res) => {
    console.info(`${req.method} request received to add a note`);

     createdNote = req.body; 
     notes = JSON.parse(fs.readFileSync(DB, "utf8"));
     //randomizing the id
     createdNote.id= Math.floor((1 + Math.random()) * 0x10000 ).toString(10).substring(1);

     notes.push(createdNote);
     fs.writeFileSync(DB, JSON.stringify(notes)); 
    res.json(notes);

    });

//route for deleting data from the DB
router.delete('/notes/:id', (req, res) => {
        console.info(`${req.method} request received.`);
    
        notes = JSON.parse(fs.readFileSync(DB, "utf8"));
        //capturing ID for percise execution
        iD = (req.params.id).toString();
    
    
        notes = notes.filter(selected =>{
            return selected.id != iD;
        })
    
        //Writing the new DB
        //deleted post will be off the DB
        fs.writeFileSync(DB, JSON.stringify(noteList));
        res.json(notes);
    });

//route for returning all the notes
router.get('/notes', (req,res) => {
        res.sendFile(path.join(__dirname, DB));
        });



module.exports= router;
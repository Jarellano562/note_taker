//==============================================================
//NEED TO ADD OUR DEPENDENCIES 
//const dbnotes = require('./Develop/db/db.json');

const dbnote = require ('./Develop/db/db.json')
const express = require("express");

const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3004; 

//==============================================================
//DATE PARSING 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("Develop"));

//===============================================================
//ROUTES FOR EACH PAGE 


//==========================INDEX PAGE===========================
// app.get("/", function (req, res) {
//     res.sendFile(path.join(__dirname, "public/index.html"));
// });

//==========================NOTES PAGE============================
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/note.html"));
});

app.get("api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/note.html"))
    res.json(req.query);
});

//==========================DB PAGE===============================
app.get("/api/notes", function (req, res) {
    res.json(dbnotes);
});

//=================================================================
//ADDING NEW NOTE WITH MESSAGE THAT IS SENT TO THE DB PAGE 

app.post('/api/notes', (req, res) => {
    console.log(res.body);
    // req.body is where our incoming content will be
    req.body.id = dbnotes.length.toString();
    const note = req.body;
    dbnotes.push(note);

    fs.writeFileSync(
        path.join(__dirname, '.Develop/db/db.json'),
        JSON.stringify(dbnotes, null, 2)
    );
    res.json(note);
});


//=================================================================
//BONUS DELETE NOTE

app.delete('/api/notes/:id', (req, res) => {
    dbnotes.filter(dbnotes => dbnotes.id != req.params.id);
    fs.writeFileSync(
        path.join(__dirname, '.Develop/db/db.json'),
        JSON.stringify(dbnotes.filter(dbnote => dbnote.id != req.params.id), null, 2)
    );
    res.send('Note being deleted');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'));
});

//=================================================================
//LISTENER
app.listen(PORT, function () {
    console.log(`🌎 App listening on PORT + ${PORT}`);
});
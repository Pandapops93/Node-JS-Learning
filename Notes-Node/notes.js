
const fs = require("fs");

// console.log(module);

module.exports = {
    addNote: function (title, body) {
        var notes = this.fetchNotes();
        var note = {
            title,
            body
        };
        var duplicateNotes = notes.filter((note) => note.title === title);

        if (duplicateNotes.length === 0) {
            notes.push(note);
            this.saveNotes(notes);
            return note;
        }
    },
    getAll: function () {
        return this.fetchNotes();
    },
    getNote: function(title){
        var allNotes = this.fetchNotes();
        return allNotes.filter((note)=> note.title === title)[0];
    },
    removeNote: function (title) {

        var orginalLength = this.fetchNotes().length

        var allNotes = this.fetchNotes().filter((ni) => ni.title != title);

        this.saveNotes(allNotes);
        return orginalLength != allNotes.length;
 
    },
    fetchNotes: function () {
        try {
            var s_notes = fs.readFileSync("./Data/notes-data.json");
            return JSON.parse(s_notes);
        }
        catch (err) {
            console.log("error reading note");
            return [];
        }

    },
    saveNotes: (notesArr) => {
        fs.writeFileSync("./Data/notes-data.json", JSON.stringify(notesArr));
    },
    logNote: (note)=>{
        if(note)
            console.log(`got note \nTitle: ${note.title}\nBody: ${note.body}`);
        else{
            console.log("note not found");
        }
    }





}
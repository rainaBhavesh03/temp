const mongoose = require("mongoose");

const Student = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    roll_no : {
        type : String,
        required : true,
        unique : true,
    },
    wad_marks : {
        type : String,
        required : true,
    },
    cc_marks : {
        type : String,
        required : true,
    },
    dsbda_marks : {
        type : Number,
        required : true,
    },
    cns_marks : {
        type : Number,
        required : true,
    },
    ai_marks : {
        type : Number,
        required : true,
    },

})

const Stud = mongoose.model("student", Student);

module.exports = Stud;
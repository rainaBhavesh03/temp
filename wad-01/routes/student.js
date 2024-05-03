const express = require("express");
const router = express.Router();
const Student = require("../models/student");

router.post("/addmarks", async (req, res) => {
  const data = new Student(req.body);

  data
  .save()
  .then((item)=>{
    console.log("item saved to database");
    res.redirect("/getmarks");
  })
  .catch((err)=>{
    res.status(400).send("unable to save to database");
  });

});

router.get("/getmarks", async (req, res) => {
  
    Student.find({})
    .then((stud)=>{
        res.render("table", { student : stud});
    })
    .catch((err)=>{
        res.json({message : "err"});
    })

});

router.get("/dsbdagreater20", async(req,res)=>{
    Student.find({ dsbda_marks : {$gt : 20}})
    .then((student)=>{
        res.render("table", { student : student});
    })
    .catch((err)=>{
        res.json({
            message : "error"
        });
    });
})

router.get("/allsubjects", async (req,res)=>{
    Student.find({
        wad_marks : {$gt : 25},
        cc_marks : {$gt : 25},
        dsbda_marks : {$gt : 25},
        cns_marks : {$gt : 25},
        ai_marks : {$gt : 25},
    })
    .then((student)=>{
        res.render("table",{
            student : student
        });
    })
    .catch((err)=>{
        res.json({
            "message" : "error"
        })
    })
})

router.get("/lessthan40ccwad", async (req,res)=>{
    Student.find({
        wad_marks : {$lt : 25},
        cc_marks : {$lt : 25}
    })
    .then((student)=>{
        res.render("table", {
            student : student
        })
    })
    .catch((err)=>{
        res.json({
            "error" : err
        })
    })
})

router.get("/delete/:id", async(req,res)=>{
    //console.log(req.params.id);
    Student.findOneAndDelete({
        roll_no : req.params.id
    })
    .then((student)=>{
        console.log("Deleted successfully");
        res.redirect("/getmarks");
    })
    .catch((err)=>{
        res.json({
            "error" : err
        })
    })
})

router.get("/update/:id", async(req,res)=>{
    // var data = await Student.findById({roll_no : req.params.id});

    Student.findOneAndUpdate(
        { roll_no : req.params.id},
        { $set : { cc_marks : 25}},
        { returnOriginal : false}
    )
    .then((student)=>{
        console.log("Updated successfully");
        res.redirect("/getmarks");
    })
    .catch((err)=>{
        res.json({
            "error" : err
        })
    })
})

module.exports = router;

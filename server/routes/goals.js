const router = require("express").Router();
let Goal = require("../models/Goal");

// Create a new goal
router.route("/add").post(async(req,res)=>{
    let goalId = 0;
    const daysPerWeek = Number(req.body.daysPerWeek); 
    const notes = req.body.notes;

    const newGoal =  new Goal({
         daysPerWeek,
         notes
    });

    newGoal.save().then(async() =>{
        const goals = await Goal.find({});
  
        if (goals) {
           goalId = goals[goals.length - 1].userID;
        } 
        res.json({status: "Goal Added", goalId: goalId})
    }).catch((err)=>{
        console.log(err.message); 
    })
})

// Display goals
router.route("/get/:id").get(async (req,res)=> {
    let userID = Number(req.params.id);
    const display = await Goal.findOne({userID : userID})
    .then((display)=>{
        res.status(200).send({status:"Goals fetched", display: display})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with display", error: err.message})
    })
})

// Get a specific goal by ID
router.route("/search/:id").get(async (req, res) => {
    let goalID = req.params.id;
    const getGoal = await Goal.findById(goalID)
    then(() => {
        res.status(200).send({status:"Goal fetched", getGoal: getGoal})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status:"Error with getgoal", error: err.message})
    })
});

// Update goal 
router.route("/update/:id").put(async (req, res) =>{
    let goalID = Number(req.params.id);
    const daysPerWeek = Number(req.body.daysPerWeek);
    const notes = req.body.notes;

    const updateGoal = {
        daysPerWeek,
        notes
    };

    const updateG = await Goal.findOneAndUpdate({userID : goalID} , updateGoal).then((updateG) =>{
        res.status(200).send({status:"Goal updated" , goal:updateG })
    }).catch((err)=>{
        console.log(err);
    })
});

router.route("/delete/:id").delete(async (req, res) => {
    let goalID = req.params.id;
    await Goal.findOneAndDelete({userID : goalID})
    .then(() =>{
        res.status(200).send({status:"Goal deleted"})
    }).catch((errr)=>{
        console.log(errr);
    })
})

router.route("/all-details").get(async (req, res) => {
    const goals = await Goal.find({});
  
    if (goals) {
        console.log(goals);
      res.json(goals);
    } else {
      res.send("No data found");
    }
  });



module.exports = router;

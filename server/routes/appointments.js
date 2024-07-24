const express = require("express")
const router = express.Router();
let Appointment = require("../models/Appointment");
const mongoose = require('mongoose');


//add details to the database
//http://localhost:8070/appointment/add
router.route("/add").post((req,res)=>{

    //get values from frontend
    const patientName = req.body.pname;
    const email = req.body.email;
    const phone = Number(req.body.phone);
    //const nic = req.body.nic;
    const doctorName = req.body.dname;
    const appointmentDate = req.body.date;
    const appointmentTime = req.body.time;


    
    const newAppointment = new Appointment({

        patientName,
        email,
        phone,
        //nic,
        doctorName,
        //appointmentDate,
        appointmentDate: new Date(appointmentDate),
        appointmentTime,
        
    })


    newAppointment.save().then(()=>{
        //execute body
        //jason responce 
        res.json("Appointment Added")  //send a mg to the frontend (Appointment added)
    }).catch((err)=>{
        console.log(err.message);
    
    })

})


//get details from the database 
router.route("/").get((req,res)=>{

    //get all appointments' details from find()
    Appointment.find().then((students)=>{
        res.json(students)
    }).catch((err)=>{
        console.log(err)
    })

})


// //update appointmnet by id
// router.route("/update/:id").put(async (req,rs) =>{
//     //catch backend appointment id
//     let appointmentid = req.params.id;

//     //destructure
//     const {patientName, email, phone, doctorName, appointmentDate, appointmentTime} = req.body;

    
//     const updateAppointment = {
//         patientName,
//         email,
//         phone,
//         //nic,
//         doctorName,
//         appointmentDate,
//         appointmentTime,
        
//     }

    // //update user details
    // const update = await Appointment.findByIdAndUpdate(appointmentid, updateAppointment).then(() =>{
    //     //inform user about updation (responce code with status)
    //     res.status(200).send({status: "Appointment updated",})
    // }).catch((err) => {
    //     console.log(err);
    //     res.status(500).send({status: "Error with updating data", error: err.message});
    // })

    
    //Update user details
    router.put('/update/:id', async (req, res) => {
        try {
          const id = req.params.id;
          const {patientName, email, phone, doctorName, appointmentDate, appointmentTime} = req.body;
      
          if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid Appointment ID' });
          }
      
      
          const updatedAppointment = await Appointment.findByIdAndUpdate(
            id,
            { patientName, email, phone, doctorName, appointmentDate, appointmentTime },
            { new: true }
          );
      
         
          if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
          }
      
          res.json(updatedAppointment);
        } catch (err) {
          console.error(err.message);
          res.status(500).json({ message: 'Server error' });
        }
      });
    


    //Delete appointment
    router.delete("/delete/:id", async (req, res) =>{
        
        try{
        let appointmentid = req.params.id;

        await Appointment.findByIdAndDelete(appointmentid);
            res.status(200).json({status: "Appointment deleted"});
        }catch(err) {
            console.log(err.message);
            res.status(500).json({status: "Error with delete appointment", error: err.message});
        }
    })

    //Get only one appointment details 
    router.route("/get/:id").get(async (req, res) => {
        let appointmentid = req.params.id;
        const appointment = await Appointment.findById(appointmentid).then((appointment)=> {
            res.status(200).json({status: "Appointment fetched", appointment})
        }).catch((err) => {
            console.log(err.message);
            res.status(500).status({status: "Error with get appointment", error: err.message});
        })
    })


  
module.exports = router;

 
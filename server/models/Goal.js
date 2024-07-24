const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const goalSchema = new Schema({
    userID: {
        type: Number,
        unique: true
    },
    daysPerWeek: {
        type: Number,
        required: true
    }, 
    notes: {
      type: String
    }
},);

goalSchema.pre("save", async function (next) {
  if (!this.userID) {
      try {
          const lastGoal = await this.constructor.findOne({}, {}, {
              sort: { userID: -1 }
          });

          if (lastGoal) {
              this.userID = lastGoal.userID + 1;
          } else {
              this.userID = 1;
          }

          next();
      } catch (err) {
          return next(err);
      }
  } else {
      next();
  }
});


const Goal = mongoose.model("goals", goalSchema);

module.exports = Goal;

const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({


    userId:{

        type :String,
        required:true
    },
    childId:{
       type: String,
       required:true
    },

    money:{
        type : Number,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    end : {
        type:String
    },


    date:{
        type:String
    },


    startDate:{
        type:String,
    },


});

const Habit = mongoose.model('Habit',habitSchema);

module.exports = Habit;
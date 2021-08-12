const Habit = require('../models/habits');
const User = require('../models/User');

function parseDate(str) {
    return new Date(str);
}

// homepage controller
module.exports.home = function (req, res) {



    if (req.user.isparent=="Yes"){

    Habit.find({ userId: req.user._id }, function (err, habits) {



        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        var newdate = year + "-" + month + "-" + day;

        let curr = new Date


        if (err) {
            console.log('Error in fetching the habits');
            return;
        }
        return res.render('home', {
            title: "HabitTracker",
            habit_list: habits,
            user: req.user,
            today:newdate
        });
    })
}
else{
    Habit.find({ childId: req.user.name }, function (err, habits) {



        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        var newdate = year + "-" + month + "-" + day;

        let curr = new Date


        if (err) {
            console.log('Error in fetching the habits');
            return;
        }
        return res.render('home', {
            title: "HabitTracker",
            habit_list: habits,
            user: req.user,
            today:newdate
        });
    })

}
}
// controller to create a habit
module.exports.createHabit = function (req, res) {



    console.log(req.body)


    let errors = [];
    User.findOne({ name: req.body.childId }).then(user => {

        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        var newdate = year + "-" + month + "-" + day;
        if(user){
        if (user.isparent =="Yes") {
                errors.push({ msg: 'This user has been registered as parent.' });
                //return res.redirect('back');
                return res.render('home', {
                  errors,
                  habit_list: [],
                  user: req.user,
                  today:newdate
                });
            }
           else{
           user.money=user.money+req.body.money
           user.save()
           }
           }
        else{
        errors.push({ msg: 'No such child exist.' });
        return res.redirect('back');
                         return res.render('home', {
                          errors,
                          habit_list: [],
                          user: req.user,
                          today:newdate
                        });
        }
           })
    //if startDate is not selected by default it is this day
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = year + "-" + month + "-" + day;
  

    

    // var GoalDate = req.body.end;
    Habit.create({
        userId: req.user._id,
        childId: req.body.childId,
        end: req.body.end,
        description: req.body.description,
        //date: Date(),
        startDate: newdate,
        money: req.body.money

    }, function (err, newHabit) {
        if (err) {
            console.log('Error in adding money', err);
            return;
        }

        return res.redirect('back');
        
    });

}



// controller to delete a habit
module.exports.deleteHabit = function (req, res) {
    let id = req.query.id;
    Habit.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log("Error in deleting item");
            return;
        }
        return res.redirect('back');

    });
}


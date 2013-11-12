var fs = require('fs');
// file is included here:
eval(fs.readFileSync('app/scripts/utils.js')+'');
eval(fs.readFileSync('app/scripts/config.js')+'');

var express = require('express'),
    app = express(),
    //if you prefer to set the port via an environment variable, please make sure you update the config.js file
    //port = parseInt(process.env.PORT, 10) || 8080;
    port = parseInt(appConfig.port, 10) || 8080;

var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error);
mongoose.connect('mongodb://localhost:27017/moww');

var MowwMember = null;
var MowwUniqueCounter = null;

db.once('open', function() {
    //schemas and models go here
    var mowwMemberSchema = new mongoose.Schema({
        id: String,
        lastName: String,
        middleName: String,
        firstName: String,
        memberNum: String,
        memberStatus: String,
        rank: String,
        uniformedServiceStatus: String,
        spouse: String,
        dob: String,
        streetAddr: String,
        cityAddr: String,
        stateAddr: String,
        zipAddr: String,
        zip4Addr: String,
        phone: String,
        email: String,
        chapterName: String,
        chapterState: String,
        chapterNumber: String,
        region: String,
        memberSince: String,
        duesExpire: String,
        dateAdded: String
    });
    MowwMember = mongoose.model('member', mowwMemberSchema);
    MowwUniqueCounter = mongoose.model('counter', new mongoose.Schema({_id:String, seq:String}));
});

app.configure(function() {
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/'));
  app.use(app.router);
});

app.get('/api/mowwSearch', function(req, res) {
    MowwMember.find(req.query, function(err, mowwMembers) {
        if (err) return console.error(err);
        res.send(mowwMembers);
    });
});

app.get('/api/mowwDashboard', function(req, res) {
    var dashboard = {};

    var today = new Date();
    var todayStr = dateToString(today);
    var weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() + (weekStart.getDay() == 0 ? -6 : 1));
    var weekStartStr = dateToString(weekStart);
    var monthStart = new Date(today);
    monthStart.setDate(1);
    var monthStartStr = dateToString(monthStart);
    var yearStart = new Date(today);
    yearStart.setDate(1);
    yearStart.setMonth(0);
    var yearStartStr = dateToString(yearStart);

    var monthStart = "";
    var yearStart = "";

    //total members
    MowwMember.find().count(function(err, result) {
        if (err) return console.error(err);
        dashboard.membersTotal = result;
        //members overdue
        MowwMember.find({memberStatus:'Overdue - RM'}).count(function(err, result) {
            if (err) return console.error(err);
            dashboard.membersOverdue = result;
            //members added today
            MowwMember.find({dateAdded:todayStr}).count(function(err, result) {
                if (err) return console.error(err);
                dashboard.membersAddedToday = result;
                //members added this week
                MowwMember.find({dateAdded: {$gte:weekStartStr, $lte:todayStr}}).count(function(err, result) {
                    if (err) return console.error(err);
                    dashboard.membersAddedThisWeek = result;
                    //members added this month
                    MowwMember.find({dateAdded: {$gte:monthStartStr, $lte:todayStr}}).count(function(err, result) {
                        if (err) return console.error(err);
                        dashboard.membersAddedThisMonth = result;
                        //members added this year
                        MowwMember.find({dateAdded: {$gte:yearStartStr, $lte:todayStr}}).count(function(err, result) {
                            if (err) return console.error(err);
                            dashboard.membersAddedThisYear = result;
                            var q = MowwMember.find({dateAdded:todayStr}).limit(3);
                            q.execFind(function(err, result) {
                                if (err) return console.error(err);
                                dashboard.membersNew = result;
                                res.send(dashboard);
                            });
                        });
                    });
                });
            });
        });
    });
});

app.get('/api/mowwMembers', function(req, res) {
    MowwMember.find(function(err, mowwMembers) {
        if (err) return console.error(err);
        res.send(mowwMembers);
    });
});

app.get('/api/mowwMembers/:id', function(req, res) {
    MowwMember.findOne({id:req.params.id}, function(err, mowwMember) {
       if (err) return console.error(err);
       res.send(mowwMember);
    });
});

app.post('/api/mowwMembers/:id', function(req, res) {
    var record = req.body;
    var mowwMember = {};
    delete record._id;
    MowwMember.findOneAndUpdate({id:record.id}, record, function(err, mowwMember) {
        if (err) return console.error(err);
        //console.log(mowwMember);
    });
    res.send(mowwMember);
});

app.post('/api/mowwMembers', function(req, res) {
    var record = req.body;
    delete record._id;

    MowwUniqueCounter.findOneAndUpdate({_id:'mowwMemberId'}, {$inc: {seq: 1}}, function(err, counter) {
        if (err) return console.error(err);

        record.id = counter.seq;

        MowwMember.create(record, function(err, mowwMember) {
            if (err) return console.error(err);
            res.send(mowwMember);
        });
    });
});

app.delete('/api/mowwMembers/:id', function(req, res) {
    var mowwMember = {};
    var id = req.params.id;
    MowwMember.findOneAndRemove({id:id}, function(err, mowwMember) {
        if (err) return console.error(err);
        //delete successful!
    });
    res.send({});
});

app.listen(port);
console.log("Now serving: http://localhost:" + port + '/');
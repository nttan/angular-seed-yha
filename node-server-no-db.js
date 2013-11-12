var fs = require('fs');
eval(fs.readFileSync('app/scripts/utils.js')+'');
eval(fs.readFileSync('app/scripts/config.js')+'');
eval(fs.readFileSync('app/scripts/sampleRecords.js')+'');

var express = require('express'),
    app = express(),
    //if you prefer to set the port via an environment variable, please make sure you update the config.js file
    //port = parseInt(process.env.PORT, 10) || 8080;
    port = parseInt(appConfig.port, 10) || 8080;

app.configure(function() {
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/'));
    app.use(app.router);
});

// see sampleRecords.js for records
//addRows(records, 30);

app.get('/data/yhaSearch', function(req, res) {
    var matchingRecords = [];
    var query = req.query;
    for (var i = 0; i < records.length; i++) {
        var isMatch = true;
        for (var key in query) {
            if (records[i][key] !== query[key]) {
                isMatch = false;
            }
        }
        if (isMatch) {
            matchingRecords.push(records[i]);
        }
    }
    res.send(matchingRecords);
});

app.get('/data/yhaDashboard', function(req, res) {
    var dashboard = {
        recordsTotal: records.length,
        dummyValue: 42
    };

    res.send(dashboard);
});

app.get('/api/yhaRecords', function(req, res) {
    var query = req.query;
    var currentPage = query.currentPage;
    var perPage = query.perPage || 50;

    var end = (currentPage === 1) ? perPage : (currentPage * perPage);
    var start = (currentPage === 1) ? 1 : (end - perPage + 1);

    var pagedResults = [];
    if (records.length === 1) {
        pagedResults = records;
    } else {
        pagedResults = records.slice(start, end);
    }

    res.setHeader("X-Total-Count", records.length);
    res.setHeader("X-Current-Page", currentPage);
    res.setHeader("X-Per-Page", perPage);

    res.send(pagedResults);
});

app.get('/api/yhaRecords/:id', function(req, res) {
    var id = req.params.id;
    var r;
    for (var i = 0; i < records.length; i++) {
        if (records[i].id === id) {
            r = records[i];
            break;
        }
    }
    res.send(r);
});

app.post('/api/yhaRecords/:id', function(req, res) {
    var id = req.params.id;
    var updatedRecord = req.body;
    var r;
    for (var i = 0; i < records.length; i++) {
        if (records[i].id === id) {
            records[i] = updatedRecord;
            r = records[i];
            break;
        }
    }
    res.send(r);
});

app.post('/api/yhaRecords', function(req, res) {
    var record = req.body;
    record.id = (Math.floor(Math.random() * (50000 - 100 + 1)) + 100) + "";
    records.push(record);
    res.send(record);
});

app.delete('/api/yhaRecords/:id', function(req, res) {
    var id = req.params.id;
    for (var i = 0; i < records.length; i++) {
        if (records[i].id === id) {
            records.splice(i, 1);
            break;
        }
    }
    res.send(records);
});

app.get('/api/dropdowns/:id', function(req, res) {
    var dropdown = {};
    for (var i = 0; i < dropdowns.length; i++) {
        if (dropdowns[i].name === req.params.id) {
            dropdown = dropdowns[i];
            break;
        }
    }
    res.send(dropdown);
});

app.get('/data/describeYourself', function(req, res) {
    var introspection = {};
    introspection.record = records[0];
    introspection.dropdowns = dropdowns;
    res.send(introspection);
});

function addRows(records, num) {
    var aRecord = records[0];
    for (var i = 0; i < num; i++) {
        aRecord.id = (Math.floor(Math.random() * (50000 - 100 + 1)) + 100) + "";
        records.push(aRecord);
    }
}

app.listen(port);
console.log("Now serving: http://localhost:" + port + '/');
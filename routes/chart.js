var express = require('express');
var router = express.Router();

//Include the exporter module
const exporter = require('highcharts-export-server');

//Set up a pool of PhantomJS workers
exporter.initPool();

/* GET users listing. */
router.post('/', function (req, res, next) {
    //Perform an export
    /*
        Export settings corresponds to the available CLI arguments described
        above.
    */
    var exportSettings = req.body;
    exporter.export(exportSettings, function (err, result) {
        //The export result is now in res.
        //If the output is not PDF or SVG, it will be base64 encoded (res.data).
        //If the output is a PDF or SVG, it will contain a filename (res.filename).
        res.send(result.data);
    });
});

module.exports = router;
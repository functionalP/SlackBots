/**
 * Created by i854911 on 2/20/17.
 */

var slack_bot = require('./botkit');

module.exports = function(app)  {

    app.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
    });

    app.post('/reject/:id(\\d+)', function(req, res, next)  {
        var notification = {
          message : "Invoice " + req.params.id + " rejected"
        };
        slack_bot.postNotification(notification);
        res.send("Rejected Invoice: " + req.params.id);
    });
};

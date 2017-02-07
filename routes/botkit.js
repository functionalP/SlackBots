/**
 * Created by i854911 on 2/6/17.
 */
const Botkit = require('botkit');
const sessionManager = require('./sessions');

var botkit = {};

// Cheking for the token
if (!process.env.SLACK_BOT_TOKEN) {
    console.error('Error: Specify a Slack token in an environment variable');
    process.exit(1);
}

// Creates the Slack bot
const controller = Botkit.slackbot();

/*var wit = require('botkit-middleware-witai')({
        token: 'ME45SZCOQZIQW2A4W6WV2OYYJSWNZFZK'
});*/

// Starts the websocket connection
controller.spawn({
    token: process.env.SLACK_BOT_TOKEN
}).startRTM(err => {
    if (err) {
        console.error(`Error: Could not start the bot - ${err}`);
    }
});

// controller.middleware.receive.use(wit.receive);

// Listening for the event when the bot joins a channel
controller.on('channel_joined', (bot, { channel: { id, name } }) => {
    bot.say({
    text: `Thank you for inviting me to channel ${name}`,
    channel: id
    });
});

// controller.on('im_open', (bot, message) => {
//     console.log("**im_open***");
//     console.log(message);
// });
//
// controller.on('hello', (bot, message) => {
//     console.log("Got Helloooo");
//     console.log(message);
//     bot.say({
//         text: 'Thank you for inviting me to channel',
//         channel: 'U3ZPENRP1'
//     });
// });

controller.hears(['(.*)'], ['direct_mention', 'direct_message'], (bot, message) => {
    console.log(message);
    //var intent = message.outcomes[0].entities.intent[0].value;
    //console.log(intent);
    // if(intent == "createInvoice")   {
    //     bot.reply(message, " I see that you have 3 Open POs , Do you want me to use one of these to create Invoice.")
    // }
    const sessionId = sessionManager.findOrCreateSession(message.channel, bot);
    botkit._bot = bot;
    var wit = require('./wit');
    wit.handleMessage(message.text, sessionId);
});

module.exports = botkit;

/**
 * Created by i854911 on 2/6/17.
 */
const Botkit = require('botkit');
const actions = require("./acions");

var botkit = {};

// Cheking for the slack token
if (!process.env.SLACK_BOT_TOKEN) {
    console.error('Error: Specify a Slack token in an environment variable');
    process.exit(1);
}

// Cheking for the wit token
if (!process.env.WIT_TOKEN) {
    console.error('Error: Specify a Wit token in an environment variable');
    process.exit(1);
}

var wit = require('botkit-witai')({
    accessToken: process.env.WIT_TOKEN,
    minConfidence: 0.6,
    logLevel: 'debug'
});

// Creates the Slack bot
const controller = Botkit.slackbot();

// Starts the websocket connection
controller.spawn({
    token: process.env.SLACK_BOT_TOKEN
}).startRTM(err => {
    if (err) {
        console.error(`Error: Could not start the bot - ${err}`);
    }
});

controller.middleware.receive.use(wit.receive);

// Listening for the event when the bot joins a channel
controller.on('channel_joined', (bot, { channel: { id, name } }) => {
    bot.say({
    text: `Thank you for inviting me to channel ${name}`,
    channel: id
    });
});

controller.on('im_open', (bot, message) => {
    console.log("**im_open***");
    console.log(message);
});

controller.on('hello', (bot, message) => {
    console.log("Got Helloooo");
    console.log(message);
    bot.say({
        text: 'Thank you for inviting me to channel',
        channel: 'U3ZPENRP1'
    });
});

controller.hears(['(.*)'], 'direct_message,direct_mention,mention', (bot, message) => {
    console.log("*****");
    console.log(message);
    var intent = message.entities.intent[0].value;
    console.log("Intent: " + intent)
    actions[intent](bot, message);
});

module.exports = botkit;

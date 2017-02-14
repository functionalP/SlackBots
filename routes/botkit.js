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

var wit = require('./wit')({
    accessToken: process.env.WIT_TOKEN,
    apiVersion: '20160516',
    minConfidence: 0.6,
    logLevel: 'debug'
});

// Creates the Slack bot
const controller = Botkit.slackbot();

// Starts the websocket connection
var slack_bot = controller.spawn({
    token: process.env.SLACK_BOT_TOKEN,
    incoming_webhook: {
        url : process.env.INCOMING_WEBHOOK_URL
    }
});

slack_bot.startRTM(err => {
    if (err) {
        console.error(`Error: Could not start the bot - ${err}`);
    }
});

slack_bot.sendWebhook({
    text: 'Welcome! How may I help you?',
}, (err, res) =>    {
    if(err) {
        console.log("Error in posting to incoming webhook");
        return;
    }
    console.log("Posted to Incoming webhook successfully");
    console.log(res);
});

controller.middleware.receive.use(wit.receive);

// Listening for the event when the bot joins a channel
controller.on('channel_joined', (bot, { channel: { id, name } }) => {
    bot.say({
    text: `Thank you for inviting me to channel ${name}`,
    channel: id
    });
});

controller.on('channel_leave', (bot, { channel: { id, name } }) => {
    bot.say({
        text: `Thank you for leaving channel ${name}`,
        channel: id
    });
});

controller.on('im_open', (bot, message) => {
    console.log("**im_open***");
    console.log(message);
});

controller.on('im_close', (bot, message) => {
    console.log("**im_close***");
    console.log(message);
});

controller.on('im_marked', (bot, message) => {
    console.log("**im_marked***");
    console.log(message);
});

controller.hears(['(.*)'], 'direct_message,direct_mention,mention', (bot, message) => {

    console.log(message);

    if(message.entities.intent == undefined) {
        bot.reply(message, "Sorry, I don't understand.");
        return;
    }
    var intent = message.entities.intent[0].value;

    console.log("Intent: " + intent);

    if(actions[intent] == undefined || actions[intent] == null) return;
    actions[intent](bot, message);
});

module.exports = botkit;

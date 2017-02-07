/**
 * Created by i854911 on 2/2/17.
 */
'use strict';
const RtmClient = require('@slack/client').RtmClient;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const MemoryDataStore = require('@slack/client').MemoryDataStore;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;

const bot_token = process.env.SLACK_BOT_TOKEN || '';

console.log("Bot Token: " + bot_token);

var slack = {};

module.exports = slack;

var rtm = new RtmClient(bot_token);

// The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload if you want to cache it
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
    console.log("Logged in as " +  rtmStartData.self.name + " of team " + rtmStartData.team.name + ", but not yet connected to a channel");
});

// you need to wait for the client to fully connect before you can send messages
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
    //var channel = rtm.getChannelByName("general").toString();
    //rtm.sendMessage("Hello!", channel);
    //console.log();
});

rtm.on(RTM_EVENTS.MESSAGE, function(message)  {
    var wit = require('./wit');
    wit.handleMessage(message.channel, message.text);
    console.log("****** RMT Events Message *******");
    console.log(message);
});

rtm.start();

slack.postMessage = function(message, channel)    {
    console.log("Posting message: " + message + ", to slack channel: " + channel);
    rtm.sendMessage(message, channel);
};
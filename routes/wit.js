/*
 Copyright (c) 2016 Ariba, Inc.
 All rights reserved. Patents pending.

 Responsible: i854911 (Harish Kumar)
 */

'use strict';

// Loading Wit module
const Wit = require('node-wit').Wit;
var log = require('node-wit').log;
const sessionManager = require('./sessions');

const wit_client = {};

module.exports = wit_client;

var debug = true;

const WIT_TOKEN = 'ME45SZCOQZIQW2A4W6WV2OYYJSWNZFZK';

const firstEntityValue = (entities, entity) => {
    const val = entities && entities[entity] &&
            Array.isArray(entities[entity]) &&
            entities[entity].length > 0 &&
            entities[entity][0].value
        ;
    if (!val) {
        return null;
    }
    return typeof val === 'object' ? val.value : val;
};

const context = {};

//create user session if it doesn't already exist
const getOrCreateContext = (sessionId) => {
    Object.keys(context).forEach(key => {
       if(sessionId === key)    {
           return context[key];
       }
    });

    context[sessionId] = {};

    return context[sessionId];
};

const actions = {
    send(request, response) {
        const {sessionId, context, entities} = request;
        const {text, quickreplies} = response;

        console.log("***Send called***");
        var session = sessionManager.getSession(sessionId);

        if(context.checkRules)  {
            setTimeout(function()   {
                session.bot.say({
                    text: "Checking buyer rules",
                    channel: session.channel
                });

                setTimeout(function()   {
                    session.bot.say({
                        text: "All buyer Rules checked !",
                        channel: session.channel
                    });

                    setTimeout(function()   {
                        session.bot.say({
                            text: text,
                            channel: session.channel
                        });
                    }, 2000);

                }, 1000);
            }, 10);

            return;
        }
        session.bot.say({
            text: text,
            channel: session.channel
        });
        return new Promise(function(resolve, reject) {
            return resolve();
        });
    },
    createInvoice({context, entities}){
        console.log("Create Invoice Called");

        return new Promise(function(resolve, reject) {
            console.log("So sos");
            context.number_po = '3';

            console.log(context);
            return resolve(context);
        });
    },
    showAllPO({context, entities}){
        console.log("Show All PO Called");

        return new Promise(function(resolve, reject) {

            context.po1 = "PO 12345";
            context.po2 = "PO 23456";
            context.po3 = "PO 34567";

            return resolve(context);
        });
    },
    selectedPO({context, entities}){
        console.log("Select PO Called");

        return new Promise(function(resolve, reject) {
            var po_number = firstEntityValue(entities, 'po_number').toLowerCase();

            context.invoice = po_number;
            context.checkRules = true;

            return resolve(context);
        });
    }
};

// Setting up our bot
const wit = new Wit({
    accessToken: WIT_TOKEN,
    actions,
    logger: new log.Logger(log.INFO)
});

wit_client.handleMessage = function (message, sessionId) {
    if(debug)   {
        console.log('reached handleMessage');
    }

    console.log(sessionId);
    console.log(message);

    var context = getOrCreateContext(sessionId);
    wit.runActions(sessionId, message, context)
        .then((context) => {
            if(debug){console.log("Waiting for next messages");}
            context[sessionId] = context;
        });
};

wit_client.debug = debug;
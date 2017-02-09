// /*
//  Copyright (c) 2016 Ariba, Inc.
//  All rights reserved. Patents pending.
//
//  Responsible: i854911 (Harish Kumar)
//  */
//
// 'use strict';
//
// // Loading Wit module
// const Wit = require('node-wit').Wit;
// var log = require('node-wit').log;
// const sessionManager = require('./sessions');
//
// const wit_client = {};
//
// module.exports = wit_client;
//
// var debug = true;
//
// const WIT_TOKEN = 'ME45SZCOQZIQW2A4W6WV2OYYJSWNZFZK';
//
// const firstEntityValue = (entities, entity) => {
//     const val = entities && entities[entity] &&
//             Array.isArray(entities[entity]) &&
//             entities[entity].length > 0 &&
//             entities[entity][0].value
//         ;
//     if (!val) {
//         return null;
//     }
//     return typeof val === 'object' ? val.value : val;
// };
//
// const context = {};
//
// //create user session if it doesn't already exist
// const getOrCreateContext = (sessionId) => {
//     Object.keys(context).forEach(key => {
//        if(sessionId === key)    {
//            return context[key];
//        }
//     });
//
//     context[sessionId] = {};
//
//     return context[sessionId];
// };
//
// const actions = {
//     send(request, response) {
//         const {sessionId, context, entities} = request;
//         const {text, quickreplies} = response;
//
//         console.log("***Send called***");
//         var session = sessionManager.getSession(sessionId);
//
//         if(context.checkRules)  {
//             setTimeout(function()   {
//                 session.bot.say({
//                     text: "Checking buyer rules",
//                     channel: session.channel
//                 });
//
//                 setTimeout(function()   {
//                     session.bot.say({
//                         text: "All buyer Rules checked !",
//                         channel: session.channel
//                     });
//
//                     setTimeout(function()   {
//                         session.bot.say({
//                             text: text,
//                             channel: session.channel
//                         });
//                     }, 2000);
//
//                 }, 1000);
//             }, 10);
//
//             return;
//         }
//         session.bot.say({
//             text: text,
//             channel: session.channel
//         });
//         return new Promise(function(resolve, reject) {
//             return resolve();
//         });
//     },
//     createInvoice({context, entities}){
//         console.log("Create Invoice Called");
//
//         return new Promise(function(resolve, reject) {
//             console.log("So sos");
//             context.number_po = '3';
//
//             console.log(context);
//             return resolve(context);
//         });
//     },
//     showAllPO({context, entities}){
//         console.log("Show All PO Called");
//
//         return new Promise(function(resolve, reject) {
//
//             context.po1 = "PO 12345";
//             context.po2 = "PO 23456";
//             context.po3 = "PO 34567";
//
//             return resolve(context);
//         });
//     },
//     selectedPO({context, entities}){
//         console.log("Select PO Called");
//
//         return new Promise(function(resolve, reject) {
//             var po_number = firstEntityValue(entities, 'po_number').toLowerCase();
//
//             context.invoice = po_number;
//             context.checkRules = true;
//
//             return resolve(context);
//         });
//     }
// };
//
// // Setting up our bot
// const wit = new Wit({
//     accessToken: WIT_TOKEN,
//     apiVersion: "20160516",
//     actions,
//     logger: new log.Logger(log.INFO)
// });
//
// wit_client.handleMessage = function (message, sessionId) {
//     if(debug)   {
//         console.log('reached handleMessage');
//     }
//
//     console.log(sessionId);
//     console.log(message);
//
//     var context = getOrCreateContext(sessionId);
//     wit.runActions(sessionId, message, context)
//         .then((context) => {
//             if(debug){console.log("Waiting for next messages");}
//             context[sessionId] = context;
//         });
// };
//
// wit_client.debug = debug;

// var Wit = require('node-wit').Wit;
//
// // not used at the moment
// var actions = {
//     say: function(sessionId, context, message, cb) {
//         console.log(message);
//         cb();
//     },
//     merge: function(sessionId, context, entities, message, cb) {
//         cb(context);
//     },
//     error: function(sessionId, context, error) {
//         console.log(error.message);
//     }
// };
//
// module.exports = function(config) {
//
//     if (!config || !config.token) {
//         throw new Error('No wit.ai API token specified');
//     }
//
//     if (!config.minimum_confidence) {
//         config.minimum_confidence = 0.5;
//     }
//
//     var client = new Wit(config.token, actions);
//
//     var middleware = {};
//
//     middleware.receive = function(bot, message, next) {
//         // Only parse messages of type text and mention the bot.
//         // Otherwise it would send every single message to wit (probably don't want that).
//         if (message.text && message.text.indexOf(bot.identity.id) > -1) {
//             client.message(message.text, function(error, data) {
//                 if (error) {
//                     next(error);
//                 } else {
//                     message.entities = data.entities;
//                     next();
//                 }
//             });
//         } else if (message.attachments) {
//             message.intents = [];
//             next();
//         } else {
//             next();
//         }
//     };
//
//     middleware.hears = function(tests, message) {
//         if (message.entities && message.entities.intent) {
//             for (var i = 0; i < message.entities.intent.length; i++) {
//                 for (var t = 0; t < tests.length; t++) {
//                     if (message.entities.intent[i].value == tests[t] &&
//                         message.entities.intent[i].confidence >= config.minimum_confidence) {
//                         return true;
//                     }
//                 }
//             }
//         }
//
//         return false;
//     };
//
//     return middleware;
// };
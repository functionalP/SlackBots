/**
 * Created by i855845 on 2/13/17.
 */

var context="";
module.exports = {
    // notifyIssue:  function(bot, message)   {
    //     console.log("Inside notifyIssue");
    //     bot.reply(message, "Invoice 4711 rejected")
    // },
    recommend:  function(bot, message)  {
        console.log("Inside recommend");
        context="help";
        bot.reply(message, messageBuilderRecommend(), function(response)    {
            console.log(response);
            bot.reply(message, "Do you want to update this information?");
        });
        //bot.reply(message, "You invoiced 100 items but the buyer received only 50 units. On 10/03/2017, buyer’s `GRN 3242424` indicates 50 units were rejected for quality issues. https://peaceful-springs-59601.herokuapp.com/Quantity|Receipt Summary. Do you want me to update this information ?");
        // setTimeout(function() {
        // },3000);

    },
    Ok:  function(bot, message)   {
        console.log("Inside yes");
        if(context=="help") {
            bot.reply(message,messageBuilderSubmit());
        }
        // else if(context=="update_quantity"){
        //     context="adjust_tax";
        //     bot.reply(message,messageBuilderTax());
        // }
        // else if(context=="adjust_tax"){
        //     bot.reply(message,messageBuilderSubmit());
        // }dlk
    },
    yes:  function(bot, message) {
        console.log("Inside yes");
        if (context == "help") {
            bot.reply(message, messageBuilderSubmit());
        }
    },
    show_receipt:  function(bot, message)   {
        console.log("Inside show_receipt");
        context="update_quantity";
        bot.reply(message,messageBuilderReceipt());
    },
    submitInvoice: function(bot, message)  {
        console.log("Inside submitInvoice ");

        setTimeout(function()   {
            bot.reply(message, "• Prices :white_check_mark:");
            setTimeout(function()   {
                bot.reply(message, "• Quantities :white_check_mark:");
                setTimeout(function()   {
                    bot.reply(message, "70% chance of invoice being approved.");
                    setTimeout(function()   {
                        bot.reply(message, messageBuilderImproveChance());
                        // console.log("printing message-----")
                        // console.log(message);
                        // message.text="90% chance of invoice being approved.";
                    }, 2000);
                }, 1000);
            }, 200);
        }, 100);
    },
    acceptRecommend:function (bot,message) {
        console.log("Inside acceptRecommend");
        bot.reply(message,"Invoice 5711 is created.")
    },
    current_payment_info:  function(bot, message)   {
        console.log("Inside current_payment_info");
        bot.reply(message,"If you are approved today, you are scheduled to get paid $2,000 by April 30th, 2017");
    },
    get_payments:  function(bot, message)   {
        console.log("Inside current_payment_info");
        bot.reply(message,messageBuilderPaymentImage());
    }
};

function messageBuilderRecommend() {
    var jsonObj = {
        "text": "You invoiced 100 items but the buyer received only 50 units. On 03/10/2017, buyer’s `GRN 3242424` indicates 50 units were rejected for quality issues.",
        "attachments": [
            {
                "text":"Receipt summary",
                "image_url": "https://peaceful-springs-59601.herokuapp.com/Quantity",
                "color": "#3AA3E3"
            }
        ]
    };
    return jsonObj;
}

function messageBuilderImproveChance() {
    var jsonObj = {
        "text":"Recommendations to improve the chances of approval to 90%",
        "attachments": [
            {
                "text":"• Update the billing address to 3420 Hillview Ave, Palo Alto, CA 94304",
                "fallback": "You are unable to choose",
                "callback_id": "wopr_game",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {
                        "name": "Accept",
                        "text": "Accept",
                        "style": "primary",
                        "type": "button",
                        "value": "Accept"
                    },
                    {
                        "name": "NoThanks",
                        "text": "No, Thanks",
                        "style": "danger",
                        "type": "button",
                        "value": "Decline"
                    }
                ]
            }
        ]
    };
    return jsonObj;
}

function messageBuilderSubmit() {
    console.log("-----messageBuilder Called----")
    var jsonObj = {
        "text": "Great! Do you want to update any other information before submitting the invoice?",
        "attachments": [
            {
                // "text": "Choose a PO to create invoice",
                "fallback": "You are unable to choose",
                "callback_id": "wopr_game",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {
                        "name": "Update more",
                        "text": "Update more",
                        // "style": "primary",
                        "type": "button",
                        "value": "Update more"
                    },
                    {
                        "name": "Submit",
                        "text": "Submit",
                        "style": "primary",
                        "type": "button",
                        "value": "Submit"
                    }
                ]
            }
        ]
    };
    return jsonObj;
}

function messageBuilderReceipt() {
    console.log("-----messageBuilder Called----")
    var jsonObj = {
        "text": "only one goods receipt found.",
        "attachments": [
            {
                "text": "Do you want to update this information?",
                "fallback": "You are unable to choose",
                "callback_id": "wopr_game",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {
                        "name": "Yes",
                        "text": "Yes",
                        "style": "primary",
                        "type": "button",
                        "value": "Yes"
                    },
                    {
                        "name": "No",
                        "text": "No",
                        "style": "danger",
                        "type": "button",
                        "value": "No"
                    }
                ]
            }
        ]
    };
    return jsonObj;
}

function messageBuilderPaymentImage() {
    console.log("-----messageBuilderPaymentImage Called----")
    var jsonObj = {
        "attachments": [
            {
                "text": "Payment schedule",
                "image_url": "https://peaceful-springs-59601.herokuapp.com/PaymentSchedule",
                "color": "#3AA3E3"
            }
        ]
    };
    return jsonObj;
}
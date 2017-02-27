/**
 * Created by i855845 on 2/13/17.
 */

var context="";

module.exports = {
    recommend:  function(bot, message)  {
        console.log("Inside recommend");
        context="UnitsUpdate";
        bot.reply(message, messageBuilderRecommend(), function(response)    {
            console.log(response);
            bot.reply(message, "Do you want to update this information and re-submit the invoice?");
        });
    },
    Ok: function(bot, message)   {
        console.log("Inside Ok");
        if(context == "AddressUpdate")   {
            var invoice = parseInt(global.invoice) + Math.floor((Math.random() * 100) + 1);
            var msg = "Invoice " + invoice + " is created.";
            bot.reply(message,msg);
            context="InvoiceCreated";
        } else if (context == "UnitsUpdate")    {
            submitInvoice(bot, message);
        }else   {
            bot.reply(message, "Sorry, I don't understand");
        }
    },
    show_receipt:  function(bot, message)   {
        console.log("Inside show_receipt");
        context="update_quantity";
        bot.reply(message,messageBuilderReceipt());
    },
    submitInvoice: function(bot, message)  {
        console.log("Inside submitInvoice ");
        if(context == "AddressUpdate")   {
            var invoice = parseInt(global.invoice) + Math.floor((Math.random() * 100) + 1);
            var msg = "Invoice " + invoice + " is created.";
            bot.reply(message,msg);
            context="InvoiceCreated";
        } else if (context == "UnitsUpdate")    {
            submitInvoice(bot, message);
        } else   {
            bot.reply(message, "Sorry, I don't understand");
        }
    },
    // acceptRecommend:function (bot,message) {
    //     console.log("Inside acceptRecommend");
    //     var invoice = parseInt(global.invoice) + Math.floor((Math.random() * 100) + 1);
    //     var msg = "Invoice " + invoice + " is created.";
    //     bot.reply(message,msg);
    // },
    current_payment_info:  function(bot, message)   {
        console.log("Inside current_payment_info");
        context="CurrentPaymentInfo";
        bot.reply(message,"If you are approved today, you are scheduled to get paid $2,000 by April 30th, 2017");
    },
    get_payments:  function(bot, message)   {
        console.log("Inside current_payment_info");
        context="RemainingPaymentInfo"
            bot.reply(message,messageBuilderPaymentImage(), function(){
            bot.reply(message, "Is there anything else that I can help with ?");
        });
    },
    final_regards: function(bot, message)   {
        console.log("Final Regards.");
    }
};

function messageBuilderRecommend() {
    var jsonObj = {
        "text": "You invoiced 100 items even though buyer has rejected 50 units for `GRN 3242424`.",
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

function submitInvoice(bot, message) {
    context="AddressUpdate";
    bot.reply(message, "• Prices :white_check_mark:");
    setTimeout(function () {
        bot.reply(message, "• Quantities :white_check_mark: \n • Other rules :white_check_mark:");
        setTimeout(function () {
            bot.reply(message, "80% chance of invoice being approved.");
            setTimeout(function () {
                bot.reply(message, messageBuilderImproveChance());
                // console.log("printing message-----")
                // console.log(message);
                // message.text="90% chance of invoice being approved.";
            }, 2000);
        }, 1000);
    }, 500);
}

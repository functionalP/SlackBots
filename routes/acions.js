/**
 * Created by i854911 on 2/9/17.
 */

module.exports = {
    createInvoice:  function(bot, message)   {
        console.log("Inside createInvoice");
        bot.reply(message, "I see that you have 3 Open POs , Do you want me to use one of these to create Invoice.")
    },
    showAllPO:  function(bot, message)  {
        console.log("Inside showAllPO");
        bot.reply(message, messageBuilderPO());
    },
    selectedPO: function(bot, message)  {
        console.log("Inside selectedPO ");

        var po_number = message.entities.po_number[0];
        console.log(po_number.value);

        setTimeout(function()   {
            bot.reply(message, "Checking buyer rules");

            setTimeout(function()   {
                bot.reply(message, "All buyer Rules checked !")
                setTimeout(function()   {
                    bot.reply(message, messageCreatedInvoice(po_number.value));
                }, 2000);

            }, 1000);
        }, 10);
    }
};

function messageBuilderPO() {
    console.log("-----messageBuilder Called----")
    var po=["PO 12345","PO 23456", "PO 67892"]
    var jsonObj = {
        "text": "List of available PO:",
        "attachments": [
            {
                "text": "Choose a PO to create invoice",
                "fallback": "You are unable to choose a PO",
                "callback_id": "wopr_game",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {
                        "name": "PO",
                        "text": po[0],
                        "type": "button",
                        "value": po[0]
                    },
                    {
                        "name": "PO",
                        "text": po[1],
                        "type": "button",
                        "value": po[1]
                    },
                    {
                        "name": "PO",
                        "text": po[2],
                        "type": "button",
                        "value": po[2]
                    }
                ]
            }
        ]
    };
    return jsonObj;
}

function messageCreatedInvoice(number) {
    var jsonObj = {
        "text": "Invoice #" + number + " has been created for you, Is there anything else you need help with today ?",
        "attachments": [
            {
                "text": "Invoice created",
                "image_url": "https://peaceful-springs-59601.herokuapp.com/",
                "color": "#764FA5"
            }
        ]
    };
    return jsonObj;
}
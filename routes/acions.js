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
        bot.reply(message, "List of available PO:");
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
                    bot.reply(message, "Invoice #" + po_number.value + " has been created for you, Is there anything else you need help with today ?");
                }, 2000);

            }, 1000);
        }, 10);
    }
};

const Discord = require("discord.js");
var fs = require('fs');
const client = new Discord.Client();
const config = require("./config.json");
client.on("ready", () => {
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildCreate", guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});
var obj = {
    messages: []
};

fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
        console.log(err);
    } else {
        obj = JSON.parse(data);
    }
});
client.on("message", async message => {
    if (message.author.bot) return;
    if ((message.author.id == "243275264497418250" || message.author.id == "429425851835088897") && message.content.includes("sorry")) {
        obj.messages.push({ id: message.id, content: message.content, author: message.author.id });
        var json = JSON.stringify(obj);
        fs.writeFile('myjsonfile.json', json, 'utf8', function () { }, 4);
    }
    if (message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (command.toLowerCase() == "count") {
        fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log(err);
            } else {
                obj = JSON.parse(data);
                var count = 0;
                obj.messages.filter(m => m.author == "429425851835088897").forEach(function (element) {
                    count += (String(element.content).match(/sorry/g) || []).length;
                })
                message.reply(`AMNOTBANANAAMA has said sorry ${count} times`)
            }
        });
    }
});

client.login(config.token);

//https://discordapp.com/oauth2/authorize?client_id=642278276412211206&scope=bot&permissions=8
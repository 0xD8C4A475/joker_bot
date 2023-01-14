const Discord = require("discord.js");
const tokenfile = require("./tokenfile.json");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client({disableEveryone: true});
var weather = require('weather-js');

bot.on("ready", async() => {
    console.log(`${bot.user.username} elindult!`)

    let státuszok = [
        "Parancs: !",
        "Készítő: Sono",
        "The Division 2"

    ]

    setInterval(function() {
        let status = státuszok[Math.floor(Math.random()* státuszok.length)]

        bot.user.setActivity(status, {type: "WATCHING"})
    }, 3000)
})

bot.on("message", async message => {
    let MessageArray = message.content.split(" ");
    console.log(MessageArray)
    let cmd = MessageArray[0];
    let args = MessageArray.slice(1);
    let prefix = botconfig.prefix;

    if(cmd === `szia`){
        message.channel.send("Szia");
    }

    if(cmd ===`${prefix}teszt`){
        let TesztEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(message.author.username)
        .setTitle("Teszt Embed!")
        .addField("Game:", "1\n 2\n 3\n")
        .setThumbnail(message.author.displayAvatarURL())
        .setImage(message.guild.iconURL())
        .setDescription("Szia")
        .setFooter(`${botname} | ${message.createdAt}`)

        message.channel.send(TesztEmbed)
    }
 
    if(cmd === `${prefix}kick`){
         let kick_user = message.mentions.members.firs();
         if(args[0] && kick_user){

            if(args[1]){

                let KickEmbed = new Discord.MessageEmbed()
                .setTitle("Kick")
                .setColor("RED")
                .setDescription(`**Kickelte:** ${message.author.tag}\n**Kickelve lett:** ${kick_user.user.tag}\n**Kick indoka:** ${args.slince(1).join(" ")}`)
   
                message.channel.send(KickEmbed);

                    kick_user.kick(args.slince(1).join(""));
                
            } else {
                let parancsEmbed = new Discord.MessageEmbed()
                .setTitle("Parancs használata:")
                .addField(`\`${prefix}kick <@név> [indok]\``, "ˇˇˇ")
                .setColor("BLUE")
                .setDescription("HIBA: Kérlek említs meg egy indokot!")
   
                message.channel.send(parancsEmbed);
            }

         } else {
             let parancsEmbed = new Discord.MessageEmbed()
             .setTitle("Parancs használata:")
             .addField(`\`${prefix}kick <@név> [indok]\``, "ˇˇˇ")
             .setColor("BLUE")
             .setDescription("HIBA: Kérlek említs meg egy embert!")

             message.channel.send(parancsEmbed);
         }
    }

    if(cmd === `${prefix}ban`){
        let ban_user = message.mentions.members.firs();
        if(args[0] && ban_user){

           if(args[1]){

               let banEmbed = new Discord.MessageEmbed()
               .setTitle("BAN")
               .setColor("RED")
               .setDescription(`**Banolta:** ${message.author.tag}\n*Banolva lett:** ${ban_user.user.tag}\n**Ban indoka:** ${args.slince(1).join(" ")}`)
  
               message.channel.send(banEmbed);

                   ban_user.ban(args.slince(1).join(""));
               
           } else {
               let parancsEmbed = new Discord.MessageEmbed()
               .setTitle("Parancs használata:")
               .addField(`\`${prefix}ban <@név> [indok]\``, "ˇˇˇ")
               .setColor("BLUE")
               .setDescription("HIBA: Kérlek említs meg egy indokot!")
  
               message.channel.send(parancsEmbed);
           }

        } else {
            let parancsEmbed = new Discord.MessageEmbed()
            .setTitle("Parancs használata:")
            .addField(`\`${prefix}ban <@név> [indok]\``, "ˇˇˇ")
            .setColor("BLUE")
            .setDescription("HIBA: Kérlek említs meg egy embert!")

            message.channel.send(parancsEmbed);
        }
   }

   if(cmd ===`${prefix}weather`){
    if(args[0]){
        weather.find({search: args.join(" "), degreeType: "C"}, function(err, result) {
            if (err) message.reply(err);

            if(result.length === 0){
                message.reply("Kérlek adj meg egy létező település nevet!")
                return;
            }

            let current = result[0].current;
            let location = result[0].location;

            let WeatherEmbed = new Discord.MessageEmbed 
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Időjárás itt: ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setcolor("GREEN")
            .addField("Időzóna:", `UTC${location.timezone}`, true)
            .addField("Fokozat típusa:", `${location.degreetype}`, true)
            .addField("Hőfok", `${current.temperature}°C`, true)
            .addField("Hőérzet:", `${current.feelslike}°C`, true)
            .addField("Szél:", `${current.winddisplay}`, true)
            .addField("Páratartalom:", `${current.humidity}%`, true)

            message.channel.send(WeatherEmbed)
        })
    
    } else {
        message.reply("Kérlek adj meg egy település nevet!")    

    }
   }
})





bot.login(tokenfile.token);

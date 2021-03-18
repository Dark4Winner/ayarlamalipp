const Discord = require('discord.js');
const data = require('quick.db')

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_ROLES')) return;
    if (!args[0]) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(`pp-gif ayarla/sıfırla komutlarını kullanın.`));

    if (args[0] === 'ayarla') {

        const ayarlı = await data.fetch(`darkcode.${message.guild.id}`)
        if (ayarlı) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(`Kanal zaten ayarlı.`))

        if (!args[1]) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(`Bir kanalı etiketlemelisin.`))
        let channel = message.mentions.channels.first()
        if (!channel) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(`${args[1]}, isimli kanalı bu sunucuda bulamıyorum.`))

        data.set(`darkcode.${message.guild.id}`, channel.id)
        message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(`PP ve GİF fotoğrafların gönderileceği yer: ${channel} olarak ayarlandı.
Sıfırlamak İçin: pp-gif sıfırla`))

    } else if (args[0] === 'sıfırla') {
        const ayarlı = await data.fetch(`darkcode.${message.guild.id}`)
        if (!ayarlı) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(`Kanal zaten ayarlı değil.`))

        data.delete(`darkcode.${message.guild.id}`)
        message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(`PP ve GİF fotoğrafların gönderileceği kanal sıfırlandı.\n
Ayarlamak için: pp-gif ayarla #channel`))
    }

};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["ppgif"],
    permLevel: 0
}





/////////// komutlara atılacak.


client.on('userUpdate', async (oldUser, newUser) => {
  if(oldUser.avatarURL() !== newUser.avatarURL()) {
  
    client.guilds.cache.forEach(async guild => {
    if(guild.members.cache.get(newUser.id)) {
    
    const channeldata = await require('quick.db').fetch(`darkcode.${guild.id}`)
    if(!channeldata) return;
    let channel = await guild.channels.cache.get(channeldata)
    
    let avatar = new Discord.Attachment(newUser.avatarURL())
    let gifkontrol = newUser.avatarURL().includes('.gif') ? `**[[GIF]](${newUser.avatarURL()})**` : `~~**[GIF]**~~`  
    const Metehan = new Discord.MessageEmbed().setColor('BLACK').setAuthor(newUser.tag).setImage(newUser.avatarURL()).setDescription(`${gifkontrol} | **[[PNG]](${newUser.avatarURL().replace('.gif', '.png').replace('.jpg', '.png').replace('.webp', '.png')})** | **[[JPG]](${newUser.avatarURL().replace('.png', '.jpg').replace('.gif', '.jpg').replace('.webp', '.jpg')})** | **[[WEBP]](${newUser.avatarURL().replace('.gif', '.webp').replace('.png', '.webp').replace('.jpg', '.webp')})**`)
    return channel.send(Metehan)
  
    }
    })
  }
  });

///maine atılacak!

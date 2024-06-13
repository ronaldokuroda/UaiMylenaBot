

const dotenv = require('dotenv');
dotenv.config();
const {EntradaID} = process.env

module.exports = (client) => {
    client.on('guildMemberAdd', async member => {
        const channelID = EntradaID;
        if (!channelID) return;
    
        const channel = member.guild.channels.cache.get(channelID);
        if (!channel) return;
    
        // Enviar a mensagem de boas-vindas
        channel.send(`:point_right: ${member} Entrou!`);
    });
  
    client.on('guildMemberRemove', async member => {
        const channelID = EntradaID;
        if (!channelID) return;
    
        const channel = member.guild.channels.cache.get(channelID);
        if (!channel) return;
    
        // Enviar a mensagem de despedida
        channel.send(`:point_right: ${member.displayName} Saiu`);
    });

}


const dotenv = require('dotenv');
dotenv.config();
const {EntradaID, SaidaID} = process.env

module.exports = (client) => {
    client.on('guildMemberAdd', async member => {
        const channelEntradaID = EntradaID;
        if (!channelEntradaID) return;
    
        const channel = member.guild.channels.cache.get(channelEntradaID);
        if (!channel) return;
    
        // Enviar a mensagem de boas-vindas
        channel.send(`:point_right: ${member} Entrou!`);
    });
  
    client.on('guildMemberRemove', async member => {
        const channelSaidaID = SaidaID;
        if (!channelSaidaID) return;
    
        const channel = member.guild.channels.cache.get(channelSaidaID);
        if (!channel) return;
    
        // Enviar a mensagem de despedida
        channel.send(`:point_right: ${member.displayName} Saiu`);
    });

}
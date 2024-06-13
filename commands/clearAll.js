const { SlashCommandBuilder } = require('discord.js');
const { ClearAll } = require("../funcoes/clearAll.js")

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName('clearall')
        .setDescription('Apaga todas as mensagens do canal.'),
    
    async execute(interaction) {
        await ClearAll(interaction);
    }

};

const { SlashCommandBuilder } = require('discord.js');

const dotenv = require('dotenv');
const handleError = require('../error.js');
dotenv.config();
const { Permissao } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Apaga uma quantidade especificada de mensagens.')
        .addIntegerOption(option => 
            option.setName('amount')
                .setDescription('Número de mensagens a serem apagadas')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(100)),
    
    async execute(interaction) {

        if (!interaction.member.permissions.has(Permissao)) {
            return handleError(interaction, new Error('Você não tem permissão para usar este comando!'), Permissao);
        }
        
        const amount = interaction.options.getInteger('amount');
        
        if (!interaction.guild) {
            return interaction.reply('Este comando só pode ser usado em servidores.');
        }

        const channel = interaction.channel;

        await channel.bulkDelete(amount, true).catch(error => {
            console.error(error);
            return interaction.reply('Houve um erro ao tentar apagar as mensagens no canal.');
        });

        return interaction.reply(`Foram apagadas ${amount} mensagens!`);
    },
};

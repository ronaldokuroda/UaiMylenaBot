const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const handleError = require('../error.js');
const { CanalSetID, Permissao } = process.env;


module.exports = {
    data: new SlashCommandBuilder()
        .setName("set")
        .setDescription("Solicitar set"),

    async execute(interaction) {

        if (!interaction.member.permissions.has(Permissao)) {
            return handleError(interaction, new Error('Você não tem permissão para usar este comando!'), Permissao);
        }

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(':rotating_light: PEDIR CARGO MEMBRO/SET :rotating_light:')
            .setDescription('## Se você concorda com as regras, clique no botão abaixo para pedir seu cargo de membro!')
            .setThumbnail('https://cdn.discordapp.com/attachments/788867955977879613/1250252310769176586/BEMVINDO.png?ex=666a43b3&is=6668f233&hm=763af53df5d42448029fdbe4fc2121f71c6abe29d8c41de7a66930763f9c1b8b&');

        const PedirSet = new ButtonBuilder()
            .setCustomId('PedirSet')
            .setLabel('TORNAR MEMBRO')
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder().addComponents(PedirSet);

        const canalResposta = interaction.client.channels.cache.get(CanalSetID);

        if (!canalResposta) {
            console.error(`Canal com ID ${CanalSetID} não encontrado.`);
            return;
        }

        try {
            await canalResposta.send({ embeds: [embed], components: [row] });
        } catch (error) {
            console.error('Erro ao enviar a mensagem:', error);
        }
    },
};

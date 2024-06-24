const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder } = require('discord.js');

const dotenv = require('dotenv');
dotenv.config();
const handleError = require('../error.js');
const {  Permissao } = process.env;


module.exports={
    data: new SlashCommandBuilder()
            .setName("anunciolive")
            .setDescription("Realiza os anuncios no da live!"),

    async execute(interaction) {

        if (!interaction.member.permissions.has(Permissao)) {
            return handleError(interaction, new Error('Você não tem permissão para usar este comando!'), Permissao);
        }

        if(!interaction.isChatInputCommand()) return;

        if(interaction.commandName === "anunciolive"){

            const RealizarAnuncioLives = new ModalBuilder()
                .setCustomId("anunciolive")
                .setTitle("Realizar um anuncio de live");

            const Titulo = new TextInputBuilder()
                .setCustomId("titulo")
                .setLabel("Qual sera o titulo?")
                .setStyle(TextInputStyle.Short);

            const Anuncio = new TextInputBuilder()
                .setCustomId("anuncio")
                .setLabel("Qual vai ser o anuncio?")
                .setStyle(TextInputStyle.Paragraph);






            const TituloLive = new ActionRowBuilder().addComponents(Titulo);
            const AnunciarLive = new ActionRowBuilder().addComponents(Anuncio);

            RealizarAnuncioLives.addComponents(TituloLive, AnunciarLive)

            await interaction.showModal(RealizarAnuncioLives)
    
        }
    }
}
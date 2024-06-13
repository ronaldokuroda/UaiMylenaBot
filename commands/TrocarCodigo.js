const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder } = require('discord.js');

const dotenv = require('dotenv');
dotenv.config();
const handleError = require('../error.js');
const {  Permissao } = process.env;


module.exports={
    data: new SlashCommandBuilder()
            .setName("codigo")
            .setDescription("Trocar os codigos do TexasRoleplay"),

    async execute(interaction) {

        if (!interaction.member.permissions.has(Permissao)) {
            return handleError(interaction, new Error('Você não tem permissão para usar este comando!'), Permissao);
        }

        if(!interaction.isChatInputCommand()) return;

        if(interaction.commandName === "codigo"){

            const TrocarCodigo = new ModalBuilder()
                .setCustomId("codigo")
                .setTitle("Trocar código do Texas Roleplay");

            const codigo1 = new TextInputBuilder()
                .setCustomId("codigo1")
                .setLabel("Forneca os codigos")
                .setStyle(TextInputStyle.Paragraph);



            const PrimeiroCodigo = new ActionRowBuilder().addComponents(codigo1);

            TrocarCodigo.addComponents(PrimeiroCodigo)

            await interaction.showModal(TrocarCodigo)
    
        }
    }
}
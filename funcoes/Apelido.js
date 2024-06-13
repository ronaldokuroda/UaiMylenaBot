const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

async function CriarApelido(interaction) {
    // Cria o modal
    const TrocarNome = new ModalBuilder()
        .setCustomId('apelido')
        .setTitle('Set');
        
    // Cria os campos de entrada de texto
    const NomeInput = new TextInputBuilder()
        .setCustomId('NomeInput')
        .setLabel("Como gostaria de ser chamado?")
        .setStyle(TextInputStyle.Short);

    const Localizacao = new TextInputBuilder()
        .setCustomId('Localizacao')
        .setLabel("Venho de onde? (Valorant, live)")
        .setStyle(TextInputStyle.Short);

    // Adiciona os campos de entrada ao modal
    const firstActionRow = new ActionRowBuilder().addComponents(NomeInput);
    const secondActionRow = new ActionRowBuilder().addComponents(Localizacao);
    TrocarNome.addComponents(firstActionRow, secondActionRow);

    // Exibe o modal para o usuário
    await interaction.showModal(TrocarNome);
}

module.exports={CriarApelido}

const handleError = require('../error.js');
const dotenv = require('dotenv');
dotenv.config();
const { Permissao } = process.env;

async function ClearAll(interaction) {
    if (!interaction.member.permissions.has(Permissao)) {
        return handleError(interaction, new Error('Você não tem permissão para usar este comando!'), Permissao);
        //return interaction.reply({ content: "Você não tem permissão para usar este comando!", ephemeral: true });
    }

    if (!interaction.guild) {
        return interaction.reply({ content: "Este comando só pode ser usado em servidores.", ephemeral: true });
    }

    const channel = interaction.channel;

    try {
        await interaction.reply({ content: "Comando enviado", ephemeral: true });

        let messages;
        do {
            messages = await channel.messages.fetch({ limit: 100 });
            if (messages.size > 0) {
                await channel.bulkDelete(messages, true);
            }
        } while (messages.size >= 2);

        await interaction.channel.send({ content: "Todas as mensagens foram apagadas", ephemeral: true });

    } catch (error) {
        
        await interaction.reply({ content: "Ocorreu um erro ao limpar as mensagens.", ephemeral: true });
        await handleError(interaction, error);
    }
}

module.exports = { ClearAll };

const { DiscordAPIError, PermissionsBitField } = require('discord.js');

module.exports = async function handleError(interaction, error, requiredPermission = null) {
    console.error("Ocorreu um erro:", error);

    let errorMessage = 'Ocorreu um erro ao processar sua solicitação.';

    if (error instanceof DiscordAPIError) {
        switch (error.code) {
            case 50001: // Missing Access error code
                errorMessage = 'Eu não tenho acesso para realizar essa ação.';
                break;
            case 50013: // Missing Permissions error code
                errorMessage = 'Eu não tenho permissão para realizar essa ação neste canal.';
                break;
            case 10003: // Unknown Channel error code
                errorMessage = 'O canal especificado não foi encontrado.';
                break;
            case 10004: // Unknown Guild error code
                errorMessage = 'O servidor especificado não foi encontrado.';
                break;
            case 10007: // Unknown Member error code
                errorMessage = 'O membro especificado não foi encontrado.';
                break;
            case 10008: // Unknown Message error code
                errorMessage = 'A mensagem especificada não foi encontrada.';
                break;
            case 10012: // Invalid Message error code
                errorMessage = 'A mensagem especificada é inválida.';
                break;
            case 10013: // Unknown Channel Type error code
                errorMessage = 'O tipo de canal especificado não é suportado.';
                break;
            case 10014: // Unknown Role error code
                errorMessage = 'A função especificada não foi encontrada.';
                break;
            case 10015: // Unknown User error code
                errorMessage = 'O usuário especificado não foi encontrado.';
                break;
            case 10026: // Max Guilds error code
                errorMessage = 'O bot atingiu o limite máximo de servidores.';
                break;
            case 10027: // Max Friends error code
                errorMessage = 'O bot atingiu o limite máximo de amigos.';
                break;
            case 20001: // Invalid Request error code
                errorMessage = 'A solicitação é inválida.';
                break;
            case 50035: // Invalid Form Body error code
                errorMessage = 'O corpo do formulário é inválido.';
                break;
            default:
                errorMessage = `Erro do Discord: ${error.message}`;
                break;
        }
    } else if (requiredPermission && !interaction.member.permissions.has(requiredPermission)) {
        errorMessage = `Você não tem permissão para realizar essa ação. Permissão necessária: ${new PermissionsBitField(requiredPermission).toArray().join(', ')}`;
    } else if (error.message.includes('Missing Access')) {
        errorMessage = 'Eu não tenho acesso para realizar essa ação neste canal.';
    } else if (error.message.includes('Unknown Interaction')) {
        errorMessage = 'A interação não é válida ou expirou.';
    } else if (error.message.includes('Rate Limited')) {
        errorMessage = 'Fui limitado por taxa. Por favor, tente novamente mais tarde.';
    }

    try {
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: errorMessage, ephemeral: true });
        } else {
            await interaction.reply({ content: errorMessage, ephemeral: true });
        }
    } catch (err) {
        console.error("Erro ao enviar a mensagem de erro:", err);
    }
};

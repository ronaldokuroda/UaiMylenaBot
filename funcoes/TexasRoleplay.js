const { EmbedBuilder } = require("discord.js");
const handleError = require('../error.js');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const { canalTexasID } = process.env;

async function TexasRoleplay(interaction) {
    
        const filePath = path.join(__dirname, '../codigos.json');
        let codigos = {};

        try {
            const data = fs.readFileSync(filePath, 'utf8');
            codigos = JSON.parse(data);
        } catch (error) {
            console.error("Erro ao ler o arquivo JSON:", error);
            return interaction.reply("Não foi possível carregar os códigos.");
        }

        const fields = codigos.map((codigo, index) => ({
            name: `CÓDIGO`,
            value: codigo,
            inline: false
        }));
        
        // Criar a embed
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(':rotating_light: ATENÇÃO :rotating_light: ')
            .setDescription('## || @everyone || Quer fazer parte do Texas Roleplay?')
            .setFooter({ text: ' COM ESSE CÓDIGO, VOCÊS ENTRAM SEM PRECISAR PASSAR PELA WL, SÓ JOGAR ELES NA ABA AO PUXAR A WL...PASSAM DIRETO!'})
            .setURL('https://discord.gg/texasroleplaygg') //URL PARA QUEM CLICAR NO TITULO
            .setThumbnail('https://cdn.discordapp.com/attachments/788867955977879613/1250254189146144859/uaiso.png?ex=666a4573&is=6668f3f3&hm=32153b3575596f2ba12ce3e29fa4fa1e4ec8e42ba7eb92e14b3ba046145d8eb9&')
            .addFields( ...fields );
            

        const canalResposta = interaction.client.channels.cache.get(canalTexasID);

        if (!interaction.client.channels.cache.get(canalTexasID)) {
            return handleError(interaction, new Error('Canal não encontrado.'));
        }


        await canalResposta.send({ embeds: [embed] });
        await canalResposta.send("https://discord.gg/texasroleplaygg");

}

module.exports = {TexasRoleplay};

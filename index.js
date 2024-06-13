const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { extrairESalvarCodigos } = require('./funcoes/FiltroCodigo.js');
const { CriarApelido } = require("./funcoes/Apelido.js")
const { TexasRoleplay } = require("./funcoes/TexasRoleplay.js")
const dotenv = require('dotenv');
dotenv.config();
const {TOKEN, CargoID_Set, CanalAnuncioID} = process.env

const client = new Client({ 
 intents: [
   GatewayIntentBits.Guilds,
   GatewayIntentBits.GuildMessages,
   GatewayIntentBits.GuildMembers,
   GatewayIntentBits.GuildPresences
 ] 
});


const fs = require("node:fs")
const path = require("node:path")
client.commands = new Collection()
const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

for(const file of commandFiles){

  const filePath = path.join(commandsPath, file)
  const command = require (filePath)
  
  if ("data" in command && "execute" in command){
    client.commands.set(command.data.name, command)
  }else{
    console.log(`Esse comando em ${filePath} esta com "data" ou "execute ausentes"`)
  }
}

 // Listener de interacoes com bot por chat
client.on(Events.InteractionCreate, async interaction => {

	if (!interaction.isModalSubmit()) return;
	if (interaction.customId === 'apelido') {
    await interaction.reply({ content: 'Apelido atualizado!', ephemeral: true });
	
    const NomeInput = interaction.fields.getTextInputValue('NomeInput');
    const Localizacao = interaction.fields.getTextInputValue('Localizacao');
    
    await interaction.member.setNickname(`${NomeInput} | ${Localizacao}`).catch((err) => {});
    await interaction.member.roles.add(CargoID_Set).catch((err) => {});

  } 

  else if (interaction.customId === 'codigo') {


    await interaction.reply({ content: 'Codigos atualizado!', ephemeral: true  });

    const codigo1 = interaction.fields.getTextInputValue('codigo1');

    extrairESalvarCodigos(codigo1);

    await TexasRoleplay(interaction);

  }

  else if (interaction.customId === 'anuncio') {

    await interaction.reply({ content: 'Anuncio Realizado!', ephemeral: true  });

    const Titulo = interaction.fields.getTextInputValue('titulo');
    const anuncio = interaction.fields.getTextInputValue('anuncio');

    //console.log(Titulo, anuncio)


    const canalResposta = interaction.client.channels.cache.get(CanalAnuncioID);

    if (!canalResposta) {
      return handleError(interaction, new Error('Canal não encontrado.'));
  }

    
    try {
      await canalResposta.send({  content: ` # **${Titulo}**\n ## ${anuncio} || @everyone ||`  })

    } catch (error) {
      return handleError(interaction, error);
    }

  }

}); 


client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isButton()) {

        if (interaction.customId === 'PedirSet') {
            await CriarApelido(interaction);
        }
      
    } else if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) {
            console.error('Comando não encontrado');
            return;
        }
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error('Houve um erro ao executar esse comando:', error);
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({ content: 'Houve um erro ao executar esse comando', ephemeral: true });
            } else {
                await interaction.followUp({ content: 'Houve um erro ao executar esse comando', ephemeral: true });
            }
        }
    }
});




const membros = require("./events/membros.js");
membros(client);

//Imprime no console quando o bot estiver online e funcional
client.once(Events.ClientReady, readyClient => {
    console.log(`Pronto! Login realizado como ${readyClient.user.tag}`);
 }); 

client.login(TOKEN) 
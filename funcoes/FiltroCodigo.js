
const fs = require('fs');
// Função para extrair códigos de uma lista e salvá-los
function extrairESalvarCodigos(lista) {

    // Expressão regular para extrair códigos entre colchetes
    const regex = /\[([^\]]+)\]/g;

    // Array para armazenar os códigos extraídos
    const codigosExtraidos = [];
    
    // Extrair códigos da lista usando a expressão regular
    let match;
    while ((match = regex.exec(lista)) !== null) {
        codigosExtraidos.push(match[1]);
    }
    
    // Salvar códigos atualizados no arquivo JSON */
    fs.writeFileSync('codigos.json', JSON.stringify(codigosExtraidos));
    
    return codigosExtraidos;
}
module.exports={extrairESalvarCodigos}
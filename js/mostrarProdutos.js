import { conectaApi } from "./conectaApi.js";

const lista = document.querySelector("[data-lista]");

function constroiCard(nome, valor, imagem, id) {
    const produtos = document.createElement("li");
    produtos.className = "produto";
    produtos.dataset.id = id;
    
    let valorFormatado = 'R$ 0,00'; // Valor padrão inicial

    if (valor == null) {
        console.error("Valor ausente na API");
        valorFormatado = "Valor Indisponível";
    } else {
        const valorNumerico = Number(valor);

        if (isNaN(valorNumerico)) {
            console.error(`Valor inválido para formatação de moeda: ${valor}`);
            // valorFormatado já é 'R$ 0,00'
        } else {
            valorFormatado = valorNumerico.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });
        }
    
    }

    const imagemSrc = imagem || "./img/imagem_padrao.jpg";
    const altText = nome ? `Imagem de ${nome}` : "Imagem do produto";

    produtos.innerHTML = `
        <img src="${imagemSrc}" alt="${altText}">
        <div class="produto-info">
            <h3>${nome}</h3>
            <p>${valorFormatado}</p> 
             <button class="delete-btn" data-id="${id}"> <img src="./img/lixeira.png" alt="Excluir produto"> </button>
        </div>`;

        const botaoDeletar = produtos.querySelector('.delete-btn');
    botaoDeletar.addEventListener('click', () => {
        deletarProduto(id, produtos); // Chama a função deletarProduto de conectaApi.js
    });
    return produtos;
}

async function deletarProduto(id, produtoElemento) { // Mantém essa função, mas ela só chama a função da API
    try {
        await conectaApi.deletarProduto(id); // Chama a função para deletar na API (de conectaApi.js)
        produtoElemento.remove();
        console.log(`Produto com ID ${id} excluído com sucesso.`);
    } catch (error) {
        console.error(`Erro ao excluir produto com ID ${id}:`, error);
        alert("Ocorreu um erro ao excluir o produto. Tente novamente.");
    }
}



export async function listaProdutos() {
    try {
        const listaApi = await conectaApi.listaProdutos();

        if (!listaApi || !Array.isArray(listaApi)) {
            console.error("Dados da API inválidos:", listaApi);
            return;
        }

        listaApi.forEach(elemento => {
            lista.appendChild(constroiCard(elemento.nome, elemento.valor, elemento.imagem, elemento.id));
        });
    } catch (error) {
        console.error("Erro ao processar produtos:", error);
    }
}

listaProdutos();


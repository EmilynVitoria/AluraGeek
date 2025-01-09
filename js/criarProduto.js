import { conectaApi } from "./conectaApi.js";
import { listaProdutos } from "./mostrarProdutos.js";

const formulario = document.querySelector("[data-formulario]");
const mensagemSucesso = document.getElementById("mensagem-sucesso");
const mensagemErro = document.getElementById("mensagem-erro");

async function criarProduto(evento) {
    evento.preventDefault();

    const imagem = document.querySelector("[data-imagem]").value;
    const valor = document.querySelector("[data-valor]").value;
    const nome = document.querySelector("[data-nome]").value;

    let erros = [];

    if (!nome) erros.push("O campo Nome é obrigatório.");
    if (!valor) {
        erros.push("O campo Valor é obrigatório.");
    } else if (isNaN(Number(valor))) { // Converte para número ANTES de verificar isNaN
        erros.push("O campo Valor deve ser um número. (use o ponto final ( . ) como separador decimal)");
    }
    if (!imagem) erros.push("O campo Imagem é obrigatório.");
    if (!imagem.startsWith("http://") && !imagem.startsWith("https://")) {
        erros.push("O campo Imagem deve ser uma URL válida (começando com http:// ou https:// ).");
    }

    if (erros.length > 0) {
        exibirMensagens(mensagemErro, erros);
        setTimeout(() => {
            mensagemErro.innerHTML = "";
            mensagemErro.style.display = "none";
        }, 8000);
        return;
    }

    try {
        await conectaApi.criaProdutos(nome, valor, imagem);

        exibirMensagem(mensagemSucesso, "Produto criado com sucesso!", "sucesso");
        
        mensagemErro.innerHTML = "";
        
        setTimeout(() => { // Adiciona um pequeno atraso
            listaProdutos();
        }, 8000); 

    } catch (error) {
        console.error("Erro ao criar produto:", error);
        exibirMensagem(mensagemErro, "Erro ao criar o produto. Tente novamente.", "erro");
    }
}

function exibirMensagem(elemento, mensagem, tipo) { // Adicione o parâmetro tipo
    elemento.textContent = mensagem;
    elemento.classList.add(tipo);
    elemento.style.display = "block";
    setTimeout(() => {
        elemento.style.display = "none";
        elemento.classList.remove(tipo); // Remove a classe
    }, 8000);
}

function exibirMensagens(elemento, mensagens) {
    elemento.innerHTML = mensagens.map(mensagem => `<p>${mensagem}</p>`).join('');
    elemento.style.display = "block";
}

formulario.addEventListener("submit", evento => criarProduto(evento));
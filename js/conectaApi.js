async function listaProdutos() {
    const conexao = await fetch ("http://localhost:3000/produtos");
    const conexaoConvertida = await conexao.json();

    return conexaoConvertida;
}

async function deletarProduto(id) { // REMOVE produtoElemento daqui.
    try {
        const resposta = await fetch(`http://localhost:3000/produtos/${id}`, {
            method: 'DELETE'
        });

        if (!resposta.ok) {
            const erroResposta = await resposta.json();
            throw new Error(`Erro ao deletar produto: ${resposta.status} - ${erroResposta?.message || resposta.statusText}`);
        }
    } catch (erro) {
      console.log(erro);
      throw erro;
    }
}

async function criaProdutos(nome, valor, imagem) {
    try {
        const conexao = await fetch("http://localhost:3000/produtos", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                nome, // Shorthand property names
                valor,
                imagem
            })
        });

        if (!conexao.ok) {
            const erroResposta = await conexao.json(); // Tenta obter detalhes do erro do servidor
            throw new Error(`Erro ao criar produto: ${conexao.status} - ${erroResposta?.message || conexao.statusText}`);
        }

        const conexaoConvertida = await conexao.json();
        return conexaoConvertida;
    } catch (error) {
        console.error("Erro na requisição POST:", error);
        throw error; // Re-lança o erro para ser tratado no código que chama criaProdutos
    }
}

export const conectaApi = {
    listaProdutos,
    criaProdutos,
    deletarProduto,
};
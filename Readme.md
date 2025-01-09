# AluraGeek

Este projeto é uma loja virtual de produtos geek, desenvolvida como parte do curso da Alura.

## Funcionalidades

*   Listagem de produtos com imagem, nome e preço.
*   Formulário para adicionar novos produtos.
*   Exclusão de produtos.
*   Responsividade para diferentes tamanhos de tela.

## Tecnologias utilizadas

*   HTML
*   CSS
*   JavaScript
*   JSON Server (para simular um backend)

## Como executar o projeto

1.  Clone o repositório:

    ```bash
    git clone [URL inválido removido]
    ```

2.  Navegue até o diretório do projeto:

    ```bash
    cd alura-geek
    ```

3.  Instale o json-server globalmente (se ainda não tiver instalado):

    ```bash
    npm install -g json-server
    # ou
    yarn global add json-server
    ```
    Ou localmente:
    ```bash
    npm install json-server
    # ou
    yarn add json-server
    ```

4.  Execute o json-server:

    ```bash
    json-server --watch db.json
    #ou com npx:
    npx json-server --watch db.json
    #ou com yarn:
    yarn start-json-server
    ```

5.  Abra o arquivo `index.html` no seu navegador.

## Créditos

Desenvolvido por Emilyn Santos como parte do curso da Alura em 2024.
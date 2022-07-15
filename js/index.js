const vitrine = document.getElementById("vitrine")

//FUNCAO PARA ADICIONAR O CARD NO HTML
function listarProdutos(array) {
    for (let i = 0; i < array.length; i++) {
        vitrine.appendChild(criarCard(array[i]))
    }
}
listarProdutos(data)

//FUNCAO QUE CRIA E MODELA O CARD
function criarCard(objeto) {

    const div = document.createElement("div")
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    const tagUl = document.createElement("ul");
    const listaTag = document.createElement("li");
    const listaProduto = document.createElement("li");
    const listaDescricao = document.createElement("li");
    const listaPreco = document.createElement("li");
    const link = document.createElement("a");

    listaTag.classList.add("tag")
    listaProduto.classList.add("produto")
    listaDescricao.classList.add("descricao")
    listaPreco.classList.add("preco")
    link.classList.add("botaoCarrinho")
    link.id = `${objeto.id}`

    image.src = `${objeto.img}`
    listaTag.innerHTML = `${objeto.tag}`
    listaProduto.innerHTML = `${objeto.nameItem}`
    listaDescricao.innerHTML = `${objeto.description}`
    listaPreco.innerHTML = `R$ ${objeto.value},00`
    link.innerHTML = `${objeto.addCart}`

    div.appendChild(figure);
    figure.appendChild(image);

    div.appendChild(tagUl);
    tagUl.appendChild(listaTag)
    tagUl.appendChild(listaProduto)
    tagUl.appendChild(listaDescricao)
    tagUl.appendChild(listaPreco)
    tagUl.appendChild(link)

    div.classList.add("card");

    link.addEventListener("click", adicionar)

    function adicionar() {
        itensCarrinho.push(objeto)
        adicionaCarrinho(itensCarrinho)
    }
    return div
}

//FUNCAO PARA MOSTRAR CARRINHO VAZIO
const divCarrinho = document.querySelector("#boxConteudo")

function carrinhoVazio() {
    const divVazio = document.createElement("div");
    divVazio.classList.add("carrinhoVazio")
    divVazio.innerHTML = `<p class="carrinhoVazio">Carrinho vazio</p>
                          <p class="adicioneItens">Adicione itens</p>`;

    divCarrinho.appendChild(divVazio)
}

//FUNCAO PARA ADICIONAR NO CARRINHO --**evento na criarCard**
const itensCarrinho = []

function adicionaCarrinho(objeto) {

    divCarrinho.innerHTML = ""

    for (let i = 0; i < objeto.length; i++) {
        const div1 = document.createElement("div");
        div1.classList.add("adicionado")

        div1.innerHTML = `<div class="adicionado-img">
                    <img src="${objeto[i].img}" alt="">
                  </div>
                    <ul>
                        <li class="carrinho1">${objeto[i].nameItem}</li>
                        <li class="carrinho2">R$ ${objeto[i].value},00</li>
                        <li><a class="removerProduto" id="${[i]}">Remover produto</a></li>
                    </ul>`;

        divCarrinho.appendChild(div1)
    }
    contadorQV()
}

//FUNCAO PARA REMOVER DO CARRINHO
divCarrinho.addEventListener("click", remover);

function remover(event) {
    const buttonRemove = event.target

    if (buttonRemove.tagName == "A") {
        const index = buttonRemove.id
        itensCarrinho.splice(index, 1)
        adicionaCarrinho(itensCarrinho)
    }
}

//FUNCAO PARA SOMAR
function somar(array) {
    let soma = 0

    for (let i = 0; i < array.length; i++) {
        soma += array[i].value
    }
    return `R$${soma},00`
}

//CRIAR DIV PARA QUANTIDADE E VALOR
const divQuantidade = document.createElement("div")

function contadorQV() {
    const section = document.querySelector("#carrinhoDeCompras")
    divQuantidade.classList.add("boxQuantidade")


    divQuantidade.innerHTML = `<div><p>Quantidade:</p><p>Valor:</p></div>
                                <div><p>${itensCarrinho.length}</p><p>${somar(itensCarrinho)}</p></div>`;

    let conferir = itensCarrinho.length > 0 ? section.appendChild(divQuantidade) : carrinhoVazio()

}
contadorQV()

//FUNCAO PARA HEADER TAG
const navegation = document.querySelector("nav")
navegation.addEventListener("click", filtrar)

function filtrar(event) {
    const buttonHeader = event.target.id
    const divSemProdutos = document.createElement("div")
    vitrine.innerHTML = ""

    if (buttonHeader == "todos") {
        listarProdutos(data)
    } else if (buttonHeader == "acessorios") {
        filtroProdutos(data)
        listarProdutos(acessorios)
    } else if (buttonHeader == "calcados") {
        divSemProdutos.innerHTML = `<p class="semProdutos">Produtos indisponíveis... :(</p>`
        vitrine.appendChild(divSemProdutos)
    } else if (buttonHeader == "camisetas") {
        filtroProdutos(data)
        listarProdutos(camisetas)
    }
}

let camisetas = []
let acessorios = []

function filtroProdutos(array) {
    camisetas = []
    acessorios = []
    for (let i = 0; i < array.length; i++) {
        if (array[i].tag.toString() == "Acessórios") {
            acessorios.push(array[i])
        } else if (array[i].tag.toString() == "Camisetas") {
            camisetas.push(array[i])
        }
    }
}

//FUNCAO PESQUISA
const buttonPesquisa = document.querySelector("button")
const input = document.querySelector("input")

buttonPesquisa.addEventListener("click", pesquisa)

function pesquisa() {
    let produtoPesquisa = data.filter(nomeProduto => nomeProduto.nameItem.toLocaleLowerCase().includes(input.value.toLocaleLowerCase()))
    vitrine.innerHTML = "";
    listarProdutos(produtoPesquisa)
}
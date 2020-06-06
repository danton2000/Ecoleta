const express = require("express")//função(caixinha magica),onde voce envia alguma coisa nessa caixinha e ela vai te devolver alguma respost
const server = express()//executando a variavel express como função no server,server será um objeto

//utilizando template engine nunjucks
const nunjucks = require("nunjucks")//estou pedindo um pacote 
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})//qual pasta dos html que ele vai utilizar, segundo argumento é um objeto, qual é o nosso servidor express, noCache guarda algumas coisas na memoria para responder mais rapido, não tenha cache


//configurando a pasta public
server.use(express.static("public"))//configuração do servidor, static é uma função

//configurar caminhos da minha aplicação, routes??  é ROTAS
//pagina inicial
//req: Requisição pedido
//res: Resposta da requisição
server.get("/", (req, res) => {//get verbo http, jeito de conversa com o http(pedido)
    return res.render("index.html", { title: "Um titulo"})//Renderizando os arquivos html, render para enviar variaves, o segundo argumento é um objeto, a chave desse objeto tem que reflir no que vai usar no html(title:)
    //ex: return res.render("index.html", { title: "Um titulo"})
})

server.get("/create-point", (req, res) => {//get verbo http, jeito de conversa com o http(pedido)
    return res.render("create-point.html")//Renderizando os arquivos html
})

server.get("/search", (req, res) => {//get verbo http, jeito de conversa com o http(pedido)
    return res.render("search-results.html")//Renderizando os arquivos html
})

//ligar o servidor
//npm start
server.listen(3000)//faz o servidor ligar na porta 3000 , executa essa função de ligar o servidor, ou fica ouvindo na porta 3000


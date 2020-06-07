const express = require("express")//função(caixinha magica),onde voce envia alguma coisa nessa caixinha e ela vai te devolver alguma respost
const server = express()//executando a variavel express como função no server,server será um objeto

//pegar o banco de dados
const db = require("./database/db.js")

//utilizando template engine nunjucks
const nunjucks = require("nunjucks")//estou pedindo um pacote 
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})//qual pasta dos html que ele vai utilizar, segundo argumento é um objeto, qual é o nosso servidor express, noCache guarda algumas coisas na memoria para responder mais rapido, não tenha cache


//configurando a pasta public
server.use(express.static("public"))//configuração do servidor, static é uma função

//habilitar o uso do req.doby na nossa aplicação
server.use(express.urlencoded({ extended: true }))

//configurar caminhos da minha aplicação, routes??  é ROTAS
//pagina inicial
//req: Requisição pedido
//res: Resposta da requisição
server.get("/", (req, res) => {//get verbo http, jeito de conversa com o http(pedido)
    return res.render("index.html", { title: "Um titulo" })//Renderizando os arquivos html, render para enviar variaves, o segundo argumento é um objeto, a chave desse objeto tem que reflir no que vai usar no html(title:)
    //ex: return res.render("index.html", { title: "Um titulo"})
})

server.get("/create-point", (req, res) => {//get verbo http, jeito de conversa com o http(pedido)
    //essa é a rota que ta recebendo dados do formulário

    //req.query são os Query Strigs da nossa url, consigo pegar as coias que aparecem na url
    //console.log(req.query)// traz os dados 

    return res.render("create-point.html")//Renderizando os arquivos html
})

server.post("/save-point", (req, res) => {//rota para salvar o ponto de coleta
    //req.body o corpo do nosso formulario, traz os dados 
    // console.log(req.body)

    //inserir dados no banco de dados
    //inserir dados na tabela
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?); 
        `

    const values = [//objeto contendo as propriedades necessarias
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        //depois de inserir dados
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro!")//erro para o usuario ver
        }
        //caso não aja erro
        console.log("Cadastrado com sucesso")
        console.log(this)//objeto this, está referencia a resposta do run

        return res.render("create-point.html", { saved: true })//retorna só depois do cadastro feito

    }
    //callback chama essa função de volta, depois de fazer a query e value, função com parametro, vai ser chamado depois de um certo tempo
    db.run(query, values, afterInsertData) //afterInsertData só vai ser executada no final,call back, insira os dados

})

server.get("/search", (req, res) => {//get verbo http, jeito de conversa com o http(pedido)

    const search = req.query.search

    if(search == ""){
        //Pesquisa vazia
        //mostrar a pagina html com os dados do banco de dados
        return res.render("search-results.html", { total: 0 })//Renderizando os arquivos html
    }

    //pegar os dados do banco de dados, % qualquer cosia antes e depois
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {//rows = registro(1)
        if (err) {
            return console.log(err)
        }

        // console.log(rows)

        const total = rows.length//vai contanr quantos elementos tem no array, rows?

        return res.render("search-results.html", { places: rows, total: total })
    })

})

//ligar o servidor
//npm start
server.listen(3000)//faz o servidor ligar na porta 3000 , executa essa função de ligar o servidor, ou fica ouvindo na porta 3000


// importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()//vai retornar um objeto e retornar na variavel sqlite3,função dentro de um objeto se chama metodo, verbose é um metodo que mostra mensagens no terminal

//criar o objeto que irá fazer operações no baanco de dados
const db = new sqlite3.Database("src/database/database.db")//está atribuindo a constante para o objeto(db), new faz iniciar um objeto

module.exports = db //exportando o objeto db

//utilizar o objeto banco de dados, para nosssas operações
// db.serialize(() => {//metodo, vai rodar uma sequencia de código
//     //criar uma tabela com comando SQL, tabela local de coleta, PASSO A PASSO
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)//run vai vai fazer a operação SQL


//     //inserir dados na tabela
//     oncst query = `
//         INSERT INTO places (
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?); 
//     `

//     const values = [
//         "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//         "Papersider",
//         "Guilherme Gembaila, Jardin América",
//         "Número 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papéis e Papelão"
//     ]

//     function afterInsertData(err){
//         //depois de inserir dados
//         if(err){
//             return console.log(err)
//         }
//         //caso não aja erro
//         console.log("Cadastrado com sucesso")
//         console.log(this)//objeto this, está referencia a resposta do run

//     }
//     //callback chama essa função de volta, depois de fazer a query e value, função com parametro, vai ser chamado depois de um certo tempo
//     db.run(query, values, afterInsertData) //afterInsertData só vai ser executada no final,call back, insira os dados

//     //consultar os dados da tabela, selecionar todos
//     db.all(`SELECT * FROM places`, function(err, rows){//rows = registro(1)
//         if(err){
//             return console.log(err)
//         }
//         //caso não aja erro
//         console.log("Aqui estão seus registros:")
//         console.log(rows)//objeto this, está referencia a resposta do run
//     })

//     //Deletar um dado da tabela
//     db.run(`DELETE FROM places WHERE id = ?`, [58], function (err){
//         if(err){
//             return console.log(err)
//         }
//         //caso não aja erro
//         console.log("Registro deletado com sucesso!")
//     })
// })



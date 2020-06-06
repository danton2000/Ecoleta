//PEGANDO UF E CIDADES
function populateUFs(){//pegando o seletor do select
    const ufSelect = document.querySelector("select[name = uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())//função anonima que ta retornando o valor
    .then( states => {
        
        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    })
}

populateUFs()

function getCities(event) {//pega as cidades
    const citySelect = document.querySelector("select[name = city]")

    const stateInput = document.querySelector("input[name = state]")

    //event.target.value, onde esse evento foi executado, foi no select, posso pegar o valor do target

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex

    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"//limpando as cidades
    citySelect.disabled = true //bloquea o campo

    fetch(url)
    .then( res => res.json())//função anonima que ta retornando o valor
    .then( cities => {
        
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`//adicionando as cidades
        }

        citySelect.disabled = false

    })
}



document
    .querySelector("select[name = uf]")
    .addEventListener("change", getCities)//quando ela mudar ela vai ser executada

//ITENS DE COLETA
//PEGAR TODOS OS LI s
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

//colocando os itens no valor, ou tirar
var selectedItems = []

function handleSelectedItem(event){

    const itemLi = event.target

    //adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //verificar se existe itens selecionados, se sim pegar os items selecionados

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId//isso será true e false
        return itemFound
    })

    //se ja estiver selecionados, tirar da selecao
    if (alreadySelected >= 0) {
        //tirar da selecao
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

       selectedItems = filteredItems
    }else{
        //se não estiver selecionado, adicionar a seleção
        selectedItems.push(itemId)//colocando um elemento num array
    }

    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems

}

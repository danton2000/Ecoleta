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

    fetch(url)
    .then( res => res.json())//função anonima que ta retornando o valor
    .then( cities => {
        
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }

        citySelect.disabled = false

    })
}



document
    .querySelector("select[name = uf]")
    .addEventListener("change", getCities)//quando ela mudar ela vai ser executada
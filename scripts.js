const pokemonImage = document.querySelector('.pokemon-image')
const pokemonName = document.querySelector('.pokemon-name')
const pokemonNumber = document.querySelector('.pokemon-number')

const form = document.querySelector('.form')
const input = document.querySelector('.buscar')
const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')

let pokemonAtual = 1

async function loadPokemon(pokemon) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    const response = await fetch(url)
    if (response.status === 200){
        const data = await response.json()
        return data
        }
    }
   

async function renderPokemon(pokemon) {
    pokemonName.innerHTML = 'Carregando...'
    pokemonNumber.innerHTML = ''

    const data = await loadPokemon(pokemon)
    if (data) {
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        pokemonAtual = data.id
        input.value = ""
    }
    else {
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Não encontrado :c'
        pokemonNumber.innerHTML = ''
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    renderPokemon(input.value.toLowerCase())
})

btnNext.addEventListener('click', () => {
    pokemonAtual++
    renderPokemon(pokemonAtual)
})

btnPrev.addEventListener('click', () => {
    if (pokemonAtual > 1) {
        pokemonAtual--
    renderPokemon(pokemonAtual)}
})


renderPokemon(pokemonAtual)
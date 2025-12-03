const path = require('path');
const fs = require('fs');

const pokemons = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'pokemon.json'), 'utf8')
);

function findAllPokemons() { return pokemons; }

function findPokemonById(id) { return pokemons.filter((e) => { return (e.id == id) })[0] }

function findAllPokemonsByType(type) { return pokemons.filter((e) => e.tipo && e.tipo.includes(type)) }

function findAllPokemonTypes() {
    const tipos = new Set();
    pokemons.forEach(pokemon => {
        pokemon.tipo.forEach(t => tipos.add(t));
    });
    return tipos;
}


module.exports = {
    findAllPokemons,
    findPokemonById,
    findAllPokemonTypes,
    findAllPokemonsByType
}
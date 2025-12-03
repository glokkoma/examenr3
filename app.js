const express = require('express');
const path = require('path');
const app = express();
const dataService = require('./data/dataService');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    const typesSet = dataService.findAllPokemonTypes();
    res.locals.allTypes = Array.from(typesSet); 
    next();
});

app.get('/', (req, res) => {
    const pokemons = dataService.findAllPokemons();
    res.render('index', { 
        pokemons: pokemons,
        title: 'Pokémon Registrados' 
    });
});

app.get('/tipo/:type', (req, res) => {
    const type = req.params.type;
    const pokemons = dataService.findAllPokemonsByType(type);
    res.render('index', { 
        pokemons: pokemons,
        title: `Tipo: ${type}`
    });
});

app.get('/pokemon/:id', (req, res) => {
    const id = req.params.id;
    const pokemon = dataService.findPokemonById(id);
    
    if (pokemon) {
        res.render('pokemon', { pokemon: pokemon });
    } else {
        res.status(404).send('Pokémon no encontrado');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Pokedex corriendo en http://localhost:${PORT}`);
});
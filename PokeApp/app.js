<<<<<<< HEAD


//Atributos poke rival
const imgRival = document.querySelector("#pokeRival");
const nombreRival = document.querySelector("#nombreRival");
const tipo1Rival = document.querySelector("#tipo1Rival");
const tipo2Rival = document.querySelector("#tipo2Rival");
const atkFisRival = document.querySelector("#ataqueFisRival"); 
const atkEspRival = document.querySelector("#ataqueEspRival");
const vidaRival = document.querySelector("#vidaRival");
const defensaEspRival = document.querySelector("#defensaEspRival");
const defensaFisRival = document.querySelector("#defensaFisRival");
const velocidadRival = document.querySelector("#velocidadRival");

//Atributos poke propio
const imgPropio = document.querySelector("#pokePropio");
const nombrePropio = document.querySelector("#nombrePropio");
const tipo1Propio = document.querySelector("#tipo1Propio");
const tipo2Propio = document.querySelector("#tipo2Propio");
const atkFisPropio = document.querySelector("#ataqueFisPropio"); 
const atkEspPropio = document.querySelector("#ataqueEspPropio");
const vidaPropio = document.querySelector("#vidaPropio");
const defensaEspPropio = document.querySelector("#defensaEspPropio");
const defensaFisPropio = document.querySelector("#defensaFisPropio");
const velocidadPropio = document.querySelector("#velocidadPropio");

//Interfaz de usuario
const input = document.querySelector('#input');
const btnElegir = document.querySelector('#btn-poke');
const btnAtkFis  = document.querySelector('#btn-atk-fis');
const btnAtkEsp  = document.querySelector('#btn-atk-esp');

//Método de número random
const getNumRandom = () => {
    let min = Math.ceil(0);
    let max = Math.floor(1001);
    return Math.floor(Math.random() * (max - min) + min);
}

const obtenerPokePropio = () => {
    const num = input.value;

    axios.get(`https://pokeapi.co/api/v2/pokemon/${num}`)
        .then((res) => {
            console.log(res.data);
            return res.data;
        })
        .then((res) => {
            imgPropio.src = res.sprites.back_default;
            nombrePropio.innerHTML = res.name;
            tipo1Propio.innerHTML = res.types[0].type.name;
            tipo2Propio.innerHTML = res.types[1] ? res.types[1].type.name : '';
            vidaPropio.innerHTML = res.stats[0].base_stat;
            atkFisPropio.innerHTML = res.stats[1].base_stat;
            defensaFisPropio.innerHTML = res.stats[2].base_stat;  // Corrected typo here
            atkEspPropio.innerHTML = res.stats[3].base_stat;
            defensaEspPropio.innerHTML = res.stats[4].base_stat;
            velocidadPropio.innerHTML = res.stats[5].base_stat;
        })
        .catch(error => console.error("Error fetching Pokémon data: ", error));
};



// Generar un Pokémon rival aleatorio 
const obtenerPokeRival = () => {
    const numPokeRival = getNumRandom();

    axios.get(`https://pokeapi.co/api/v2/pokemon/${numPokeRival}`)
        .then((res) => {
            console.log(res.data);
            return res.data;
        })
        .then((res) => {
            imgRival.src = res.sprites.front_default;
            console.log("Nombre propio:", nombrePropio);
console.log("Vida propia:", vidaPropio);
// Y así con otros atributos

            nombreRival.innerHTML = res.name;
            tipo1Rival.innerHTML = res.types[0].type.name;
            tipo2Rival.innerHTML = res.types[1] ? res.types[1].type.name : '';
            vidaRival.innerHTML = res.stats[0].base_stat;
            atkFisRival.innerHTML = res.stats[1].base_stat;
            defensaFisRival.innerHTML = res.stats[2].base_stat;
            atkEspRival.innerHTML = res.stats[3].base_stat;
            defensaEspRival.innerHTML = res.stats[4].base_stat;
            velocidadRival.innerHTML = res.stats[5].base_stat;
        })
        .catch(error => console.error("Error fetching Pokémon data: ", error));
};

// Cargar Pokémon rival al cargar la página
window.addEventListener('load', obtenerPokeRival);

// Asociar el botón para elegir el Pokémon propio
btnElegir.addEventListener('click', obtenerPokePropio);

btnPelear.addEventListener();




=======


//Atributos poke rival
const imgRival = document.querySelector("#pokeRival");
const nombreRival = document.querySelector("#nombreRival");
const tipo1Rival = document.querySelector("#tipo1Rival");
const tipo2Rival = document.querySelector("#tipo2Rival");
const atkFisRival = document.querySelector("#ataqueFisRival"); 
const atkEspRival = document.querySelector("#ataqueEspRival");
const vidaRival = document.querySelector("#vidaRival");
const defensaEspRival = document.querySelector("#defensaEspRival");
const defensaFisRival = document.querySelector("#defensaFisRival");
const velocidadRival = document.querySelector("#velocidadRival");

//Atributos poke propio
const imgPropio = document.querySelector("#pokePropio");
const nombrePropio = document.querySelector("#nombrePropio");
const tipo1Propio = document.querySelector("#tipo1Propio");
const tipo2Propio = document.querySelector("#tipo2Propio");
const atkFisPropio = document.querySelector("#ataqueFisPropio"); 
const atkEspPropio = document.querySelector("#ataqueEspPropio");
const vidaPropio = document.querySelector("#vidaPropio");
const defensaEspPropio = document.querySelector("#defensaEspPropio");
const defensaFisPropio = document.querySelector("#defensaFisPropio");
const velocidadPropio = document.querySelector("#velocidadPropio");

//Interfaz de usuario
const input = document.querySelector('#input');
const btnElegir = document.querySelector('#btn-poke');
const btnAtkFis  = document.querySelector('#btn-atk-fis');
const btnAtkEsp  = document.querySelector('#btn-atk-esp');

//Método de número random
const getNumRandom = () => {
    let min = Math.ceil(0);
    let max = Math.floor(1001);
    return Math.floor(Math.random() * (max - min) + min);
}

const obtenerPokePropio = () => {
    const num = input.value;

    axios.get(`https://pokeapi.co/api/v2/pokemon/${num}`)
        .then((res) => {
            console.log(res.data);
            return res.data;
        })
        .then((res) => {
            imgPropio.src = res.sprites.back_default;
            nombrePropio.innerHTML = res.name;
            tipo1Propio.innerHTML = res.types[0].type.name;
            tipo2Propio.innerHTML = res.types[1] ? res.types[1].type.name : '';
            vidaPropio.innerHTML = res.stats[0].base_stat;
            atkFisPropio.innerHTML = res.stats[1].base_stat;
            defensaFisPropio.innerHTML = res.stats[2].base_stat;  // Corrected typo here
            atkEspPropio.innerHTML = res.stats[3].base_stat;
            defensaEspPropio.innerHTML = res.stats[4].base_stat;
            velocidadPropio.innerHTML = res.stats[5].base_stat;
        })
        .catch(error => console.error("Error fetching Pokémon data: ", error));
};



// Generar un Pokémon rival aleatorio 
const obtenerPokeRival = () => {
    const numPokeRival = getNumRandom();

    axios.get(`https://pokeapi.co/api/v2/pokemon/${numPokeRival}`)
        .then((res) => {
            console.log(res.data);
            return res.data;
        })
        .then((res) => {
            imgRival.src = res.sprites.front_default;
            console.log("Nombre propio:", nombrePropio);
console.log("Vida propia:", vidaPropio);
// Y así con otros atributos

            nombreRival.innerHTML = res.name;
            tipo1Rival.innerHTML = res.types[0].type.name;
            tipo2Rival.innerHTML = res.types[1] ? res.types[1].type.name : '';
            vidaRival.innerHTML = res.stats[0].base_stat;
            atkFisRival.innerHTML = res.stats[1].base_stat;
            defensaFisRival.innerHTML = res.stats[2].base_stat;
            atkEspRival.innerHTML = res.stats[3].base_stat;
            defensaEspRival.innerHTML = res.stats[4].base_stat;
            velocidadRival.innerHTML = res.stats[5].base_stat;
        })
        .catch(error => console.error("Error fetching Pokémon data: ", error));
};

// Cargar Pokémon rival al cargar la página
window.addEventListener('load', obtenerPokeRival);

// Asociar el botón para elegir el Pokémon propio
btnElegir.addEventListener('click', obtenerPokePropio);

btnPelear.addEventListener();




>>>>>>> 3495e7742e7e4193cf6473b08162e8b561a27b00

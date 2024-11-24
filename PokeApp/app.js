

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


// TABLA DE TIPOS 
const calcularMultiplicadorAtaque = (tipoAtaque, tipoDefensaPrimario, tipoDefensaSecundario) => {

    const tablaTipos = {
        "steel": {"normal": 1, "fire": 0.5, "water": 0.5, "grass": 1, "electric": 0.5, "ice": 2, "fighting": 1, "poison": 1, "ground": 1, "flying": 1, "psychic": 1, "bug": 1, "rock": 2, "ghost": 1, "dragon": 1, "dark": 1, "steel": 0.5, "fairy": 2 },
        "water": {"normal": 1, "fire": 2, "water": 0.5, "grass": 0.5, "electric": 1, "ice": 1, "fighting": 1, "poison": 1, "ground": 2, "flying": 1, "psychic": 1, "bug": 1, "rock": 2, "ghost": 1, "dragon": 0.5, "dark": 1, "steel": 1, "fairy": 1 },
        "bug": {"normal": 1, "fire": 0.5, "water": 1, "grass": 2, "electric": 1, "ice": 1, "fighting": 0.5, "poison": 0.5, "ground": 1, "flying": 0.5, "psychic": 2, "bug": 1, "rock": 1, "ghost": 0.5, "dragon": 1, "dark": 2, "steel": 0.5, "fairy": 0.5 },
        "dragon": {"normal": 1, "fire": 1, "water": 1, "grass": 1, "electric": 1, "ice": 1, "fighting": 1, "poison": 1, "ground": 1, "flying": 1, "psychic": 1, "bug": 1, "rock": 1, "ghost": 1, "dragon": 2, "dark": 1, "steel": 0.5, "fairy": 0 },
        "electric": {"normal": 1, "fire": 1, "water": 2, "grass": 0.5, "electric": 0.5, "ice": 1, "fighting": 1, "poison": 1, "ground": 0, "flying": 2, "psychic": 1, "bug": 1, "rock": 1, "ghost": 1, "dragon": 0.5, "dark": 1, "steel": 1, "fairy": 1 },
        "ghost": {"normal": 0, "fire": 1, "water": 1, "grass": 1, "electric": 1, "ice": 1, "fighting": 1, "poison": 1, "ground": 1, "flying": 1, "psychic": 2, "bug": 1, "rock": 1, "ghost": 2, "dragon": 1, "dark": 0.5, "steel": 1, "fairy": 1 },
        "fire": {"normal": 1, "fire": 0.5, "water": 0.5, "grass": 2, "electric": 1, "ice": 2, "fighting": 1, "poison": 1, "ground": 1, "flying": 1, "psychic": 1, "bug": 2, "rock": 0.5, "ghost": 1, "dragon": 0.5, "dark": 1, "steel": 2, "fairy": 1 },
        "fairy": {"normal": 1, "fire": 0.5, "water": 1, "grass": 1, "electric": 1, "ice": 1, "fighting": 2, "poison": 0.5, "ground": 1, "flying": 1, "psychic": 1, "bug": 1, "rock": 1, "ghost": 1, "dragon": 2, "dark": 2, "steel": 0.5, "fairy": 1 },
        "ice": {"normal": 1, "fire": 0.5, "water": 0.5, "grass": 2, "electric": 1, "ice": 0.5, "fighting": 2, "poison": 0.5, "ground": 2, "flying": 0.5, "psychic": 0.5, "bug": 0.5, "rock": 1, "ghost": 1, "dragon": 2, "dark": 1, "steel": 0.5, "fairy": 1 },
        "fighting": {"normal": 2, "fire": 1, "water": 1, "grass": 1, "electric": 1, "ice": 2, "fighting": 1, "poison": 1, "ground": 1, "flying": 1, "psychic": 1, "bug": 1, "rock": 2, "ghost": 0, "dragon": 1, "dark": 1, "steel": 2, "fairy": 0.5 },
        "normal": {"normal": 1, "fire": 1, "water": 1, "grass": 1, "electric": 1, "ice": 1, "fighting": 1, "poison": 1, "ground": 1, "flying": 1, "psychic": 1, "bug": 1, "rock": 0.5, "ghost": 0, "dragon": 1, "dark": 1, "steel": 0.5, "fairy": 1 },
        "grass": {"normal": 1, "fire": 0.5, "water": 2, "grass": 0.5, "electric": 1, "ice": 1, "fighting": 1, "poison": 0.5, "ground": 2, "flying": 0.5, "psychic": 1, "bug": 0.5, "rock": 2, "ghost": 1, "dragon": 0.5, "dark": 1, "steel": 0.5, "fairy": 1 },
        "psychic": {"normal": 1, "fire": 1, "water": 1, "grass": 1, "electric": 1, "ice": 1, "fighting": 2, "poison": 2, "ground": 1, "flying": 1, "psychic": 0.5, "bug": 1, "rock": 1, "ghost": 1, "dragon": 1, "dark": 0, "steel": 0.5, "fairy": 1 },
        "rock": {"normal": 1, "fire": 2, "water": 1, "grass": 1, "electric": 1, "ice": 2, "fighting": 0.5, "poison": 1, "ground": 0.5, "flying": 2, "psychic": 1, "bug": 2, "rock": 1, "ghost": 1, "dragon": 1, "dark": 1, "steel": 0.5, "fairy": 1 },
        "dark": {"normal": 1, "fire": 1, "water": 1, "grass": 1, "electric": 1, "ice": 1, "fighting": 0.5, "poison": 1, "ground": 1, "flying": 1, "psychic": 2, "bug": 1, "rock": 1, "ghost": 2, "dragon": 1, "dark": 0.5, "steel": 1, "fairy": 0.5 },
        "ground": {"normal": 1, "fire": 2, "water": 1, "grass": 0.5, "electric": 2, "ice": 1, "fighting": 1, "poison": 2, "ground": 1, "flying": 0, "psychic": 1, "bug": 0.5, "rock": 2, "ghost": 1, "dragon": 1, "dark": 1, "steel": 2, "fairy": 1 },
        "poison": {"normal": 1, "fire": 1, "water": 1, "grass": 2, "electric": 1, "ice": 1, "fighting": 1, "poison": 0.5, "ground": 0.5, "flying": 1, "psychic": 1, "bug": 1, "rock": 0.5, "ghost": 0.5, "dragon": 1, "dark": 1, "steel": 0, "fairy": 2 },
        "flying": {"normal": 1, "fire": 1, "water": 1, "grass": 2, "electric": 0.5, "ice": 1, "fighting": 2, "poison": 1, "ground": 1, "flying": 1, "psychic": 1, "bug": 2, "rock": 0.5, "ghost": 1, "dragon": 1, "dark": 1, "steel": 0.5, "fairy": 1 }

    };

    let multiplicadorAtaquePrimario = tablaTipos[tipoAtaque][tipoDefensaPrimario];

    let multiplicadorAtaqueSecundario = 1;
    if (tipoDefensaSecundario && tipoDefensaSecundario !== "") {
        multiplicadorAtaqueSecundario = tablaTipos[tipoAtaque][tipoDefensaSecundario];
    }

    const multiplicadorFinal = multiplicadorAtaquePrimario*multiplicadorAtaqueSecundario;
    return multiplicadorFinal;
}

//MENSAJES PARA VER QUÉ TAN EFECTIVO FUE EL GOLPE
const efectividad = (multiplicador) => {

    const mensajes = {
        0: " NO HIZO DAÑO :( ",
        0.25: " ¡FUE CASI NADA DE DAÑO! ",
        0.5: " ¡SE HIZO POCO DAÑO!",
        1: " EL DAÑO FUE EFECTIVO ",
        2: " EL DAÑO FUE BASTANTE EFECTIVO :D ",
        4: " FUE SUPER EFECTIVO "
    };

    if (mensajes[multiplicador] !== undefined) {
        return mensajes[multiplicador];
    } else {
        return " efecto desconocido :s ";
    }
}


// Cargar Pokémon rival al cargar la página
window.addEventListener('load', obtenerPokeRival);

// Asociar el botón para elegir el Pokémon propio
btnElegir.addEventListener('click', obtenerPokePropio);

btnPelear.addEventListener();



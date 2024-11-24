// Atributos del Pokémon rival
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

// Atributos del Pokémon propio
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

// Interfaz de usuario
const input = document.querySelector("#input");
const btnElegir = document.querySelector("#btn-poke");
const btnAtkFis = document.querySelector("#btn-atk-fis");
const btnAtkEsp = document.querySelector("#btn-atk-esp");
const btnPeleaAuto = document.querySelector( "#btn-combate-auto")
const mensajesCombate = document.querySelector("#mensajes-combate");

// Número random para elegir Pokémon rival
const getNumRandom = () => Math.floor(Math.random() * 1008) + 1;

// Mensajes de combate
const agregarMensaje = (mensaje) => {
  if (!mensajesCombate) {
    console.error("El contenedor de mensajes no existe.");
    return;
  }
  const log = document.createElement("p");
  log.textContent = mensaje;
  mensajesCombate.appendChild(log);
};


// Obtener información del Pokémon propio
const obtenerPokePropio = () => {
    const num = input.value;

    axios
        .get(`https://pokeapi.co/api/v2/pokemon/${num}`)
        .then((res) => res.data)
        .then((data) => {
            imgPropio.src = data.sprites.back_default;
            nombrePropio.textContent = data.name;

            // Tipo 1
            tipo1Propio.textContent = data.types[0].type.name;
            tipo1Propio.className = `type ${data.types[0].type.name.toLowerCase()}`;

            // Tipo 2
            if (data.types[1]) {
                tipo2Propio.textContent = data.types[1].type.name;
                tipo2Propio.className = `type ${data.types[1].type.name.toLowerCase()}`;
            } else {
                tipo2Propio.textContent = "";
                tipo2Propio.className = "type"; // Restablece la clase por defecto
            }

            // Estadísticas
            vidaPropio.textContent = data.stats[0].base_stat;
            vidaPropio.setAttribute("data-total", data.stats[0].base_stat); // Establece la vida total
            atkFisPropio.textContent = data.stats[1].base_stat;
            defensaFisPropio.textContent = data.stats[2].base_stat;
            atkEspPropio.textContent = data.stats[3].base_stat;
            defensaEspPropio.textContent = data.stats[4].base_stat;
            velocidadPropio.textContent = data.stats[5].base_stat;

            // Inicializa la barra de vida
            actualizarBarraVida(data.stats[0].base_stat, data.stats[0].base_stat, document.getElementById("hpPropio-bar"));

            agregarMensaje(`¡Tu Pokémon es ${data.name}!`);
        })
        .catch((error) => agregarMensaje("Error al obtener el Pokémon: " + error));
};


// Obtener información del Pokémon rival
const obtenerPokeRival = () => {
    const numPokeRival = getNumRandom();

    axios
        .get(`https://pokeapi.co/api/v2/pokemon/${numPokeRival}`)
        .then((res) => res.data)
        .then((data) => {
            imgRival.src = data.sprites.front_default;
            nombreRival.textContent = data.name;
            tipo1Rival.textContent = data.types[0].type.name;
            tipo2Rival.textContent = data.types[1]?.type.name || "";
            vidaRival.textContent = data.stats[0].base_stat;
            vidaRival.setAttribute("data-total", data.stats[0].base_stat); // Establece la vida total
            atkFisRival.textContent = data.stats[1].base_stat;
            defensaFisRival.textContent = data.stats[2].base_stat;
            atkEspRival.textContent = data.stats[3].base_stat;
            defensaEspRival.textContent = data.stats[4].base_stat;
            velocidadRival.textContent = data.stats[5].base_stat;

            // Inicializa la barra de vida
            actualizarBarraVida(data.stats[0].base_stat, data.stats[0].base_stat, document.getElementById("hpRival-bar"));

            agregarMensaje(`El Pokémon rival es ${data.name}.`);
        })
        .catch((error) => agregarMensaje("Error al obtener el rival: " + error));
};


// Cálculo del daño
const calcularDaño = (ataque, defensa) => {
  const dañoBase = ataque - defensa;
  return Math.max(dañoBase, 1); // Daño mínimo de 1
};

// Combate con turnos automáticos
const combate = (tipoAtaque) => {
    const vidaJugador = parseInt(vidaPropio.textContent);
    const vidaEnemigo = parseInt(vidaRival.textContent);
  
    if (!vidaJugador || !vidaEnemigo) {
      agregarMensaje("Asegúrate de que ambos Pokémon están seleccionados.");
      return;
    }
  
    const velocidadJugador = parseInt(velocidadPropio.textContent) || 0;
    const velocidadDelRival = parseInt(velocidadRival.textContent) || 0;
  
    // Lógica para el turno del jugador y del rival
    const turnoJugador = () => {
      const ataque = tipoAtaque === "auto" ? (Math.random() > 0.5 ? "físico" : "especial") : tipoAtaque;
      atacarJugador(ataque);
    };
  
    const turnoRival = () => {
      const ataque = tipoAtaque === "auto" ? (Math.random() > 0.5 ? "físico" : "especial") : tipoAtaque;
      atacarRival(ataque);
    };
  
    if (velocidadJugador >= velocidadDelRival) {
      agregarMensaje("¡Tu Pokémon es más rápido y ataca primero!");
      turnoJugador();
  
      if (parseInt(vidaRival.textContent) > 0) {
        setTimeout(turnoRival, 1000);
      }
    } else {
      agregarMensaje("¡El Pokémon rival es más rápido y ataca primero!");
      turnoRival();
  
      if (parseInt(vidaPropio.textContent) > 0) {
        setTimeout(turnoJugador, 1000);
      }
    }
  
    // Si el modo automático está activado, continuar el combate
    if (tipoAtaque === "auto") {
      const vidaRestanteJugador = parseInt(vidaPropio.textContent);
      const vidaRestanteRival = parseInt(vidaRival.textContent);
  
      if (vidaRestanteJugador > 0 && vidaRestanteRival > 0) {
        setTimeout(() => combate("auto"), 2000); // Continuar automáticamente
      } else if (vidaRestanteJugador <= 0) {
        agregarMensaje("¡El rival ha ganado el combate!");
      } else if (vidaRestanteRival <= 0) {
        agregarMensaje("¡Has ganado el combate!");
      }
    }
  };
//Atacar jugador
const atacarJugador = (tipoAtaque) => {
  // Determinar el ataque y la defensa a usar según el tipo de ataque
  const ataqueJugador = tipoAtaque === "físico"
      ? parseInt(atkFisPropio.textContent) || 0
      : parseInt(atkEspPropio.textContent) || 0;

  const defensaRival = tipoAtaque === "físico"
      ? parseInt(defensaFisRival.textContent) || 0
      : parseInt(defensaEspRival.textContent) || 0;

  // Calcular daño base
  let dañoBase = ataqueJugador - defensaRival * 0.5;
  dañoBase = Math.max(dañoBase, 1); // Asegurar que el daño no sea menor a 1

  // Aplicar multiplicador de la tabla de tipos
  const multiplicador = calcularMultiplicadorAtaque(
      tipo1Propio.textContent.toLowerCase(),
      tipo1Rival.textContent.toLowerCase(),
      tipo2Rival.textContent.toLowerCase()
  );
  const dañoFinal = Math.floor(dañoBase * multiplicador);

  // Actualizar vida del rival
  const vidaEnemigo = Math.max(parseInt(vidaRival.textContent) - dañoFinal, 0);
  vidaRival.textContent = vidaEnemigo;
  actualizarBarraVida(vidaEnemigo, parseInt(vidaRival.dataset.total), document.getElementById("hpRival-bar"));

  // Mover al Pokémon rival
  moverPokemon(imgRival);
  // Mensajes de combate
  agregarMensaje(`Tu Pokémon usó un ataque ${tipoAtaque}.`);
  agregarMensaje(`Su daño final fue de ${dañoFinal} por ¡la tabla de tipos!.`);
  agregarMensaje(`El rival usó su defensa ${tipoAtaque === "físico" ? "física" : "especial"}.`);

  if (vidaEnemigo <= 0) {
      agregarMensaje("¡Has ganado el combate!");
  }
};
//Atacar Rival
const atacarRival = (tipoAtaque) => {
  // Determinar el ataque y la defensa a usar según el tipo de ataque
  const ataqueRival = tipoAtaque === "físico"
      ? parseInt(atkFisRival.textContent) || 0
      : parseInt(atkEspRival.textContent) || 0;

  const defensaJugador = tipoAtaque === "físico"
      ? parseInt(defensaFisPropio.textContent) || 0
      : parseInt(defensaEspPropio.textContent) || 0;

  // Calcular daño base
  let dañoBase = ataqueRival - defensaJugador * 0.5;
  dañoBase = Math.max(dañoBase, 1); // Asegurar que el daño no sea menor a 1

  // Aplicar multiplicador de la tabla de tipos
  const multiplicador = calcularMultiplicadorAtaque(
      tipo1Rival.textContent.toLowerCase(),
      tipo1Propio.textContent.toLowerCase(),
      tipo2Propio.textContent.toLowerCase()
  );
  const dañoFinal = Math.floor(dañoBase * multiplicador);

  // Actualizar vida del jugador
  const vidaJugador = Math.max(parseInt(vidaPropio.textContent) - dañoFinal, 0);
  vidaPropio.textContent = vidaJugador;
  actualizarBarraVida(vidaJugador, parseInt(vidaPropio.dataset.total), document.getElementById("hpPropio-bar"));
  //mover a Pokemon Propio
  moverPokemon(imgPropio)
  // Mensajes de combate
  agregarMensaje(`El Pokémon rival usó un ataque ${tipoAtaque}.`);
  agregarMensaje(`Su daño final fue de ${dañoFinal} por ¡la tabla de tipos!.`);
  agregarMensaje(`Tu Pokémon usó su defensa ${tipoAtaque === "físico" ? "física" : "especial"}.`);

  if (vidaJugador <= 0) {
      agregarMensaje("¡Has perdido el combate!");
  }
};
const calcularMultiplicadorAtaque = (tipoAtaque, tipoDefensa1, tipoDefensa2) => {
    const tablaTipos = {
        "steel": {"normal": 1, "fire": 0.5, "water": 0.5, "grass": 1, "electric": 0.5, "ice": 2, "fighting": 1, "poison": 1, "ground": 1, "flying": 1, "psychic": 1, "bug": 1, "rock": 2, "ghost": 1, "dragon": 1, "dark": 1, "steel": 0.5, "fairy": 2 },
        "water": {"normal": 1, "fire": 2, "water": 0.5, "grass": 0.5, "electric": 1, "ice": 1, "fighting": 1, "poison": 1, "ground": 2, "flying": 1, "psychic": 1, "bug": 1, "rock": 2, "ghost": 1, "dragon": 0.5, "dark": 1, "steel": 1, "fairy": 1 },
        "bug": {"normal": 1, "fire": 0.5, "water": 1, "grass": 2, "electric": 1, "ice": 1, "fighting": 0.5, "poison": 0.5, "ground": 1, "flying": 0.5, "psychic": 2, "bug": 1, "rock": 1, "ghost": 0.5, "dragon": 1, "dark": 2, "steel": 0.5, "fairy": 0.5 },
        "dragon": {"normal": 1, "fire": 1, "water": 1, "grass": 1, "electric": 1, "ice": 1, "fighting": 1, "poison": 1, "ground": 1, "flying": 1, "psychic": 1, "bug": 1, "rock": 1, "ghost": 1, "dragon": 2, "dark": 1, "steel": 0.5, "fairy": 0 },
        "electric": {"normal": 1, "fire": 1, "water": 2, "grass": 0.5, "electric": 0.5, "ice": 1, "fighting": 1, "poison": 1, "ground": 0, "flying": 2, "psychic": 1, "bug": 1, "rock": 1, "ghost": 1, "dragon": 0.5, "dark": 1, "steel": 1, "fairy": 1 },
        "ghost": {"normal": 0, "fire": 1, "water": 1, "grass": 1, "electric": 1, "ice": 1, "fighting": 1, "poison": 1, "ground": 1, "flying": 1, "psychic": 2, "bug": 1, "rock": 1, "ghost": 2, "dragon": 1, "dark": 0.5, "steel": 1, "fairy": 1 },
        "fire": {"normal": 1, "fire": 0.5, "water": 0.5, "grass": 2, "electric": 1, "ice": 2, "fighting": 1, "poison": 1, "ground": 1, "flying": 1, "psychic": 1, "bug": 2, "rock": 0.5, "ghost": 1, "dragon": 0.5, "dark": 1, "steel": 2, "fairy": 1 },
        "fairy": {"normal": 1, "fire": 0.5, "water": 1, "grass": 1, "electric": 1, "ice": 1, "fighting": 2, "poison": 0.5, "ground": 1, "flying": 1, "psychic": 1, "bug": 1, "rock": 1, "ghost": 1, "dragon": 2, "dark": 2, "steel": 0.5, "fairy": 1 },
        "ice":{"normal": 1, "fire": 0.5, "water": 0.5, "grass": 2, "electric": 1, "ice": 0.5, "fighting": 2, "poison": 0.5, "ground": 2, "flying": 0.5, "psychic": 0.5, "bug": 0.5, "rock": 1, "ghost": 1, "dragon": 2, "dark": 1, "steel": 0.5, "fairy": 1 },
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

  const multiplicador1 = tablaTipos[tipoAtaque]?.[tipoDefensa1] || 1;
  const multiplicador2 = tablaTipos[tipoAtaque]?.[tipoDefensa2] || 1;
    const multiplicadorTotal = multiplicador1 * multiplicador2;
  return multiplicador1 * multiplicador2;
};

const actualizarBarraVida = (vidaActual, vidaTotal, barra) => {
    const porcentaje = (vidaActual / vidaTotal) * 100;
    barra.style.width = `${porcentaje}%`;

    // Cambiar el color según el porcentaje de vida
    if (porcentaje > 50) {
        barra.style.backgroundColor = "green";
    } else if (porcentaje > 20) {
        barra.style.backgroundColor = "yellow";
    } else {
        barra.style.backgroundColor = "red";
    }
};

// Función para aplicar movimiento (sacudida) al Pokémon
const moverPokemon = (pokemonElement) => {
  if (!pokemonElement) return;
  pokemonElement.classList.add("shake");

  // Remover la clase después de la animación
  setTimeout(() => {
    pokemonElement.classList.remove("shake");
  }, 500); // Duración de la animación
};

btnElegir.addEventListener("click", obtenerPokePropio);
btnAtkFis.addEventListener("click", () => combate("físico"));
btnAtkEsp.addEventListener("click", () => combate("especial"));
btnPeleaAuto.addEventListener("click", () => {
    agregarMensaje("¡Inicia el combate automático!");
    combate("auto");
  });
window.addEventListener("load", obtenerPokeRival);
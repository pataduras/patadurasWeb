// =====================================================
// BASE DE PARTIDOS (MISMO CONTENIDO QUE ME PASASTE)
// =====================================================
const PARTIDOS_DB = {
    1: {
        lugarYHora: {
            fecha: "Domingo 16/2, 18:00",
            estadio: "Sportivo Barracas, Barracas"
        },
        equipos: [
            {
                nombre: "Astros de la Gambeta",
                logo: "https://pbs.twimg.com/media/GjoHU1wXwAANOJr?format=png&name=360x360",
                goles: 7,
                jugadores: [
                    { nombre: "Franco Favotti", goles: 1 },
                    { nombre: "Tobias Winjak", goles: 1 },
                    { nombre: "Alejo Osuna", goles: 1 },
                    { nombre: "Diego Arroyo", goles: 2 },
                    { nombre: "Maxi Ventura", goles: 1 },
                    { nombre: "Teo Formento", goles: 1 },
                    { nombre: "Facundo Moran", goles: 0 },
                    { nombre: "Nahuel Monti", goles: 0 }
                ]
            },
            {
                nombre: "La Comunidad del Anillo",
                logo: "https://pbs.twimg.com/media/Gjq34pIXcAAYx-K?format=png&name=small",
                goles: 4,
                jugadores: [
                    { nombre: "Agustin Navarro", goles: 1 },
                    { nombre: "Fabrizio Cecchini", goles: 1 },
                    { nombre: "Juanse Macchi", goles: 0 },
                    { nombre: "Jeronimo Hidalgo", goles: 0 },
                    { nombre: "Agustin Lonero", goles: 0 },
                    { nombre: "Enzo Juarez", goles: 1 },
                    { nombre: "Gerardo Vaello", goles: 1 }
                ]
            }
        ]
    },

    2: {
        lugarYHora: {
            fecha: "Domingo 23/3, 20:00",
            estadio: "Sportivo Barracas, Barracas"
        },
        equipos: [
            {
                nombre: "Astros de la Gambeta",
                logo: "https://pbs.twimg.com/media/GjoHU1wXwAANOJr?format=png&name=360x360",
                goles: 14,
                jugadores: [
                    { nombre: "Franco Favotti", goles: 1 },
                    { nombre: "Tobias Winjak", goles: 1 },
                    { nombre: "Manuel Panizo", goles: 0 },
                    { nombre: "Alejo Osuna", goles: 2 },
                    { nombre: "Diego Arroyo", goles: 5 },
                    { nombre: "Maxi Ventura", goles: 5 },
                    { nombre: "Teo Formento", goles: 0 },
                    { nombre: "Facundo Moran", goles: 0 }
                ]
            },
            {
                nombre: "La Comunidad del Anillo",
                logo: "https://pbs.twimg.com/media/Gjq34pIXcAAYx-K?format=png&name=small",
                goles: 7,
                jugadores: [
                    { nombre: "Agustin Navarro", goles: 1 },
                    { nombre: "Fabrizio Cecchini", goles: 0 },
                    { nombre: "Juanse Macchi", goles: 0 },
                    { nombre: "Jeronimo Hidalgo", goles: 1 },
                    { nombre: "Agustin Lonero", goles: 0 },
                    { nombre: "Enzo Juarez", goles: 2 },
                    { nombre: "Gerardo Vaello", goles: 0 },
                    { nombre: "Tomas Mango", goles: 3 }
                ]
            }
        ]
    },

    3: {
        lugarYHora: {
            fecha: "Domingo 17/4, 19:00",
            estadio: "Open Gallo"
        },
        equipos: [
            {
                nombre: "Astros de la Gambeta",
                logo: "https://pbs.twimg.com/media/GjoHU1wXwAANOJr?format=png&name=360x360",
                goles: 5,
                jugadores: [
                    { nombre: "Franco Favotti", goles: 0 },
                    { nombre: "Alejo Osuna", goles: 0 },
                    { nombre: "Diego Arroyo", goles: 4 },
                    { nombre: "Maxi Ventura", goles: 1 },
                    { nombre: "Teo Formento", goles: 0 },
                    { nombre: "Facundo Moran", goles: 0 },
                    { nombre: "Nahuel Monti", goles: 0 },
                    { nombre: "Gerardo Vaello", goles: 0 }
                ]
            },
            {
                nombre: "La Comunidad del Anillo",
                logo: "https://pbs.twimg.com/media/Gjq34pIXcAAYx-K?format=png&name=small",
                goles: 10,
                jugadores: [
                    { nombre: "Agustin Navarro", goles: 0 },
                    { nombre: "Fabrizio Cecchini", goles: 2 },
                    { nombre: "Juanse Macchi", goles: 2 },
                    { nombre: "Jeronimo Hidalgo", goles: 0 },
                    { nombre: "Agustin Lonero", goles: 0 },
                    { nombre: "Manuel Panizo", goles: 0 },
                    { nombre: "Mateo Pugliese", goles: 2 },
                    { nombre: "Tomas Mango", goles: 4 }
                ]
            }
        ]
    },

    4: {
        lugarYHora: {
            fecha: "Domingo 11/5, 16:00",
            estadio: "La Barraca, Barracas"
        },
        equipos: [
            {
                nombre: "Astros de la Gambeta",
                logo: "https://pbs.twimg.com/media/GjoHU1wXwAANOJr?format=png&name=360x360",
                goles: 4,
                jugadores: [
                    { nombre: "Franco Favotti", goles: 2 },
                    { nombre: "Tobias Winjak", goles: 1 },
                    { nombre: "Alejo Osuna", goles: 0 },
                    { nombre: "Maxi Ventura", goles: 1 },
                    { nombre: "Facundo Moran", goles: 0 }
                ]
            },
            {
                nombre: "La Comunidad del Anillo",
                logo: "https://pbs.twimg.com/media/Gjq34pIXcAAYx-K?format=png&name=small",
                goles: 7,
                jugadores: [
                    { nombre: "Jeronimo Hidalgo", goles: 2 },
                    { nombre: "Juanse Macchi", goles: 1 },
                    { nombre: "Manuel Panizo", goles: 0 },
                    { nombre: "Mateo Pugliese", goles: 1 },
                    { nombre: "Tomas Mango", goles: 3 },
                    { nombre: "Franco Mangiameli", goles: 0 },
                    { nombre: "Enzo Juarez", goles: 0 }
                ]
            }
        ]
    },

    5: {
        lugarYHora: {
            fecha: "Viernes 20/6, 16:00",
            estadio: "La Barraca, Barracas"
        },
        equipos: [
            {
                nombre: "Astros de la Gambeta",
                logo: "https://pbs.twimg.com/media/GjoHU1wXwAANOJr?format=png&name=360x360",
                goles: 5,
                jugadores: [
                    { nombre: "Franco Favotti", goles: 0 },
                    { nombre: "Tobias Winjak", goles: 1 },
                    { nombre: "Alejo Osuna", goles: 0 },
                    { nombre: "Maxi Ventura", goles: 1 },
                    { nombre: "Diego Arroyo", goles: 3 },
                    { nombre: "Nahuel Monti", goles: 0 },
                    { nombre: "Gerardo Vaello", goles: 0 }
                ]
            },
            {
                nombre: "La Comunidad del Anillo",
                logo: "https://pbs.twimg.com/media/Gjq34pIXcAAYx-K?format=png&name=small",
                goles: 8,
                jugadores: [
                    { nombre: "Agustin Navarro", goles: 0 },
                    { nombre: "Jeronimo Hidalgo", goles: 0 },
                    { nombre: "Juanse Macchi", goles: 1 },
                    { nombre: "Manuel Panizo", goles: 0 },
                    { nombre: "Mateo Pugliese", goles: 2 },
                    { nombre: "Tomas Mango", goles: 5 },
                    { nombre: "Fabrizio Cecchini", goles: 0 }
                ]
            }
        ]
    },

    6: {
        lugarYHora: {
            fecha: "Domingo 27/7, 16:00",
            estadio: "Que Golazo, Parque Patricios"
        },
        equipos: [
            {
                nombre: "Astros de la Gambeta",
                logo: "https://pbs.twimg.com/media/GjoHU1wXwAANOJr?format=png&name=360x360",
                goles: 3,
                jugadores: [
                    { nombre: "Franco Favotti", goles: 0 },
                    { nombre: "Alejo Osuna", goles: 1 },
                    { nombre: "Maxi Ventura", goles: 1 },
                    { nombre: "Facundo Moran", goles: 0 },
                    { nombre: "Fabrizio Cecchini", goles: 1 },
                    { nombre: "Nahuel Monti", goles: 0 },
                    { nombre: "Nahuel Lonero", goles: 0 },
                    { nombre: "Joni Monti", goles: 0 }
                ]
            },
            {
                nombre: "La Comunidad del Anillo",
                logo: "https://pbs.twimg.com/media/Gjq34pIXcAAYx-K?format=png&name=small",
                goles: 4,
                jugadores: [
                    { nombre: "Agustin Navarro", goles: 0 },
                    { nombre: "Jeronimo Hidalgo", goles: 0 },
                    { nombre: "Juanse Macchi", goles: 0 },
                    { nombre: "Mateo Pugliese", goles: 2 },
                    { nombre: "Franco Mangiameli", goles: 1 },
                    { nombre: "Agustin Lonero", goles: 0 },
                    { nombre: "Enzo Juarez", goles: 1 },
                ]
            }
        ]
    },
    7: {
        lugarYHora: {
            fecha: "Domingo 24/8, 18:00",
            estadio: "Sportivo Barracas, Barracas"
        },
        equipos: [
            {
                nombre: "Astros de la Gambeta",
                logo: "https://pbs.twimg.com/media/GjoHU1wXwAANOJr?format=png&name=360x360",
                goles: 7,
                jugadores: [
                    { nombre: "Franco Favotti", goles: 0 },
                    { nombre: "Tobias Winjak", goles: 0 },
                    { nombre: "Fabrizio Cecchini", goles: 0 },
                    { nombre: "Diego Arroyo", goles: 5 },
                    { nombre: "Alejo Osuna", goles: 1 },
                    { nombre: "Maxi Ventura", goles: 1 },
                    { nombre: "Facundo Moran", goles: 0 }
                ]
            },
            {
                nombre: "La Comunidad del Anillo",
                logo: "https://pbs.twimg.com/media/Gjq34pIXcAAYx-K?format=png&name=small",
                goles: 9,
                jugadores: [
                    { nombre: "Agustin Navarro", goles: 1 },
                    { nombre: "Jeronimo Hidalgo", goles: 1 },
                    { nombre: "Juanse Macchi", goles: 1 },
                    { nombre: "Mateo Pugliese", goles: 2 },
                    { nombre: "Franco Mangiameli", goles: 1 },
                    { nombre: "Manuel Panizo", goles: 0 },
                    { nombre: "Enzo Juarez", goles: 3 }
                ]
            }
        ]
    },

    8: {
        lugarYHora: {
            fecha: "Domingo 28/9, 20:00",
            estadio: "Sportivo Barracas, Barracas"
        },
        equipos: [
            {
                nombre: "Astros de la Gambeta",
                logo: "https://pbs.twimg.com/media/GjoHU1wXwAANOJr?format=png&name=360x360",
                goles: 4,
                jugadores: [
                    { nombre: "Tobias Winjak", goles: 0 },
                    { nombre: "Fabrizio Cecchini", goles: 0 },
                    { nombre: "Diego Arroyo", goles: 2 },
                    { nombre: "Alejo Osuna", goles: 2 },
                    { nombre: "Maxi Ventura", goles: 0 },
                    { nombre: "Facundo Moran", goles: 0 },
                    { nombre: "Nahuel Monti", goles: 0 },
                    { nombre: "Joni Monti", goles: 0 }
                ]
            },
            {
                nombre: "La Comunidad del Anillo",
                logo: "https://pbs.twimg.com/media/Gjq34pIXcAAYx-K?format=png&name=small",
                goles: 3,
                jugadores: [
                    { nombre: "Agustin Navarro", goles: 0 },
                    { nombre: "Jeronimo Hidalgo", goles: 0 },
                    { nombre: "Juanse Macchi", goles: 0 },
                    { nombre: "Tomas Mango", goles: 1 },
                    { nombre: "Franco Mangiameli", goles: 2 },
                    { nombre: "Manuel Panizo", goles: 0 },
                    { nombre: "Enzo Juarez", goles: 0 },
                    { nombre: "Agustin Lonero", goles: 0 }
                ]
            }
        ]
    },

    9: {
        lugarYHora: {
            fecha: "Domingo 12/10, 19:00",
            estadio: "Que Golazo, Parque Patricios"
        },
        equipos: [
            {
                nombre: "Astros de la Gambeta",
                logo: "https://pbs.twimg.com/media/GjoHU1wXwAANOJr?format=png&name=360x360",
                goles: 10,
                jugadores: [
                    { nombre: "Franco Favotti", goles: 0 },
                    { nombre: "Tobias Winjak", goles: 2 },
                    { nombre: "Fabrizio Cecchini", goles: 1 },
                    { nombre: "Diego Arroyo", goles: 4 },
                    { nombre: "Alejo Osuna", goles: 0 },
                    { nombre: "Maxi Ventura", goles: 3 },
                    { nombre: "Facundo Moran", goles: 0 },
                    { nombre: "Nahuel Lonero", goles: 0 }
                ]
            },
            {
                nombre: "La Comunidad del Anillo",
                logo: "https://pbs.twimg.com/media/Gjq34pIXcAAYx-K?format=png&name=small",
                goles: 3,
                jugadores: [
                    { nombre: "Agustin Navarro", goles: 0 },
                    { nombre: "Jeronimo Hidalgo", goles: 0 },
                    { nombre: "Juanse Macchi", goles: 0 },
                    { nombre: "Mateo Pugliese", goles: 1 },
                    { nombre: "Franco Mangiameli", goles: 2 },
                    { nombre: "Manuel Panizo", goles: 0 },
                    { nombre: "Agustin Lonero", goles: 0 },
                ]
            }
        ]
    },

    10: {
        lugarYHora: {
            fecha: "Domingo 24/11, 16:00",
            estadio: "La Barraca, Barracas"
        },
        equipos: [
            {
                nombre: "Astros de la Gambeta",
                logo: "https://pbs.twimg.com/media/GjoHU1wXwAANOJr?format=png&name=360x360",
                goles: 13,
                jugadores: [
                    { nombre: "Franco Favotti", goles: 0 },
                    { nombre: "Tobias Winjak", goles: 0 },
                    { nombre: "Fabrizio Cecchini", goles: 4 },
                    { nombre: "Diego Arroyo", goles: 4 },
                    { nombre: "Alejo Osuna", goles: 1 },
                    { nombre: "Maxi Ventura", goles: 3 },
                    { nombre: "Facundo Moran", goles: 0 },
                    { nombre: "Nahuel Monti", goles: 1 }
                ]
            },
            {
                nombre: "La Comunidad del Anillo",
                logo: "https://pbs.twimg.com/media/Gjq34pIXcAAYx-K?format=png&name=small",
                goles: 1,
                jugadores: [
                    { nombre: "Agustin Navarro", goles: 0 },
                    { nombre: "Jeronimo Hidalgo", goles: 0 },
                    { nombre: "Juanse Macchi", goles: 0 },
                    { nombre: "Tomas Mango", goles: 0 },
                    { nombre: "Franco Mangiameli", goles: 0 },
                    { nombre: "Manuel Panizo", goles: 0 },
                    { nombre: "Agustin Lonero", goles: 0 },
                    { nombre: "Milton Cabrera", goles: 1 },
                ]
            }
        ]
    }
};


// ============================================================
// GENERAR window.PARTIDO SEGÚN ?partido=
// ============================================================
const params = new URLSearchParams(window.location.search);
const partidoNum = params.get("partido") || "1";
const base = PARTIDOS_DB[partidoNum];

if (base) {
    window.PARTIDO = {
        lugarYHora: base.lugarYHora,
        equipos: base.equipos.map(e => ({
            nombre: e.nombre,
            logo: e.logo,
            goles: e.goles,

            // Solo nombres para la tabla de jugadores
            jugadores: e.jugadores,

            // Goles individuales generados automáticamente
            golesIndividuales: e.jugadores
                .filter(j => j.goles > 0)
                .flatMap(j =>
                    Array(j.goles).fill(0).map(() => ({
                        jugador: j.nombre,
                        minuto: "-"
                    }))
                )
        }))
    };
} else {
    window.PARTIDO = null;
}
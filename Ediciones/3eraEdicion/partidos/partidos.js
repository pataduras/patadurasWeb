// =====================================================
// BASE DE PARTIDOS (MISMO CONTENIDO QUE ME PASASTE)
// =====================================================
const PARTIDOS_DB = {
    1: {
        lugarYHora: {
            fecha: "Sabado 28/2, 17:00",
            estadio: "Sportivo Barracas, Barracas"
        },
        equipos: [
            {
                nombre: "La Naranja Lechera",
                logo: "logos/logoNaranjaLechera.png",
                goles: 5,
                jugadores: [
                    { nombre: "Nahuel Monti (C)", goles: 1 },
                    { nombre: "Jeronimo Hidalgo", goles: 0 },
                    { nombre: "Franco Favotti", goles: 3 },
                    { nombre: "Diego Arroyo", goles: 1 },
                    { nombre: "Manuel Panizo", goles: 0 },
                    { nombre: "Vilche", goles: 0 },
                ]
            },
            {
                nombre: "Los Guerreros Z",
                logo: "logos/logoGuerrerosZ.png",
                goles: 3,
                jugadores: [
                    { nombre: "Gerardo Vaello (C)", goles: 0 },
                    { nombre: "Agustin Navarro", goles: 0 },
                    { nombre: "Fabrizio Cecchini", goles: 0 },
                    { nombre: "Juanse Macchi", goles: 0 },
                    { nombre: "Maxi Ventura", goles: 2 },
                    { nombre: "Agustin Lonero", goles: 0 },
                    { nombre: "Enzo Juarez", goles: 1 },
                    { nombre: "Facundo Morán", goles: 0 }
                ]
            }
        ]
    },

    2: {
        lugarYHora: {
            fecha: "Domingo 29/03, 19:00",
            estadio: "Polideportivo Patricios"
        },
        equipos: [
            {
                nombre: "La Naranja Lechera",
                logo: "logos/logoNaranjaLechera.png",
                goles: '2',
                jugadores: [
                    { nombre: "Nahuel Monti (C)", goles: 0 },
                    { nombre: "Jeronimo Hidalgo", goles: 1 },
                    { nombre: "Franco Favotti", goles: 0 },
                    { nombre: "Joni", goles: 1 },
                    { nombre: "Nicolás Viale", goles: 0 },
                    { nombre: "Facundo Morán* (Temporal)", goles: 0 },
                ]
            },
            {
                nombre: "Los Guerreros Z",
                logo: "logos/logoGuerrerosZ.png",
                goles: '6',
                jugadores: [
                    { nombre: "Tomás Mango(C)", goles:  3},
                    { nombre: "Agustin Navarro", goles: 1 },
                    { nombre: "Fabrizio Cecchini", goles: 0 },
                    { nombre: "Juanse Macchi", goles: 0 },
                    { nombre: "Maxi Ventura", goles: 1 },
                    { nombre: "Tobías Winjak", goles: 0 },
                    { nombre: "Alejo Osuna", goles: 1 },
                    { nombre: "Teo Formento", goles: 0 },
                ]
            }
        ]
    },

    3: {
        lugarYHora: {
            fecha: "Domingo 12/03, 19:00",
            estadio: "Que Golazo, Parque Patricios, La Boca"
        },
        equipos: [
            {
                nombre: "La Naranja Lechera",
                logo: "logos/logoNaranjaLechera.png",
                goles: '3',
                jugadores: [
                    { nombre: "Nahuel Monti (C)", goles: 0 },
                    { nombre: "Jeronimo Hidalgo", goles: 0 },
                    { nombre: "Franco Favotti", goles: 0 },
                    { nombre: "Joni", goles: 0 },
                    { nombre: "Nicolás Viale", goles: 2 },
                    { nombre: "Manuel Panizo", goles: 0 },
                    { nombre: "Agustín Lonero", goles: 1 },
                ]
            },
            {
                nombre: "Los Guerreros Z",
                logo: "logos/logoGuerrerosZ.png",
                goles: '6',
                jugadores: [
                    { nombre: "Gerardo Vaello (C)", goles:  0},
                    { nombre: "Tomás Mango", goles:  2},
                    { nombre: "Agustin Navarro", goles: 0},
                    { nombre: "Fabrizio Cecchini", goles: 0 },
                    { nombre: "Juanse Macchi", goles: 1 },
                    { nombre: "Maxi Ventura", goles: 1 },
                    { nombre: "Enzo Juarez", goles: 2 },
                    { nombre: "Alejo Osuna", goles: 0 },
                ]
            }
        ]
    },

    4: {
        lugarYHora: {
            fecha: "",
            estadio: "-"
        },
        equipos: [
            {
                nombre: "La Naranja Lechera",
                logo: "logos/logoNaranjaLechera.png",
                goles: '-',
                jugadores: [
                    
                ]
            },
            {
                nombre: "Los Guerreros Z",
                logo: "logos/logoGuerrerosZ.png",
                goles: '-',
                jugadores: [
                    
                ]
            }
        ]
    },

    5: {
        lugarYHora: {
            fecha: "-",
            estadio: "-"
        },
        equipos: [
            {
                nombre: "La Naranja Lechera",
                logo: "logos/logoNaranjaLechera.png",
                goles: '-',
                jugadores: [
                   
                ]
            },
            {
                nombre: "Los Guerreros Z",
                logo: "logos/logoGuerrerosZ.png",
                goles: '-',
                jugadores: [
                    
                ]
            }
        ]
    },

    6: {
        lugarYHora: {
            fecha: "-",
            estadio: "-"
        },
        equipos: [
            {
                nombre: "La Naranja Lechera",
                logo: "logos/logoNaranjaLechera.png",
                goles: '-',
                jugadores: [
                   
                ]
            },
            {
                nombre: "Los Guerreros Z",
                logo: "logos/logoGuerrerosZ.png",
                goles: '-',
                jugadores: [
                    
                ]
            }
        ]
    },
    7: {
        lugarYHora: {
            fecha: "-",
            estadio: "-"
        },
        equipos: [
            {
                nombre: "La Naranja Lechera",
                logo: "logos/logoNaranjaLechera.png",
                goles: '-',
                jugadores: [
                    
                ]
            },
            {
                nombre: "Los Guerreros Z",
                logo: "logos/logoGuerrerosZ.png",
                goles: '-',
                jugadores: [
                ]
            }
        ]
    },

    8: {
        lugarYHora: {
            fecha: "-",
            estadio: "-"
        },
        equipos: [
            {
                nombre: "La Naranja Lechera",
                logo: "logos/logoNaranjaLechera.png",
                goles: '-',
                jugadores: [
                   
                ]
            },
            {
                nombre: "Los Guerreros Z",
                logo: "logos/logoGuerrerosZ.png",
                goles: '-',
                jugadores: [
                
                ]
            }
        ]
    },

    9: {
        lugarYHora: {
            fecha: "-",
            estadio: "-"
        },
        equipos: [
            {
                nombre: "La Naranja Lechera",
                logo: "logos/logoNaranjaLechera.png",
                goles: '-',
                jugadores: [
                 
                ]
            },
            {
                nombre: "Los Guerreros Z",
                logo: "logos/logoGuerrerosZ.png",
                goles: '-',
                jugadores: [
                    
                ]
            }
        ]
    },

    10: {
        lugarYHora: {
            fecha: "-",
            estadio: "-"
        },
        equipos: [
            {
                nombre: "La Naranja Lechera",
                logo: "logos/logoNaranjaLechera.png",
                goles: '-',
                jugadores: [
                    
                ]
            },
            {
                nombre: "Los Guerreros Z",
                logo: "logos/logoGuerrerosZ.png",
                goles: '-',
                jugadores: [
                
                ]
            }
        ]
    },

    11: {
        lugarYHora: {
            fecha: "",
            estadio: ""
        },
        equipos: [
            {
                nombre: "La Naranja Lechera",
                logo: "logos/logoNaranjaLechera.png",
                goles: '-',
                jugadores: [
                   
                ]
            },
            {
                nombre: "Los Guerreros Z",
                logo: "logos/logoGuerrerosZ.png",
                goles: '-',
                jugadores: [
                    
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
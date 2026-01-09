/* ========================
   LISTA DE EQUIPOS
======================== */

const TEAMS = [
    {
        id: 'astros',
        name: 'Astros de la Gambeta',
        logo: 'https://pbs.twimg.com/media/GjoHU1wXwAANOJr?format=png&name=360x360',
        indumentaria: 'Clara',
        players: [
            'Franco Favotti (C)','Tobia Winjak','Alejo Osuna','Diego Arroyo',
            'Facundo Moran','Teo Formento','Maxi Ventura','Nahuel Monti',
            'Nahuel Lonero','Fabrizio Cecchini','Joni Monti','Gerardo Vaello'
        ]
    },
    {
        id: 'comunidad',
        name: 'La Comunidad del Anillo',
        logo: 'https://pbs.twimg.com/media/Gjq34pIXcAAYx-K?format=png&name=small',
        indumentaria: 'Oscura',
        players: [
            'Agustin Navarro (C)','Tomas Mango','Juanse Macchi','Lucas Garcia',
            'Jeronimo Hidalgo','Enzo Juarez','Agustin Lonero','Franco Mangiameli',
            'Manuel Panizo','Mateo Pugliese','Milton Cabrera'
        ]
    }
];

function T(id) { return TEAMS.find(t => t.id === id); }

/* ================================
   FIXTURE (9 partidos completos)
================================ */
const FIXTURE = [
    { fecha:1, local:T('astros'), visitante:T('comunidad'), goles_local:7, goles_visitante:4, link:'partidos/partido.html?partido=1' },
    { fecha:2, local:T('astros'), visitante:T('comunidad'), goles_local:14, goles_visitante:7, link:'partidos/partido.html?partido=2' },
    { fecha:3, local:T('astros'), visitante:T('comunidad'), goles_local:5, goles_visitante:10, link:'partidos/partido.html?partido=3' },
    { fecha:4, local:T('astros'), visitante:T('comunidad'), goles_local:4, goles_visitante:7, link:'partidos/partido.html?partido=4' },
    { fecha:5, local:T('astros'), visitante:T('comunidad'), goles_local:5, goles_visitante:8, link:'partidos/partido.html?partido=5' },
    { fecha:6, local:T('astros'), visitante:T('comunidad'), goles_local:3, goles_visitante:4, link:'partidos/partido.html?partido=6' },
    { fecha:7, local:T('astros'), visitante:T('comunidad'), goles_local:7, goles_visitante:9, link:'partidos/partido.html?partido=7' },
    { fecha:8, local:T('astros'), visitante:T('comunidad'), goles_local:4, goles_visitante:3, link:'partidos/partido.html?partido=8' },
    { fecha:9, local:T('astros'), visitante:T('comunidad'), goles_local:10, goles_visitante:3, link:'partidos/partido.html?partido=9' },
    { fecha:10, local:T('astros'), visitante:T('comunidad'), goles_local:13, goles_visitante:1, link:'partidos/partido.html?partido=10' },
    { fecha:11, local:T('astros'), visitante:T('comunidad'), goles_local:3, goles_visitante:5, link:'partidos/partido.html?partido=11' }
];

/* ================================
   GOLEADORES (con equipo)
================================ */
const GOLEADORES = [
    { jugador:'Diego Arroyo', equipo:T('astros'), goles:25 },
    { jugador:'Tomas Mango', equipo:T('comunidad'), goles:16 },
    { jugador:'Maxi Ventura', equipo:T('astros'), goles:14 },
    { jugador:'Mateo Pugliese', equipo:T('comunidad'), goles:10 },
    { jugador:'Alejo Osuna', equipo:T('astros'), goles:7 },
    { jugador:'Enzo Juarez', equipo:T('comunidad'), goles:7 },
    { jugador:'Tobias Winjak', equipo:T('astros'), goles:6 },
    { jugador:'Franco Mangiameli', equipo:T('comunidad'), goles:6 },
    { jugador:'Juanse Macchi', equipo:T('comunidad'), goles:5 },
    { jugador:'Fabrizio Cecchini', equipo:T('astros'), goles:5 },
    { jugador:'Franco Favotti', equipo:T('astros'), goles:4 },
    { jugador:'Jeronimo Hidalgo', equipo:T('comunidad'), goles:4 },
    { jugador:'Agustin Navarro', equipo:T('comunidad'), goles:3 },
    { jugador:'Teo Formento', equipo:T('astros'), goles:1 },
    { jugador:'Gerardo Vaello', equipo:T('astros'), goles:1 }
];

/* ================================
   MVPs
================================ */
const MVPS = [
    { fecha:1, equipo:T('astros'), jugador:'Diego Arroyo' },
    { fecha:2, equipo:T('astros'), jugador:'Diego Arroyo' },
    { fecha:3, equipo:T('comunidad'), jugador:'Mateo Pugliese' },
    { fecha:4, equipo:T('comunidad'), jugador:'Juanse Macchi' },
    { fecha:5, equipo:T('comunidad'), jugador:'Tomas Mango' },
    { fecha:6, equipo:T('comunidad'), jugador:'Franco Mangiameli' },
    { fecha:7, equipo:T('comunidad'), jugador:'Mateo Pugliese' },
    { fecha:8, equipo:T('astros'), jugador:'Alejo Osuna' },
    { fecha:9, equipo:T('astros'), jugador:'Diego Arroyo' }
];

/* ================================
   TRANSFERENCIAS (se muestran
   debajo de Equipos)
================================ */
const TRANSFERS = [
    { jugador:'Manuel Panizo', desde:'Astros de la Gambeta', destino:'Comunidad del Anillo' },
    { jugador:'Gerardo Vaello', desde:'La Comunidad del Anillo', destino:'Astros de la Gambeta' },
    { jugador:'Milton Cabrera', desde:'Astros de la Gambeta', destino:'Comunidad del Anillo' },
    { jugador:'Fabrizio Cecchini', desde:'La Comunidad del Anillo', destino:'Astros de la Gambeta' },
    { jugador:'Joni Monti', desde:'Libre', destino:'Astros de la Gambeta' }
];


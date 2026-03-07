// ================================
//  EQUIPOS
// ================================
const TEAMS = [
    {
        id: 'naranjaLechera',
        name: 'La Naranja Lechera',
        logo: 'logoNaranjaLechera.png',
        indumentaria: 'Clara',
        players: [
            'Nahuel Monti (C)', 'Jeronimo Hidalgo', 'Franco Favotti', 'Manuel Panizo', 'Diego Arroyo',
            'Franco Mangiameli', 'Joni Monti', 'Vilche', 'Mateo Pugliese', 'Nicolás', 'Nahuel Lonero', 
            'Milton Cabrera', 'Lucas Garcia'
        ]
    },
    {
        id: 'guerrerosZ',
        name: 'Los Guerreros Z',
        logo: 'logoGuerrerosZ.png',
        indumentaria: 'Oscura',
        players: [
            'Gerardo Vaello (C)', 'Agustin Navarro', 'Tobias Winjak', 'Tomas Mango', 'Juanse Macchi', 'Fabrizio Cecchini',
            'Enzo Juarez', 'Alejo Osuna', 'Agustin Lonero', 'Maxi Ventura', 'Facundo Morán', 'Teo Formento', ''
        ]
    }
];

function T(id) { return TEAMS.find(t => t.id === id); }

// ================================
//  FIXTURE
// ================================
const FIXTURE = [
    { fecha:1,  local:T('naranjaLechera'), visitante:T('guerrerosZ'), goles_local:5,  goles_visitante:3,  link:'partidos/partido.html?partido=1' },
    { fecha:2,  local:T('naranjaLechera'), visitante:T('guerrerosZ'), goles_local:'-', goles_visitante:'-',  /*link:'partidos/partido.html?partido=2'*/ },
    { fecha:3,  local:T('naranjaLechera'), visitante:T('guerrerosZ'), goles_local:'-',  goles_visitante:'-', /*link:'partidos/partido.html?partido=3'*/ },
    { fecha:4,  local:T('naranjaLechera'), visitante:T('guerrerosZ'), goles_local:'-',  goles_visitante:'-',  /*link:'partidos/partido.html?partido=4'*/ },
    { fecha:5,  local:T('naranjaLechera'), visitante:T('guerrerosZ'), goles_local:'-',  goles_visitante:'-',  /*link:'partidos/partido.html?partido=5'*/ },
    { fecha:6,  local:T('naranjaLechera'), visitante:T('guerrerosZ'), goles_local:'-',  goles_visitante:'-',  /*link:'partidos/partido.html?partido=6'*/ },
    { fecha:7,  local:T('naranjaLechera'), visitante:T('guerrerosZ'), goles_local:'-',  goles_visitante:'-',  /*link:'partidos/partido.html?partido=7'*/ },
    { fecha:8,  local:T('naranjaLechera'), visitante:T('guerrerosZ'), goles_local:'-',  goles_visitante:'-',  /*link:'partidos/partido.html?partido=8'*/ },
    { fecha:9,  local:T('naranjaLechera'), visitante:T('guerrerosZ'), goles_local:'-', goles_visitante:'-',  /*link:'partidos/partido.html?partido=9'*/ },
    { fecha:10, local:T('naranjaLechera'), visitante:T('guerrerosZ'), goles_local:'-', goles_visitante:'-',  /*link:'partidos/partido.html?partido=10'*/ },
    { fecha:11, local:T('naranjaLechera'), visitante:T('guerrerosZ'), goles_local:'-',  goles_visitante:'-',  /*link:'partidos/partido.html?partido=11', final:true*/ }
];

// ================================
//  GOLEADORES
// ================================
const GOLEADORES = [
    { jugador:'Franco Favotti',        equipo:T('naranjaLechera'), goles:3 },
    { jugador:'Maxi Ventura',       equipo:T('guerrerosZ'),    goles:2 },
    { jugador:'Diego Arroyo',       equipo:T('naranjaLechera'),    goles:1 },
    { jugador:'Enzo Juarez',     equipo:T('guerrerosZ'), goles:1 },
    { jugador:'Nahuel Monti',  equipo:T('naranjaLechera'),    goles:1 },
    //{ jugador:'Gerardo Vaello',     equipo:T('naranjaLechera'),    goles:1,  doble:true },
    
];

// ================================
//  MVPs
// ================================
const MVPS = [
    { fecha:1,  equipo:T('naranjaLechera'),    jugador:'Franco Favotti' },
    /*{ fecha:2,  equipo:T('naranjaLechera'),    jugador:'Diego Arroyo' },
    { fecha:3,  equipo:T('guerrerosZ'), jugador:'Mateo Pugliese' },
    { fecha:4,  equipo:T('guerrerosZ'), jugador:'Juanse Macchi' },
    { fecha:5,  equipo:T('guerrerosZ'), jugador:'Tomas Mango' },
    { fecha:6,  equipo:T('guerrerosZ'), jugador:'Franco Mangiameli' },
    { fecha:7,  equipo:T('guerrerosZ'), jugador:'Mateo Pugliese' },
    { fecha:8,  equipo:T('naranjaLechera'),    jugador:'Alejo Osuna' },
    { fecha:9,  equipo:T('naranjaLechera'),    jugador:'Diego Arroyo' },
    { fecha:10, equipo:T('naranjaLechera'),    jugador:'Nahuel Monti' },
    { fecha:11, equipo:T('guerrerosZ'), jugador:'Franco Mangiameli' }*/
];

// ================================
//  TRANSFERENCIAS
// ================================
/*const TRANSFERS = [
    { jugador:'Manuel Panizo',     desde:T('naranjaLechera'),    destino:T('guerrerosZ') },
    { jugador:'Gerardo Vaello',    desde:T('guerrerosZ'), destino:T('naranjaLechera') },
    { jugador:'Milton Cabrera',    desde:T('naranjaLechera'),    destino:T('guerrerosZ') },
    { jugador:'Fabrizio Cecchini', desde:T('guerrerosZ'), destino:T('naranjaLechera') },
    { jugador:'Joni Monti',        desde:null,           destino:T('naranjaLechera') }
];*/
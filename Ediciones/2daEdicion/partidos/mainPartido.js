(function () {
    function esperarPartido(callback) {
        const intervalo = setInterval(() => {
            if (window.PARTIDO) {
                clearInterval(intervalo);
                callback(window.PARTIDO);
            }
        }, 20);
    }

    esperarPartido(renderPartido);
})();


function renderPartido(partido) {

    if (!partido) {
        document.body.innerHTML = "<h2>No se encontró el partido solicitado.</h2>";
        return;
    }

    document.getElementById("LugarYHora").innerHTML = `
        <h3>${partido.lugarYHora.estadio}</h3>
        <p>${partido.lugarYHora.fecha}</p>
    `;

    const equipo1 = partido.equipos[0];
    const equipo2 = partido.equipos[1];

    renderEquipo(equipo1, "Equipo1", "TablaEquipo1");
    renderEquipo(equipo2, "Equipo2", "TablaEquipo2");

    document.getElementById("footer").innerHTML = `
        <p>© Liga de los Pataduras</p>
    `;
}


function renderEquipo(data, idEquipo, idTabla) {

    document.getElementById(idEquipo).innerHTML = `
        <img src="${data.logo}" class="escudo">
        <h2>${data.nombre}</h2>
        <h1 class="marcador">${data.goles}</h1>
    `;

    document.getElementById(idTabla).innerHTML = crearTablaJugadoresYGoles(data.jugadores);
}

// Tabla combinada de jugadores y goles
function crearTablaJugadoresYGoles(jugadores) {
    let html = `
    <table>
        <tr>
            <th>Jugador</th>
            <th>Goles</th>
        </tr>
    `;

    jugadores.forEach(j => {
        html += `<tr><td>${j.nombre}</td><td>${j.goles}</td></tr>`;
    });

    html += `</table>`;
    return html;
}

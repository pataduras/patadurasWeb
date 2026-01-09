// ================================
//  Seleccionar elementos
// ================================
const tabContent = document.getElementById("tabContent");
const tabButtons = document.querySelectorAll(".tab-btn");

// ================================
//  Renderizadores
// ================================
function renderFixture() {
    tabContent.innerHTML = `
        <h2>Fixture</h2>
        ${FIXTURE.map(f => `
            <div class="fixture-block">

                <div class="fixture-date-title">
                    Fecha ${f.fecha}
                    <div class="fixture-subtitle">Serie (4–5)</div>
                </div>

                <div class="match">
                    <div class="teams">
                        <img src="${f.local.logo}" class="logo-sm">
                        <span>${f.local.name}</span>
                    </div>

                    <div class="score">${f.goles_local} - ${f.goles_visitante}</div>

                    <div class="teams">
                        <span>${f.visitante.name}</span>
                        <img src="${f.visitante.logo}" class="logo-sm">
                    </div>

                    <a class="info-btn" href="${f.link}">
                        Info del partido
                    </a>
                </div>

            </div>
        `).join("")}

    `;
}


function renderGoleadores() {
    tabContent.innerHTML = `
        <h2>Goleadores</h2>
        <table class="stats-table">
            <tr><th>Jugador</th><th>Equipo</th><th>Goles</th></tr>
            ${GOLEADORES.map(g => `
                <tr>
                    <td>${g.jugador}</td>
                    <td><img src="${g.equipo.logo}" class="team-logo-sm"></td>
                    <td>${g.goles}</td>
                </tr>
            `).join("")}
        </table>
    `;
}

function renderMvps() {
    tabContent.innerHTML = `
        <h2>MVPs</h2>
        <table class="stats-table">
            <tr><th>Fecha</th><th>Equipo</th><th>Jugador</th></tr>
            ${MVPS.map(m => `
                <tr>
                    <td>${m.fecha}</td>
                    <td><img src="${m.equipo.logo}" class="team-logo-sm"></td>
                    <td>${m.jugador}</td>
                </tr>
            `).join("")}
        </table>
    `;
}

function renderEquipos() {
    tabContent.innerHTML = `
        <h2>Equipos</h2>
        ${TEAMS.map(t => `

            <div class="team-block">
                <img src="${t.logo}" class="team-logo">
                <strong>${t.name}</strong>

                <ul class="team-players">
                    ${t.players.map(p => `<li>${p}</li>`).join("")}
                </ul>

                <div class="uniform-info">
                    <strong>Indumentaria:</strong><br>
                    ${t.indumentaria}
                </div>
            </div>

        `).join("")}

        <h2>Transferencias</h2>
        <div class="transfers">
            ${TRANSFERS.map(tr => `
                <p>
                    <strong>${tr.jugador}</strong><br>
                    ${tr.desde} → ${tr.destino}
                </p>
            `).join("")}
        </div>
    `;
}


// ================================
//  Tab Switching
// ================================
tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        tabButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const tab = btn.dataset.tab;

        if (tab === "fixture") renderFixture();
        if (tab === "goleadores") renderGoleadores();
        if (tab === "mvps") renderMvps();
        if (tab === "equipos") renderEquipos();
    });
});

// ================================
//  Tab inicial
// ================================
renderFixture();

// ================================
//  Dark/Light mode
// ================================
document.getElementById("toggleTheme").addEventListener("click", () => {
    document.body.classList.toggle("light");
});

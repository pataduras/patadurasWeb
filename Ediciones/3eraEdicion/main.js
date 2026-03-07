// ================================
//  HELPERS
// ================================

// Devuelve true si el partido tiene resultado numérico jugado
function tieneResultado(f) {
    return f.goles_local !== '-' && f.goles_visitante !== '-';
}

// ================================
//  RENDERS
// ================================
const tabContent = document.getElementById('tabContent');

function renderFixture() {
    const regularMatches = FIXTURE.filter(f => !f.final);
    const finalMatch     = FIXTURE.find(f => f.final);

    tabContent.innerHTML = `
        <div class="section-title">⚽ Fixture</div>

        ${regularMatches.map(f => `
            <div class="fixture-date-label">
                <span class="badge">Fecha ${f.fecha}</span>
                <span class="serie-tag">Serie (1–0)</span>
            </div>
            <div class="match-card">
                <div class="match-team">
                    <img src="${f.local.logo}" alt="${f.local.name}">
                    <span>${f.local.name}</span>
                </div>
                <div class="match-center">
                    <span class="match-score">${f.goles_local} - ${f.goles_visitante}</span>
                    ${tieneResultado(f) && f.link
                        ? `<a class="match-link" href="${f.link}">Info del partido</a>`
                        : `<span class="match-link disabled">Sin info</span>`
                    }
                </div>
                <div class="match-team right">
                    <img src="${f.visitante.logo}" alt="${f.visitante.name}">
                    <span>${f.visitante.name}</span>
                </div>
            </div>
        `).join('')}

        ${finalMatch ? `
            <div class="fixture-date-label">
                <span class="badge" style="background:var(--gold);color:#1a1200">Fecha ${finalMatch.fecha}</span>
                <span class="serie-tag">🏆 Gran Final</span>
            </div>
            <div class="gran-final-card">
                <div class="gran-final-title">🏆 GRAN FINAL 🏆</div>
                <div class="gran-final-score-row">
                    <div class="gran-final-team">
                        <img src="${finalMatch.local.logo}" alt="${finalMatch.local.name}">
                        <span>${finalMatch.local.name}</span>
                    </div>
                    <div class="gran-final-scorebox">${finalMatch.goles_local} – ${finalMatch.goles_visitante}</div>
                    <div class="gran-final-team">
                        <img src="${finalMatch.visitante.logo}" alt="${finalMatch.visitante.name}">
                        <span>${finalMatch.visitante.name}</span>
                    </div>
                </div>
                ${tieneResultado(finalMatch) && finalMatch.link ? `
                    <div style="margin-top:14px">
                        <a class="match-link" href="${finalMatch.link}">Info del partido</a>
                    </div>
                ` : ''}
            </div>
            ${tieneResultado(finalMatch) ? `
                <div class="campeon-banner">
                    <img src="${finalMatch.visitante.logo}" alt="Campeón">
                    <span>🏆 CAMPEÓN: ${finalMatch.visitante.name.toUpperCase()}</span>
                </div>
            ` : ''}
        ` : ''}
    `;
}

function renderGoleadores() {
    tabContent.innerHTML = `
        <div class="section-title">🥅 Goleadores</div>
        <table class="stats-table">
            <thead>
                <tr>
                    <th class="center" style="width:40px">#</th>
                    <th>Jugador</th>
                    <th class="center">Equipo</th>
                    <th class="center">Goles</th>
                </tr>
            </thead>
            <tbody>
                ${GOLEADORES.map((g, i) => `
                    <tr>
                        <td class="center rank-num ${i===0?'top1':i===1?'top2':i===2?'top3':''}">${i + 1}</td>
                        <td class="player-name">
                            ${g.jugador}
                            ${g.doble ? `<span title="Jugó en ambos equipos" style="font-size:11px;color:var(--muted)">↔</span>` : ''}
                        </td>
                        <td class="center">
                            ${g.doble
                                ? TEAMS.map(t => `<img src="${t.logo}" class="team-logo-sm">`).join(' ')
                                : `<img src="${g.equipo.logo}" class="team-logo-sm">`
                            }
                        </td>
                        <td class="center"><span class="goals-pill">${g.goles}</span></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function renderMvps() {
    tabContent.innerHTML = `
        <div class="section-title">⭐ MVPs por Fecha</div>
        <table class="stats-table">
            <thead>
                <tr>
                    <th class="center">Fecha</th>
                    <th class="center">Equipo</th>
                    <th>Jugador</th>
                </tr>
            </thead>
            <tbody>
                ${MVPS.length > 0 ? MVPS.map(m => `
                    <tr>
                        <td class="center">
                            ${m.final
                                ? '<span class="mvp-badge">🏆 Final</span>'
                                : `<strong>${m.fecha}</strong>`
                            }
                        </td>
                        <td class="center"><img src="${m.equipo.logo}" class="team-logo-sm"></td>
                        <td class="player-name">${m.jugador}</td>
                    </tr>
                `).join('') : `
                    <tr><td colspan="3" class="center" style="padding:20px;color:var(--muted)">Sin MVPs registrados aún</td></tr>
                `}
            </tbody>
        </table>
    `;
}

function renderEquipos() {
    // TRANSFERS puede estar comentado/indefinido en data.js — lo manejamos con gracia
    const transferencias = typeof TRANSFERS !== 'undefined' ? TRANSFERS : [];

    tabContent.innerHTML = `
        <div class="section-title">👕 Equipos</div>
        <div class="teams-grid">
            ${TEAMS.map(t => `
                <div class="team-card">
                    <div class="team-header">
                        <img src="${t.logo}" alt="${t.name}">
                        <h3>${t.name}</h3>
                        <span class="uniform-chip ${t.indumentaria.toLowerCase()}">${t.indumentaria}</span>
                    </div>
                    <ul class="player-list">
                        ${t.players.filter(p => p.trim() !== '').map(p => {
                            const isCap = p.includes('(C)');
                            const name  = p.replace('(C)', '').trim();
                            return '<li>' + name + (isCap ? ' <span class="captain-badge">C</span>' : '') + '</li>';
                        }).join('')}
                    </ul>
                </div>
            `).join('')}
        </div>

        ${transferencias.length > 0 ? `
            <div class="transfers-section">
                <div class="section-title" style="margin-top:16px">🔄 Transferencias</div>
                ${transferencias.map(tr => `
                    <div class="transfer-item">
                        <img src="${tr.desde ? tr.desde.logo : 'https://pbs.twimg.com/media/GTncwkHXIAABJwC?format=png&name=small'}" alt="">
                        <span class="transfer-name">${tr.jugador}</span>
                        <span class="transfer-clubs">${tr.desde ? tr.desde.name : 'Libre'}</span>
                        <span class="transfer-arrow">→</span>
                        <span class="transfer-clubs">${tr.destino.name}</span>
                        <img src="${tr.destino.logo}" alt="">
                    </div>
                `).join('')}
            </div>
        ` : ''}
    `;
}

// ================================
//  TAB SWITCHING
// ================================
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const tab = btn.dataset.tab;
        if (tab === 'fixture')    renderFixture();
        if (tab === 'goleadores') renderGoleadores();
        if (tab === 'mvps')       renderMvps();
        if (tab === 'equipos')    renderEquipos();
    });
});

// ================================
//  THEME TOGGLE
// ================================
document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('light');
});

// ================================
//  INIT
// ================================
renderFixture();
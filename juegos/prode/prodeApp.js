import {
    PARTIDO, ADMIN_PASSWORD, VOTING_OPEN, NEXT_FECHA, PID,
    normalizeUser, hashPassword,
    getUsers, saveUsers, getAdminCreds, saveAdminCreds,
    registerAdminCred, deleteAdminCred,
    saveVote, getMyVote, getResult, saveResult, deleteResult,
    publishMyScore, getScoreboard, getMyTotal, saveMyTotal,
    getAllTotals, hasAlreadyScored, markAsScored,
    tryLogin, adminDeleteUser, adminResetPassword,
    scorerPts, mvpPts, calcPoints, getBreakdown, winner
} from './prodeConfig.js';

// ══════════════════════════════════════════════════════
// PRODE — APP LOGIC  (requiere prodeConfig.js)
// ══════════════════════════════════════════════════════

let ME         = null;
let ADMIN_MODE = false;

const $  = id => document.getElementById(id);
const el = (tag, cls, html='') => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html) e.innerHTML = html;
    return e;
};

function show(id) { const e=$(id); if(e){ e.style.display=''; e.classList.add('active'); } }
function hide(id) { const e=$(id); if(e){ e.style.display='none'; e.classList.remove('active'); } }

function showToast(msg, color='rgba(45,198,83,0.95)') {
    const t = document.createElement('div');
    t.style.cssText = `position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:${color};color:white;font-size:13px;font-weight:700;padding:10px 20px;border-radius:20px;z-index:9999;white-space:nowrap;box-shadow:0 4px 16px rgba(0,0,0,0.4);pointer-events:none`;
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3500);
}

function spinner() {
    return '<div class="loading"><div class="spinner"></div>Cargando...</div>';
}

// ══════════════════════════════════════════════════════
// NAVEGACIÓN
// ══════════════════════════════════════════════════════
window.handleBack = function() {
    if (ME) {
        logout();
    } else {
        const btn = document.getElementById('backBtn');
        window.location.href = btn ? btn.dataset.index : '../../index.html';
    }
};

window.logout = function() {
    ME = null;
    ADMIN_MODE = false;
    $('headerUser').style.display = 'none';
    $('loginName').value = '';
    $('loginPassword').value = '';
    $('loginError').classList.remove('show');
    hide('screen-app');
    show('screen-login');
};

window.switchTab = function(tab) {
    ['votar','ranking','admin'].forEach(t => {
        $(`tab-${t}`).classList.toggle('active', t===tab);
        $(`pane-${t}`).style.display = t===tab ? '' : 'none';
    });
    if (tab==='votar')   renderVotar();
    if (tab==='ranking') renderRanking();
    if (tab==='admin')   renderAdmin();
};

// ══════════════════════════════════════════════════════
// LOGIN
// ══════════════════════════════════════════════════════
function initLoginScreen() {
    $('loginBtn').addEventListener('click', handleLogin);
    $('loginName').addEventListener('keydown', e => { if(e.key==='Enter') $('loginPassword').focus(); });
    $('loginPassword').addEventListener('keydown', e => { if(e.key==='Enter') handleLogin(); });
}

async function handleLogin() {
    const name  = $('loginName').value.trim();
    const pw    = $('loginPassword').value;
    const errEl = $('loginError');
    errEl.classList.remove('show');

    const btn = $('loginBtn');
    btn.disabled = true;
    btn.textContent = 'Verificando...';

    const res = await tryLogin(name, pw);

    btn.disabled = false;
    btn.textContent = 'Entrar →';

    if (!res.ok) {
        errEl.textContent = res.error;
        errEl.classList.add('show');
        return;
    }

    ME = res.displayName;
    $('headerUserName').textContent = ME;
    $('headerUser').style.display = 'flex';
    hide('screen-login');
    show('screen-app');
    ADMIN_MODE = false;
    switchTab('votar');
    if (res.isNew) showToast(`✅ Usuario "${ME}" creado. Recordá tu contraseña.`);
}

function logout() {
    ME = null;
    ADMIN_MODE = false;
    $('headerUser').style.display = 'none';
    $('loginName').value = '';
    $('loginPassword').value = '';
    $('loginError').classList.remove('show');
    hide('screen-app');
    show('screen-login');
}

// ══════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════
function switchTab(tab) {
    ['votar','ranking','admin'].forEach(t => {
        $(`tab-${t}`).classList.toggle('active', t===tab);
        $(`pane-${t}`).style.display = t===tab ? '' : 'none';
    });
    if (tab==='votar')   renderVotar();
    if (tab==='ranking') renderRanking();
    if (tab==='admin')   renderAdmin();
}

// ══════════════════════════════════════════════════════
// VOTAR TAB
// ══════════════════════════════════════════════════════
async function renderVotar() {
    const pane = $('pane-votar');
    pane.innerHTML = spinner();

    const [myVote, result] = await Promise.all([getMyVote(ME), getResult()]);
    pane.innerHTML = '';

    pane.appendChild(buildMatchCard());

    if (!VOTING_OPEN) {
        const card = el('div','card');
        card.innerHTML = `
            <div class="coming-soon-block">
                <div class="coming-soon-icon">🗓️</div>
                <div class="coming-soon-title">Próximamente</div>
                <div class="coming-soon-fecha">${NEXT_FECHA}</div>
                <p class="coming-soon-sub">La votación aún no está habilitada.<br>Volvé cuando se abra la fecha.</p>
            </div>`;
        pane.appendChild(card);
        return;
    }

    if (result && !myVote) {
        pane.appendChild(el('div','card',`
            <div style="text-align:center">
                <div style="font-size:36px;margin-bottom:10px">🔒</div>
                <div style="font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:2px;margin-bottom:8px">Votación cerrada</div>
                <p style="color:var(--muted);font-size:14px">El resultado ya fue cargado. No podés votar.</p>
            </div>`));
        return;
    }

    if (myVote) {
        pane.appendChild(el('div','success-banner','<span style="font-size:20px">✅</span> ¡Tu predicción ya fue enviada!'));
        pane.appendChild(buildVoteSummaryCard(myVote, result));
        return;
    }

    buildVoteForm(pane);
}

function buildMatchCard() {
    const c = el('div','card');
    c.innerHTML = `
        <div class="match-meta">
            <span>📅 ${PARTIDO.fecha}</span>
            <span>🕐 ${PARTIDO.hora}</span>
            <span>📍 ${PARTIDO.lugar}</span>
        </div>
        <div class="match-teams">
            <div class="match-team">
                <img class="match-team-logo" src="${PARTIDO.local.logo}" alt="${PARTIDO.local.nombre}" onerror="this.style.opacity=0">
                <div class="match-team-name">${PARTIDO.local.nombre}</div>
            </div>
            <div class="match-vs">VS</div>
            <div class="match-team">
                <img class="match-team-logo" src="${PARTIDO.visitante.logo}" alt="${PARTIDO.visitante.nombre}" onerror="this.style.opacity=0">
                <div class="match-team-name">${PARTIDO.visitante.nombre}</div>
            </div>
        </div>`;
    return c;
}

function buildVoteSummaryCard(vote, result) {
    const c = el('div','card');
    const scorers = [...(vote.goladoresLocal||[]), ...(vote.goladoresVisitante||[])];
    const scorersTxt = scorers.map(g=>`${g.nombre} (${g.goles})`).join(', ') || '—';
    let resultHtml = '';
    if (result) {
        const bd  = getBreakdown(vote, result);
        const pts = calcPoints(vote, result);
        resultHtml = `
            <div style="margin-top:14px;border-top:1px solid var(--border);padding-top:14px">
                <div class="rank-breakdown">${bd.map(b=>`
                    <span class="rb ${b.hit?'hit':''}">
                        ${b.hit?'✓':'✗'} ${b.label}
                        ${b.hit ? `<em>+${b.pts}pts</em>` : (b.detail ? `<em>${b.detail}</em>` : '')}
                    </span>`).join('')}
                </div>
                <div style="font-family:'Bebas Neue',sans-serif;font-size:34px;color:var(--gold);text-align:right;margin-top:10px">${pts} pts</div>
            </div>`;
    }
    c.innerHTML = `
        <div class="card-title">Tu predicción</div>
        <div style="font-family:'Bebas Neue',sans-serif;font-size:28px;letter-spacing:3px;text-align:center;margin-bottom:12px">${vote.golesLocal} — ${vote.golesVisitante}</div>
        <div style="font-size:13px;color:var(--muted);margin-bottom:6px"><strong style="color:var(--text)">Goleadores:</strong> ${scorersTxt}</div>
        <div style="font-size:13px;color:var(--muted)"><strong style="color:var(--text)">MVP:</strong> ${vote.mvp}</div>
        ${resultHtml}`;
    return c;
}

function buildVoteForm(pane) {
    pane.appendChild(el('div','info-box','Completá tu predicción y enviá. <strong>Una vez enviada no podés cambiarla.</strong>'));
    pane.appendChild(buildResultCard());
    pane.appendChild(buildGoalCard('local'));
    pane.appendChild(buildGoalCard('visitante'));
    pane.appendChild(buildMvpCard());

    // ── Resumen de puntos en vivo ──
    const livePtsCard = el('div', 'card live-pts-card');
    livePtsCard.id = 'livePtsCard';
    livePtsCard.innerHTML = `
        <div class="live-pts-header">
            <span class="live-pts-title">🎯 Puntos potenciales</span>
            <span class="live-pts-total" id="livePtsTotal">0</span>
        </div>
        <div class="live-pts-rows" id="livePtsRows">
            <span class="live-pts-empty">Completá la predicción para ver tus puntos potenciales.</span>
        </div>`;
    pane.appendChild(livePtsCard);

    const btn = el('button','btn btn-primary','Enviar predicción 🚀');
    btn.id = 'submitBtn';
    btn.addEventListener('click', submitVote);
    pane.appendChild(btn);

    updateLivePts();
}

function updateLivePts() {
    const totalEl = document.getElementById('livePtsTotal');
    const rowsEl  = document.getElementById('livePtsRows');
    if (!totalEl || !rowsEl) return;

    const gl  = parseInt(document.getElementById('valLocal')?.textContent) || 0;
    const gv  = parseInt(document.getElementById('valVisitante')?.textContent) || 0;
    const mvp = document.getElementById('fMvp')?.value || '';

    const items = [];
    let total = 0;

    items.push({ label: `Resultado exacto ${gl}–${gv}`, pts: 3, type: 'result-exact' });
    items.push({ label: 'Solo acertar ganador', pts: 1, type: 'result-winner', sub: true });
    total += 3;

    const allRows = [
        ..._golesState.local.filter(r => r.nombre && r.goles > 0),
        ..._golesState.visitante.filter(r => r.nombre && r.goles > 0)
    ];
    for (const r of allRows) {
        const pts = scorerPts(r.nombre) * r.goles;
        items.push({ label: `${r.nombre} ×${r.goles}`, pts, type: 'scorer' });
        total += pts;
    }

    if (mvp) {
        const pts = mvpPts(mvp);
        items.push({ label: `MVP: ${mvp}`, pts, type: 'mvp' });
        total += pts;
    }

    totalEl.textContent = total;
    totalEl.className = 'live-pts-total' + (total > 3 ? ' has-pts' : '');

    rowsEl.innerHTML = items.map(item => `
        <div class="live-pts-row ${item.sub ? 'sub-row' : ''} type-${item.type}">
            <span class="live-pts-label">${item.label}</span>
            <span class="live-pts-val">${item.sub ? `(o +${item.pts}pt)` : `+${item.pts}pts`}</span>
        </div>`).join('');
}

function buildResultCard() {
    const c = el('div','card');
    c.innerHTML = `
        <div class="card-title">⚽ Resultado</div>
        <div class="card-desc">¿Cuál será el marcador final? Ajustá los goles de cada equipo.</div>
        <div class="score-block">
            <div class="score-team-block">
                <div class="score-team-tag">${PARTIDO.local.nombre}</div>
                <div class="score-stepper">
                    <button type="button" data-side="local" data-dir="-1">−</button>
                    <div class="score-val" id="valLocal">0</div>
                    <button type="button" data-side="local" data-dir="1">+</button>
                </div>
            </div>
            <div class="score-separator">—</div>
            <div class="score-team-block">
                <div class="score-team-tag">${PARTIDO.visitante.nombre}</div>
                <div class="score-stepper">
                    <button type="button" data-side="visitante" data-dir="-1">−</button>
                    <div class="score-val" id="valVisitante">0</div>
                    <button type="button" data-side="visitante" data-dir="1">+</button>
                </div>
            </div>
        </div>
        <div class="result-pts-hint">
            <span class="hint-chip exact">⭐ Exacto = <strong>3 pts</strong></span>
            <span class="hint-chip winner">✓ Ganador = <strong>1 pt</strong></span>
        </div>`;
    c.querySelectorAll('.score-stepper button').forEach(btn => {
        btn.addEventListener('click', () => {
            const id  = 'val' + btn.dataset.side.charAt(0).toUpperCase() + btn.dataset.side.slice(1);
            const cur = parseInt($(id).textContent)||0;
            $(id).textContent = Math.max(0, Math.min(20, cur + parseInt(btn.dataset.dir)));
            rebuildGoals();
            updateLivePts();
        });
    });
    return c;
}

function buildGoalCard(side) {
    const team  = side==='local' ? PARTIDO.local : PARTIDO.visitante;
    const emoji = side==='local' ? '🟠' : '🔵';
    const c = el('div','card');
    c.id = `goalCard-${side}`;
    c.innerHTML = `
        <div class="card-title">${emoji} Goleadores — ${team.nombre}</div>
        <div class="card-desc">
            Asigná cuántos goles hace cada jugador. Los puntos dependen del historial:
            acertar a un jugador que raramente convierte vale más.
        </div>
        <div class="gol-empty" id="golRows-${side}">Primero definí el resultado arriba.</div>`;
    return c;
}

function rebuildGoals() {
    buildGoalRows('local',     parseInt($('valLocal')?.textContent)||0);
    buildGoalRows('visitante', parseInt($('valVisitante')?.textContent)||0);
}

const _golesState = { local: [], visitante: [] };

function buildGoalRows(side, totalGoles) {
    const container = $(`golRows-${side}`);
    if (!container) return;
    const team = side==='local' ? PARTIDO.local : PARTIDO.visitante;

    if (totalGoles === 0) {
        _golesState[side] = [];
        container.className = 'gol-empty';
        container.textContent = '0 goles — sin goleadores que asignar.';
        return;
    }

    const prev = _golesState[side];
    const prevTotal = prev.reduce((s, r) => s + r.goles, 0);

    if (totalGoles > prevTotal) {
        const diff = totalGoles - prevTotal;
        if (prev.length > 0) prev[prev.length - 1].goles += diff;
        else prev.push({ nombre: '', goles: diff });
    } else if (totalGoles < prevTotal) {
        let toRemove = prevTotal - totalGoles;
        for (let i = prev.length - 1; i >= 0 && toRemove > 0; i--) {
            const cut = Math.min(prev[i].goles, toRemove);
            prev[i].goles -= cut;
            toRemove -= cut;
            if (prev[i].goles === 0) prev.splice(i, 1);
        }
    }
    _golesState[side] = prev;
    renderGoalRows(side, team, totalGoles);
}

function renderGoalRows(side, team, totalGoles) {
    const container = $(`golRows-${side}`);
    if (!container) return;
    container.className = '';

    const rows   = _golesState[side];
    const usados = rows.reduce((s, r) => s + r.goles, 0);
    const libres = totalGoles - usados;

    let html = `<div class="gol-header" id="golHeader-${side}">
        <span>Goles asignados: <strong id="golCount-${side}">${usados}/${totalGoles}</strong></span>
        <button type="button" class="gol-add-btn" id="golAdd-${side}" ${libres===0?'disabled':''}>
            + Agregar jugador
        </button>
    </div>`;

    rows.forEach((row, idx) => {
        const pts      = row.nombre ? scorerPts(row.nombre) : null;
        const potencial = pts ? pts * row.goles : null;
        html += `
        <div class="gol-player-row" id="golPlayerRow-${side}-${idx}">
            <div class="gol-player-select-wrap">
                <select class="gol-player-sel" id="golSel-${side}-${idx}" data-side="${side}" data-idx="${idx}">
                    <option value="">— Jugador —</option>
                    ${team.jugadores.map(j => {
                        const usadoEnOtra = rows.some((r, i) => i !== idx && r.nombre === j);
                        return `<option value="${j}" ${row.nombre===j?'selected':''} ${usadoEnOtra?'disabled':''}>${j}</option>`;
                    }).join('')}
                </select>
                ${pts ? `<span class="gol-pts-badge" title="Puntos base por gol">${pts}pt/gol</span>` : ''}
            </div>
            <div class="gol-qty-wrap">
                <button type="button" class="gol-qty-btn" data-side="${side}" data-idx="${idx}" data-dir="-1">−</button>
                <span class="gol-qty-val" id="golQty-${side}-${idx}">${row.goles}</span>
                <button type="button" class="gol-qty-btn" data-side="${side}" data-idx="${idx}" data-dir="1">+</button>
            </div>
            ${potencial ? `<span class="gol-pot-pts">= ${potencial}pts</span>` : '<span class="gol-pot-pts"></span>'}
            <button type="button" class="gol-remove-btn" data-side="${side}" data-idx="${idx}" title="Quitar">✕</button>
        </div>`;
    });

    container.innerHTML = html;

    const addBtn = document.getElementById(`golAdd-${side}`);
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const cur = _golesState[side];
            const totalUsado = cur.reduce((s,r)=>s+r.goles,0);
            const libre = totalGoles - totalUsado;
            if (libre > 0) {
                cur.push({ nombre: '', goles: libre });
                renderGoalRows(side, team, totalGoles);
                updateLivePts();
            }
        });
    }

    container.querySelectorAll('.gol-player-sel').forEach(sel => {
        sel.addEventListener('change', () => {
            const idx = parseInt(sel.dataset.idx);
            _golesState[side][idx].nombre = sel.value;
            renderGoalRows(side, team, totalGoles);
            updateLivePts();
        });
    });

    container.querySelectorAll('.gol-qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.idx);
            const dir = parseInt(btn.dataset.dir);
            const row = _golesState[side][idx];
            const totalUsado = _golesState[side].reduce((s,r)=>s+r.goles,0);
            if (dir === 1 && totalUsado >= totalGoles) return;
            if (dir === -1 && row.goles <= 1) return;
            row.goles += dir;
            renderGoalRows(side, team, totalGoles);
            updateLivePts();
        });
    });

    container.querySelectorAll('.gol-remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.idx);
            _golesState[side].splice(idx, 1);
            renderGoalRows(side, team, totalGoles);
            updateLivePts();
        });
    });
}

function buildMvpCard() {
    const c = el('div','card');
    c.innerHTML = `
        <div class="card-title">⭐ MVP del partido</div>
        <div class="card-desc">¿Quién será el jugador más destacado? Acertar al MVP menos frecuente vale más puntos.</div>
        <div class="field">
            <label>Seleccioná el MVP</label>
            <div class="mvp-select-wrap">
                <select id="fMvp">
                    <option value="">— Elegí un jugador —</option>
                    <optgroup label="${PARTIDO.local.nombre}">
                        ${PARTIDO.local.jugadores.map(j => `<option value="${j}">${j} (${mvpPts(j)}pts)</option>`).join('')}
                    </optgroup>
                    <optgroup label="${PARTIDO.visitante.nombre}">
                        ${PARTIDO.visitante.jugadores.map(j => `<option value="${j}">${j} (${mvpPts(j)}pts)</option>`).join('')}
                    </optgroup>
                </select>
                <div class="mvp-pts-preview" id="mvpPtsPreview"></div>
            </div>
        </div>`;

    setTimeout(() => {
        const sel     = document.getElementById('fMvp');
        const preview = document.getElementById('mvpPtsPreview');
        if (sel && preview) {
            sel.addEventListener('change', () => {
                preview.innerHTML = sel.value
                    ? `<span class="mvp-pts-badge">Vale <strong>${mvpPts(sel.value)} pts</strong></span>`
                    : '';
                updateLivePts();
            });
        }
    }, 0);

    return c;
}

async function submitVote() {
    const gl  = parseInt($('valLocal')?.textContent)||0;
    const gv  = parseInt($('valVisitante')?.textContent)||0;
    const mvp = $('fMvp')?.value;
    if (!mvp) { alert('Seleccioná un MVP antes de enviar.'); return; }

    function collectAndValidate(side, totalEsperado) {
        const rows = _golesState[side].filter(r => r.nombre && r.goles > 0);
        const totalAsignado = rows.reduce((s,r)=>s+r.goles,0);
        return { rows, totalAsignado, ok: totalAsignado === totalEsperado };
    }

    const localData = collectAndValidate('local', gl);
    const visitData = collectAndValidate('visitante', gv);

    if (gl > 0 && !localData.ok) {
        alert(`Asigná los ${gl} goles de ${PARTIDO.local.nombre} (asignados: ${localData.totalAsignado}).`);
        return;
    }
    if (gv > 0 && !visitData.ok) {
        alert(`Asigná los ${gv} goles de ${PARTIDO.visitante.nombre} (asignados: ${visitData.totalAsignado}).`);
        return;
    }

    const vote = {
        user: ME, golesLocal: gl, golesVisitante: gv,
        goladoresLocal:     localData.rows,
        goladoresVisitante: visitData.rows,
        mvp, ts: Date.now()
    };

    const btn = $('submitBtn');
    if (btn) { btn.disabled=true; btn.textContent='Guardando...'; }

    const existing = await getMyVote(ME);
    if (existing) { renderVotar(); return; }

    const ok = await saveVote(vote);
    if (ok) { renderVotar(); }
    else {
        if (btn) { btn.disabled=false; btn.textContent='Enviar predicción 🚀'; }
        alert('Error al guardar. Intentá de nuevo.');
    }
}

// ══════════════════════════════════════════════════════
// RANKING TAB
// ══════════════════════════════════════════════════════
async function renderRanking() {
    const pane = $('pane-ranking');
    pane.innerHTML = spinner();

    const [myVote, result, users, scoreboard, totals] = await Promise.all([
        getMyVote(ME), getResult(), getUsers(), getScoreboard(), getAllTotals()
    ]);
    pane.innerHTML = '';

    const myKey = normalizeUser(ME);

    if (result && myVote) {
        const alreadyScored = await hasAlreadyScored(myKey);
        if (!alreadyScored) {
            const pts = calcPoints(myVote, result);
            await publishMyScore(myKey, ME, pts);
            const prevTotal = await getMyTotal(myKey);
            await saveMyTotal(myKey, ME, prevTotal + pts);
            await markAsScored(myKey);
            scoreboard.length = 0;
            scoreboard.push(...await getScoreboard());
            totals.length = 0;
            totals.push(...await getAllTotals());
        }
    }

    if (result) {
        const allScorers = [...(result.goladoresLocal||[]),...(result.goladoresVisitante||[])];
        const rd = el('div','result-display');
        rd.innerHTML = `
            <div class="result-score">${result.golesLocal} — ${result.golesVisitante}</div>
            <div class="result-meta">${PARTIDO.local.nombre} vs ${PARTIDO.visitante.nombre} · MVP: ${result.mvp}${allScorers.length?' · '+allScorers.map(s=>`${s.nombre}(${s.goles})`).join(', '):''}
            </div>`;
        pane.appendChild(rd);
        renderPointsTable(pane, users, scoreboard, myKey, PARTIDO.fecha, true);
        if (myVote) {
            const bd      = getBreakdown(myVote, result);
            const detCard = el('div','card');
            detCard.innerHTML = `<div class="card-title">Tu predicción detallada</div>
                <div class="rank-breakdown">${bd.map(b=>`
                    <span class="rb ${b.hit?'hit':''}">
                        ${b.hit?'✓':'✗'} ${b.label}
                        ${b.hit ? `<em>+${b.pts}pts</em>` : (b.detail ? `<em>${b.detail}</em>` : '')}
                    </span>`).join('')}
                </div>`;
            pane.appendChild(detCard);
        }
    } else {
        pane.appendChild(el('div','center-msg',`
            <div class="big">⏳</div>
            <p style="margin-bottom:0">Resultado pendiente · predicciones privadas</p>`));
        renderPointsTable(pane, users, [], myKey, PARTIDO.fecha, false);
        if (myVote) {
            const sec = el('div');
            sec.innerHTML = `<div class="sec-header">Tu predicción enviada</div>`;
            const d = el('div','vote-card');
            const s = [...(myVote.goladoresLocal||[]),...(myVote.goladoresVisitante||[])];
            d.innerHTML = `
                <div class="vote-card-name" style="color:var(--accent2)">✓ Ya votaste</div>
                <div class="vote-card-detail">
                    Resultado predicho: <strong>${myVote.golesLocal}–${myVote.golesVisitante}</strong> · MVP: <strong>${myVote.mvp}</strong><br>
                    Goleadores: ${s.length ? s.map(g=>`${g.nombre}(${g.goles})`).join(', ') : '—'}
                </div>`;
            sec.appendChild(d);
            pane.appendChild(sec);
        }
    }

    if (totals.length > 0 || Object.keys(users).length > 0) {
        renderPointsTable(pane, users, totals, myKey, 'Total acumulado', true);
    }
}

function renderPointsTable(pane, users, scores, myKey, title, showZero) {
    const sec = el('div');
    sec.innerHTML = `<div class="sec-header">${title}</div>`;

    const scoreMap = {};
    scores.forEach(s => {
        const k = normalizeUser(s.display);
        scoreMap[k] = s.pts !== undefined ? s.pts : (s.total !== undefined ? s.total : 0);
    });

    const rows = Object.entries(users).map(([key, display]) => ({
        key, display, pts: scoreMap[key] !== undefined ? scoreMap[key] : (showZero ? 0 : null)
    }));

    rows.sort((a,b) => {
        if (a.pts !== null && b.pts !== null) return b.pts - a.pts;
        if (a.pts !== null) return -1;
        if (b.pts !== null) return 1;
        return a.display.localeCompare(b.display);
    });

    if (!rows.length) {
        sec.innerHTML += '<p style="color:var(--muted);font-size:13px;padding:8px 0">Aún no hay participantes registrados.</p>';
        pane.appendChild(sec);
        return;
    }

    const posColors = ['gold','silver','bronze'];
    const list = el('div','ranking-list');

    rows.forEach((r, i) => {
        const isMe       = r.key === myKey;
        const ptsDisplay = r.pts !== null ? r.pts : '—';
        const posLabel   = r.pts !== null ? (i+1) : '·';
        const posColor   = r.pts !== null && r.pts > 0 ? (posColors[i] || '') : '';
        const voted      = scoreMap[r.key] !== undefined;
        const votedBadge = showZero
            ? (voted ? '' : '<span class="user-pending-badge" style="font-size:10px">sin voto aún</span>')
            : '';

        const row = el('div', `rank-row${isMe?' me':''}`);
        row.innerHTML = `
            <div class="rank-pos ${posColor}">${posLabel}</div>
            <div class="rank-body">
                <div class="rank-name">
                    ${r.display}
                    ${isMe ? '<span class="me-badge">vos</span>' : ''}
                    ${votedBadge}
                </div>
            </div>
            <div class="rank-pts-col">
                <div class="rank-pts" style="${ptsDisplay==='—'?'color:var(--muted);font-size:20px':''}">${ptsDisplay}</div>
                <div class="rank-pts-lbl">${ptsDisplay!=='—'?'pts':''}</div>
            </div>`;
        list.appendChild(row);
    });

    sec.appendChild(list);
    pane.appendChild(sec);
}

// ══════════════════════════════════════════════════════
// ADMIN TAB
// ══════════════════════════════════════════════════════
async function renderAdmin() {
    const pane = $('pane-admin');

    if (!ADMIN_MODE) {
        pane.innerHTML = '';
        const lock = el('div','card');
        lock.innerHTML = `
            <div class="admin-lock">
                <div class="lock-icon">🔐</div>
                <h3>Acceso restringido</h3>
                <p>Esta sección es solo para el administrador de la liga.</p>
                <div class="field" style="text-align:left;max-width:280px;margin:0 auto 12px">
                    <label>Contraseña de admin</label>
                    <input type="password" id="adminPwInput" placeholder="••••••••" autocomplete="off">
                </div>
                <div class="login-error" id="adminPwError"></div>
                <button class="btn btn-gold" id="adminUnlockBtn" style="max-width:280px;margin:0 auto">Desbloquear</button>
            </div>`;
        pane.appendChild(lock);
        $('adminUnlockBtn').addEventListener('click', () => {
            if ($('adminPwInput').value === ADMIN_PASSWORD) {
                ADMIN_MODE = true; renderAdmin();
            } else {
                const err = $('adminPwError');
                err.textContent = 'Contraseña incorrecta.';
                err.classList.add('show');
            }
        });
        $('adminPwInput').addEventListener('keydown', e => { if(e.key==='Enter') $('adminUnlockBtn').click(); });
        return;
    }

    pane.innerHTML = spinner();
    const [result, creds, users] = await Promise.all([getResult(), getAdminCreds(), getUsers()]);
    pane.innerHTML = '';

    const adminCard = el('div','card');
    adminCard.style.borderColor = 'rgba(255,214,10,0.2)';
    const titleEl = el('div','card-title','⚙ Panel Admin');
    titleEl.style.color = 'var(--gold)';
    adminCard.appendChild(titleEl);

    if (result) {
        const allScorers = [...(result.goladoresLocal||[]),...(result.goladoresVisitante||[])];
        const rd = el('div','result-display');
        rd.innerHTML = `
            <div class="result-score">${result.golesLocal} — ${result.golesVisitante}</div>
            <div class="result-meta">MVP: ${result.mvp}${allScorers.length?' · '+allScorers.map(s=>`${s.nombre}(${s.goles})`).join(', '):''}
            </div>`;
        adminCard.appendChild(rd);
        const delBtn = el('button','btn btn-secondary','🗑 Borrar resultado');
        delBtn.addEventListener('click', async () => {
            if (confirm('¿Borrar el resultado cargado?')) { await deleteResult(); renderAdmin(); }
        });
        adminCard.appendChild(delBtn);
    } else {
        adminCard.appendChild(buildAdminResultForm());
    }
    pane.appendChild(adminCard);
    pane.appendChild(buildUserManagementCard(users, creds));

    const lockBtn = el('button','btn btn-secondary','🔒 Cerrar sesión admin');
    lockBtn.style.marginBottom = '16px';
    lockBtn.addEventListener('click', () => { ADMIN_MODE=false; renderAdmin(); });
    pane.appendChild(lockBtn);
}

// ══════════════════════════════════════════════════════
// USER MANAGEMENT CARD
// ══════════════════════════════════════════════════════
function buildUserManagementCard(users, creds) {
    const card = el('div','card');
    card.style.borderColor = 'rgba(76,201,240,0.2)';

    const titleEl = el('div','card-title','👥 Gestión de usuarios');
    titleEl.style.color = 'var(--accent2)';
    card.appendChild(titleEl);

    const userCount = Object.keys(users).length;
    if (userCount === 0) {
        card.appendChild(el('p','',`<span style="color:var(--muted);font-size:14px">Aún no hay usuarios registrados.</span>`));
        return card;
    }

    const counter = el('div','');
    counter.style.cssText = 'font-size:12px;color:var(--muted);margin-bottom:14px;font-weight:600;letter-spacing:0.5px';
    counter.textContent = `${userCount} usuario${userCount !== 1 ? 's' : ''} registrado${userCount !== 1 ? 's' : ''}`;
    card.appendChild(counter);

    const list = el('div','admin-user-list');

    Object.entries(users).forEach(([key, displayName]) => {
        const cred     = creds[key];
        const password = cred ? cred.password : null;

        const row = el('div','admin-user-row');
        row.dataset.key = key;
        row.innerHTML = `
            <div class="admin-user-info">
                <div class="admin-user-name">${displayName}</div>
                <div class="admin-user-key">@${key}</div>
            </div>
            <div class="admin-user-actions">
                <div class="admin-pw-wrap" id="pw-wrap-${key}">
                    ${password
                        ? `<div class="admin-pw-field" id="pw-field-${key}">
                               <input type="password" class="admin-pw-input" id="pw-input-${key}" value="${password}" readonly>
                               <button class="admin-pw-eye" id="pw-eye-${key}" title="Ver/ocultar contraseña">👁</button>
                           </div>`
                        : `<span class="admin-pw-unknown">sin registro</span>`
                    }
                </div>
                <div class="admin-user-btns">
                    ${password ? `<button class="admin-btn admin-btn-reset" data-key="${key}">✏️ Reset</button>` : ''}
                    <button class="admin-btn admin-btn-delete" data-key="${key}">🗑</button>
                </div>
            </div>`;
        list.appendChild(row);

        if (password) {
            setTimeout(() => {
                const eyeBtn  = document.getElementById(`pw-eye-${key}`);
                const pwInput = document.getElementById(`pw-input-${key}`);
                if (eyeBtn && pwInput) {
                    eyeBtn.addEventListener('click', () => {
                        const hidden = pwInput.type === 'password';
                        pwInput.type = hidden ? 'text' : 'password';
                        eyeBtn.textContent = hidden ? '🙈' : '👁';
                    });
                }
            }, 0);
        }
    });

    card.appendChild(list);

    list.addEventListener('click', async (e) => {
        const deleteBtn = e.target.closest('.admin-btn-delete');
        const resetBtn  = e.target.closest('.admin-btn-reset');

        if (deleteBtn) {
            const key  = deleteBtn.dataset.key;
            const name = users[key];
            if (!confirm(`¿Eliminar al usuario "${name}"?\nEsta acción no se puede deshacer.`)) return;
            deleteBtn.disabled = true;
            deleteBtn.textContent = '...';
            const ok = await adminDeleteUser(key);
            if (ok) { showToast(`🗑 Usuario "${name}" eliminado`); renderAdmin(); }
            else    { deleteBtn.disabled=false; deleteBtn.textContent='🗑'; showToast('Error al eliminar usuario','rgba(230,57,70,0.95)'); }
        }

        if (resetBtn) {
            showResetModal(resetBtn.dataset.key, users[resetBtn.dataset.key]);
        }
    });

    return card;
}

function showResetModal(key, displayName) {
    const prev = document.getElementById('reset-modal-overlay');
    if (prev) prev.remove();

    const overlay = el('div','');
    overlay.id = 'reset-modal-overlay';
    overlay.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,0.75);display:flex;align-items:center;justify-content:center;z-index:9999;padding:20px;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);`;

    const modal = el('div','');
    modal.style.cssText = `background:#0f1626;border:1px solid rgba(76,201,240,0.25);border-radius:16px;padding:28px 24px;max-width:340px;width:100%;box-shadow:0 16px 48px rgba(0,0,0,0.7);`;
    modal.innerHTML = `
        <div style="font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:2px;margin-bottom:6px;color:var(--accent2)">Reset contraseña</div>
        <p style="font-size:13px;color:var(--muted);margin-bottom:20px">
            Nueva contraseña para <strong style="color:var(--text)">${displayName}</strong>.
        </p>
        <div class="field" style="margin-bottom:16px">
            <label>Nueva contraseña</label>
            <input type="text" id="reset-pw-input" placeholder="Mínimo 4 caracteres" autocomplete="off"
                   style="width:100%;padding:12px 14px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#e8edf5;font-family:'Outfit',sans-serif;font-size:15px;font-weight:600;outline:none">
        </div>
        <div id="reset-error" style="font-size:12px;color:var(--accent);margin-bottom:12px;display:none"></div>
        <div style="display:flex;gap:10px">
            <button id="reset-cancel-btn" style="flex:1;padding:12px;border:1px solid rgba(255,255,255,0.1);border-radius:10px;background:rgba(255,255,255,0.05);color:#a8b2c1;font-family:'Outfit',sans-serif;font-size:14px;font-weight:700;cursor:pointer">Cancelar</button>
            <button id="reset-confirm-btn" style="flex:1;padding:12px;border:none;border-radius:10px;background:var(--accent2);color:#080c18;font-family:'Outfit',sans-serif;font-size:14px;font-weight:700;cursor:pointer">Guardar</button>
        </div>`;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const input      = document.getElementById('reset-pw-input');
    const errorEl    = document.getElementById('reset-error');
    const cancelBtn  = document.getElementById('reset-cancel-btn');
    const confirmBtn = document.getElementById('reset-confirm-btn');

    input.focus();
    cancelBtn.addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });

    const doReset = async () => {
        const newPw = input.value.trim();
        if (newPw.length < 4) {
            errorEl.textContent = 'La contraseña debe tener al menos 4 caracteres.';
            errorEl.style.display = 'block';
            return;
        }
        confirmBtn.disabled = true;
        confirmBtn.textContent = 'Guardando...';
        const ok = await adminResetPassword(key, newPw);
        if (ok) { overlay.remove(); showToast(`✅ Contraseña de "${displayName}" actualizada`); renderAdmin(); }
        else    { errorEl.textContent='Error al guardar.'; errorEl.style.display='block'; confirmBtn.disabled=false; confirmBtn.textContent='Guardar'; }
    };

    confirmBtn.addEventListener('click', doReset);
    input.addEventListener('keydown', e => { if(e.key==='Enter') doReset(); });
}

// ══════════════════════════════════════════════════════
// ADMIN RESULT FORM
// ══════════════════════════════════════════════════════
function buildAdminResultForm() {
    const wrap = el('div');
    wrap.appendChild(el('div','info-box','Ingresá el resultado real para activar el ranking.'));

    const scoreDiv = el('div');
    scoreDiv.innerHTML = `
        <div class="score-block" style="margin-bottom:14px">
            <div class="score-team-block">
                <div class="score-team-tag">${PARTIDO.local.nombre}</div>
                <div class="score-stepper">
                    <button type="button" id="rDecL">−</button>
                    <div class="score-val" id="rValL">0</div>
                    <button type="button" id="rIncL">+</button>
                </div>
            </div>
            <div class="score-separator">—</div>
            <div class="score-team-block">
                <div class="score-team-tag">${PARTIDO.visitante.nombre}</div>
                <div class="score-stepper">
                    <button type="button" id="rDecV">−</button>
                    <div class="score-val" id="rValV">0</div>
                    <button type="button" id="rIncV">+</button>
                </div>
            </div>
        </div>
        <div id="rGolsL" style="margin-bottom:10px"></div>
        <div id="rGolsV" style="margin-bottom:14px"></div>`;
    wrap.appendChild(scoreDiv);

    setTimeout(() => {
        [['rDecL','rValL',-1],['rIncL','rValL',1],['rDecV','rValV',-1],['rIncV','rValV',1]].forEach(([bId,vId,dir]) => {
            const b=$(bId); if(!b) return;
            b.addEventListener('click', () => {
                $(vId).textContent = Math.max(0,Math.min(30,(parseInt($(vId).textContent)||0)+dir));
                syncAdminGoals();
            });
        });
    }, 0);

    const mvpF = el('div','field');
    mvpF.innerHTML = `
        <label>MVP real</label>
        <select id="rMvp">
            <option value="">— Elegí el MVP —</option>
            <optgroup label="${PARTIDO.local.nombre}">
                ${PARTIDO.local.jugadores.map(j=>`<option value="${j}">${j}</option>`).join('')}
            </optgroup>
            <optgroup label="${PARTIDO.visitante.nombre}">
                ${PARTIDO.visitante.jugadores.map(j=>`<option value="${j}">${j}</option>`).join('')}
            </optgroup>
        </select>`;
    wrap.appendChild(mvpF);

    const sub = el('button','btn btn-gold','Cargar resultado ✔');
    sub.style.marginTop='4px';
    sub.addEventListener('click', submitAdminResult);
    wrap.appendChild(sub);
    return wrap;
}

function syncAdminGoals() {
    buildAdminGolRows('rGolsL', PARTIDO.local.jugadores,     parseInt($('rValL')?.textContent)||0, 'rL');
    buildAdminGolRows('rGolsV', PARTIDO.visitante.jugadores, parseInt($('rValV')?.textContent)||0, 'rV');
}

function buildAdminGolRows(cId, players, total, pfx) {
    const c=$(cId); if(!c) return;
    if (total===0) { c.innerHTML=''; return; }
    const label = pfx==='rL' ? PARTIDO.local.nombre : PARTIDO.visitante.nombre;
    let html = `<div class="gol-header">${label} — ${total} gol${total>1?'es':''}</div>`;
    for (let i=0; i<total; i++) {
        html += `<div class="gol-row">
            <div class="slot-label">⚽${i+1}</div>
            <select class="admin-sel-${pfx}" style="flex:1;padding:10px 12px;background:var(--surface2);border:1px solid var(--border2);border-radius:10px;color:var(--text);font-family:'Outfit',sans-serif;font-size:14px;font-weight:600;outline:none;appearance:none">
                <option value="">— Jugador —</option>
                ${players.map(j=>`<option value="${j}">${j}</option>`).join('')}
            </select></div>`;
    }
    c.innerHTML = html;
}

async function submitAdminResult() {
    const gl  = parseInt($('rValL')?.textContent)||0;
    const gv  = parseInt($('rValV')?.textContent)||0;
    const mvp = $('rMvp')?.value;
    if (!mvp) { alert('Seleccioná el MVP'); return; }
    function collect(pfx) {
        const acc={};
        document.querySelectorAll(`.admin-sel-${pfx}`).forEach(s=>{if(s.value) acc[s.value]=(acc[s.value]||0)+1;});
        return Object.entries(acc).map(([nombre,goles])=>({nombre,goles}));
    }
    const ok = await saveResult({ golesLocal:gl, golesVisitante:gv, goladoresLocal:collect('rL'), goladoresVisitante:collect('rV'), mvp });
    if (ok) { showToast('✅ Resultado cargado'); renderAdmin(); }
    else alert('Error al guardar resultado.');
}

// ══════════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════════
window.addEventListener('DOMContentLoaded', () => {
    $('headerUser').style.display = 'none';
    hide('screen-app');
    show('screen-login');
    initLoginScreen();
    ['votar','ranking','admin'].forEach(t => { $(`pane-${t}`).style.display='none'; });
    $('pane-votar').style.display = '';
});
// ══════════════════════════════════════════════════════
// FIREBASE
// ══════════════════════════════════════════════════════
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
    getFirestore, doc, getDoc, setDoc, deleteDoc,
    collection, getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey:            "AIzaSyBOTiqD66pXibGPDzrVo3zaNinruqaVG8Q",
    authDomain:        "liga-pataduras.firebaseapp.com",
    projectId:         "liga-pataduras",
    storageBucket:     "liga-pataduras.firebasestorage.app",
    messagingSenderId: "557746788050",
    appId:             "1:557746788050:web:6a6c8e486ab071af923f0b"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

// ══════════════════════════════════════════════════════
// PRODE CONFIG — editar aquí para cada nueva fecha
// ══════════════════════════════════════════════════════

export const PARTIDO = {
    fecha:    'Fecha 2 — 2026',
    fecha_dt: '2026-03-29',
    hora:     '19:00',
    lugar:    'Sportivo Barracas',
    local: {
        nombre:    'La Naranja Lechera',
        logo:      'logos/logoNaranjaLechera.png',
        jugadores: [
            'Nahuel Monti','Jeronimo Hidalgo','Franco Favotti','Diego Arroyo',
            'Joni Monti','Vilche','Manuel Panizo','Franco Mangiameli',
            'Mateo Pugliese','Nicolás','Nahuel Lonero','Milton Cabrera','Lucas Garcia'
        ]
    },
    visitante: {
        nombre:    'Los Guerreros Z',
        logo:      'logos/logoGuerrerosZ.png',
        jugadores: [
            'Gerardo Vaello','Agustin Navarro','Alejo Osuna','Tobias Winjak',
            'Tomas Mango','Juanse Macchi','Fabrizio Cecchini','Enzo Juarez',
            'Agustin Lonero','Facundo Moran','Maxi Ventura','Teo Formento'
        ]
    }
};

export const ADMIN_PASSWORD = 'piston2026';
export const VOTING_OPEN    = true;
export const NEXT_FECHA     = 'Fecha 2';

export const PID = 'prode_' + PARTIDO.fecha.replace(/[\s—]+/g, '_');

// ══════════════════════════════════════════════════════
// FIRESTORE HELPERS
// ══════════════════════════════════════════════════════

async function fsGet(colPath, docId) {
    try {
        const snap = await getDoc(doc(db, colPath, docId));
        return snap.exists() ? snap.data() : null;
    } catch(e) { console.error('fsGet', colPath, docId, e); return null; }
}

async function fsSet(colPath, docId, data) {
    try {
        await setDoc(doc(db, colPath, docId), data);
        return true;
    } catch(e) { console.error('fsSet', colPath, docId, e); return false; }
}

async function fsDel(colPath, docId) {
    try {
        await deleteDoc(doc(db, colPath, docId));
        return true;
    } catch(e) { console.error('fsDel', colPath, docId, e); return false; }
}

async function fsGetAll(colPath) {
    try {
        const snap = await getDocs(collection(db, colPath));
        const result = {};
        snap.forEach(d => { result[d.id] = d.data(); });
        return result;
    } catch(e) { console.error('fsGetAll', colPath, e); return {}; }
}

// ══════════════════════════════════════════════════════
// USER REGISTRY
// ══════════════════════════════════════════════════════

export function normalizeUser(name) {
    return name.trim().toLowerCase().replace(/\s+/g, '-');
}

export function hashPassword(pw) {
    let h = 0;
    for (let i = 0; i < pw.length; i++) { h = (Math.imul(31, h) + pw.charCodeAt(i)) | 0; }
    return h.toString(36);
}

export async function getUsers()       { return (await fsGet('users', 'registry')) ?? {}; }
export async function saveUsers(users) { return fsSet('users', 'registry', users); }

export async function getAdminCreds()       { return (await fsGet('admin_creds', 'registry')) ?? {}; }
export async function saveAdminCreds(creds) { return fsSet('admin_creds', 'registry', creds); }

export async function registerAdminCred(key, displayName, password) {
    const creds = await getAdminCreds();
    creds[key] = { display: displayName, password };
    return saveAdminCreds(creds);
}
export async function deleteAdminCred(key) {
    const creds = await getAdminCreds();
    if (!creds[key]) return true;
    delete creds[key];
    return saveAdminCreds(creds);
}

// ══════════════════════════════════════════════════════
// VOTES
// ══════════════════════════════════════════════════════

export async function saveVote(vote)  { return fsSet(`votes/${PID}/entries`, normalizeUser(vote.user), vote); }
export async function getMyVote(user) { return fsGet(`votes/${PID}/entries`, normalizeUser(user)); }

// ══════════════════════════════════════════════════════
// RESULTS
// ══════════════════════════════════════════════════════

export async function getResult()    { return fsGet('results', PID); }
export async function saveResult(r)  { return fsSet('results', PID, r); }
export async function deleteResult() { return fsDel('results', PID); }

// ══════════════════════════════════════════════════════
// SCOREBOARD
// ══════════════════════════════════════════════════════

export async function publishMyScore(userKey, displayName, pts) {
    return fsSet(`scores/${PID}/entries`, userKey, { display: displayName, pts, voted: true });
}
export async function getScoreboard() {
    return Object.values(await fsGetAll(`scores/${PID}/entries`));
}
export async function getMyTotal(userKey) {
    const d = await fsGet('totals', userKey);
    return d ? d.total : 0;
}
export async function saveMyTotal(userKey, displayName, total) {
    return fsSet('totals', userKey, { display: displayName, total });
}
export async function getAllTotals() {
    return Object.values(await fsGetAll('totals'));
}

export async function hasAlreadyScored(userKey) {
    return !!(await fsGet(`scored/${PID}/flags`, userKey));
}
export async function markAsScored(userKey) {
    return fsSet(`scored/${PID}/flags`, userKey, { done: true });
}

// ══════════════════════════════════════════════════════
// AUTH
// ══════════════════════════════════════════════════════

export async function tryLogin(name, password) {
    if (!name || !password)  return { ok: false, error: 'Completá nombre y contraseña.' };
    if (name.length < 2)     return { ok: false, error: 'El nombre debe tener al menos 2 caracteres.' };
    if (password.length < 4) return { ok: false, error: 'La contraseña debe tener al menos 4 caracteres.' };

    const users = await getUsers();
    const key   = normalizeUser(name);
    const hash  = hashPassword(password);

    if (users[key]) {
        const creds = await getAdminCreds();
        if (!creds[key]) {
            return { ok: false, error: 'No se encontró tu credencial. Pedile al admin que resetee tu cuenta.' };
        }
        if (hashPassword(creds[key].password) !== hash) {
            return { ok: false, error: 'Contraseña incorrecta.' };
        }
        return { ok: true, isNew: false, displayName: users[key] };
    } else {
        const updatedUsers = { ...users, [key]: name.trim() };
        if (!(await saveUsers(updatedUsers))) {
            return { ok: false, error: 'No se pudo registrar tu usuario. Intentá de nuevo.' };
        }
        await registerAdminCred(key, name.trim(), password);
        return { ok: true, isNew: true, displayName: name.trim() };
    }
}

export async function adminDeleteUser(key) {
    const users = await getUsers();
    if (!users[key]) return false;
    delete users[key];
    const ok = await saveUsers(users);
    if (ok) await deleteAdminCred(key);
    return ok;
}

export async function adminResetPassword(key, newPassword) {
    const creds = await getAdminCreds();
    if (!creds[key]) return false;
    creds[key].password = newPassword;
    return saveAdminCreds(creds);
}

// ══════════════════════════════════════════════════════
// TABLAS DE PUNTAJE HISTÓRICO
// ══════════════════════════════════════════════════════

const SCORER_PTS = {
    'Diego Arroyo':       1,
    'Maxi Ventura':       1,
    'Tomas Mango':        1,
    'Mateo Pugliese':     1,
    'Franco Mangiameli':  1,
    'Fabrizio Cecchini':  2,
    'Alejo Osuna':        2,
    'Enzo Juarez':        2,
    'Tobias Winjak':      2,
    'Franco Favotti':     2,
    'Jeronimo Hidalgo':   3,
    'Juanse Macchi':      3,
    'Agustin Navarro':    3,
    'Agustin Lonero':     3,
    'Nahuel Monti':       3,
    'Joni Monti':         4,
    'Nicolás':            4,
    'Nahuel Lonero':      4,
    'Teo Formento':       4,
    'Facundo Moran':      4,
    'Manuel Panizo':      4,
    'Milton Cabrera':     5,
    'Gerardo Vaello':     5,
    'Vilche':             8,
};

const MVP_PTS = {
    'Diego Arroyo':       1,
    'Tomas Mango':        1,
    'Mateo Pugliese':     1,
    'Franco Mangiameli':  1,
    'Maxi Ventura':       2,
    'Fabrizio Cecchini':  2,
    'Alejo Osuna':        2,
    'Enzo Juarez':        2,
    'Tobias Winjak':      2,
    'Franco Favotti':     2,
    'Manuel Panizo':      2,
    'Jeronimo Hidalgo':   3,
    'Juanse Macchi':      3,
    'Agustin Navarro':    4,
    'Agustin Lonero':     4,
    'Vilche':             4,
    'Nahuel Monti':       4,
    'Joni Monti':         4,
    'Nicolás':            4,
    'Nahuel Lonero':      4,
    'Teo Formento':       4,
    'Facundo Moran':      4,
    'Milton Cabrera':     5,
    'Gerardo Vaello':     5,
};

export function scorerPts(nombre) { return SCORER_PTS[nombre] ?? 2; }
export function mvpPts(nombre)    { return MVP_PTS[nombre]    ?? 4; }

// ══════════════════════════════════════════════════════
// POINTS
// ══════════════════════════════════════════════════════

export function winner(gl, gv) { return gl > gv ? 'local' : gv > gl ? 'visit' : 'draw'; }

export function calcPoints(vote, result) {
    let pts = 0;
    const exact = vote.golesLocal === result.golesLocal && vote.golesVisitante === result.golesVisitante;
    if (exact) pts += 3;
    else if (winner(vote.golesLocal, vote.golesVisitante) === winner(result.golesLocal, result.golesVisitante)) pts += 1;

    const vS = [...(vote.goladoresLocal||[]), ...(vote.goladoresVisitante||[])];
    const rS = [...(result.goladoresLocal||[]), ...(result.goladoresVisitante||[])];
    for (const vs of vS) {
        const rs = rS.find(s => s.nombre === vs.nombre);
        if (rs && rs.goles === vs.goles) pts += scorerPts(vs.nombre) * vs.goles;
    }

    if (vote.mvp && vote.mvp === result.mvp) pts += mvpPts(vote.mvp);
    return pts;
}

export function getBreakdown(vote, result) {
    const bd = [];
    const exact = vote.golesLocal === result.golesLocal && vote.golesVisitante === result.golesVisitante;
    const win   = winner(vote.golesLocal, vote.golesVisitante) === winner(result.golesLocal, result.golesVisitante);

    bd.push({ label: `${result.golesLocal}-${result.golesVisitante} exacto`, pts: 3, hit: exact });
    if (!exact) bd.push({ label: 'Ganador correcto', pts: 1, hit: win });

    const vS = [...(vote.goladoresLocal||[]), ...(vote.goladoresVisitante||[])];
    const rS = [...(result.goladoresLocal||[]), ...(result.goladoresVisitante||[])];
    for (const vs of vS) {
        const rs     = rS.find(s => s.nombre === vs.nombre);
        const hit    = !!(rs && rs.goles === vs.goles);
        const potPts = scorerPts(vs.nombre) * vs.goles;
        bd.push({
            label:  `${vs.nombre} ×${vs.goles}`,
            pts:    potPts,
            hit,
            detail: hit ? `+${potPts}pts` : (rs ? `metió ${rs.goles}` : 'no metió')
        });
    }

    bd.push({ label: `MVP: ${vote.mvp}`, pts: mvpPts(vote.mvp), hit: vote.mvp === result.mvp });
    return bd;
}
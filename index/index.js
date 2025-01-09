function mostrarTitulo(){
    var titulo = document.getElementById("Titulo");
    titulo.innerHTML = `
        <h1>La Liga de los Pataduras</h1>
    `;
}

mostrarTitulo();

function mostrarLogo(){
    var logo = document.getElementById("Logo");
    logo.innerHTML = `
        <img width="80px" height="80px" alt="Esto es un logo" src="https://pbs.twimg.com/media/GTcpPQ2XEAEc3x-?format=png&name=small"/>
    `;
}

mostrarLogo();

function mostrarIntroduccion(){
    var introduccion = document.getElementById("introduccion");
    introduccion.innerHTML = `
        <li>
            <a href="introduccion.html">Introduccion</a>
        </li>    
    `;
}

mostrarIntroduccion();

function mostrar1eraEdicion(){
    var primeraEdicion = document.getElementById("primeraEdicion");
    primeraEdicion.innerHTML = `
        <li>
            <a href="1eraEdicion.html">1era Edicion</a>
        </li>    
    `;
}

mostrar1eraEdicion()

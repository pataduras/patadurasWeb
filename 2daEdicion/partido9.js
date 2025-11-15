function mostrarLugarYHora(){
    var LugarYHora = document.getElementById("LugarYHora");
    LugarYHora.innerHTML += `
        <h3><table id="sede"><tr><th><img width="30px" height="30px" alt="Hora" src="https://png.pngtree.com/png-vector/20221013/ourmid/pngtree-calendar-icon-logo-2023-date-time-png-image_6310337.png"/></th><th>Domingo 12/10, 19:00</th></tr></table><h3>
        <h3><table id="sede"><tr><th><img width="30px" height="30px" alt="Sede" src="https://images.vexels.com/media/users/3/140312/isolated/preview/a5a1a8894e16081a64cdbddae80aa04c-estadio-fortaleza.png"/></th><th>Que Golazo, Parque Patricios</th></tr></table><h3>
    `;
}

function mostrarLogoCuartoReich(){
    var logoCuartoReich = document.getElementById("logoCuartoReich");
    logoCuartoReich.innerHTML += `
        <h2><table id="AstrosGambeta"><tr><th>Astros de la Gambeta</th><th><img width="30px" height="30px" alt="Logo de Astros de la Gambeta" src="https://pbs.twimg.com/media/GjoHU1wXwAANOJr?format=png&name=360x360"/></th></tr></table><h2>
        <h2>10</h2>
    `;
}

function mostrarLogoUnidadPolenta(){
    var logoUnidadPolenta = document.getElementById("logoUnidadPolenta");
    logoUnidadPolenta.innerHTML += `
        <h2><table id="ComunidadAnillo"><tr><th>La Comunidad del Anillo</th><th><img width="35px" height="35px" alt="Logo de La Comunidad del Anillo" src="https://pbs.twimg.com/media/Gjq34pIXcAAYx-K?format=png&name=small"/></th></tr></table><h2>
        <h2>3</h2>
    `;
}

function mostrarJugadoresCuartoReich(){
    var jugadoresCuartoReich = document.getElementById("jugadoresCuartoReich");
       
    jugadoresCuartoReich.innerHTML += `
    <table id = "tabla">
        <tr id="subtitulo">
            <td>Jugadores</td>
        </tr>
        <tr>
            <td>Franco Favotti</td>
        </tr> 
        <tr>
            <td>Tobias Winjak</td>
        </tr>
        <tr>
            <td>Fabrizio Cecchinik</td>
        </tr>   
        <tr>
            <td>Diego Arroyo</td>
        </tr>   
        <tr>
            <td>Alejo Osuna</td>
        </tr>
        <tr>
            <td>Maxi Ventura</td>
        </tr>
        <tr>
            <td>Facundo Moran</td>
        </tr>
        <tr>
            <td>Nahuel Lonero</td>
        </tr>
    </table>
    `;
         
    
}

function mostrarGolesCuartoReich(){
    var golesCuartoReich = document.getElementById("golesCuartoReich");
       
    golesCuartoReich.innerHTML += `
        <table id = "tabla" >
            <tr id="subtitulo">
                <td>Goles</td>
            </tr>
            <tr>
                <td>0</td>
            </tr>
            <tr>
                <td>2</td>
            </tr>
            <tr>
                <td>1</td>
            </tr>

            <tr>
                <td>4</td>
            </tr>

            <tr>
                <td>0</td>
            </tr>
            <tr>
                <td>3</td>
            </tr>
            <tr>
                <td>0</td>
            </tr>
            <tr>
                <td>0</td>
            </tr>

        </table>
    `;
}

function mostrarJugadoresUnidadPolenta(){
    var jugadoresUnidadPolenta = document.getElementById("jugadoresUnidadPolenta");
    jugadoresUnidadPolenta.innerHTML += `
        <table id = "tabla">
            <tr id="subtitulo">
                <td>Jugadores</td>
            </tr>
            <tr>
                <td>Agustin Navarro</td>
            </tr>
            <tr>
                <td>Jeronimo Hidalgo</td>
            </tr>
            <tr>
                <td>Juanse Macchi</td>
            </tr>
            <tr>
                <td>Mateo Pugliese</td>
            </tr>
            <tr>
                <td>Franco Mangiameli</td>
            </tr>
            <tr>
                <td>Manuel Panizo</td>
            </tr>
            <tr>
                <td>Agustin Lonero</td>
            </tr>
            <tr>
                <td>--</td>
            </tr>

        </table>
    `;
}


function mostrarGolesUnidadPolenta(){
    var golesUnidadPolenta = document.getElementById("golesUnidadPolenta");
    golesUnidadPolenta.innerHTML += `
        <table id = "tabla">
            <tr id="subtitulo">
                <td>Goles</td>
            </tr>
            <tr>
                <td>0</td> 
            </tr>
            <tr>
                <td>0</td>
            </tr>
            <tr>
                <td>0</td> 
            </tr>
            <tr>
                <td>1</td> 
            </tr>
            <tr>
                <td>2</td> 
            </tr>
            <tr>
                <td>0</td>
            </tr>
            <tr>
                <td>0</td>
            </tr>    
            <tr>
                <td>--</td>
            </tr>  

        </table>
    `;
}

function mostrarFooter(){
    var footer = document.getElementById("footer");
    footer.innerHTML = `
        Liga de los Pataduras web &copy; 
    `;
}

mostrarLugarYHora();
mostrarLogoCuartoReich();
mostrarLogoUnidadPolenta();
mostrarJugadoresCuartoReich();
mostrarGolesCuartoReich();
mostrarJugadoresUnidadPolenta();
mostrarGolesUnidadPolenta();
mostrarFooter();
    
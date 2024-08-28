


function mostrarLugarYHora(){
    var LugarYHora = document.getElementById("LugarYHora");
    LugarYHora.innerHTML += `
        <h3><table id="sede"><tr><th><img width="30px" height="30px" alt="Hora" src="https://png.pngtree.com/png-vector/20221013/ourmid/pngtree-calendar-icon-logo-2023-date-time-png-image_6310337.png"/></th><th>Domingo 28/7, 16:00</th></tr></table><h3>
        <h3><table id="sede"><tr><th><img width="30px" height="30px" alt="Sede" src="https://images.vexels.com/media/users/3/140312/isolated/preview/a5a1a8894e16081a64cdbddae80aa04c-estadio-fortaleza.png"/></th><th>La Barraca, Barracas</th></tr></table><h3>
    `;
}

function mostrarLogoCuartoReich(){
    var logoCuartoReich = document.getElementById("logoCuartoReich");
    logoCuartoReich.innerHTML += `
        <h2><table id="CuartoReich"><tr><th>El Cuarto Reich</th><th><img width="30px" height="30px" alt="Logo de El Cuarto Reich" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Coat_of_arms_of_Germany.svg/220px-Coat_of_arms_of_Germany.svg.png"/></th></tr></table><h2>
        <h2>7</h2>
    `;
}

function mostrarLogoUnidadPolenta(){
    var logoUnidadPolenta = document.getElementById("logoUnidadPolenta");
    logoUnidadPolenta.innerHTML += `
        <h2><table id="UnidadPolenta"><tr><th>Unidad Polenta</th><th><img width="35px" height="35px" alt="Logo de Unidad Polenta" src="https://pbs.twimg.com/media/GTctxuDXIAAE9WS?format=png&name=small"/></th></tr></table><h2>
        <h2>14</h2>
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
            <td>Jeronimo Hidalgo</td>
        </tr>

        <tr>
            <td>Franco Favotti</td>
        </tr>

        <tr>
            <td>Lucas Garcia</td>
        </tr>

        <tr>
            <td>Facundo Moran</td>
        </tr>

        <tr>
            <td>Enzo Juarez</td>
            
        </tr>
        <tr>
            <td>Agustin Lonero</td>
            
        </tr>
        <tr>
            <td>Nahuel Lonero</td>
            
        </tr>

        <tr>
            <td>--</td>
            
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
                <td>5</td>
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
                <td>0</td>
                
            </tr>

            <tr>
                <td>--</td>
                
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
                <td>Fabrizio Cecchini</td>
            </tr>
                <tr>
                <td>Tobias Winjak</td>
            </tr>
            <tr>
                <td>Agustin Navarro</td>
            </tr>
            <tr>
                <td>Tomas Mango</td>
            </tr>
            <tr>
                
                <td>Alejo Osuna</td>
            </tr>
            <tr>
                
                <td>Maxi Ventura</td>
            </tr>
            <tr>
                
                <td>Nahuel Monti</td>
            </tr>
            <tr>
                
                <td>Gerardo Vaello</td>
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
                <td>4</td> 
            </tr>
            <tr>
                <td>2</td>
            </tr>
            <tr>
                <td>0</td> 
            </tr>
            <tr>
                <td>3</td>
            </tr>
            <tr>
                
                <td>2</td> 
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
    
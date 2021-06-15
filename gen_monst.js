"use strict"

var vc = document.getElementById("villa");
var papel = vc.getContext("2d");
var vl = document.getElementById("plano_lobo");
var layer_lobo = vl.getContext("2d");
var btn = document.getElementById("comenzar");
var nombre = document.getElementById("nombre");
var lobo_x = 210;
var lobo_y = 210;
var vaca_x = new Array();
var vaca_y = new Array();
var pollo_x = new Array();
var pollo_y = new Array();
var cerdo_x = new Array();
var cerdo_y = new Array();
var puntaje = document.getElementById("puntos");
var pts = 0;
var score = new Array();
var comienzo = false;
var remove = false;
puntaje.innerHTML = ("Puntaje: "+pts);

class high_scores {
    constructor(n, p) {
        this.name = n;
        this.points = p;
    }
}


var fondo = {
    url: "video y fotos/tile.png",
    cargaOK: false
};

var vaca = {
    url: "video y fotos/vaca.png",
    cargaOK: false
};

var pollo = {
    url: "video y fotos/pollo.png",
    cargaOK: false
};

var cerdo = {
    url: "video y fotos/cerdo.png",
    cargaOK: false
};

var lobo = {
    url: "video y fotos/lobo.png",
    cargaOK: false
}

var teclas = {
    ARRIBA: 38,
    ABAJO: 40,
    IZQ: 37,
    DER: 39
};

fondo.imagen = new Image();
fondo.imagen.src = fondo.url;
fondo.imagen.addEventListener("load", cargar_fondo);

vaca.imagen = new Image();
vaca.imagen.src = vaca.url;
vaca.imagen.addEventListener("load", cargar_vaca);

cerdo.imagen = new Image();
cerdo.imagen.src = cerdo.url;
cerdo.imagen.addEventListener("load", cargar_cerdo);

pollo.imagen = new Image();
pollo.imagen.src = pollo.url;
pollo.imagen.addEventListener("load", cargar_pollo);

lobo.imagen = new Image();
lobo.imagen.id = "lobito";
lobo.imagen.src = lobo.url;
lobo.imagen.addEventListener("load", cargar_lobo);

btn.addEventListener("click", comenzar);

function removescores(id) {
    var elementToBeRemoved = document.getElementById(id);
    elementToBeRemoved.parentNode.removeChild(elementToBeRemoved);
}

function final() {
    comienzo = false;
    console.log(comienzo);
    if (remove) {
        for (var i of score) {
            removescores(i.name);
        }
    }
    score.push(new high_scores(nombre.value, pts));
    score.sort(function(a, b){return b.points - a.points});
    console.log(score);
    papel.drawImage(fondo.imagen, 0, 0);
    for (var i of score) {
        var para = document.createElement("div");  
        para.id = i.name;
        para.innerHTML = i.name+"---------"+i.points+"<br>";              
        document.getElementById("lista").appendChild(para);
    }
    remove = true;
}

function comenzar() {
    if (nombre.value.length == 3) {
    btn.classList.add('animate__animated', 'animate__rubberBand');
    btn.classList.remove('animate__animated', 'animate__rubberBand');
    setTimeout(() => btn.classList.add('animate__animated', 'animate__rubberBand'), 100);
    layer_lobo.clearRect(0,0, vl.width, vl.height);
    lobo_x = 210;
    lobo_y = 210;
    dibujar();
    comienzo = true;
    pts = 0;
    puntaje.innerHTML = ("Puntaje: "+pts);
    setTimeout(final, 10000);
    } else {
        alert("Por favor ingrese su nombre de jugador\nEl mismo deberá contener exactamente 3 letras");
    }
}

function aleatorio(min = 0, max = 100) {
    var resultado = Math.floor(Math.random()*(max - min + 1)) + min;
    return resultado;
}

function dibujar() {
    if(fondo.cargaOK) {
        papel.drawImage(fondo.imagen, 0, 0);
    }
    if(vaca.cargaOK) {
        for (let i = 0; i <= 3; i++) {
        vaca_x[i] = aleatorio(0,420);
        vaca_y[i] = aleatorio(0,420);
        papel.drawImage(vaca.imagen, vaca_x[i], vaca_y[i]);
    }
    }
    if(pollo.cargaOK) {
        pollo_x[0] = aleatorio(0,420);
        pollo_y[0] = aleatorio(0,420);
        papel.drawImage(pollo.imagen, pollo_x[0], pollo_y[0]);
    }
    if(cerdo.cargaOK) {
        cerdo_x[0] = aleatorio(0,420);
        cerdo_y[0] = aleatorio(0,420);
        papel.drawImage(cerdo.imagen, cerdo_x[0], cerdo_y[0]);
    }
    if(lobo.cargaOK) {
        layer_lobo.drawImage(lobo.imagen, lobo_x, lobo_y);
    }
}

function cargar_fondo() {
    fondo.cargaOK = true;
    dibujar();
}

function cargar_vaca() {
    vaca.cargaOK = true;
    dibujar();
}

function cargar_cerdo() {
    cerdo.cargaOK = true;
    dibujar();
}

function cargar_pollo() {
    pollo.cargaOK = true;
    dibujar();
}

function cargar_lobo() {
    lobo.cargaOK = true;
    crea_lobo(lobo_x, lobo_y);
}

//generadores de vacas, cerdos y pollos
function gen_vaca() {
    var vaca_gen_x = aleatorio(0, 420);
    var vaca_gen_y = aleatorio(0, 420);
    papel.drawImage(vaca.imagen, vaca_gen_x, vaca_gen_y);
    vaca_x.push(vaca_gen_x);
    vaca_y.push(vaca_gen_y);
}

function gen_pollo() {
    papel.drawImage(pollo.imagen, aleatorio(0,420), aleatorio(0,420));
}

function gen_cerdo() {
    papel.drawImage(cerdo.imagen, aleatorio(0,420), aleatorio(0,420));
}


//mover al lobo
document.addEventListener("keydown", mover_lobo);

function crea_lobo(lobo_x ,lobo_y) {
    layer_lobo.drawImage(lobo.imagen, lobo_x, lobo_y);
}

function mover_lobo(evento) {
    if (comienzo) {
    var movimiento = 15;
    if(evento.keyCode == teclas.ARRIBA & lobo_y > 0) {
        layer_lobo.clearRect(0,0, vl.width, vl.height);
        crea_lobo(lobo_x, lobo_y - movimiento);
        lobo_y = lobo_y - movimiento;
        lobo_x = lobo_x;
    }
    if(evento.keyCode == teclas.ABAJO & lobo_y < 420) {
        layer_lobo.clearRect(0,0, vl.width, vl.height); 
        crea_lobo(lobo_x, lobo_y + movimiento);
        lobo_y = lobo_y + movimiento;
        lobo_x = lobo_x;
    }
    if(evento.keyCode == teclas.IZQ & lobo_x > 0) {
        layer_lobo.clearRect(0,0, vl.width, vl.height);
        crea_lobo(lobo_x - movimiento, lobo_y);
        lobo_y = lobo_y;
        lobo_x = lobo_x - movimiento;
    }
    if(evento.keyCode == teclas.DER & lobo_x < 420) {
        layer_lobo.clearRect(0,0, vl.width, vl.height);
        crea_lobo(lobo_x + movimiento, lobo_y);
        lobo_y = lobo_y;
        lobo_x = lobo_x + movimiento;
    }
}
}


//contacto con la vaca
function contacto_vaca() {
    for (let i = 0; i <= vaca_x.length; i++) {
    if (((lobo_x  >= vaca_x[i]) && (lobo_x <= (vaca_x[i] + 50)) && (lobo_y >= vaca_y[i]) && (lobo_y <= vaca_y[i] + 60)) || 
    (((lobo_x + 80) >= vaca_x[i] + 20) && ((lobo_x + 80) <= (vaca_x[i] + 80)) && (lobo_y >= vaca_y[i])  && (lobo_y <= vaca_y[i] + 60)) ||
    ((lobo_x  >= vaca_x[i]) && (lobo_x <= (vaca_x[i] + 50)) && (lobo_y + 80 >= vaca_y[i] + 30) && (lobo_y + 80 <= vaca_y[i] + 80)) || 
    (((lobo_x + 80) >= vaca_x[i] + 20) && ((lobo_x + 80) <= (vaca_x[i] + 80)) && (lobo_y + 80 >= vaca_y[i] + 30)  && (lobo_y + 80 <= vaca_y[i] + 80))) {
        console.log("tocaste la vaca");
        if (comienzo) {
            pts = pts + 10;
        }
        vaca_x.pop();
        vaca_y.pop();
        puntaje.innerHTML = ("Puntaje: "+pts);
        dibujar();
}
}
}
function contacto_pollo() {
    if (((lobo_x  >= pollo_x[0]) && (lobo_x <= (pollo_x[0] + 50)) && (lobo_y >= pollo_y[0]) && (lobo_y <= pollo_y[0] + 60)) || 
    (((lobo_x + 80) >= pollo_x[0] + 20) && ((lobo_x + 80) <= (pollo_x[0] + 80)) && (lobo_y >= pollo_y[0])  && (lobo_y <= pollo_y[0] + 60)) ||
    ((lobo_x  >= pollo_x[0]) && (lobo_x <= (pollo_x[0] + 50)) && (lobo_y + 80 >= pollo_y[0] + 30) && (lobo_y + 80 <= pollo_y[0] + 80)) || 
    (((lobo_x + 80) >= pollo_x[0] + 20) && ((lobo_x + 80) <= (pollo_x[0] + 80)) && (lobo_y + 80 >= pollo_y[0] + 30)  && (lobo_y + 80 <= pollo_y[0] + 80))) {
        console.log("tocaste el pollo");
        pollo_x.pop();
        pollo_y.pop();
        if (comienzo) {
            pts = pts + 50;
        }
        puntaje.innerHTML = ("Puntaje: "+pts);
        dibujar();
}
}
function contacto_cerdo() {
    if (((lobo_x  >= cerdo_x[0]) && (lobo_x <= (cerdo_x[0] + 50)) && (lobo_y >= cerdo_y[0]) && (lobo_y <= cerdo_y[0] + 60)) || 
    (((lobo_x + 80) >= cerdo_x[0] + 20) && ((lobo_x + 80) <= (cerdo_x[0] + 80)) && (lobo_y >= cerdo_y[0])  && (lobo_y <= cerdo_y[0] + 60)) ||
    ((lobo_x  >= cerdo_x[0]) && (lobo_x <= (cerdo_x[0] + 50)) && (lobo_y + 80 >= cerdo_y[0] + 30) && (lobo_y + 80 <= cerdo_y[0] + 80)) || 
    (((lobo_x + 80) >= cerdo_x[0] + 20) && ((lobo_x + 80) <= (cerdo_x[0] + 80)) && (lobo_y + 80 >= cerdo_y[0] + 30)  && (lobo_y + 80 <= cerdo_y[0] + 80))) {
        console.log("tocaste al cerdo");
        cerdo_x.pop();
        cerdo_y.pop();
        if (comienzo) {
            pts = pts + 30;
        }
        puntaje.innerHTML = ("Puntaje: "+pts);
        dibujar();
}
}


setInterval(contacto_vaca, 100);
setInterval(contacto_pollo, 100);
setInterval(contacto_cerdo, 100);




//setInterval(gen_vaca, 7000);
//setInterval(gen_cerdo, 12000);
//setInterval(gen_pollo, 20000);




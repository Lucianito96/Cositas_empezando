"use strict"

class billetes {
    constructor(valor, cant, url, id, cont) {
        this.valor = valor;
        this.cantidad = cant;
        this.url = url;
        this.id = id
        this.cont = cont;
    }
}

var caja = new Array();
var dinero;
var input = document.getElementById("ext");
var btn_ext = document.getElementById("btnext");
var aviso = document.getElementById("alerta");
var ext = document.getElementById("cant_ext");
var entregado = new Array();
var total = 0;
caja.push(new billetes(50, 10, "video y fotos/billete50.png", "50", false));
caja.push(new billetes(20, 20, "video y fotos/billete20.jpg", "20", false));
caja.push(new billetes(10, 30, "video y fotos/billete10.jpg", "10", false));

function appendImage(imageSource, divId, idimagen){
    var img = document.createElement("img");
    img.src = imageSource;
    img.setAttribute('id', idimagen);
    img.classList.add('animate__animated', 'animate__slideInDown')
    document.getElementById(divId).appendChild(img);
}

function removeImage(id) {
    var elementToBeRemoved = document.getElementById(id);
    elementToBeRemoved.parentNode.removeChild(elementToBeRemoved);
}

btn_ext.addEventListener("click", entregardinero);
function entregardinero() {
    ext.innerHTML = "";
    dinero = parseInt(input.value);
    for (var i of caja) {
        total = total + i.valor*i.cantidad;
        if (i.cont) {
            removeImage(i.id);
            i.cont = false;
        }
    }
        if (input.value % 100 == 0) {
        if (input.value > total) {
            aviso.style.color = "red";
            aviso.innerHTML = "No hay dinero suficiente <br/> para la transacción que desea realizar";
            aviso.classList.add('animate__animated', 'animate__flash');
        } else {
            aviso.style.color = "green";
            aviso.innerHTML = "Transacción exitosa!";
            aviso.classList.remove('animate__animated', 'animate__flash');
        for (var b of caja) {
            if (dinero > 0) {
            var div = Math.floor(dinero/b.valor);
            if (div > b.cantidad) {
                var papeles = b.cantidad;
            } else {
                var papeles = div;
            }
            entregado.push(new billetes(b.valor, papeles));
            dinero = dinero - (b.valor*papeles);
            b.cantidad = b.cantidad - papeles;
                if (papeles > 0) {//hitorial y transacc
                    var para = document.createElement("div");   
                    para.innerHTML = "<strong>Se entregaron:</strong> "+papeles+" billetes de "+b.valor;              
                    document.getElementById("historial").appendChild(para);
                    ext.innerHTML += "<strong>Se entregaron:</strong> "+papeles+" billetes de "+b.valor+"</br>"; 
                    appendImage(b.url, "billetes", b.id);
                    b.cont = true;
            }
        }
    }
    console.log(total) 
    total = 0;
    }
} else {
    aviso.style.color = "red";
    aviso.innerHTML = "Por favor ingresar <br/> un múltiplo de 100";
    aviso.classList.add('animate__animated', 'animate__flash');
}
}


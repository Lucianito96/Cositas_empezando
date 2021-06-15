"use strict"

//Variables
var verif = /^[0-9]+(\.?)[0-9]*$/
var boton = document.getElementById("boton");
var dato = document.getElementById("peso");
var parrafotierra = document.getElementById("tierra");
var parrafomarte = document.getElementById("marte");
var parrafojupiter = document.getElementById("jupiter");
var gmarte = 3.7;
var gjupiter = 24.8;
var gtierra = 9.8;
var planeta_elegido = "nada";
var i_tierra = 0;
var i_marte = 0;
var i_jupiter = 0;


//Funciones

//agrega imagen
function appendImage(imageSource, divId, idimagen,width = 100){
  var img = document.createElement("img");
  img.src = imageSource;
  img.setAttribute('id', idimagen);
  img.width = width;
  img.classList.add('animate__animated', 'animate__zoomInDown')
  document.getElementById(divId).appendChild(img);
}

//quita imagen
function removeImage(id) {
  var elementToBeRemoved = document.getElementById(id);
  elementToBeRemoved.parentNode.removeChild(elementToBeRemoved);
}

//para el select
function ShowSelected()
{
var cod = document.getElementById("opcion").value;
    if (cod == "0") {
      planeta_elegido = "nada";
    }
    if (cod == "1") {
        planeta_elegido = "TI";
    }
    if (cod == "2") {
        planeta_elegido = "MA";
    }
    if (cod == "3") {
    planeta_elegido = "JU";
    }
    if (cod == "4") {
        planeta_elegido = "todos";
    }
}

//Tarea al presionar el boton
boton.addEventListener("click", function () {
    if (verif.test(dato.value)) {
      boton.classList.add('animate__animated', 'animate__rubberBand');
      boton.classList.remove('animate__animated', 'animate__rubberBand');
      setTimeout(() => boton.classList.add('animate__animated', 'animate__rubberBand'), 100);
      var pesotierra = dato.value;
      var pesomarte = dato.value*gmarte/gtierra;
      var pesojupiter = dato.value*gjupiter/gtierra;
            if (planeta_elegido == "todos") {
                parrafotierra.innerHTML = ("Su peso en la tierra es: "+pesotierra+" kg");
                parrafomarte.innerHTML = ("Su peso en Marte es: "+pesomarte.toFixed(2)+" kg");
                parrafojupiter.innerHTML = ("Su peso en Júpiter es: "+pesojupiter.toFixed(2)+" kg");
                      if (i_tierra == 0) {
                      appendImage("video y fotos/tierra.png","imagen_t","tierraImg",650); 
                      i_tierra++;
                    }  
                      if (i_marte == 0) {
                      appendImage("video y fotos/marte.png","imagen_m","marteImg",200);
                      i_marte++;
                    }
                      if (i_jupiter == 0) {
                      appendImage("video y fotos/jupiter.png","imagen_j","jupiterImg",1000);
                      i_jupiter++;
                    }
            }
            if (planeta_elegido == "TI") {
              parrafotierra.innerHTML = ("Su peso en la tierra es: "+pesotierra+" kg");
              parrafomarte.innerHTML = ("");
              parrafojupiter.innerHTML = ("");  
              if (i_tierra == 0) {
                appendImage("video y fotos/tierra.png","imagen_t","tierraImg",650); 
                i_tierra++;
              }
              if (i_marte == 1) {
                var img_marte = document.getElementById("marteImg");
                img_marte.classList.add('animate__animated', 'animate__zoomOut', "animate__slower");
                setTimeout(() => removeImage("marteImg"), 700);
                i_marte--;
              }
              if (i_jupiter == 1) {
                var img_jupiter = document.getElementById("jupiterImg");
                img_jupiter.classList.add("animate__animated", "animate__zoomOut", "animate__slower");
                setTimeout(() => removeImage("jupiterImg"), 700);
                i_jupiter--;
              }                         
            }
            if (planeta_elegido == "MA") {
              parrafotierra.innerHTML = ("");
              parrafomarte.innerHTML = ("Su peso en Marte es: "+pesomarte.toFixed(2)+" kg");
              parrafojupiter.innerHTML = ("");
              if (i_tierra == 1) {
                var img_tierra = document.getElementById("tierraImg");
                img_tierra.classList.add('animate__animated', 'animate__zoomOut', "animate__slower");
                setTimeout(() => removeImage("tierraImg"), 700);
                i_tierra--;
              }
              if (i_marte == 0) {
                appendImage("video y fotos/marte.png","imagen_m","marteImg",200);
                i_marte++;
              }
              if (i_jupiter == 1) {
                var img_jupiter = document.getElementById("jupiterImg");
                img_jupiter.classList.add("animate__animated", "animate__zoomOut", "animate__slower");
                setTimeout(() => removeImage("jupiterImg"), 700);
                i_jupiter--;
              }   
            }
            if (planeta_elegido == "JU") {
              parrafotierra.innerHTML = ("");
              parrafomarte.innerHTML = ("");
              parrafojupiter.innerHTML = ("Su peso en Júpiter es: "+pesojupiter.toFixed(2)+" kg");  
              if (i_tierra == 1) {
                var img_tierra = document.getElementById("tierraImg");
                img_tierra.classList.add('animate__animated', 'animate__zoomOut', "animate__slower");
                setTimeout(() => removeImage("tierraImg"), 700);
                i_tierra--;
              }
              if (i_marte == 1) {
                var img_marte = document.getElementById("marteImg");
                img_marte.classList.add('animate__animated', 'animate__zoomOut', "animate__slower");
                setTimeout(() => removeImage("marteImg"), 700);
                i_marte--;
              }
              if (i_jupiter == 0) {
                appendImage("video y fotos/jupiter.png","imagen_j","jupiterImg",1000);
                i_jupiter++;
              }
            }
    } else {
    alert("error: formato de dato ingresado no es correcto\nasegurarse que sea un número\nsi se ingresan decimales utilizar separador\nno escribir las unidades en el campo\nutilizar el [ . ] como separador decimal")
            }
})

//dibujo linea
var rayadoble = document.getElementById("raya");
var lienzo = rayadoble.getContext("2d");

lienzo.beginPath();
lienzo.lineWidth = 3.0;
lienzo.strokeStyle = "white";
lienzo.moveTo(0, 0);
lienzo.lineTo(700, 0);
lienzo.stroke();
lienzo.moveTo(0, 10);
lienzo.lineTo(700, 10);
lienzo.stroke();
lienzo.closePath();


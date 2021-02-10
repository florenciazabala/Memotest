let estiloTablero = "renacimiento";
let turnos = 0;
let $primerCuadro = null;
let $primerCuadroAnverso = null;
const $tablero = document.querySelector('#tablero');
const $cuadros = $tablero.querySelectorAll('.cuadro > .reverso');
const $mensajeFinJuego = document.querySelector('#resultadoJuego');
let $cuadroactualReverso = null; //ver
let $elementoReverso;

function configurarEstiloUsuario (){
    let $botonEstilo = document.querySelector("#agregarEstilo");
    $botonEstilo.onclick = function (event){
        event.preventDefault();
        estilo();
    }
}


function estilo (){
    let formulario = document.querySelector("#estilos");
    formulario.onchange = function (){
        estiloTablero = document.querySelector("#estilos").estilo.value;
        
    } 
}

function mostrarObrasReferencia (obras){
    let $obrasReferencias = document.querySelectorAll(".obra");
    let titulos = [ 
        {titulo:"El nacimiento de Venus", autor: "Sandro Botticelli"}, 
        {titulo:"La creación de Adán", autor: "Miguel Ángel"}, 
        {titulo:"Amor sacro y amor profano", autor: "Tiziano"}, 
        {titulo:"La ultima cena", autor: "Leonardo Da Vinci"}, 
        {titulo:"La escuela de Atenas", autor: "Rafael Sanzio"},
        {titulo:"Mona Lisa", autor: "Leonardo Da Vinci"}, 
        {titulo:"La primavera", autor: "Sandro Botticelli"}, 
        {titulo:"Venus y Adonis", autor: "Tiziano"}
    ]
    let $titulo = document.querySelectorAll(".titulo");
    let $autor = document.querySelectorAll(".autor");
    obras.forEach(function(obra,i) {
        $obrasReferencias[i].classList.add(obra);
    });
    titulos.forEach(function(titulo,i) {
        $titulo[i].innerHTML = ""+titulo.titulo+"";
        $autor[i].innerHTML = ""+titulo.autor+"";
    });
    
}

function configurarJuego() {
    const obras = [''+estiloTablero+'1', ''+estiloTablero+'2', ''+estiloTablero+'3', ''+estiloTablero+'4', ''+estiloTablero+'5', ''+estiloTablero+'6',''+estiloTablero+'7',''+estiloTablero+'8'];
    const obrasDuplicadas = obras.concat(obras);
    configurarCuadros($cuadros, obrasDuplicadas);
    manejarEventos($tablero);
    mostrarObrasReferencia(obras);
}


function manejarEventos($tablero) {
    $tablero.onclick = function(e) {
      const $elementoAnverso = e.target;
      $cuadroactualReverso =e.path[1];
      if ($elementoAnverso.classList.contains('anverso')) {
        let $divReverso = e.path[1]
        $elementoReverso = $divReverso.querySelector(".cuadro > .reverso"); //Almacena el reverso del cuadro que contiene la clase obra
        manejarClickCuadro($elementoAnverso , $elementoReverso);
        
      }
    };
}
  
function configurarCuadros($cuadros, obras) {
    
  const obrasAleatoreas = obras.sort(function() {
      return 0.5 - Math.random();
  });
  
    obrasAleatoreas.forEach(function(obras, i) {
    $cuadros[i].classList.add(obras);
    });
}

function manejarClickCuadro($elementoAnverso, $elementoReverso) {
    mostrarCuadro($elementoAnverso);
     
    if ($primerCuadro === null) {
      $primerCuadro = $elementoReverso;
      $primerCuadroAnverso = $elementoAnverso;
      console.log($primerCuadroAnverso)
      
    } else {
  
        if ($primerCuadro === $elementoReverso) {
            return;
        }
        
        turnos++;
  
        if (cuadrosSonIguales($primerCuadro, $elementoReverso)) {
            ocultarCuadro($primerCuadroAnverso, $primerCuadro);
            ocultarCuadro($elementoAnverso, $elementoReverso);
            eliminarCuadro($primerCuadroAnverso);
            eliminarCuadro($elementoAnverso);
        } else {
            ocultarCuadro($primerCuadroAnverso, $primerCuadro);
            ocultarCuadro($elementoAnverso, $elementoReverso);
        }
    $primerCuadro = null;
    $primerCuadroAnverso = null;
 }
}
  
function cuadrosSonIguales($cuadro1, $cuadro2) {
 return $cuadro1.className === $cuadro2.className;
}
  
function mostrarCuadro($cuadro) {
   
    $cuadro.classList.add("mostrarAnverso");
    let rev = $cuadroactualReverso.querySelector (".cuadro > .reverso");
    rev.classList.add("mostrarReverso");
     
}
  
function ocultarCuadro($cuadroAnverso , $cuadroReverso) {
 setTimeout(function (){
    $cuadroAnverso.classList.remove("mostrarAnverso");
    $cuadroReverso.classList.remove("mostrarReverso");
   }, 1000);
   
};


  
function eliminarCuadro($cuadro) {
setTimeout(function() {
    $cuadro.parentElement.classList.add('completo');
    $cuadro.remove();
    evaluarFinDeJuego();
}, 1600);
}
  
function evaluarFinDeJuego() {
if (document.querySelectorAll('.anverso').length === 0) {
    setTimeout(function(){
        const $tableroGeneral = document.querySelector("#tableroGeneral");
        $tableroGeneral.style.display = 'none';
        $mensajeFinJuego.querySelector('strong').textContent = turnos.toString();
        $mensajeFinJuego.style.display = 'block';
    },1500);
}
}

configurarJuego();

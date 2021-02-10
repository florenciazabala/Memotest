let turnos = 0;
let $primerCuadro = null;
let $primerCuadroAnverso = null;
const $tablero = document.querySelector('#tablero');
const $cuadros = $tablero.querySelectorAll('.cuadro > .reverso');
const $mensajeFinJuego = document.querySelector('#resultadoJuego');
let $cuadroactualReverso = null; //ver
let $elementoReverso;

function configurarJuego() {
    const obras = ['renacimiento1', 'renacimiento2', 'renacimiento3', 'renacimiento4', 'renacimiento5', 'renacimiento6','renacimiento7','renacimiento8'];
    const obrasDuplicadas = obras.concat(obras);
    configurarCuadros($cuadros, obrasDuplicadas);
    manejarEventos($tablero);
}

function manejarEventos($tablero) {
    $tablero.onclick = function(e) {
      const $elementoAnverso = e.target;
      $cuadroactualReverso =e.path[1];
      if ($elementoAnverso.classList.contains('anverso')) {
        let $divReverso = e.path[1]
        $elementoReverso = $divReverso.querySelector(".cuadro > .reverso"); //Almacena el reverso del cuadro que contiene la clase obra
        console.log($elementoReverso)
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
}, 500);
}
  
function evaluarFinDeJuego() {
if (document.querySelectorAll('.anverso').length === 0) {
    setTimeout(function(){
        $tablero.style.display = 'none';
        $mensajeFinJuego.querySelector('strong').textContent = turnos.toString();
        $mensajeFinJuego.style.display = 'block';
    },2000);
}
}
  

configurarJuego();
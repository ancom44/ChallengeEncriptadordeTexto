//AUTOR: AFCM

let botonEncriptar=document.querySelector('.boton__encriptar');
let botonDesencriptar=document.querySelector('.boton__desencriptar')
let codigoTexto={'a':'ai','e':'enter','i':'imes','o':'ober','u':'ufat'};
let decodigoTexto={'ai':'a','enter':'e','imes':'i','ober':'o','ufat':'u'};
let textoEncriptado='';
let textoDesencriptado='';
botonEncriptar.addEventListener("click", codificarTexto);
botonDesencriptar.addEventListener("click",decodificarTexto);

//MODAL DE ALERTA
const valorModal=document.querySelector('.modal__error');
const contenedorModal=document.querySelector('.contenedor__modal');

valorModal.addEventListener("click",(e)=>!contenedorModal.contains(e.target) && valorModal.close());


function posicionarCursor(){
    document.querySelector('.texto__ingreso').focus();
}

const mostrarModal=(show) => show ? valorModal.showModal() : valorModal.close()

function codificarTexto(){

    let textoIngreso=document.querySelector('.texto__ingreso').value;
    if(textoIngreso==''){
        document.querySelector('.aviso__modal').innerText='AVISO';
        document.querySelector('.mensaje__modal').innerText='No ha texto para encriptar';
        mostrarModal(true);
    }
    else{
        let textoDividido=textoIngreso.split('');
        for (let i=0; i<textoDividido.length;i++){
            if(Object.keys(codigoTexto).includes(textoDividido[i])){
                textoEncriptado=textoEncriptado+codigoTexto[textoDividido[i]];
            }
            else{
                textoEncriptado=textoEncriptado+textoDividido[i];
            }
        }
        removerContenido(".contenido__final");
        //Agregar el texto encriptado a la salida
        agregarTextoSalida('textarea','texto__salida','.contenido__final',textoEncriptado);
        textoEncriptado='';
        setearAtributo('.contenedor__boton__copiar__oculto', 'contenedor__boton__copiar');
    }
}


function decodificarTexto(){
    let arregloCodigo=Object.keys(decodigoTexto);
    let textoIngreso=document.querySelector('.texto__ingreso').value;
    if(textoIngreso==''){
        document.querySelector('.aviso__modal').innerText='AVISO';
        document.querySelector('.mensaje__modal').innerText='No ha texto para desencriptar';
        mostrarModal(true);
    }
    else{
        let textoSalidaDividido=textoIngreso.split(' ');
        let textoPalabraFinal='';
        let textoFinal='';
        for (let i=0; i<textoSalidaDividido.length;i++){
            textoPalabraFinal=textoSalidaDividido[i];
            for (let e=0; e<arregloCodigo.length; e++){
                if(textoSalidaDividido[i].includes(arregloCodigo[e]))
                    {
                        textoPalabraFinal=textoPalabraFinal.replaceAll(arregloCodigo[e],decodigoTexto[arregloCodigo[e]]);
                    }
            }
            textoFinal=textoFinal+textoPalabraFinal+' ';
        }
        removerContenido(".contenido__final");
        agregarTextoSalida('textarea','texto__salida','.contenido__final',textoFinal);
        setearAtributo('.contenedor__boton__copiar__oculto', 'contenedor__boton__copiar')
    }
}

function removerContenido(elementoPadre){
    let elementoHtml=document.querySelector(elementoPadre);
    while(elementoHtml.hasChildNodes()){
        elementoHtml.removeChild(elementoHtml.firstChild);
    }
}


function agregarTextoSalida(tipoElemento, claseElemento,elementoPadre,contenidoElemento){
    let elementoNuevo=document.createElement(tipoElemento);
    elementoNuevo.setAttribute('class',claseElemento);
    elementoNuevo.innerText='';
    elementoNuevo.innerText=contenidoElemento;
    document.querySelector(elementoPadre).appendChild(elementoNuevo);
}

function setearAtributo(elementoOculto,claseElementoVisible){
    let elementoVisible=document.querySelector(elementoOculto);
    elementoVisible.classList.add(claseElementoVisible);
}



function borrarTexto(elementoInput){
    let elementoBorrar=document.querySelector(elementoInput);
    elementoBorrar.value='';
}

function copiarEnPortapapeles(){
    let valorElementoCopiado=document.querySelector('.texto__salida');
    if(window.screen.width<1024){
        valorElementoCopiado.select();
        document.execCommand('copy');
        borrarTexto('.texto__salida');
        borrarTexto('.texto__ingreso');
        posicionarCursor();
        
    }
    else{
        navigator.clipboard.writeText(valorElementoCopiado.value);
        borrarTexto('.texto__salida');
        borrarTexto('.texto__ingreso');
        posicionarCursor();
       

    }

    
}
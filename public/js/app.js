const contactForm = document.querySelector(".contact-form");
let name = document.getElementById("name");
let email = document.getElementById("email");
let subject = document.getElementById("subject");
let message = document.getElementById("message");


contactForm.addEventListener("submit", (e)=>{
    e.preventDefault();
//objeto formData
    let formData = {
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value
    }
//SOLUCITUD HTTPREQUEST => CREAMOS UNA NUEVA SOLICITUD
//XHR ABRE UN ARGUMENTO (METODO"POST",SEGUNDO ARGUMENTO "DIRECTORIO RAIZ "/"")
    let xhr = new XMLHttpRequest();
    xhr.open(`POST`, "/");
    //Configuracion del emcabezado de tipo contenido aplicacion envia a json
    xhr.setRequestHeader("content-type","application/json");
    xhr.onload = function(){
        //responseText registra el recibo de respuesta de servidor
        console.log(xhr.responseText);
        if (xhr.responseText == `success`) {
            alert("Email enviado");
            name.value = "";
            email.value = "";
            subject.value = "";
            message.value = "";
        } else {
            alert("Algo salio mal");
        } 
    }
//Devuelve la info por el lado del servidor
    xhr.send(JSON.stringify(formData));
})
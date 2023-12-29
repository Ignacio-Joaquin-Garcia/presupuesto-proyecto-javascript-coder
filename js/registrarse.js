let main = document.getElementById("main");

//--------CREAR ESTRUCTURA PRINCIPAL
let sectionInicioSesion = document.createElement("section")
sectionInicioSesion.className = "inicio-sesion"
sectionInicioSesion.innerHTML = `
                                <h1>Crear Cuenta</h1>
                                <div class="i-inputs">
                                    <div id="input0" class="bordes-input"></div>
                                    <div id="input1" class="bordes-input"></div>
                                    <div id="input2" class="bordes-input"></div>
                                    <div id="input3" class="bordes-input"></div>
                                    </div>
                                `
main.appendChild(sectionInicioSesion)

let divIngresoDatosNombre = document.getElementById("input0");
let inputNombre = document.getElementById("nombre");
let imagenNombre = document.createElement("img");
imagenNombre.src = "../assets/img/user.png";
imagenNombre.alt = "logo nombre";
divIngresoDatosNombre.appendChild(inputNombre);
divIngresoDatosNombre.appendChild(imagenNombre);


let divIngresoDatosEmail = document.getElementById("input1");
let inputEmail = document.getElementById("email");
let imagenEmail = document.createElement("img");
imagenEmail.src = "../assets/img/gmail.png";
imagenEmail.alt = "logo email";
divIngresoDatosEmail.appendChild(inputEmail);
divIngresoDatosEmail.appendChild(imagenEmail);


let divIngresoDatosPassword = document.getElementById("input2");
let inputPassword = document.getElementById("password");
let imagenPassword = document.createElement("img");
imagenPassword.src = "../assets/img/contraseña.png";
imagenPassword.alt = "logo password";
divIngresoDatosPassword.appendChild(inputPassword);
divIngresoDatosPassword.appendChild(imagenPassword);


let divRepetirIngresoDatosPassword = document.getElementById("input3");
let inputRepetirPassword = document.getElementById("repetir-password");
let imagenRepetirPassword = document.createElement("img");
imagenRepetirPassword.src = "../assets/img/lock.png";
imagenRepetirPassword.alt = "logo repetir password";
imagenRepetirPassword.className = "lock";
divRepetirIngresoDatosPassword.appendChild(inputRepetirPassword);
divRepetirIngresoDatosPassword.appendChild(imagenRepetirPassword);

// ----------CREAMOS CONTENEDOR QUE CONTENGA POSIBLES AVISOS
let divContenedorAvisos = document.createElement("div")
sectionInicioSesion.appendChild(divContenedorAvisos)


let buttonSubmit = document.createElement("button");
buttonSubmit.type = "submit";
buttonSubmit.textContent = "Registrarse";
sectionInicioSesion.appendChild(buttonSubmit);


let divContenedorPrincipal = document.createElement("div")
divContenedorPrincipal.classList = "entro-sesion"
divContenedorPrincipal.style.display = "none"
sectionInicioSesion.appendChild(divContenedorPrincipal)
let divContenedor = document.createElement("div")
divContenedorPrincipal.appendChild(divContenedor)


class nuevoUsuario{
    constructor(nombre, email, password){
        this.nombre = nombre,
        this.email = email,
        this.password = password
    }
}

let usuario;
function registrarse(){
    if(inputPassword.value === inputRepetirPassword.value){
        if(inputNombre.value != "" && inputEmail.value != "" && inputPassword.value != "" && inputRepetirPassword.value != ""){
            let nombre = inputNombre.value;
            let email = inputEmail.value;
            let password = inputPassword.value;

            let datosValidos = true;
            //----Comprobar si el mail ya existe en el sv
            fetch('https://658107903dfdd1b11c42512b.mockapi.io/datos/usuarios', {
                method: 'GET',
                headers: {'content-type':'application/json'},
                }).then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                }).then(usuarios => {
                    usuarios.forEach(usuario => {
                        console.log(usuario.email)
                        console.log(email)
                        if(usuario.email === email){
                            datosValidos = false;
                        }
                        console.log(datosValidos)
                    });
                }).catch(error => {
                    console.log("error con el sv: "+error)
                })
            //--AÑADIMOS TIEMPO MUERTO PARA QUE SE PUEDAN CARGAR LOS DATOS DEL SV
            setTimeout(()=>{
                if(datosValidos === true){
                    buttonSubmit.disabled = true;
                    usuario = new nuevoUsuario(nombre, email, password)
                    //--GUARDAMOS DATOS EN API (HACEMOS LOS DATOS FLEXIBLES A CUALQUIER DISPOSITIVO)
                    fetch('https://658107903dfdd1b11c42512b.mockapi.io/datos/usuarios', {
                        method: 'POST',
                        headers: {'content-type':'application/json'},
                        body: JSON.stringify(usuario)
                    }).then(res => {
                        if (res.ok) {
                            return res.json();
                        }
                    })
                    let tituloAviso = document.createElement("h3")
                    tituloAviso.innerText = "Registraste tu cuenta con éxito!!"
                    divContenedor.appendChild(tituloAviso)
                    let imgAviso = document.createElement("img")
                    imgAviso.src = "../assets/img/limite-ok.png"
                    divContenedor.appendChild(imgAviso)

                    let cuentaRegresiva = 4;
                    divContenedorPrincipal.style.display = "flex"
                    let pRedireccion = document.createElement("p")
                    divContenedorPrincipal.appendChild(pRedireccion)
                    setInterval(()=>{
                        cuentaRegresiva -= 1;
                        cuentaRegresiva < 4 ? pRedireccion.textContent = `Redirrecionando a la pagina para iniciar sesión en ${cuentaRegresiva}` : console.log(cuentaRegresiva);
                        cuentaRegresiva === 0 ? window.location.href = "inicio-sesion.html" : console.log(cuentaRegresiva);
                    }, 1000);
                setTimeout(()=>{buttonSubmit.disabled = false}, 1250)
                }else{
                    let aviso = document.createElement("h3")
                    aviso.innerText = "El Email ingresado ya esta registrado! Pruebe ingresando un mail diferente";
                    aviso.classList = "aviso"
                    divContenedorAvisos.appendChild(aviso)
                    setTimeout(()=>{aviso.remove()},6000)
                }
            }, 800);
        } else{
            let aviso = document.createElement("h3")
            aviso.innerText = "No tiene que haber campos vacios!";
            aviso.classList = "aviso"
            divContenedorAvisos.appendChild(aviso)
            setTimeout(()=>{aviso.remove()},6000)
        }
    } else{
        let aviso = document.createElement("h3")
        aviso.innerText = "Las contraseñas tienen que coincidir!";
        aviso.classList = "aviso"
        divContenedorAvisos.appendChild(aviso)
        setTimeout(()=>{aviso.remove()},6000)
    }
}



document.addEventListener("DOMContentLoaded", ()=>{
    buttonSubmit.addEventListener("click", ()=>{
        registrarse();
    })
})


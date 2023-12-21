//---OBTENEMOS DATOS DE USUARIOS DE LA API
let usuariosAPI;
fetch('https://658107903dfdd1b11c42512b.mockapi.io/datos/usuarios')
.then(res => {
    if (res.ok) {
        return res.json();
    }
})
.then(usuarios => {
    usuariosAPI = usuarios;
})
.catch(error => {
    console.log("error en la captura de datos"+error);
})

//creamos estructura HTML
let main = document.getElementById("main");


let sectionInicioSesion = document.createElement("section")
sectionInicioSesion.className = "inicio-sesion"
sectionInicioSesion.innerHTML = `
                                <h1>Inicio de Sesión</h1>
                                <div class="i-inputs">
                                    <div id="input1" class="bordes-input"></div>
                                    <div id="input2" class="bordes-input"></div>
                                </div>
                                `
main.appendChild(sectionInicioSesion)


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


let buttonSubmit = document.createElement("button")
buttonSubmit.type = "submit"
buttonSubmit.textContent = "Iniciar Sesión"
sectionInicioSesion.appendChild(buttonSubmit)

//--Creamos div que contenga posible h3 y img para aviso si entro
let divContenedorPrincipal = document.createElement("div")
divContenedorPrincipal.classList = "entro-sesion"
divContenedorPrincipal.style.display = "none"
sectionInicioSesion.appendChild(divContenedorPrincipal)
let divContenedor = document.createElement("div")
divContenedorPrincipal.appendChild(divContenedor)


let divRegistro = document.createElement("div")
divRegistro.className = "registrarse"
divRegistro.innerHTML = `
                        <p>¿Todavia no tenes cuenta?</p>
                        <a href="registro.html">Registrate</a>
                        `
sectionInicioSesion.appendChild(divRegistro)


//--------Añadir CAPTURA DE DATOS DE LOS INPUTS al hacer click en SUBMIT
function capturarDatosInput(){
    let elUsuarioEntro = false;
    buttonSubmit.addEventListener("click", ()=>{
        usuariosAPI.forEach(usuario => {
            if(inputEmail.value === usuario.email && inputPassword.value === usuario.password){
                elUsuarioEntro = true
                console.log("usuario ok " +elUsuarioEntro)
                //-------Guardamos al mismo tiempo el usuario ingresado para utilizar en los otros html
                sessionStorage.setItem("usuario", JSON.stringify(usuario));
            }
        });
        return new Promise((resolve, reject)=>{
            if(elUsuarioEntro === true){
                resolve("promesa resuelta")
            } else{
                reject("promesa rechazada")
            }
        })
        .then(() => {
            console.log("logro entrar");
            let tituloAviso = document.createElement("h3")
            tituloAviso.innerText = "Entraste a tu cuenta!!"
            divContenedor.appendChild(tituloAviso)
            let imgAviso = document.createElement("img")
            imgAviso.src = "../assets/img/limite-ok.png"
            divContenedor.appendChild(imgAviso)
            let cuentaRegresiva = 4;
            divContenedorPrincipal.style.display = "flex"
            divRegistro.style.display = "none"
            let pRedireccion = document.createElement("p")
            divContenedorPrincipal.appendChild(pRedireccion)
            setInterval(()=>{
                cuentaRegresiva -= 1;
                cuentaRegresiva < 4 ? pRedireccion.textContent = `Redirrecionando a la pagina principal en ${cuentaRegresiva}` : console.log(cuentaRegresiva);
                cuentaRegresiva === 0 ? window.location.href = "../index.html" : console.log(cuentaRegresiva);
            }, 1000)
        })
        .catch(() => {
            console.log("contraseña erronea");
            divRegistro.style.animationName = "moverRegistro";
            let contador = 0;
            setTimeout(()=>{
                divRegistro.style.animationName = "";
            }, 4000)
        });
    })
}
capturarDatosInput();
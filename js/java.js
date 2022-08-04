class generadorCodigo {
    constructor(nombre, apellido, genero, nacimiento) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.genero = genero;
        this.nacimiento = nacimiento;
    }
    obtienePrimerDigito(cadena) { //obtiene primer digito de cada palabra de cadena con espacios
        let arrayPalabra = cadena.split(" ");
        let obtiene = "";
        for (const key in arrayPalabra) {
            let elemento = arrayPalabra[key];
            obtiene += elemento.substring(0, 1);
        }
        return obtiene;
    }
    obtienePrimerDigitoNacimiento(cadena) { //obtiene primer digito de la fecha de nacimiento (dia/mes/año)
        let arrayPalabra = cadena.split("-");
        let obtiene = "";
        for (const key in arrayPalabra) {
            let elemento = arrayPalabra[key];
            obtiene += elemento.substring(0, 1);
        }
        return obtiene;
    }
    generaCodigo() {//genera codigo 
        let codigo = `COD${this.obtienePrimerDigito(this.nombre)}`;
        codigo += this.obtienePrimerDigito(this.apellido);
        codigo += this.obtienePrimerDigitoNacimiento(this.nacimiento);
        codigo += this.genero;
        return codigo.toUpperCase();
    }
    validaGenero() {
        let string = "";
        if (this.genero == "M") {
            string = "Masculino";
        }
        else {
            string = "Femenino"
        }
        return string;
    }
    info() {
        return `
        <p>Nombre: <b>${this.nombre.toUpperCase()}</b></p>
        <p>Apellido: <b>${this.apellido.toUpperCase()}</b></p>
        <p>Genero: <b>${this.validaGenero().toUpperCase()}</b></p>
        <p>Año de nacimiento: <b>${this.nacimiento}</b></p>`
    }

}

function prueba() {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let genero = document.getElementById("genero").value;
    let nacimiento = document.getElementById("nacimiento").value;
    //validamos que ingrese datos, si no ingresa devuelve error 
    if (nombre == null || nombre.length == 0) {
        alert('[ERROR] El campo nombre debe tener un valor...');
        return false;
    }
    else if (apellido == null || apellido.length == 0) {
        alert('[ERROR] El campo apellido debe tener un valor...');
        return false;
    }
    // llamamos al objeto
    const objetoCodigo = new generadorCodigo(nombre, apellido, genero, nacimiento);
    //agregamos el objeto a un array
    agregaArray(objetoCodigo);
    let html = `<tbody><td><i><b>Agrego cliente ${objetoCodigo.apellido} correctamente...</b></i></td></tbody>`;
    document.getElementById("respuesta").innerHTML += html;
    let html2 = `<p><input type="button" value="Mostrar Clientes" onclick="mostrar()"></p>`;
    html2 += `<p id="resultado"></p>`;

    document.getElementById("respuestaB").innerHTML = html2;

    return true;
}

//funcion agrega array
var array = [];
function agregaArray(objetoCodigo) {
    array.push(objetoCodigo);
}

//funcion mostrar
function mostrar() {
    let indice = 0;
    for (const iterator of array) {
        let html = iterator.info();
        html += `Codigo : <b>${iterator.generaCodigo()}</b>`;
        html += `<p><input type="button" value="Eliminar Cliente" onclick="eliminar(${indice})"></p>`;
        html += `<br>-----------------------------------------------<br>`;
        document.getElementById("resultado").innerHTML += html;
        indice++;
    }
}

function eliminar(indice) {
    console.log(array)
    array.splice(indice,1);
    console.log(array)
    document.getElementById("resultado").innerHTML = "";
    mostrar()
}



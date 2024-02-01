//contador para identificar cada id
let idCounter = 0;
//identificamos el cuadro de texto donde vamos a escribir
const input = document.querySelector('input[type="text"]')
//guardamos la fecha para implimentar la fecha actual en el footer
let fecha = new Date(); 
let fechaElemento = document.getElementById("fecha");
let formatoFecha = (fecha.getDate() < 10 ? "0" : "") + fecha.getDate() + "/" + (fecha.getMonth() < 10 ? "0" : "") + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
fechaElemento.innerHTML = "Fecha:" + formatoFecha;
//detectamos cada vez que introduzcamos una nueva tarea
userInput.addEventListener('submit', (event) => {
    event.preventDefault();//para que no se nos borre el mensaje de consola
    addTask();
});
//creamos la función addtask() para añadir cada nueva tarea con su estructura correspondiente
let addTask = () => {
    idCounter++;
    let newvalue = input.value;
    if (input.value != '') {
        list.innerHTML += `
    <div class="task-container" id='${idCounter}'> 
        <label>
            <input type="checkbox">
            ${newvalue}
        </label>
        <img src="./img/cubo-de-basura.png" class="close-btn">
    </div> `
        //dejamos el input sin contenido:
        input.value = '';
        actualizarStats();
    }

};

//hacemos que cada vez que hagamos click comprobar si pinchamos en el checkbox o en la papelera
list.addEventListener('click', (event) => {
    if (event.target.nodeName == 'INPUT') {
        actualizarStats(); //al clickear en el checkbox actualizaremos las estadísticas
    } else if (event.target.nodeName == 'IMG') {
        deleteTarea(event.target.parentNode.id); //al clickear en la imagen de la papelera borraremos la tarea a la que corresponde
    }
});

let actualizarStats = () => {
    let elementList = list.querySelectorAll('div'); //guardamos la cantidad de tareas que hallamos añadido
    let checkbox = list.querySelectorAll('input[type="checkbox"]:checked'); //guardamos la cantidad de casillas marcadas
    //añadimos los datos para que se muestre las tareas sin realizar y las completadas
    stats.innerHTML = `<p>Tareas pendientes: ${elementList.length - checkbox.length} Tareas completadas: ${checkbox.length}<p>`
};

//Función que borra las tareas:
let deleteTarea = (id) => {
    let tareaBorrada = document.getElementById(id);
    list.removeChild(tareaBorrada);
    actualizarStats();
};

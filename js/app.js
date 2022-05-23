//burger
const navSlide = () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");

    burger.addEventListener("click", () => {
        nav.classList.toggle("nav-active");

        navLinks.forEach((link, index)=>{
            if (link.style.animation) {
                link.style.animation = "";
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
            }
    });
    //animacion de burger
    burger.classList.toggle("toggle");

    });
}

navSlide();




//==============================================================//

var ArrayEventos = []
var eventos = []
var fechaActual = ""
var categorias = []
var categoriasSinRepetir = []
var valSearch = ""
var valSelector = ""
var eventosPorSelector = []
var arrayFiltrado = []

async function getData(){
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
        .then(response =>response.json())
        .then(json =>ArrayEventos.push(json))
        console.log(ArrayEventos);
    
    eventos = ArrayEventos[0].eventos
    console.log(eventos)
    console.log(ArrayEventos);
    fechaActual = ArrayEventos[0].fechaActual
    categorias.push(...eventos.map(categoria => categoria.category))
    var limpiarCategorias = new Set(categorias)
    categoriasSinRepetir = [...limpiarCategorias] 

    displayCard(eventos)
    
    var templateHtml =""
    var selector = document.querySelector("#selector")
    categoriasSinRepetir.map(categoria=>{
        templateHtml+=
        `
        <option value="${categoria}">${categoria}</option>
        `
    })
    selector.innerHTML = templateHtml

}
getData()

document.querySelector("#selector").addEventListener("change", selectorCategoria)

function selectorCategoria(event){
    valSelector = event.target.value

    if(valSearch !== ""){
        arrayFiltrado = eventos.filter(evento=>evento.name.toLowerCase().includes(valSearch.toLowerCase()))
        eventosPorSelector = arrayFiltrado.filter(evento=> evento.category == valSelector)
        displayCard(eventosPorSelector)

    }else{
        eventosPorSelector = eventos.filter(evento=> evento.category == valSelector)
        displayCard(eventosPorSelector)
    }
}

function displayCard(data){
    var futuros = data.filter(evento =>evento.date > fechaActual)
    var pasados = data.filter(evento =>evento.date < fechaActual)
    var tarjetasFuturos = futuros.slice(0,3)
    var tarjetasPasados = pasados.slice(0,3)
    EventosHtml = ""
    tarjetasFuturos.map(eventoParticular =>{
        EventosHtml += `
        
        <div class="card">
        <div class="card-image" style="background-image: url(${eventoParticular.image});">
        </div>
            
            <div class="card-text" >
                <h4>${eventoParticular.name}</h4>
                <p class="fecha-lugar">${eventoParticular.date} - ${eventoParticular.place} </p>
                <p class="descripcion">${eventoParticular.description} </p>
                <a href="./details.html?id=${eventoParticular.id}">Ver más detalles</a>
            </div>
        </div>
        
        `
    })
    EventosHtml2 = ""
    tarjetasPasados.map(eventoParticular =>{
        EventosHtml2 += `
        
        <div class="card">
        <div class="card-image" style="background-image: url(${eventoParticular.image});">
        
        </div>
            
            <div class="card-text">
                <h4>${eventoParticular.name}</h4>
                <p class="fecha-lugar">${eventoParticular.date} - ${eventoParticular.place} </p>
                <p class="descripcion">${eventoParticular.description} </p>
                <a href="./details.html?id=${eventoParticular.id}">Ver más detalles</a>
            </div>
        </div>
        
        `
    })

    document.querySelector("#cards").innerHTML = EventosHtml
    document.querySelector("#cards2").innerHTML = EventosHtml2
}

document.querySelector("#searchInput").addEventListener("keyup", search)

function search(evento){
    valSearch = evento.target.value
    if(valSelector !==""){
        eventosPorSelector = eventos.filter(evento => evento.category == valSelector)
        arrayFiltrado = eventosPorSelector.filter(evento =>evento.name.toLowerCase().includes(valSearch.toLowerCase()))
        displayCard(arrayFiltrado)
    }else{
        arrayFiltrado = eventos.filter(evento=>evento.name.toLowerCase().includes(valSearch.toLowerCase()))
        displayCard(arrayFiltrado)
    }
}
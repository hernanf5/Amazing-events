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


var ArrayEventos = []
var eventos = []
var fechaActual = ""
var pasados = []



async function getData(){
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
        .then(response =>response.json())
        .then(json =>ArrayEventos.push(json))

    eventos = ArrayEventos[0].eventos
    fechaActual = ArrayEventos[0].fechaActual
     displayCard(eventos)
    
}
getData()

function displayCard(data){
    pasados.push(...data.filter(evento =>evento.date < fechaActual))
    EventosHtml = ""
    pasados.map(eventoParticular =>{
        EventosHtml += `
        <div class="card">
        <div class="card-image" style="background-image: url(${eventoParticular.image});">
        </div>
            
            <div class="card-text">
                <h4>${eventoParticular.category}</h4>
                <p class="fecha-lugar">${eventoParticular.date} - ${eventoParticular.place} </p>
                <p class="descripcion">${eventoParticular.description} </p>
                <a href="./details.html?id=${eventoParticular.id}">Ver más detalles</a>
            </div>
        </div>
        `
    })
    document.querySelector("#cards").innerHTML = EventosHtml
}
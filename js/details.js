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

//

var ArrayEventos = []
var eventos = []

async function getData(){
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
        .then(response =>response.json())
        .then(json=>ArrayEventos.push(json))
    eventos = ArrayEventos[0].eventos

    var id = location.search.split("?id=").filter(Number)
    console.log(id);
    var idSeleccionado = Number(id[0])
    console.log(idSeleccionado);
    var eventoDetallado = eventos.find(function(evento){
        return evento.id == idSeleccionado
    })
    var cardDetallada = `
    <div class="card-detailed">
        <div class="card-image">
        <img src="${eventoDetallado.image}" alt="">
        </div>
        </div>
            
            <div class="card-detailed-text" >

                <h4>${eventoDetallado.category}</h4>
                <p class="nombre">${eventoDetallado.name}</p>
                <p class="fecha-lugar">${eventoDetallado.date} - ${eventoDetallado.place} </p>
                <p class="descripcion">${eventoDetallado.description} </p>
                <p class="precio">Precio: $${eventoDetallado.price}</p>
                <p class="capacidad">Capacidad para ${eventoDetallado.capacity} personas</p>
                
            </div>
        </div>
    `
    document.querySelector("#cards").innerHTML = cardDetallada
}
getData()

console.log(eventos);
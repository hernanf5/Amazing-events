var eventos = [];
var fechaActual = []
var categorias = [];
var categoriasSinRepetir = [];
var pasados = []
var arrayEventos = []

async function getData() {
  await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
    .then(response => response.json())
    .then(json => arrayEventos.push(json))

      eventos = arrayEventos[0].eventos;
      fechaActual = arrayEventos[0].fechaActual;
      categorias.push(...eventos.map(dato => dato.category))
      var limpiarCategorias = new Set(categorias)
      categoriasSinRepetir = [...limpiarCategorias]
      pasados = eventos.filter(evento =>evento.date < fechaActual)
      console.log(pasados[0].assistance);
      console.log(pasados[0].category);
  impresionCategorias()
  audiencia()
  ingreso()
  masAudiencia()
  menosAudiencia()
  masCapacidad()
}
getData();
//podria hacer una sola funcion, pero para su mejor interpretacion la subdividi en una funcion por fila
function impresionCategorias(){
  var fila = document.querySelector("#categoria")
  html = ""
  categoriasSinRepetir.forEach(item=>{
    html = 
    `  
      <td>${item}%</td>
    ` 
    var td = document.createElement("td")
    fila.append(td)
    td.append(item)
  })
}
//podria hacer una sola funcion, pero para su mejor interpretacion la subdividi en una funcion por fila
function audiencia(){
  
  var audienciaPorCategoria = []
  categoriasSinRepetir.forEach(categoria=>{
    var categoriaActual = categoria;
    var totalAsistencia = 0;
    var totalCapacidad = 0;
    var porcentaje = 0;
    pasados.forEach(evento=>{
      
      if(evento.category == categoriaActual){
          totalAsistencia += evento.assistance;
          totalCapacidad += evento.capacity;
        }
        porcentaje = (totalAsistencia*100)/totalCapacidad;
    })
    audienciaPorCategoria.push(porcentaje.toFixed(2))
  })
  console.log(audienciaPorCategoria);
  var fila = document.querySelector("#audiencia")
  audienciaPorCategoria.forEach(item=>{
    html = 
    `  
      <td>${item}%</td>
    ` 
    var td = document.createElement("td")
    fila.append(td)
    td.append(item)
  })
}
//podria hacer una sola funcion, pero para su mejor interpretacion la subdividi en una funcion por fila
function ingreso(){
  
  var ingresoPorCategoria = []
  categoriasSinRepetir.forEach(categoria=>{
    var categoriaActual = categoria;
    var total = 0;
    pasados.forEach(evento=>{
      
      if(evento.category == categoriaActual){
          total += (evento.assistance*evento.price);
        }
        
    })
    ingresoPorCategoria.push(total)
  })
  console.log(ingresoPorCategoria);
  var fila = document.querySelector("#ingreso")
  ingresoPorCategoria.forEach(item=>{
    html = 
    `  
      <td>${item}%</td>
    ` 
    var td = document.createElement("td")
    fila.append(td)
    td.append(item)
  })
}
//segunda tabla
function masAudiencia(){
  var audienciaActual = 0;
  var eventoConMasAudiencia = '';
  pasados.forEach(evento=>{
    if(evento.assistance > audienciaActual){
      audienciaActual = evento.assistance;
      eventoConMasAudiencia = evento.name;
    }
  })
  var imprimir = document.querySelector("#ma-audiencia");
  imprimir.innerHTML = eventoConMasAudiencia;
}

function menosAudiencia(){
  var audienciaActual = 10000000000;
  var eventoConMenosAudiencia = '';
  pasados.forEach(evento=>{
    if(evento.assistance < audienciaActual){
      audienciaActual = evento.assistance;
      eventoConMenosAudiencia = evento.name;
    }
  })
  var imprimir = document.querySelector("#me-audiencia");
  imprimir.innerHTML = eventoConMenosAudiencia;
}

function masCapacidad(){
  var capacidadActual = 0;
  var eventoConCapacidad = '';
  pasados.forEach(evento=>{
    if(evento.capacity > capacidadActual){
      capacidadActual = evento.capacity;
      eventoConCapacidad = evento.name;
    }
  })
  var imprimir = document.querySelector("#capacidad");
  imprimir.innerHTML = eventoConCapacidad;
}
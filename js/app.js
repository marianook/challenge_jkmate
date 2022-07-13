const urlRest = "https://telemedicina.jakemate.net:7141/api/webservice/metodo";
var listadoPersonas = [];

$(document).ready(function () {
  listarPersonas();
  $(".error").hide();
});

$("#formularioPersona").on("click", function(e) {
  e.preventDefault()
});


function listarPersonas() {
  $.ajax({
    url: urlRest,
    data: { _nombreMetodo_: "listarPersonas" },
    method: "POST",
    headers: {
      "Token": "NJKJNTL8SNKH5JJRTS32ZGSIIDPGHLU6KRXLQMLMJJU8MD7EY5TSWMGD2D6Z",
      "ApiKey": "ISSTIXZTV53RZURJKTZD3MXVMEW7X3",
    },
    success: function (response) {
        listadoPersonas = response.resultado.Table;
        let valor = ``;
         
        for(i = 0; i < listadoPersonas.length; i++) {
          valor += 
                  `<tr>
                  <th scope="row">${listadoPersonas[i].COD_PERSONA}
                  <td>${listadoPersonas[i].NOMBRE}</td>
                  <td>${listadoPersonas[i].APELLIDO}</td>
                  <td>${listadoPersonas[i].NRO_DOCUMENTO}</td>
                  <td class="acciones">
                  <button onclick="cargarFormulario(${listadoPersonas[i].COD_PERSONA})" class="btn btn-warning" href="">Editar</button>
                  <button onclick="eliminarPersonas(${listadoPersonas[i].COD_PERSONA})" class="btn btn-danger" href="">X</button>
                  </td>
                  </tr>`;
                  
        }
        $("#tbodyPersona").html(valor);
        console.log(listadoPersonas)
    },
  });
  
}

function agregarPersonas() {
  let nombre = $("#nombre").val().trim()
  let apellido = $("#apellido").val().trim()
  let dni = $("#dni").val().trim()

  if(nombre.length == 0 || apellido.length == 0 || dni.length == 0) {
      $(".error").show();
      setTimeout(() => {
        $(".error").hide();
      }, 3000);
    return;
  }
  

  $.ajax({
    url: urlRest,
    data: { _nombreMetodo_: "agregarPersona", NOMBRE: `${nombre}`, APELLIDO: `${apellido}`, NRO_DOCUMENTO: `${dni}` },
    method: "POST",
    headers: {
      "Token": "NJKJNTL8SNKH5JJRTS32ZGSIIDPGHLU6KRXLQMLMJJU8MD7EY5TSWMGD2D6Z",
      "ApiKey": "ISSTIXZTV53RZURJKTZD3MXVMEW7X3",
    },
    success: function (response) {
      limpiarFormulario()
      listarPersonas();
      alert(nombre + " " + apellido + ' se agregó exitosamente')
      console.log(response);
    },
  });
}

function eliminarPersonas(idPersona) {

  var persona = listadoPersonas.filter(e=> e.COD_PERSONA == idPersona)[0]
  $.ajax({
    url: urlRest,
    data: { _nombreMetodo_: "eliminarPersona", COD_PERSONA: `${idPersona}` },
    method: "POST",
    headers: {
      "Token": "NJKJNTL8SNKH5JJRTS32ZGSIIDPGHLU6KRXLQMLMJJU8MD7EY5TSWMGD2D6Z",
      "ApiKey": "ISSTIXZTV53RZURJKTZD3MXVMEW7X3",
    },
    success: function (response) {
      var mensaje = confirm("¿Estas seguro de eliminar a " + persona.NOMBRE +" "+ persona.APELLIDO + " con ID " + idPersona +"?");
      if(mensaje) {
        listarPersonas();
        return;
      }
      
      if(response == 1){ // No pude reproducir este tipo de error
        alert('Hubo un error al eliminar')
        return;
      }
      else{
        alert('Persona eliminada exitosamente')
      }
      
    },
  });
}

function cargarFormulario(idPersona) {

      var persona = listadoPersonas.filter(e=> e.COD_PERSONA == idPersona)[0]

      $("#nombre").val(persona.NOMBRE);
      $("#apellido").val(persona.APELLIDO);
      $("#dni").val(persona.NRO_DOCUMENTO);

  let valor = `<button id="btnActualizar" onclick="editarPersona(${persona.COD_PERSONA})" type="submit" class="btn btn-warning w-100 d-block">Actualizar</button>`
  $('#btnFormulario').html(valor);

}

function editarPersona(idPersona) {
  let nombre = $("#nombre").val().trim()
  let apellido = $("#apellido").val().trim()
  let dni = $("#dni").val().trim()

  if(nombre.length == 0 || apellido.length == 0 || dni.length == 0) {
    $(".error").show();
    setTimeout(() => {
      $(".error").hide();
    }, 3000);
    return;
  }

  $.ajax({
    url: urlRest,
    data: { _nombreMetodo_: "editarPersona", COD_PERSONA: `${idPersona}`, NOMBRE: `${nombre}`, APELLIDO: `${apellido}`, NRO_DOCUMENTO: `${dni}` }, 
    method: "POST",
    headers: {
      "Token": "NJKJNTL8SNKH5JJRTS32ZGSIIDPGHLU6KRXLQMLMJJU8MD7EY5TSWMGD2D6Z",
      "ApiKey": "ISSTIXZTV53RZURJKTZD3MXVMEW7X3",
    },
    success: function (response) {
      console.log(response)
      listarPersonas()
      limpiarFormulario()
    }
  });
  let valor = `<button onclick="agregarPersonas()" type="submit" class="btn btn-success w-100 d-block">Agregar</button>`
  $('#btnFormulario').html(valor);

}

function limpiarFormulario() {
  $("#formularioPersona")[0].reset();
}
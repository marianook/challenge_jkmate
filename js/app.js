const urlRest = "https://telemedicina.jakemate.net:7141/api/webservice/metodo";

$(document).ready(function () {
  listarPersonas();
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
        var resultado = response.resultado.Table;
        var valor = ``;
         
        for(i = 0; i < resultado.length; i++) {
          valor += `<tr>
                  <th scope="row">${resultado[i].COD_PERSONA}
                  <td>${resultado[i].NOMBRE}</td>
                  <td>${resultado[i].APELLIDO}</td>
                  <td>${resultado[i].NRO_DOCUMENTO}</td>
                  <td class="acciones">
                  <button onclick="cargarFormulario(${resultado[i].COD_PERSONA})" class="btn btn-warning" href="">Editar</button>
                  <button onclick="eliminarPersonas(${resultado[i].COD_PERSONA})" class="btn btn-danger" href="">X</button>
                  </td>
                  </tr>`;
                  
        }
        $("#tbodyPersona").html(valor);
        console.log(resultado)
    },
  });
}

function agregarPersonas() {
  let nombre = $("#nombre").val()
  let apellido = $("#apellido").val()
  let dni = $("#dni").val()

  $.ajax({
    url: urlRest,
    data: { _nombreMetodo_: "agregarPersona", NOMBRE: `${nombre}`, APELLIDO: `${apellido}`, NRO_DOCUMENTO: `${dni}` },
    method: "POST",
    headers: {
      "Token": "NJKJNTL8SNKH5JJRTS32ZGSIIDPGHLU6KRXLQMLMJJU8MD7EY5TSWMGD2D6Z",
      "ApiKey": "ISSTIXZTV53RZURJKTZD3MXVMEW7X3",
    },
    success: function (response) {
      if(nombre.length == 0 || apellido.length == 0 || dni.length == 0) {
        console.log('Debe haber al menos un campo lleno')
      }
      else{
        console.log(response);
      }
    },
  });
}

function eliminarPersonas(idPersona) {
  
  var id = idPersona;
  // console.log('Persona ', id)

  $.ajax({
    url: urlRest,
    data: { _nombreMetodo_: "eliminarPersona", COD_PERSONA: `${id}` },
    method: "POST",
    headers: {
      "Token": "NJKJNTL8SNKH5JJRTS32ZGSIIDPGHLU6KRXLQMLMJJU8MD7EY5TSWMGD2D6Z",
      "ApiKey": "ISSTIXZTV53RZURJKTZD3MXVMEW7X3",
    },
    success: function (response) {
      var mensaje = confirm("¿Estas seguro de eliminar la persona NRO: " + id +"?");
      if(mensaje) {
        listarPersonas();
      }
      else {
        console.log('No')
      }
      
    },
  });
}

function cargarFormulario(id) {

  var valor = `<button id="btnActualizar" onclick="editarPersona()" type="submit" class="btn btn-warning w-100 d-block">Editar</button>`
  $('#btnFormulario').html(valor);

}

function editarPersona() {
  $.ajax({
    url: urlRest,
    // Aquí irían los datos del que pasamos en la función cargarFormulario hacia el método editarPersona
    data: { _nombreMetodo_: "editarPersona", COD_PERSONA: `${id}`, NOMBRE: `${nombre}`, APELLIDO: `${apellido}`, NRO_DOCUMENTO: `${dni}` }, 
    method: "POST",
    headers: {
      "Token": "NJKJNTL8SNKH5JJRTS32ZGSIIDPGHLU6KRXLQMLMJJU8MD7EY5TSWMGD2D6Z",
      "ApiKey": "ISSTIXZTV53RZURJKTZD3MXVMEW7X3",
    },
    success: function (response) {
      console.log(response)
    }
  });
}
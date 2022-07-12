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
        var valor = "";
         
        for(i = 0; i < resultado.length; i++) {
          valor += `<tr>
                  <th scope="row">
                  <td>${resultado[i].COD_PERSONA}</td>
                  <td>${resultado[i].NOMBRE}</td>
                  <td>${resultado[i].APELLIDO}</td>
                  <td>${resultado[i].NRO_DOCUMENTO}</td>
                  </tr>`;
                  
        }
        $("#tbodyPersona").html(valor);
        console.log(resultado)
    },
  });
}

function agregarPersonas() {

  var datosFormulario = {
    // id: $("#myId").val(),
    nombre: $("#nombre").val(),
    apellido: $("#apellido").val(),
    dni: $("#dni").val()
  };

  console.log(datosFormulario)

  var datosFormularioJson = JSON.stringify(datosFormulario);

  console.log(datosFormulario)
  $.ajax({
    url: urlRest,
    data: { _nombreMetodo_: "agregarPersonas", datosFormularioJson },
    method: "POST",
    headers: {
      "Token": "NJKJNTL8SNKH5JJRTS32ZGSIIDPGHLU6KRXLQMLMJJU8MD7EY5TSWMGD2D6Z",
      "ApiKey": "ISSTIXZTV53RZURJKTZD3MXVMEW7X3",
    },
    success: function (response) {
      console.log(response);
    },
  });
}

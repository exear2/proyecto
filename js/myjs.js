async function registrarProducto() {
  //let datos = {};
  /*datos.fecha = document.getElementById('txtFecha').value;
	datos.nombre = document.getElementById('txtNombre').value;
	datos.precio = document.getElementById('txtPrecio').value;*/

  let id = document.getElementById("txtId").value;
  let nombre = document.getElementById("txtNombre").value;
  let precio = document.getElementById("txtPrecio").value;
  alert("afuera");

  // Crear objeto JSON
  let productData = {
    name: nombre,
    price: precio,
    maker: {
      id: id,
    },
  };

  const request = await fetch("http://192.168.1.25:8095/api/product/save", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
  alert(JSON.stringify(productData));
  alert("Registro exitoso!");
  window.location.href = "index.html";
}

async function cargarProductos() {
  const request = await fetch("http://192.168.1.25:8095/api/product/findAll", {
    method: "GET",
    headers: getHeaders(),
  });
  const productos = await request.json();
  let listadohtml = "";
  for (let producto of productos) {
    let btnEliminar = `<a href="#" onclick="eliminarProducto(${producto.id})" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i>Eliminar</a>`;
    let productoHtml = `<tr><td>${producto.id}</td><td>${producto.name}</td><td>${producto.price}</td>
   <td>${btnEliminar}</td></tr>`;
    listadohtml += productoHtml;
  }

  console.log(listadohtml);
  document.querySelector("#productos tbody").outerHTML = listadohtml;
}

function getHeaders() {
  return {
    Accept: "application/json",
    "Content-type": "application/json",
    //'Authorization': localStorage.token
  };
}

async function eliminarProducto(id) {
  // alert(id);
  if (!confirm("Desea eliminar el producto")) {
    return;
  }

  const request = await fetch(
    "http://192.168.1.25:8095/api/product/delete/" + id,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );
  location.reload();
}

var contadorCampos = 1;

function agregarCampo() {
  var camposDiv = document.getElementById("campos");

  // Crear elementos del formulario
  var labelNombre = document.createElement("label");
  labelNombre.textContent = "Nombre del producto " + contadorCampos + ":";

  var inputNombre = document.createElement("input");
  inputNombre.type = "text";
  inputNombre.className = "form-control";
  inputNombre.placeholder = "Nombre";
  inputNombre.id = "txtNombre" + contadorCampos;

  console.log(inputNombre);

  var labelPrecio = document.createElement("label");
  labelPrecio.textContent = "Precio del producto " + contadorCampos + ":";

  var inputPrecio = document.createElement("input");
  inputPrecio.type = "text";
  inputPrecio.className = "form-control";
  inputPrecio.placeholder = "Precio";
  inputPrecio.id = "txtPrecio" + contadorCampos;

  var labelFabricante = document.createElement("label");
  labelFabricante.textContent =
    "Fabricante del producto " + contadorCampos + ":";

  var selectFabricante = document.createElement("select");

  selectFabricante.className = "form-select";
  selectFabricante.id = "txtId" + contadorCampos;

  var optionDefault = document.createElement("option");
  optionDefault.value = "0";
  optionDefault.textContent = "Seleccione Fabricante";
  selectFabricante.appendChild(optionDefault);

  var fabricantes = ["HP", "DELL", "LENOVO", "ACER"];
  for (var i = 0; i < fabricantes.length; i++) {
    var optionFabricante = document.createElement("option");
    optionFabricante.value = i + 1;
    optionFabricante.textContent = fabricantes[i];
    selectFabricante.appendChild(optionFabricante);
  }

  camposDiv.appendChild(selectFabricante);
  //camposDiv.appendChild(document.createElement("br"));
  // Agregar elementos al formulario
  //camposDiv.appendChild(labelNombre);
  camposDiv.appendChild(inputNombre);
  //camposDiv.appendChild(document.createElement("br"));
  //camposDiv.appendChild(labelPrecio);
  camposDiv.appendChild(inputPrecio);
  //camposDiv.appendChild(document.createElement("br"));
  //camposDiv.appendChild(labelFabricante);

  contadorCampos++;
}

document
  .getElementById("btnGuardar")
  .addEventListener("click", async function (event) {
    event.preventDefault();

    alert("hola para guardar");

    // Recopilar valores del formulario
    var jsonData = [];

    for (var i = 1; i < contadorCampos; i++) {
      var nombre = document.getElementById("txtNombre" + i).value;
      var precio = document.getElementById("txtPrecio" + i).value;
      var fabricanteId = document.getElementById("txtId" + i).value;

      var producto = {
        name: nombre,
        price: precio,
        maker: {
          id: fabricanteId,
        },
      };

      jsonData.push(producto);
    }
    // Puedes hacer lo que quieras con los datos JSON aquí, como enviarlos a un servidor

    const request = await fetch(
      "http://192.168.1.25:8095/api/product/saveAll",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      }
    );
    alert(JSON.stringify(jsonData));
    alert("Registro exitoso!");
    window.location.href = "index.html";

    // mostraremos en la consola
    console.log("Datos JSON:", jsonData);
  });

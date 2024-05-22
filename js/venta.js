let contadorCampos = 0;
let total = 0;
let contador = 0;
let ids = [];
var suma = 0;
var jsonData = [];
const iva = 1.19;
let resta = 0;
let i = 0;
let cantidad = 1;

document.addEventListener("DOMContentLoaded", (event) => {

 
});

const cargar = document
  .getElementById("txtCod")
  .addEventListener("change", async (ev) => {
    ev.preventDefault;

    try {
      let id = document.getElementById("txtCod").value;

      const request = await fetch(
        "http://192.168.1.25:8095/api/product/find/" + id,
        {
          method: "GET",
          headers: getHeaders(),
        }
      );

      producto = await request.json();
      // console.log(request);
      // console.log(producto);
      var cod = producto.id;
      var des = producto.name;
      var pre = producto.price;
      var pid = producto.maker.id;

      producto = {
        id: cod,
        name: des,
        price: pre,
        maker: {
          id: pid,
        },
      };

      jsonData.push(producto);

      

      crearCampos();
      suma += producto.price;
      document.getElementById("subtotal").value = suma;
      document.getElementById("iva").value = iva;
      document.getElementById("total").value = suma * iva;

      //alert(contadorCampos);
    } catch (error) {
      alert(error + "Falta codigo");
    }
  });

function getHeaders() {
  return {
    Accept: "application/json",
    "Content-type": "application/json",
    //'Authorization': localStorage.token
  };
}

function crearCampos() {
  let campo = document.querySelector("#miForm");

  let campos = document.createElement("div");
  campos.className = "input-group mb-2";
  campo.appendChild(campos);

  let inputId = document.createElement("input");
  inputId.type = "text";
  inputId.className = "form-control";
  inputId.placeholder = "Codigo";
  inputId.id = "txtId" + contadorCampos;
  inputId.value = producto.id;
  campos.appendChild(inputId);

  let inputDescripcion = document.createElement("input");
  inputDescripcion.type = "text";
  inputDescripcion.className = "form-control";
  inputDescripcion.placeholder = "Descripcion";
  inputDescripcion.id = "txtDescripcion" + contadorCampos;  
  campos.appendChild(inputDescripcion);

  let inputCantidad = document.createElement("input");
  inputCantidad.type = "text";
  inputCantidad.className = "form-control form-control-sm";
  inputCantidad.placeholder = "Cantidad";
  inputCantidad.id = "txtCantidad" + contadorCampos;
  inputCantidad.value = cantidad;
  campos.appendChild(inputCantidad);

  let inputPrecio = document.createElement("input");
  inputPrecio.type = "text";
  inputPrecio.className = "form-control form-control-sm";
  inputPrecio.placeholder = "Precio";
  inputPrecio.id = "txtPrecio" + contadorCampos;
  inputPrecio.value = producto.price;
  campos.appendChild(inputPrecio);

  let inputTotal = document.createElement("input");
  inputTotal.type = "text";
  inputTotal.className = "form-control form-control-sm";
  inputTotal.placeholder = "Total";
  inputTotal.id = "txtTotal" + contadorCampos;
  inputTotal.value = inputPrecio.value * inputCantidad.value;
  campos.appendChild(inputTotal);

  let btnRemover = document.createElement("button");
  btnRemover.id = "btnBorrar" + contadorCampos;
  btnRemover.innerHTML = "X";
  btnRemover.className = "form-control form-control-sm";
  campos.appendChild(btnRemover);

  const btn = document.getElementById("btnBorrar" + contadorCampos);
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    //eliminar los nodos padres
    const remover = e.target.parentElement;
    remover.remove();

    let $nodo = document.querySelectorAll(".input-group");
    $nodo.forEach((n, i) => {
      console.log("nodo: " + i);
    });

    jsonData.forEach((num, indice) => {
      if (indice == i) {
        console.log("json" + indice);
        jsonData.splice(indice, 1);
        console.log(num.price);
        suma -= num.price;
      }

      console.log(suma);
      document.getElementById("subtotal").value = suma;
      document.getElementById("iva").value = iva;
      document.getElementById("total").value = suma * iva;
      console.log(jsonData.length);
    });
  });

  // actualizarValor.addEventListener("change", (e) =>{

  //   cmbValor.value = inputPrecio.value * inputCantidad.value;

  // })

  contadorCampos++;
}

function limpiar() {
  document.getElementById("txtCod").value = "";
  document.getElementById("txtCod").focus;

  return "limpiado";
}


limpiar();
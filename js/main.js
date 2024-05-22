const contenedor=document.querySelector('#dinamic');
const btnAgregar=document.querySelector('#agregar');

let total=1;


btnAgregar.addEventListener('click', e=> {

let div=document.createElement('div');

div.innerHTML=`<label>${total}</label>`;
contenedor.appendChild(div);

total++;

})

const eliminar=(e)=>{

    const divPadre = e.parentNode;
    contenedor.removeChild(divPadre);
    actualizarContador();
}
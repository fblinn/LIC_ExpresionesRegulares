
//Actividad 1- Recrea la palabra 
function contieneFrase(frase) {
  const patron = /\bSatoru Gojo es el mas fuerte\b/i; 
  return patron.test(frase);
}

//Actividad 2 - Sorpresa correo
function validarCorreo(correo) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correo || correo.trim() === "") return { valido: false, mensaje: "⚠️ El correo no puede estar vacío." };
  if (!regex.test(correo)) return { valido: false, mensaje: "❌ Correo inválido. Ejemplo: nombre@gmail.com" };
  return { valido: true, mensaje: "✅ Correo válido." };
}

//Actividad 3 - Fecha
function validarFecha(fecha) {
  // Acepta dd/mm/yyyy o dd-mm-yyyy
  const regex = /^(0[1-9]|[12][0-9]|3[01])[\/\-](0[1-9]|1[0-2])[\/\-](\d{4})$/;
  
  if (!regex.test(fecha)) {
    return { valido: false, mensaje: "❌ Formato inválido. Usa DD/MM/AAAA" };
}};


//Constantes
const fraseInput = document.getElementById("idTxtFrase");
const correoInput = document.getElementById("idTxtCorreo");
const fechaCorrecta = "07/12/1989";

//Botones 
document.getElementById("idBtnPrueba")?.addEventListener("click", () => {
  const texto = fraseInput.value;
  const imagen = document.getElementById("imagenFrase");
  const label = document.getElementById("labelFrase");

  if (contieneFrase(texto)) {
    imagen.classList.remove("d-none"); //muestra la imagen
    label.classList.remove("d-none");
  } else {
    imagen.classList.add("d-none"); // mantener oculta la imagen si no coincide
    alert("Intenta de nuevo!"); // alerta de que te equivocaste
  }
});


 
document.getElementById("idBtnCorreo")?.addEventListener("click", async () => {
  const correo = correoInput.value; // el valor del input
  const resultado = validarCorreo(correo); 
  const errorEl = document.getElementById("errorCorreo");

  // Mostrar mensaje de validación
  errorEl.textContent = resultado.mensaje;
  if (!resultado.valido) {
    errorEl.classList.remove("d-none");
    errorEl.style.color = "red";
    correoInput.classList.add("is-invalid");
    correoInput.classList.remove("is-valid");
    return;
  } else {
    errorEl.classList.remove("d-none");
    errorEl.style.color = "green";
    correoInput.classList.remove("is-invalid");
    correoInput.classList.add("is-valid");
  }

  emailjs.init("g20QnW-K4bc25L9gV"); 
  try {
    const templateParams = {
      to_email: correo,
      to_name: "Usuario!",
      message: "Gracias por confíar en poner tu correo, ten las ilustraciones que hice para este proyecto y más!"
    };

    await emailjs.send("service_LICDesafio2", "template_InvestigacionL", templateParams);
    alert("📧 Correo enviado correctamente ✅");

  } catch (err) {
    console.error("❌ Error EmailJS", err);
    alert("Ocurrió un error intentalo de nuevo.");
  }
});

document.getElementById("idBtnFecha")?.addEventListener("click", () => {
  const fechaInput = document.getElementById("idTxtFecha").value;
  const errorEl = document.getElementById("errorFecha");
  const imagenFecha = document.getElementById("imagenFecha");
  const labelFecha = document.getElementById("labelFecha");
  
  // Primero revisamos el formato DD/MM/AAAA
  const regex = /^(0[1-9]|[12][0-9]|3[01])[\/](0[1-9]|1[0-2])[\/](\d{4})$/;

  if (!regex.test(fechaInput)) {
    errorEl.textContent = "❌ Formato inválido. Usa DD/MM/AAAA";
    errorEl.style.color = "red";
    errorEl.classList.remove("d-none");
    return;
  }

  // Luego revisamos la fecha exacta
  if (fechaInput === "07/12/1989") {
    errorEl.textContent = "¡Fecha correcta! ¡Mira el cumpleaños de quién es!";
    errorEl.style.color = "green";
    labelFecha.classList.remove("d-none");
    imagenFecha.classList.remove("d-none");
  } else {
    errorEl.textContent = "⚠️ La fecha no coincide con la esperada.";
    errorEl.style.color = "red";
  }

  errorEl.classList.remove("d-none");
});


//Funciones 
document.getElementById("idTxtCorreo")?.addEventListener("blur", e => {
  const resultado = validarCorreo(e.target.value);
  const errorEl = document.getElementById("errorCorreo");
  if (!resultado.valido) {
    errorEl.textContent = resultado.mensaje; 
    errorEl.classList.remove("d-none");
    e.target.classList.add("is-invalid"); e.target.classList.remove("is-valid"); 
  } else {
    errorEl?.classList.add("d-none"); 
    e.target.classList.remove("is-invalid"); e.target.classList.add("is-valid"); 
  }
});


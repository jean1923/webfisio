document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
  
    // Validación de campos
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Evita el envío del formulario si hay errores
  
      let isValid = true;
  
      // Validar campos obligatorios
      const requiredFields = form.querySelectorAll("input[required], select[required]");
      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false;
          showError(field, "Este campo es obligatorio.");
        } else {
          clearError(field);
        }
      });
  
      // Validar formato del correo electrónico
      const emailField = form.querySelector("#email");
      if (!validateEmail(emailField.value)) {
        isValid = false;
        showError(emailField, "Introduce un correo electrónico válido.");
      } else {
        clearError(emailField);
      }
  
      // Si todo es válido, mostrar un mensaje o procesar los datos
      if (isValid) {
        alert("Formulario enviado correctamente.");
        form.reset(); // Limpia el formulario
      }
    });
  
    // Función para validar correos electrónicos
    function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    // Función para mostrar errores
    function showError(field, message) {
      let error = field.nextElementSibling;
      if (!error || !error.classList.contains("error-message")) {
        error = document.createElement("span");
        error.classList.add("error-message");
        error.style.color = "red";
        field.parentNode.appendChild(error);
      }
      error.textContent = message;
      field.style.borderColor = "red";
    }
  
    // Función para limpiar errores
    function clearError(field) {
      const error = field.parentNode.querySelector(".error-message");
      if (error) {
        error.remove();
      }
      field.style.borderColor = "";
    }
  });
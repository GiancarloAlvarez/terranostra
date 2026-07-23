

// main.js — Terra Nostra

document.addEventListener('DOMContentLoaded', () => {
  console.log('Terra Nostra cargado ✅');

  // === VALIDACIÓN DEL FORMULARIO DE RESERVAS ===
  const form = document.getElementById('reservationForm');
  const successMsg = document.getElementById('formSuccess');

  // Función que muestra un error en un campo concreto
  function showError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const errorSpan = document.querySelector(`[data-error="${fieldId}"]`);
    input.classList.add('is-invalid');
    if (errorSpan) errorSpan.textContent = message;
  }

  // Función que limpia el error de un campo
  function clearError(fieldId) {
    const input = document.getElementById(fieldId);
    const errorSpan = document.querySelector(`[data-error="${fieldId}"]`);
    input.classList.remove('is-invalid');
    if (errorSpan) errorSpan.textContent = '';
  }

  // Valida un email con una expresión regular simple
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // frena el envío para validar nosotros
    let isValid = true;

    // --- Nombre ---
    const name = document.getElementById('name').value.trim();
    if (name === '') {
      showError('name', 'Por favor ingresa tu nombre.');
      isValid = false;
    } else {
      clearError('name');
    }

    // --- Email ---
    const email = document.getElementById('email').value.trim();
    if (email === '') {
      showError('email', 'El correo es obligatorio.');
      isValid = false;
    } else if (!isValidEmail(email)) {
      showError('email', 'Ingresa un correo válido.');
      isValid = false;
    } else {
      clearError('email');
    }

    // --- Fecha (no puede ser en el pasado) ---
    const dateValue = document.getElementById('date').value;
    if (dateValue === '') {
      showError('date', 'Selecciona una fecha.');
      isValid = false;
    } else {
      const selectedDate = new Date(dateValue);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // ignora la hora
      if (selectedDate < today) {
        showError('date', 'La fecha no puede ser en el pasado.');
        isValid = false;
      } else {
        clearError('date');
      }
    }

    // --- Comensales ---
    const guests = document.getElementById('guests').value;
    if (guests === '') {
      showError('guests', 'Indica cuántos serán.');
      isValid = false;
    } else {
      clearError('guests');
    }

    // --- Resultado final ---
    if (isValid) {
      successMsg.classList.add('is-visible'); // muestra éxito
      form.reset();                            // limpia el formulario
      // Oculta el mensaje después de 5 segundos
      setTimeout(() => successMsg.classList.remove('is-visible'), 5000);
    }
  });
});
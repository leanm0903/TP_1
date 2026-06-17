window.onload = function() {
    const form = document.getElementById('formulario-suscripcion');
    const tituloSaludo = document.getElementById('titulo-saludo');

    const inputs = {
        nombre: document.getElementById('nombre'),
        email: document.getElementById('email'),
        password: document.getElementById('password'),
        repeatPassword: document.getElementById('repeat-password'),
        edad: document.getElementById('edad'),
        telefono: document.getElementById('telefono'),
        direccion: document.getElementById('direccion'),
        ciudad: document.getElementById('ciudad'),
        cp: document.getElementById('cp'),
        dni: document.getElementById('dni')
    };
    
    function mostrarError(id, mensaje) {
        const errorElement = document.getElementById('error-' + id);
        if (errorElement) {
            errorElement.innerText = mensaje;
            errorElement.style.display = 'block';
        }
    }

    function ocultarError(id) {
        const errorElement = document.getElementById('error-' + id);
        if (errorElement) {
            errorElement.innerText = '';
            errorElement.style.display = 'none';
        }
    }


    const validaciones = {
        nombre: function() {
            const val = inputs.nombre.value.trim();
            if (val.length <= 6 || val.indexOf(' ') === -1) {
                return 'Debe tener más de 6 letras y al menos un espacio entre medio.';
            }
            return '';
        },
        email: function() {
            const val = inputs.email.value.trim();
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(val)) {
                return 'Debe tener un formato de email válido.';
            }
            return '';
        },
        password: function() {
            const val = inputs.password.value;
            const tieneLetra = /[a-zA-Z]/.test(val);
            const tieneNumero = /[0-9]/.test(val);
            if (val.length < 8 || !tieneLetra || !tieneNumero) {
                return 'Debe tener al menos 8 caracteres, formados por letras y números.';
            }
            return '';
        },
        'repeat-password': function() {
            const val = inputs.repeatPassword.value;
            if (val === "" || val !== inputs.password.value) {
                return 'Las contraseñas no coinciden.';
            }
            return '';
        },
        edad: function() {
            const val = Number(inputs.edad.value);
            if (!Number.isInteger(val) || val < 18) {
                return 'Debe ser un número entero mayor o igual a 18.';
            }
            return '';
        },
        telefono: function() {
            const val = inputs.telefono.value;
            if (!/^[0-9]{7,}$/.test(val)) {
                return 'Número de al menos 7 dígitos. No aceptar espacios, guiones ni paréntesis.';
            }
            return '';
        },
        direccion: function() {
            const val = inputs.direccion.value.trim();
            const tieneLetra = /[a-zA-Z]/.test(val);
            const tieneNumero = /[0-9]/.test(val);
            const tieneEspacio = val.indexOf(' ') !== -1;
            if (val.length < 5 || !tieneLetra || !tieneNumero || !tieneEspacio) {
                return 'Al menos 5 caracteres, con letras, números y un espacio en el medio.';
            }
            return '';
        },
        ciudad: function() {
            const val = inputs.ciudad.value.trim();
            if (val.length < 3) {
                return 'Debe tener al menos 3 caracteres.';
            }
            return '';
        },
        cp: function() {
            const val = inputs.cp.value.trim();
            if (val.length < 3) {
                return 'Debe tener al menos 3 caracteres.';
            }
            return '';
        },
        dni: function() {
            const val = inputs.dni.value.trim();
            if (!/^[0-9]{7,8}$/.test(val)) {
                return 'Debe ser un número de 7 u 8 dígitos.';
            }
            return '';
        }
    };

    for (const key in validaciones) {
        const input = document.getElementById(key);
        if (input) {
            input.addEventListener('focus', function(e) {
                ocultarError(e.target.id);
            });

            input.addEventListener('blur', function(e) {
                const mensajeError = validaciones[e.target.id]();
                if (mensajeError) {
                    mostrarError(e.target.id, mensajeError);
                }
            });
        }
    }

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            let erroresAcumulados = [];
            let mensajeExito = "¡Suscripción exitosa!\n\nDatos ingresados:\n";

            for (const key in validaciones) {
                const error = validaciones[key]();
                if (error) {
                    mostrarError(key, error);
                    erroresAcumulados.push("- " + key.toUpperCase() + ": " + error);
                } else {
                    if (key !== 'password' && key !== 'repeat-password') {
                        mensajeExito += key.toUpperCase() + ": " + document.getElementById(key).value + "\n";
                    }
                }
            }

            if (erroresAcumulados.length > 0) {
                alert("No se pudo enviar el formulario. Corregí los siguientes errores:\n\n" + erroresAcumulados.join('\n'));
            } else {
                alert(mensajeExito);
            }
        });
    }
};
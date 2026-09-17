# Registro del Bootcamp

El formulario envía los datos a `/api/registro`. El servidor valida los campos y remite la solicitud a Apps Script. Solo confirma el registro cuando Google devuelve `ok: true`.

## Configuración

1. Guardar `Code.gs` en Apps Script y configurar la propiedad del script `REGISTRATION_SECRET` con una clave aleatoria privada.
2. Implementar como aplicación web, ejecutada por el propietario, accesible para cualquier usuario. El código exige la clave para escribir y no ofrece lectura pública de la hoja.
3. En Vercel, configurar `REGISTRATION_SCRIPT_URL` con la URL `/exec` y `REGISTRATION_SECRET` con la misma clave. Nunca usar el prefijo `NEXT_PUBLIC_` ni guardar la clave en Git.
4. Desplegar y comprobar un registro antes de dar por activa la integración.

La hoja `Inscritos` contiene nombre, correo, teléfono y fecha (Ecuador). Los reintentos con el mismo correo no crean filas duplicadas ni modifican datos existentes. La hoja debe permanecer privada; compartirla únicamente con los destinatarios indicados por su propietario.

El registro depende de las cuotas y disponibilidad de Apps Script. El filtro de origen y el campo trampa reducen envíos accidentales, pero no sustituyen una protección contra abuso con límites de solicitudes.

Para cambiar de cuenta, compartir o transferir la hoja según permita Google y volver a implementar el script con la cuenta nueva. Actualizar la URL y la clave en Vercel, y volver a comprobar el guardado.

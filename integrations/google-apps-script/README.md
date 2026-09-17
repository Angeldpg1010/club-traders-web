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

## Medición y operación (17-09-2026)

- `Inscritos`: A:D conserva el formato anterior. E identifica registros nuevos; F:J contiene UTM solo con autorización opcional; K registra esa elección; L:M acredita consentimiento/versión del aviso; N registra el primer clic en WhatsApp.
- No se reescribe el consentimiento de registros históricos. Los reintentos del mismo correo no crean filas ni entregan un recibo de seguimiento de otra inscripción.
- El clic se mide únicamente en el botón posterior a una nueva inscripción autorizada, durante dos horas. No equivale a mensaje enviado ni entrada al grupo. Sin consentimiento, sin recibo o con fallo de red no se mide. No hay medición de visitas ni tasa visita/registro.
- Etiquetar anuncios con `utm_source`, `utm_medium`, `utm_campaign`, opcionalmente `utm_content` y `utm_term`. Usar etiquetas de hasta 80 caracteres, sin nombres, correos, teléfonos ni otros datos personales. No se usan cookies o píxeles para esta medición.
- En Vercel → Logs filtrar rutas `/api/registro` y `/api/eventos`. La aplicación registra `event`, `requestId`, `durationMs` y `outcome`, nunca campos del formulario ni secretos. Revisar `upstream_timeout`, `upstream_error`, `rate_limited`, `tracking_error` y tiempos antes de ampliar tráfico. No hay alertas automáticas ni vigilancia continua configuradas.
- Si se observa un aumento de errores o tiempos próximos a 60s, detener la ampliación de campaña y revisar Apps Script → Ejecuciones y cuotas antes de reintentar. La hoja es la referencia para altas realmente guardadas aunque la respuesta se pierda.
- Protección: origen, tamaño, validación del servidor, campo trampa, token firmado con edad mínima, límites por conexión y límite compartido en Apps Script. Caché y memoria son limitadores de mejor esfuerzo; no sustituyen un CAPTCHA ni protección contra bots distribuidos. La cuota actual compartida admite 5 intentos por conexión/10 minutos y 60 llamadas/minuto globales. Revalidar capacidad antes de campañas grandes; varios usuarios detrás de una red pueden compartir límite.
- Pruebas locales: `node --test tests/registration-security.cjs` y `npm run build`.
- Pendiente de confirmar por el organizador: identificación legal/domicilio aplicable y plazo definitivo de conservación. Actualmente no hay borrado automático. Actualizar el aviso cuando se complete la migración de las cuentas técnicas de Ángel.
- Referencia de cabeceras del alojamiento: https://vercel.com/docs/headers/request-headers

# Prototipo: academia de Club de Traders por suscripción

## Alcance de esta versión

- URL de la propuesta: `/academia`.
- Conserva la landing actual del Bootcamp en `/` y sus formularios.
- Presenta biblioteca de cursos, tres membresías mensuales ilustrativas, propuesta de área de alumno y recorrido interactivo de contratación.
- La simulación de contratación ocurre **íntegramente en memoria del navegador**: no realiza cargos, no registra usuarios, no envía emails y no guarda datos personales en servidor ni en almacenamiento local.
- La vista de facturación enseña un documento de demostración. **No es una factura electrónica válida**.
- La ruta lleva `noindex` para evitar indexar contenidos y precios aún no aprobados.

## Planes de ejemplo

| Plan | Importe ilustrativo | Idea inicial |
| --- | ---: | --- |
| Esencial | USD 19/mes | Biblioteca, ejercicios y ruta guiada |
| Pro | USD 39/mes | Esencial más análisis en vivo y comunidad |
| Elite | USD 79/mes | Pro más talleres grupales y profundización |

Estos importes **no son ofertas comerciales aprobadas**. Antes del lanzamiento deben confirmarse precio, impuestos, servicios incluidos, permanencia, cancelación y horarios.

## Cómo debería funcionar en producción

1. El visitante selecciona una membresía y crea su cuenta.
2. El servidor genera la operación de cobro recurrente con un proveedor autorizado en el **país de registro del negocio**. Nunca se reciben ni almacenan números de tarjeta en nuestra aplicación.
3. El servidor verifica la confirmación del pago mediante notificaciones autenticadas del proveedor, asociadas a una referencia única y procesadas de forma idempotente.
4. Se activa el acceso del alumno al contenido de su plan en una base de datos; el frontend nunca decide por sí solo si un pago es válido.
5. Se emite el comprobante fiscal legalmente exigido para la jurisdicción del emisor y se envía al correo del alumno. El recibo de la pasarela no sustituye necesariamente esa factura.
6. En renovaciones, fallos de cobro o cancelaciones, las notificaciones sincronizan el estado de la suscripción y el derecho de acceso.
7. El alumno dispone de un área para consultar sus datos, clases, documentos y cancelación/renovación conforme a las condiciones pactadas.

### Proveedores a evaluar

El proyecto existente presenta a Richard Veintimilla, WhatsApp +593, horario de Ecuador y precios en USD. **Hay que confirmar en qué país está registrada la actividad comercial.**

- **Si el negocio factura en Ecuador:** evaluar Payphone Business Suscripciones y/o Kushki Pagos Recurrentes. Ambas soluciones pueden requerir aprobación o afiliación comercial para habilitar recurrencias. La documentación de Payphone describe cobros periódicos y emails de confirmación, pero hay que validar su forma de integración con nuestra aplicación y webhooks.
- **Si el negocio factura en España u otro país admitido:** Stripe Billing/Checkout podría ser una alternativa, según residencia fiscal, entidad legal y país elegible.
- **Facturación fiscal ecuatoriana:** verificar RUC, firma electrónica, habilitación SRI y el proveedor de factura electrónica/servicio fiscal que emitirá y enviará PDF/RIDE y XML cuando corresponda.

Documentación primaria:

- [Payphone Business: suscripciones](https://help.payphone.app/hc/es/articles/51293618777627-Activa-las-Suscripciones-para-tus-clientes-en-tu-Payphone-Business)
- [Kushki: pagos recurrentes en Ecuador](https://api-docs.kushkipagos.com/es/ecuador/one-click-and-scheduled-payments)
- [SRI Ecuador: Facturador SRI](https://www.sri.gob.ec/facturador-sri)
- [Stripe: disponibilidad por país](https://stripe.com/global)

## Pendiente antes de cobrar de verdad

- [ ] Confirmar titular de la actividad, país de registro, razón social, RUC/NIF y datos de facturación.
- [ ] Confirmar catálogo real, vídeos, archivos, frecuencia de clases y quién tendrá acceso a cada plan.
- [ ] Elegir y habilitar proveedor de cobros recurrentes, obtener credenciales **sin subirlas a GitHub**.
- [ ] Integrar autenticación, recuperación de contraseña y base de datos de alumnos/suscripciones.
- [ ] Crear endpoints seguros de alta, webhook de pagos, cancelación, reintentos y estados.
- [ ] Conectar la emisión y entrega de facturas fiscales al correo, con la identificación del comprador cuando sea requerida.
- [ ] Redactar términos de uso, política de privacidad, política de devoluciones y consentimiento claro de cargos mensuales.
- [ ] Validar impuestos y exigencias sobre formación financiera con profesionales del país correspondiente.
- [ ] Probar pagos de test, renovación, pago rechazado, doble clic, webhooks duplicados, cancelación y acceso bloqueado.

## Cómo enseñar la demostración

1. Abre `/academia`.
2. Recorre los módulos y haz clic en **Explorar el aula** para enseñar el panel de alumno y la pestaña **Facturación**.
3. Cierra el aula y pulsa **Elegir Pro** en Membresías.
4. Introduce datos ficticios, por ejemplo `Alumno Demo` y `alumno@example.com`, y pulsa **Simular suscripción**.
5. Muestra la pantalla de confirmación y el ejemplo de email. Nada se habrá cobrado ni enviado.

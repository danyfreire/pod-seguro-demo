# Project Charter — Demo PoD Seguro Conforme LOPDP

**Versión:** 0.2  
**Tipo:** Proof of Concept / Demo funcional  
**Objetivo:** Demostración comercial y técnica  
**Frontend / Backend:** Next.js + TypeScript  
**Hosting:** Vercel  
**Base de datos:** PostgreSQL gestionado  
**Correo transaccional:** Resend  
**Canal OTP inicial:** Email  
**IA / LLM:** No requerido

## 1. Propósito

Construir una demostración funcional de un sistema de **Proof of Delivery (PoD) Seguro** que permita registrar una entrega sin almacenar fotografías de documentos de identidad.

El demo demostrará un proceso basado en OTP, identificación mínima del receptor, firma manuscrita digital, geolocalización, timestamp, evidencia estructurada y hash SHA-256 para verificación de integridad.

El proyecto no pretende construir una plataforma logística completa ni una solución productiva final.

## 2. Objetivo del demo

Demostrar de extremo a extremo el flujo:

**Entrega pendiente → Generar OTP → Enviar OTP → Validar receptor → Firmar → Generar evidencia → Consultar PoD**

El flujo deberá poder ejecutarse desde un teléfono mediante navegador web o PWA.

## 3. Usuarios del demo

- **Courier:** realiza la entrega y registra la evidencia.
- **Destinatario:** recibe por correo electrónico el OTP asociado a la entrega.
- **Administrador:** consulta posteriormente la evidencia generada.

## 4. Flujo principal

1. Existe una entrega previamente creada con tracking, nombre, email, dirección y estado pendiente.
2. El courier abre la entrega y selecciona **Iniciar entrega**.
3. El backend genera un OTP criptográficamente seguro de 6 dígitos.
4. El OTP expira inicialmente en 5 minutos.
5. El sistema envía el OTP por correo mediante Resend.
6. El destinatario comunica el OTP al courier.
7. El courier introduce el OTP en la aplicación.
8. El sistema distingue OTP correcto, incorrecto, expirado o ya utilizado.
9. Tras la validación se registran los datos mínimos del receptor.
10. El receptor firma en pantalla.
11. La aplicación obtiene geolocalización con autorización del usuario.
12. El backend registra timestamp UTC.
13. Se construye el payload PoD.
14. Se calcula SHA-256 sobre una representación canónica de la evidencia.
15. La entrega queda completada y puede consultarse desde la vista administrativa.

## 5. Datos del receptor

Se registrarán únicamente los datos definidos para el demo:

- nombre completo;
- número de documento;
- tipo de relación con el destinatario;
- indicador de destinatario principal / tercero.

Relaciones inicialmente soportadas:

- HOLDER
- FAMILY
- SECURITY_CONCIERGE
- COWORKER
- AUTHORIZED_THIRD_PARTY

No se almacenará ninguna fotografía del documento.

## 6. Firma, geolocalización y timestamp

La firma se capturará en pantalla mediante Canvas o librería equivalente.

La geolocalización incluirá latitud, longitud y precisión aproximada.

El timestamp de finalización será registrado por el backend en UTC.

## 7. Evidencia PoD

El payload incluirá como mínimo:

- `delivery_id`
- `tracking_number`
- `timestamp_utc`
- `geo_location`
- `verification_method`
- `recipient_data`
- `signature`
- `integrity_hash_sha256`

El hash SHA-256 se utilizará para demostrar integridad del registro. No se presentará como sustituto de una firma electrónica cualificada ni como garantía absoluta de identidad o no repudio.

## 8. Vista Courier

Ruta propuesta: `/courier`

Funciones:

- listar entregas de demostración;
- abrir entrega;
- iniciar entrega;
- enviar OTP;
- introducir OTP;
- mostrar resultado de validación;
- registrar receptor;
- capturar firma;
- solicitar GPS;
- confirmar entrega;
- mostrar confirmación final.

## 9. Vista Administrativa

Ruta propuesta: `/admin`

Funciones:

- listar entregas;
- filtrar por estado;
- abrir PoD;
- visualizar tracking;
- receptor;
- método de verificación;
- timestamp;
- GPS;
- firma;
- payload JSON;
- SHA-256;
- estado de integridad.

## 10. Contingencia

El primer demo incluirá `MANUAL_CONTINGENCY`:

**Sin OTP → Registrar receptor → Firma → GPS → Confirmar**

La interfaz deberá marcar claramente que se utilizó un método de contingencia.

## 11. PDF417

La lectura PDF417 real es deseable pero no bloqueante para v0.1. Podrá simularse inicialmente y reemplazarse posteriormente por lectura real sin persistencia de fotografías.

## 12. Arquitectura

```text
                  Internet
                     │
                     ▼
             ┌─────────────────┐
             │     Vercel      │
             │                 │
             │    Next.js      │
             │                 │
             │ /courier        │
             │ /admin          │
             │ API backend     │
             └───────┬─────────┘
                     │
          ┌──────────┴─────────┐
          ▼                    ▼
     PostgreSQL             Resend
      gestionado             Email
          │                    │
          │                    ▼
          │              Destinatario
          │                recibe OTP
          ▼
     Evidencia PoD
```

## 13. Stack inicial

- Next.js
- TypeScript
- React
- Tailwind CSS
- Vercel
- PostgreSQL gestionado
- Resend
- Geolocation API
- Canvas / Pointer Events
- Web Crypto API o Node.js Crypto

## 14. Variables de entorno previstas

```env
DATABASE_URL=
RESEND_API_KEY=
OTP_EXPIRATION_MINUTES=5
EMAIL_FROM=
NEXT_PUBLIC_APP_URL=
```

No se almacenarán secretos directamente en el repositorio.

## 15. Modelo inicial de datos

### Delivery

- id
- tracking_number
- recipient_name
- recipient_email
- delivery_address
- status
- verification_method
- recipient_document
- recipient_relationship
- latitude
- longitude
- location_accuracy
- delivered_at
- signature
- pod_payload
- integrity_hash
- created_at
- updated_at

### OTP

- id
- delivery_id
- otp_hash
- expires_at
- sent_at
- verified_at
- attempt_count
- created_at

El OTP se almacenará como hash y no como código permanente en texto plano.

## 16. Estados de entrega

- PENDING
- OTP_SENT
- OTP_VERIFIED
- DELIVERY_IN_PROGRESS
- COMPLETED
- COMPLETED_CONTINGENCY

## 17. Endpoints conceptuales

```text
GET  /api/deliveries
GET  /api/deliveries/:id
POST /api/deliveries/:id/send-otp
POST /api/deliveries/:id/verify-otp
POST /api/deliveries/:id/complete
GET  /api/deliveries/:id/pod
POST /api/deliveries/:id/verify-integrity
```

## 18. Datos de demostración

Todos los datos del entorno demo serán ficticios. No deberán utilizarse números de identificación reales durante presentaciones.

## 19. Fuera de alcance v0.1

- aplicación móvil nativa;
- planificación de rutas;
- gestión de vehículos;
- ERP;
- SMS;
- WhatsApp;
- autenticación corporativa avanzada;
- multiempresa;
- facturación;
- fotografía o almacenamiento de imágenes de documentos;
- offline productivo;
- sincronización avanzada;
- cifrado local AES-256;
- dashboards analíticos;
- modelos de IA;
- Ollama;
- otros LLM;
- publicación en stores.

## 20. Criterios de aceptación

El demo estará terminado cuando sea posible:

1. abrir una entrega pendiente;
2. generar un OTP real;
3. enviarlo realmente por correo;
4. recibirlo en un buzón externo;
5. validar correctamente el OTP;
6. detectar un OTP inválido;
7. detectar un OTP expirado;
8. registrar datos mínimos del receptor;
9. capturar firma;
10. obtener GPS;
11. registrar timestamp del servidor;
12. completar la entrega;
13. generar el payload PoD;
14. calcular SHA-256;
15. guardar la evidencia;
16. consultar el PoD desde `/admin`;
17. comprobar la integridad del registro;
18. demostrar que no se almacenó ninguna fotografía de documento.

## 21. Evolución

### v0.1 — Demo
OTP, email, firma, GPS, PoD, SHA-256 y admin.

### v0.2
QR dinámico, PDF417 y mejoras visuales/auditoría.

### v0.3
Autenticación, múltiples couriers, integración externa y notificaciones.

### Producto
Offline, sincronización, seguridad reforzada, cifrado local, auditoría, observabilidad, políticas de retención e integración con operación real.

## 22. Decisión de arranque

La primera versión se desarrollará como aplicación web móvil/PWA en Next.js desplegada en Vercel, con PostgreSQL para persistencia y Resend para envío de OTP por correo. No se incorporará infraestructura de IA porque ninguna función central del PoD la requiere.

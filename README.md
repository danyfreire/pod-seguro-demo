# PoD Seguro Demo

Demo funcional de un sistema de **Proof of Delivery (PoD)** orientado a empresas de courier.

El proyecto demuestra un proceso de entrega que evita almacenar fotografías de documentos de identidad y genera evidencia estructurada de la recepción mediante:

- OTP generado de forma segura y enviado por correo electrónico;
- identificación mínima del receptor;
- firma en pantalla;
- geolocalización;
- timestamp del servidor;
- payload estructurado de evidencia;
- hash SHA-256 para verificación de integridad.

## Objetivo

Demostrar que una entrega puede generar evidencia operativa verificable aplicando principios de minimización y privacy by design, sin depender de fotografías de documentos personales.

## Flujo principal

```text
Entrega pendiente
   ↓
Generar OTP
   ↓
Enviar OTP por email
   ↓
Validar OTP
   ↓
Registrar receptor
   ↓
Firma + GPS
   ↓
Completar entrega
   ↓
Generar PoD
   ↓
SHA-256
   ↓
Consulta administrativa
```

## Stack previsto

- Next.js
- TypeScript
- Tailwind CSS
- PostgreSQL gestionado
- Resend
- Vercel

## Alcance v0.1

- Vista courier
- Generación real de OTP
- Envío real de OTP por email
- Validación de OTP
- Registro mínimo del receptor
- Firma manuscrita en pantalla
- Geolocalización
- Timestamp UTC del backend
- Generación de payload PoD
- Hash SHA-256
- Vista administrativa
- Flujo de contingencia manual

## Fuera de alcance inicial

- Fotografías de documentos de identidad
- SMS y WhatsApp
- Aplicación móvil nativa
- Operación offline productiva
- Integraciones ERP
- Planificación de rutas
- IA, LLM u Ollama

## Desarrollo

El scaffold de Next.js se incorporará como siguiente paso del proyecto.

## Variables de entorno previstas

```env
DATABASE_URL=
RESEND_API_KEY=
EMAIL_FROM=
OTP_EXPIRATION_MINUTES=5
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

No almacenar secretos en el repositorio.

## Estado

**v0.1 — Demo / Proof of Concept**

No diseñado todavía para uso productivo.

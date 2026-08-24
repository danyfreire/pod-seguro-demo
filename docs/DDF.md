# DDF — Diseño Funcional Inicial

**Versión:** 0.1  
**Estado:** Draft operativo para implementación

## Objetivo

Definir las pantallas y comportamientos mínimos del demo PoD Seguro.

## Pantalla 1 — `/courier`

### Objetivo
Listar entregas demo disponibles para el courier.

### Elementos
- Título: `Entregas pendientes`
- Tarjeta por entrega con:
  - tracking
  - destinatario
  - dirección
  - estado
- Acción: `Abrir entrega`

### Estado inicial demo
- Tracking: `GUIA-DEMO-001`
- Destinatario: `Juan Pérez`
- Estado: `PENDING`

## Pantalla 2 — `/courier/[id]`

### Objetivo
Gestionar el proceso de verificación y entrega.

### Sección Entrega
- tracking
- destinatario
- dirección
- estado

### Acción principal inicial
`Enviar OTP`

### Al enviar OTP
- backend genera código de 6 dígitos
- registra expiración
- envía correo
- cambia estado a `OTP_SENT`
- UI muestra confirmación de envío

### Entrada OTP
- seis dígitos
- botón `Validar OTP`

### Resultados posibles
- válido → `OTP_VERIFIED`
- inválido → mensaje de error
- expirado → mensaje de expiración
- utilizado → mensaje de código ya consumido

### Acción alternativa
`Continuar sin OTP`

Activa `MANUAL_CONTINGENCY`.

## Pantalla 3 — Registro del receptor

Disponible después de OTP válido o contingencia manual.

### Campos
- Nombre completo
- Número de documento
- ¿Es el destinatario principal?
- Relación con destinatario

### Relaciones
- HOLDER
- FAMILY
- SECURITY_CONCIERGE
- COWORKER
- AUTHORIZED_THIRD_PARTY

### Restricción
No existe ninguna función para capturar o almacenar fotografía del documento.

## Pantalla 4 — Firma y ubicación

### Firma
Área táctil para firma manuscrita.

Acciones:
- `Limpiar`
- `Continuar`

### Ubicación
Al preparar la finalización:
- solicitar permiso de geolocalización
- capturar latitud
- longitud
- accuracy

Si el usuario rechaza el permiso, mostrar error y permitir reintentar para el flujo nominal del demo.

## Pantalla 5 — Confirmación

### Acción
`Completar entrega`

### Backend
1. valida estado de verificación;
2. recibe datos del receptor;
3. registra timestamp UTC;
4. genera payload estructurado;
5. canonicaliza payload;
6. calcula SHA-256;
7. persiste evidencia;
8. marca entrega como `COMPLETED` o `COMPLETED_CONTINGENCY`.

### Resultado UI
Mostrar:
- `Entrega completada`
- tracking
- método de verificación
- timestamp
- indicador `Sin fotografía de documento almacenada`
- hash abreviado
- enlace `Ver evidencia`

## Pantalla 6 — `/admin`

### Objetivo
Listar entregas y consultar evidencia.

### Tabla / tarjetas
- tracking
- receptor
- estado
- método
- fecha
- acción `Ver PoD`

## Pantalla 7 — `/admin/deliveries/[id]`

### Objetivo
Mostrar evidencia completa del PoD.

### Secciones

#### Resumen
- tracking
- estado
- receptor
- relación
- método de verificación

#### Contexto
- timestamp UTC
- latitud
- longitud
- precisión GPS

#### Firma
Render de la firma capturada.

#### Evidencia estructurada
JSON formateado.

#### Integridad
- SHA-256 completo
- botón `Verificar integridad`
- resultado `Integridad verificada` o `No coincide`

## Reglas OTP

- 6 dígitos
- generado con fuente criptográficamente segura
- expiración configurable, default 5 minutos
- almacenar hash del OTP, no el valor permanente en texto plano
- un OTP validado queda consumido
- máximo de intentos configurable; para demo inicial: 3

## Criterio de demo exitoso

Debe poder ejecutarse en una sola sesión:

`PENDING → OTP_SENT → OTP_VERIFIED → COMPLETED → consulta en /admin`

con correo real recibido y sin almacenar fotografías de documentos.

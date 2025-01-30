# Documentación: Sistema de Mensajes Predeterminados con WhatsApp API

## 1. Descripción del Negocio

El sistema busca optimizar el flujo de gestión de leads mediante la creación de un dashboard simple que permita administrar usuarios, plantillas y estadísticas relacionadas con el envío de mensajes a través de WhatsApp. Actualmente, las respuestas a los leads son gestionadas manualmente, lo que genera inconsistencias y tiempos de respuesta elevados. Este proyecto plantea una solución centralizada y eficiente.

---

## 2. Problema Actual

### Contexto
- **Gestión manual de usuarios y plantillas:** Los leads son administrados sin herramientas centralizadas.
- **Inconsistencia en los mensajes:** Falta de un sistema que estandarice las respuestas.
- **Dificultad en el seguimiento:** No hay un registro de las interacciones con los leads.

### Solución Propuesta
- Crear un dashboard simple dividido en tres secciones principales: usuarios, plantillas y estadísticas.
- Usar `localStorage` para gestionar y persistir datos de usuarios, plantillas y métricas.
- Integrar funcionalidades básicas para cargar datos, generar URLs y realizar seguimientos.

---

## 3. Especificación Técnica

### Estructura de Datos
1. **Usuarios:**
   - Información: Nombre, apellido, WhatsApp, curso (opcional).
   - Almacenamiento en `localStorage` como array.
2. **Plantillas:**
   - Información: Nombre de la plantilla, mensaje predefinido.
   - Almacenamiento en `localStorage` como array.
3. **Interacciones:**
   - Información: Usuario, plantilla utilizada, fecha de envío.
   - Almacenamiento en `localStorage` como array.

### Funcionalidades
1. **Gestión de Usuarios:**
   - Carga de usuarios por lotes desde un archivo CSV.
   - Visualización en tabla con acciones (enviar mensaje).
   - Generación de URLs para WhatsApp y copia al portapapeles.

2. **Gestión de Plantillas:**
   - Creación de plantillas mediante un formulario.
   - Visualización de plantillas en tabla editable.

3. **Dashboard de Estadísticas:**
   - Conteo de mensajes enviados.
   - Almacenamiento y visualización de métricas (suma incremental por interacción).

### Interacción con WhatsApp API
- Generar URLs personalizadas para mensajes predefinidos.
- Copiar URLs al portapapeles para compartirlas manualmente.

---

## 4. Definición del Alcance

### Funcionalidades Core
- Mostrar la información de los usuarios cargados.

- Subir usuarios masivamente a través de un archivo CSV.

- Crear plantillas de mensajes.

- Mostrar un listado de plantillas de mensajes.

- Seleccionar un usuario y generar un link para enviar mensajes basado en una plantilla.

- Almacenar los mensajes enviados (links generados) en otra tabla incluyendo la asociacion entre el numero de usuario y la    plantilla utilizada.

- Agregar una etiqueta a cada ususario para indicar su estado de seguimiento.

- Agregar una etiqueta a cada usuario para indicar el curso al que esta asociado.

- Mostrar un dashboard con toda la información estadística, incluyendo las métricas especificadas en el documento.

- **Además, las funcionalidades incluyen:**
- Tener una tabla de usuarios con nombre, apellido, correo (opcional) y WhatsApp.

- Poder cargar usuarios por lotes desde un archivo CSV.

- Abrir WhatsApp al darle clic a un usuario.

- Configurar una plantilla de mensaje predeterminado al redirigir a WhatsApp o crear una lista de plantillas adaptadas a diferentes etapas del embudo.

- Registro automático de mensajes enviados para seguimiento posterior.

- Tener una página de estadísticas de mensajes enviados.

- Poder etiquetar a los usuarios según las diferentes etapas del embudo y según los diferentes cursos.

### Restricciones Técnicas
- Almacenamiento de datos: Se debe utilizar local storage para guardar la información en el navegador.

- Estructura de datos: Es necesario definir una estructura de datos para almacenar usuarios, plantillas, y la relación entre usuarios y plantillas enviadas. Esto incluye arrays o listas para organizar la información.

- Carga de datos: Se requiere una funcionalidad para cargar usuarios masivamente desde un archivo CSV, lo que implica la necesidad de procesar y parsear el archivo.

- Generación de URLs: La funcionalidad de enviar mensajes implica la generación de URLs para compartir con los usuarios.

- Manejo de etiquetas: Se necesita una funcionalidad para agregar y actualizar etiquetas a los usuarios.

- Interfaz: Se deben crear tres secciones principales en la interfaz: usuarios, plantillas y dashboard.

- Compatibilidad: La solución debe ser compatible tanto con Whatsapp web (escritorio) como con Whatsapp para celular.

- Manejo de mensajes predeterminados: El sistema debe permitir configurar y utilizar mensajes predeterminados, lo que implica una estructura para almacenar y seleccionar plantillas de mensajes.

- Métricas: El sistema debe almacenar información sobre los mensajes enviados para poder calcular las métricas de desempeño solicitadas, como el tiempo de respuesta, la tasa de uso de mensajes predeterminados, la tasa de conversión de leads y la tasa de respuesta de leads.

### Entregables Mínimos
- Estructura de datos definida: Se requiere una estructura de datos clara para almacenar la información de los usuarios, las plantillas de mensajes y la relación entre los usuarios y las plantillas enviadas. Esto incluye la necesidad de utilizar local storage en el navegador para guardar estos datos.

- Funcionalidad para cargar usuarios: Debe existir una funcionalidad para cargar usuarios de forma masiva desde un archivo CSV e insertar esta información en el local storage.

- Tabla de usuarios: Se necesita una tabla que muestre la información de los usuarios (nombre, apellido, correo opcional y WhatsApp).

- Funcionalidad para abrir WhatsApp: Debe ser posible abrir una conversación de WhatsApp al hacer clic en un usuario.

- Gestión de plantillas: Se requiere un formulario para crear plantillas de mensajes y una tabla para visualizarlas. Las plantillas deben poder ser adaptadas a diferentes etapas del embudo.

- Generación de links: Debe ser posible generar un link para enviar un mensaje a un usuario, utilizando una plantilla seleccionada.

- Almacenamiento de mensajes enviados: Los mensajes enviados (links generados) deben almacenarse en otra tabla, incluyendo la asociación entre el usuario y la plantilla utilizada. Esta información también debe incluir la fecha de envío.

- Etiquetado de usuarios: Debe existir la funcionalidad para etiquetar a los usuarios según las diferentes etapas del embudo y según los diferentes cursos. Esto implica una acción en la tabla de usuarios que permita abrir un formulario para añadir o modificar la etiqueta.

- Dashboard de métricas: Se necesita un dashboard que muestre información estadística de los mensajes enviados. **Este dashboard debe incluir las siguientes métricas:**

- Tiempo de Respuesta Promedio (TTR)

- Tiempo de Configuración de Mensajes Predeterminados

- Tasa de Uso de Mensajes Predeterminados

- Tasa de Conversión de Leads

- Tasa de Respuesta de Leads

- Interfaz de usuario: **La aplicación debe tener tres secciones principales:**

- Usuarios

- Plantillas

- Dashboard

---

## 5. Wireframes y Bocetos

### Mapa del Sitio
1. Usuarios
2. Plantillas
3. Dashboard de Estadísticas

### Interfaces de Baja Fidelidad
#### Usuarios
- Tabla de usuarios con columnas:
  - Nombre
  - WhatsApp
  - Acciones (Enviar mensaje).
- Botón para cargar CSV.

#### Plantillas
- Formulario para crear plantillas:
  - Nombre de la plantilla.
  - Mensaje predefinido.
- Tabla de plantillas existentes.

#### Dashboard
- Visualización de métricas:
  - Número total de mensajes enviados.
  - Número de usuarios contactados.

### Flujos
1. **Carga de Usuarios:**
   - Seleccionar archivo CSV.
   - Mostrar usuarios cargados en la tabla.

2. **Generación de Mensajes:**
   - Seleccionar usuario y plantilla.
   - Generar URL personalizada y copiarla al portapapeles.

3. **Actualización de Métricas:**
   - Incrementar el contador de mensajes enviados por cada interacción.

---

## 6. Revisión General
- La solución es local, basada en almacenamiento `localStorage`.
- Diseñada para equipos pequeños (220 leads por semana).
- Compatible con WhatsApp Web y aplicaciones de escritorio.

---




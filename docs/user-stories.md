### Historia de Usuario: Cargar Usuarios Masivamente
**Como** administrador  
**Quiero** cargar usuarios de forma masiva desde un archivo CSV  
**Para** ahorrar tiempo y evitar la entrada manual de datos.  

#### Criterios de Aceptación:
1. **Dado** que tengo un archivo CSV con información de usuarios  
   **Cuando** selecciono y subo el archivo  
   **Entonces**  los datos de los usuarios se almacenan en el sistema y se muestran en la tabla de usuarios.

#### Notas Técnicas:
- Componentes necesarios: Botón de carga de archivo, lector de archivos CSV, función de análisis de datos, función de almacenamiento en local storage.
- Modelos de datos: Estructura de datos para usuarios en local storage (array de objetos con nombre, apellido, correo opcional y WhatsApp).
- Interacciones: El botón de carga activa el lector de CSV, se analizan los datos y se guardan en local storage, luego se actualiza la tabla de usuarios.

---

### Historia de Usuario: Creación de Plantillas de Mensajes

**Como** agente de marketing,

**Quiero** crear plantillas de mensajes personalizadas,

**Para** responder rápidamente y de forma consistente a los leads.

### Criterios de Aceptación:

1. **Dado** que estoy en la sección de plantillas 
   **Cuando** completo el formulario para crear una plantilla con el texto deseado, 
   **Entonces** la plantilla se guarda en el sistema y se muestra en la tabla de plantillas.

### Notas Técnicas:

- Componentes necesarios: Formulario de creación de plantillas (campo de texto), botón de guardar, función de almacenamiento en local storage.

- Modelos de datos: Estructura de datos para plantillas en local storage (array de objetos con ID y texto de plantilla).

- Interacciones: El formulario permite ingresar el texto, al guardar se almacena en local storage y se actualiza la tabla de plantillas.

### Mostrar un listado de plantillas de mensajes

**Como** administrador  
**Quiero** ver una lista de las plantillas de mensajes disponibles  
**Para** seleccionar la plantilla adecuada al contactar a un lead  

### Criterios de Aceptación:

1. **Dado** que he creado plantillas de mensaje  
   **Cuando** accedo a la sección de plantillas  
   **Entonces** veo una tabla o lista con todas las plantillas disponibles.  

### Notas Técnicas:

- Componentes necesarios: Tabla o lista de plantillas, lógica para renderizar datos desde local storage.  
- Modelos de datos: Estructura de datos tipo array para almacenar plantillas en local storage, cada plantilla con un campo para el texto del mensaje.  
- Interacciones: Carga inicial de datos desde local storage, renderizado en la tabla o lista.  

### Historia de Usuario: Enviar Mensaje a un Usuario

**Como** agente de ventas,

**Quiero** seleccionar un usuario y enviar un mensaje predeterminado,

**Para** contactar rápidamente al lead y proporcionar información relevante.

### Criterios de Aceptación:

1. **Dado** que estoy en la tabla de usuarios, 
   **Cuando** selecciono un usuario y elijo una plantilla, 
   **Entonces** se genera un link de WhatsApp con el mensaje predeterminado que puedo copiar y enviar.

### Notas Técnicas:

- Componentes necesarios: Acción en la tabla de usuarios, selector de plantilla, generador de URL, función para copiar al portapapeles.

- Modelos de datos: Estructura de datos para usuarios, plantillas y la relación entre ellos en local storage (se debe guardar la asociación entre usuario, plantilla y fecha de envío). 

- La estructura de datos para almacenar en el localStorage se basará en arrays de objetos, organizados de la siguiente manera:

    - **Usuarios:** Se almacenará un array de objetos, donde cada objeto representará a un usuario. Cada objeto tendrá propiedades como nombre, apellido, correo (opcional) y whatsapp. Además, se incluirán propiedades para las etiquetas de seguimiento y curso, que se podrán editar. También se podría incluir un id único para facilitar la identificación y manipulación de cada usuario. La estructura podría ser similar a:

        ```
        [
            {
                "id": "12345",
                "nombre": "Juan",
                "apellido": "Pérez",
                "correo": "juan.perez@email.com",
                "whatsapp": "+525512345678",
                "etiqueta_seguimiento": "nuevo",
                "etiqueta_curso": "interesado"
            },
            {
                "id": "67890",
                "nombre": "Maria",
                "apellido": "Gomez",
                "correo": "maria.gomez@email.com",
                "whatsapp": "+525587654321",
                "etiqueta_seguimiento": "contactado",
                "etiqueta_curso": "inscrito"
            }
        ]
        ```
    
    - **Plantillas de Mensajes:** Similarmente, se usará un array de objetos para almacenar las plantillas de mensajes. Cada objeto representará una plantilla y contendrá, al menos, el texto del mensaje. Se podría incluir un id para identificar cada plantilla, y otras propiedades como el tipo de plantilla (bienvenida, seguimiento, cierre) o la fecha de creación.  La estructura podría verse así:

        ```
        [
            {
                "id": "plantilla1",
                "tipo": "bienvenida",
                "texto": "Hola, bienvenido a Repensar. ¿En qué programa estás interesado?"
            },
            {
                "id": "plantilla2",
                "tipo": "seguimiento",
                "texto": "Hola, ¿tienes alguna duda adicional sobre nuestros programas?"
            }
        ]
        ```
    
    - **Mensajes Enviados a Usuarios:** Se almacenará la relación entre los usuarios y las plantillas enviadas, junto con la fecha y hora del envío. Cada objeto contendrá, al menos, el id del usuario, el id de la plantilla utilizada y la URL generada. Además, se registrará la fecha y hora del envío para análisis posterior. La estructura podría ser la siguiente:

        ```
        [
            {
                "usuario_id": "12345",
                "plantilla_id": "plantilla1",
                "url": "https://wa.me/525512345678?text=Hola,%20bienvenido%20a%20Repensar.%20%C2%BFEn%20qu%C3%A9%20programa%20est%C3%A1s%20interesado?",
                "fecha_envio": "2024-02-29T10:00:00Z"
            },
            {
                "usuario_id": "67890",
                "plantilla_id": "plantilla2",
                "url": "https://wa.me/525587654321?text=Hola,%20%C2%BFtienes%20alguna%20duda%20adicional%20sobre%20nuestros%20programas?",
                "fecha_envio": "2024-02-29T11:30:00Z"
            }
        ]
        ```

    - **Métricas:** Además de las estructuras de datos principales, se necesitará una estructura para almacenar las métricas, aunque no se especifica su forma exacta en los documentos. Podría ser un objeto que almacene contadores para el número de mensajes enviados, tiempo de respuesta promedio, etc.

- Interacciones: La acción en la tabla de usuarios abre el selector de plantilla, al elegir plantilla y dar enviar se genera la URL de WhatsApp y se copia al portapapeles y se guarda la información de envío en local storage.

### Historia de Usuario: Etiquetar un Usuario

**Como** analista de datos

**Quiero** etiquetar usuarios con información relevante,

**Para** poder segmentarlos y organizar el seguimiento.

### Criterios de Aceptación:

1. **Dado** que estoy en la tabla de usuarios, 
   **Cuando** selecciono un usuario y defino una etiqueta de seguimiento o de curso, 
   **Entonces** la etiqueta se guarda en el sistema asociada al usuario.

### Notas Técnicas:

- Componentes necesarios: Acción en la tabla de usuarios, formulario para seleccionar la etiqueta, función de actualización de datos en local storage.

- Modelos de datos: Estructura de datos para usuarios en local storage (el objeto usuario debe incluir propiedades para las etiquetas de seguimiento y curso).

- Interacciones: La acción en la tabla abre un formulario para añadir o editar la etiqueta, al guardar se actualiza la información del usuario en local storage.

### Historia de Usuario: Visualizar Métricas en el Dashboard

**Como** gerente de ventas,

**Quiero** ver las métricas de desempeño en un dashboard,

**Para** evaluar la efectividad de las acciones y tomar decisiones.

### Criterios de Aceptación:

1. **Dado** que estoy en el dashboard, 
   **Cuando** consulto la información, 
   **Entonces** se muestran las métricas clave: Tiempo de Respuesta Promedio, Tiempo de Configuración de Mensajes Predeterminados, Tasa de Uso de Mensajes Predeterminados, Tasa de Conversión de Leads y Tasa de Respuesta de Leads.

### Notas Técnicas:

- Componentes necesarios: Gráficos y tablas para mostrar las métricas, función de cálculo de métricas basada en los datos de local storage.

- Modelos de datos: Local Storage debe almacenar toda la información necesaria para calcular las métricas (ej: fecha de envío, respuestas de leads, etc.).

- Interacciones: El dashboard muestra las métricas calculadas a partir de los datos almacenados en el local storage.
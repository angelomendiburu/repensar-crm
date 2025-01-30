# Repensar CRM

---

## **Descripción General**
El sistema es una solución orientada a optimizar la gestión de leads y la interacción con clientes potenciales a través de WhatsApp. Actualmente, los procesos son manuales y carecen de una estructura centralizada, lo que genera inconsistencias y reduce la eficiencia.

### **Objetivo principal**
Proveer un dashboard intuitivo dividido en tres módulos principales:  
1. **Gestión de Usuarios:** Cargar y administrar información de leads (usuarios).  
2. **Gestión de Plantillas:** Crear y almacenar mensajes predefinidos personalizados.  
3. **Dashboard de Estadísticas:** Visualizar métricas clave que evalúen la efectividad de las acciones de marketing y ventas.  

El sistema está diseñado para operar localmente, utilizando almacenamiento en el navegador (`localStorage`) para guardar información como datos de usuarios, plantillas de mensajes y registros de interacciones.

### **Características principales**
- Carga masiva de usuarios desde archivos CSV.  
- Generación de enlaces de WhatsApp personalizados basados en plantillas predefinidas.  
- Etiquetado de usuarios según etapas del embudo y cursos asociados.  
- Seguimiento de mensajes enviados y generación de estadísticas clave.  
- Compatibilidad con WhatsApp Web y dispositivos móviles.

---

## **Tecnologías a Utilizar**

### **1. HTML5**
- Estructura del sistema y diseño básico de la interfaz.
- Secciones principales: tabla de usuarios, formularios para plantillas y visualización de estadísticas.

### **2. CSS3**
- Estilización de la interfaz de usuario para mejorar la experiencia visual.
- Uso de diseño responsivo para garantizar compatibilidad en diferentes dispositivos.

### **3. JavaScript (ES6+)**
- Manejo de lógica de negocio, interacciones dinámicas y procesamiento de datos.
- Funciones principales: 
  - Carga y procesamiento de archivos CSV.
  - Almacenamiento, actualización y recuperación de datos desde `localStorage`.
  - Generación de enlaces de WhatsApp y copia al portapapeles.
  - Cálculo y representación de estadísticas.

### **4. LocalStorage**
- Almacenamiento de datos persistentes en el navegador.
- Información a almacenar:
  - Usuarios.
  - Plantillas de mensajes.
  - Registros de interacciones y métricas.

### **5. Librerías y herramientas adicionales (opcional)**
- **Papa Parse:** Para procesar y leer archivos CSV.
- **Chart.js:** Para visualización gráfica de estadísticas en el dashboard.

### **6. WhatsApp Web API**
- Generación de enlaces dinámicos que redirigen a WhatsApp con mensajes predefinidos.

### **7. VS Code (IDE)**
- Desarrollo del sistema con un entorno de programación eficiente.

### **8. Control de Versiones (Git)**
- Gestión y seguimiento del desarrollo del proyecto.

---

**Enlaces a los documentos:**

[Requirements](docs/requirements.md)

[Historias de Usuario](docs/user-stories.md)

[Wireframes](docs/wireframes/Flujo.PNG)
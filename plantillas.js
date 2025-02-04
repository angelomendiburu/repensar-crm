class TemplateManager {
    constructor() {
        this.templates = JSON.parse(localStorage.getItem('templates')) || [];
        this.modal = document.getElementById('templateModal');
        this.form = document.getElementById('templateForm');
        this.templatesList = document.getElementById('templatesList');
        this.currentEditId = null;

        this.initializeEventListeners();
        this.renderTemplates();
    }

    initializeEventListeners() {
        // Botón crear plantilla
        document.getElementById('createTemplateBtn').addEventListener('click', () => {
            this.openModal();
        });

        // Cerrar modal
        document.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });
        
        document.querySelector('.btn-cancel').addEventListener('click', () => {
            this.closeModal();
        });

        // Click fuera del modal
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Manejar envío del formulario
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveTemplate();
        });
    }

    openModal(template = null) {
        this.modal.style.display = 'block';
        if (template) {
            this.currentEditId = template.id;
            document.getElementById('templateName').value = template.name;
            document.getElementById('templateMessage').value = template.message;
            document.querySelector('.modal-content h2').textContent = 'Editar Plantilla';
        } else {
            this.currentEditId = null;
            this.form.reset();
            document.querySelector('.modal-content h2').textContent = 'Crear Plantilla';
        }
    }

    closeModal() {
        this.modal.style.display = 'none';
        this.form.reset();
        this.currentEditId = null;
    }

    saveTemplate() {
        const name = document.getElementById('templateName').value;
        const message = document.getElementById('templateMessage').value;

        if (this.currentEditId !== null) {
            // Editar plantilla existente
            const index = this.templates.findIndex(t => t.id === this.currentEditId);
            if (index !== -1) {
                this.templates[index] = {
                    ...this.templates[index],
                    name,
                    message
                };
            }
        } else {
            // Crear nueva plantilla
            const newTemplate = {
                id: Date.now(),
                name,
                message
            };
            this.templates.push(newTemplate);
        }

        this.updateLocalStorage();
        this.renderTemplates();
        this.closeModal();
    }

    deleteTemplate(id) {
        if (confirm('¿Estás seguro de que deseas eliminar esta plantilla?')) {
            this.templates = this.templates.filter(template => template.id !== id);
            this.updateLocalStorage();
            this.renderTemplates();
        }
    }

    updateLocalStorage() {
        localStorage.setItem('templates', JSON.stringify(this.templates));
    }

    renderTemplates() {
        this.templatesList.innerHTML = '';
        
        this.templates.forEach(template => {
            const templateElement = document.createElement('div');
            templateElement.className = 'template-row';
            templateElement.innerHTML = `
                <div>${template.name}</div>
                <div>${template.message}</div>
                <div class="actions">
                    <button class="btn-edit">Editar</button>
                    <button class="btn-delete">Eliminar</button>
                </div>
            `;

            // Event listeners para los botones
            templateElement.querySelector('.btn-edit').addEventListener('click', () => {
                this.openModal(template);
            });

            templateElement.querySelector('.btn-delete').addEventListener('click', () => {
                this.deleteTemplate(template.id);
            });

            this.templatesList.appendChild(templateElement);
        });
    }
}

// Inicializar el administrador de plantillas cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new TemplateManager();
});
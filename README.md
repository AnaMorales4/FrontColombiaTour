# FrontColombiaTour

Aplicación web desarrollada con Next.js y React para la gestión y reserva de tours en Colombia.

## Instalación y ejecución

1. Clonar el repositorio:

git clone https://github.com/AnaMorales4/FrontColombiaTour.git

2. Ingresar al directorio del proyecto:

cd FrontColombiaTour

3. Instalar dependencias:

npm install

4. Ejecutar el proyecto en modo desarrollo:

npm run dev

La aplicación estará disponible en:

http://localhost:3000


## Tecnologías utilizadas

- Next.js
- React
- TypeScript
- JavaScript
- CSS


## Proceso de desarrollo y decisiones tomadas

### 1. Desarrollo del Home

El desarrollo del proyecto comenzó con el diseño del HomePage. Inicialmente estructuré los componentes principales:

- Header  
- Hero  
- Footer  

Decidí comenzar por esta sección porque es el punto de entrada principal del usuario.

Posteriormente, implementé la funcionalidad para listar y mostrar los tours disponibles directamente en el Home.
- TourList

Desde esta vista el usuario puede iniciar el proceso de reserva.

Cuando se presiona el botón de reserva, se abre un modal que contiene el formulario de compra. Se tomó la decisión de utilizar un modal para evitar redireccionamientos innecesarios y mantener una experiencia de usuario más fluida.

### 2. Página de lista de tours

Después del Home, desarrollé la página donde el rol administrador puede visualizar todos los tours disponibles en el sistema.

En esta sección se permite:

- Crear nuevos tours  
- Editar tours existentes  
- Eliminar tours  

Esta vista está orientada a la gestión de los tours y permite realizar operaciones CRUD.

### 3. Autenticación y segmentación por rol

Luego diseñé las páginas de login y registro con el objetivo de segmentar el acceso por roles.

Cuando un usuario se registra, automáticamente se le asigna el rol de cliente.

Un usuario con rol cliente solo puede acceder a:

- Home  
- Acerca de  
- Mis tiquetes  
- Inicio de sesión  

Se implemento que para poder comprar un tour es obligatorio tener la sesión iniciada. Esto con el fin de tarer la información del usuario al formulario de compra.

### 4. Página "Mis tiquetes"

En esta sección el usuario autenticado puede visualizar los tours que ha reservado. Esta información está asociada directamente al usuario que inició sesión, y en esta solo puede editar la cantidad de cupos que desea para el tour.

### 5. Página "Acerca de"

Finalmente, diseñé la página "Acerca de", donde se presenta información general sobre la empresa y su propósito.

## Decisiones técnicas

- Se utilizó Next.js por su sistema de enrutamiento basado en archivos y su optimización para aplicaciones modernas.
- Se trabajó con componentes reutilizables para mantener una estructura organizada.
- Se implementó control de acceso basado en roles.
- Se priorizó la experiencia de usuario mediante el uso de modales y restricciones de acceso según autenticación.

## Despliegue

La aplicación fue desplegada utilizando Vercel, plataforma que permite realizar despliegues automáticos para proyectos desarrollados con Next.js.

El proyecto está conectado al repositorio de GitHub, lo que permite que cada cambio en la rama principal genere automáticamente un nuevo despliegue.

Enlace de la aplicación desplegada:

https://front-colombia-tour.vercel.app/

Para el despliegue se tuvo en cuenta:

- Configuración automática detectada por Vercel para proyectos Next.js.
- Instalación de dependencias mediante `npm install`.
- Generación automática del entorno de producción.

## Funcionalidades principales

- Visualización de tours
- Reserva de tours mediante formulario en modal
- Registro y login de usuarios
- Segmentación por rol
- CRUD de tours
- Visualización de tiquetes asociados al usuario
- Página informativa de la empresa

## Usuarios de prueba
### Rol Administrador

- correo: admin@admin.com
- Contraseña:12345678

### Rol Cliente

-- correo: camilop@gmail.com
- Contraseña:12345a


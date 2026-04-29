# 🎬 VideoApp – Gestión de Películas y Series

Aplicación fullstack para gestionar películas y series con sistema de autenticación, favoritos por usuario y una interfaz moderna estilo Netflix.

---

## 🚀 Demo

![Demo principal](./assets/demo.gif)


---

## ✨ Funcionalidades

### 🔐 Autenticación

* Login con JWT
* Registro de usuarios
* Persistencia de sesión
* Protección de rutas

### 🎥 Películas & 📺 Series

* Listado dinámico
* Buscador en tiempo real
* CRUD completo (crear, editar, eliminar)
* Sistema de puntuación ⭐

### ❤️ Favoritos

* Añadir / quitar favoritos por usuario
* UI reactiva instantánea
* Persistencia en backend

### 🎨 UI/UX

* Diseño oscuro estilo Netflix
* Animaciones suaves
* Responsive (mobile, tablet, desktop)

---

## 🧠 Tecnologías

### Frontend

* Angular 17+
* RxJS
* Angular Material
* Bootstrap

### Backend

* Spring Boot
* Spring Security
* JWT (JSON Web Token)
* JPA / Hibernate

### Base de datos

* MySQL / H2

---

## 📸 Capturas

### 🔐 Autenticación

![Autenticación](./assets/login.gif)

### 🎥 Películas

![Películas](./assets/peliculas.gif)

### 📺 Series

![Series](./assets/series.gif)

### ❤️ Favoritos

![Favoritos](./assets/favoritos.gif)

---

## ⚙️ Instalación

### 1️⃣ Clonar repositorio

```bash
git clone https://github.com/MrBlueSky96/netflix-angular.git
cd netflix-angular
```

---

### 2️⃣ Backend (Spring Boot)

```bash
git clone https://github.com/MrBlueSky96/crud-fullstack-java-angular-springboot.git
cd crud-fullstack-java-angular-springboot
mvn spring-boot:run
```

👉 Corre en: `http://localhost:8080`

---

### 3️⃣ Frontend (Angular)

```bash
cd netflix-angular
npm install
ng serve
```

👉 App disponible en: `http://localhost:4200`

---

## 🔐 Configuración JWT

El backend utiliza JWT para autenticación:

* Login → devuelve token
* Angular guarda token en `localStorage`
* Interceptor añade token a cada request

---

## 📂 Estructura del Proyecto

```bash
frontend/
  ├── components/
  ├── services/
  ├── models/
  ├── interceptors/
  ├── guards/

backend/
  ├── controller/
  ├── service/
  ├── repository/
  ├── entity/
  ├── security/
```

---

## 🧩 Arquitectura

* Angular consume API REST
* Spring Boot gestiona lógica y seguridad
* JWT protege endpoints
* Favoritos asociados a usuario

---

## 🧪 Próximas mejoras

* 🎬 Filtrado por géneros
* ⭐ Sistema de ratings persistente
* 🔍 Búsqueda avanzada
* 🎥 Lazy loading tipo Netflix
* 🌐 Deploy (Docker + VPS)

---

## 👨‍💻 Autor

Desarrollado por **[Jose González Guilabert]**

* GitHub: https://github.com/MrBlueSky96
* LinkedIn: https://www.linkedin.com/in/jose-gonzález-guilabert-b035363a6/?skipRedirect=true

---

## 📄 Licencia

MIT License

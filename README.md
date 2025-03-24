# CronObtenerDatosLarvia

![Node.js](https://img.shields.io/badge/Node.js-18.x-green) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue) ![License](https://img.shields.io/badge/license-MIT-orange)

## 📌 Descripción

**CronObtenerDatosLarvia** es un servicio basado en **Node.js** y **TypeScript** que ejecuta un cron job para obtener datos de larvas en un sistema determinado. Este servicio automatiza la recopilación de datos a intervalos programados, garantizando la disponibilidad de información actualizada.

## 🚀 Características

- 🕒 **Ejecución programada**: Usa `node-cron` para definir tareas automáticas.
- 🔍 **Consulta de datos**: Se conecta a una fuente de datos específica para obtener información de larvas.
- 📊 **Procesamiento de datos**: Filtra y estructura los datos obtenidos.
- 💾 **Almacenamiento**: Guarda los datos en una base de datos o los envía a otro servicio.
- 📜 **Registro de logs**: Mantiene un historial de ejecuciones para depuración.

## 🛠️ Tecnologías utilizadas

- **Node.js** (v18+)
- **TypeScript** (v5+)
- **node-cron** (para la ejecución programada)
- **Axios** (para consumir APIs externas, si aplica)
- **Winston** (para logging, si está configurado)
- **Dotenv** (para la gestión de variables de entorno)

## 📂 Estructura del proyecto

```plaintext
📂 CronObtenerDatosLarvia
 ├── 📁 src
 │   ├── 📁 config            # Configuración del proyecto
 │   ├── 📁 jobs              # Definición de tareas programadas
 │   ├── 📁 services          # Lógica de negocio y consumo de datos
 │   ├── 📁 utils             # Funciones auxiliares y helpers
 │   ├── index.ts            # Punto de entrada del servicio
 ├── .env                    # Variables de entorno
 ├── package.json            # Dependencias y configuración del proyecto
 ├── tsconfig.json           # Configuración de TypeScript
 ├── README.md               # Documentación
```

## 📦 Instalación

1. **Clonar el repositorio:**
   ```sh
   git clone https://github.com/serviciositpm/CronObtenerDatosLarvia.git
   cd CronObtenerDatosLarvia
   ```

2. **Instalar dependencias:**
   ```sh
   npm install
   ```

3. **Configurar variables de entorno:**
   Crear un archivo `.env` basado en `.env.example` y definir los valores necesarios.

4. **Compilar el proyecto (si es necesario):**
   ```sh
   npm run build
   ```

## ▶️ Uso

Para ejecutar el cron job manualmente:
```sh
npm start
```

Para correr el proyecto en modo desarrollo:
```sh
npm run dev
```

## ⚙️ Scripts disponibles

- `npm run dev` → Ejecuta el proyecto en modo desarrollo con **nodemon**.
- `npm run build` → Transpila el código TypeScript a JavaScript.
- `npm start` → Ejecuta el código ya compilado en `dist/`.

## 📝 Contribución

1. **Fork** del repositorio.
2. Crea una **nueva rama** (`git checkout -b feature-nueva-funcionalidad`).
3. Realiza los cambios y haz un **commit** (`git commit -m 'Añadir nueva funcionalidad'`).
4. Sube los cambios (`git push origin feature-nueva-funcionalidad`).
5. Abre un **Pull Request**.

## 📜 Licencia

Este proyecto está bajo la licencia **MIT**.

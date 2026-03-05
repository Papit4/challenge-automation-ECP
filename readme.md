# 🚀 Monnet Payment Solutions - QA Automation Challenge

Este repositorio contiene la solución al reto técnico de automatización de pruebas para **Monnet Payment Solutions**, implementado con **Playwright** y **TypeScript**.

El framework está diseñado bajo una arquitectura escalable, utilizando patrones de diseño como **Page Object Model (POM)**, **Data-Driven Testing (DDT)** y **Fixtures** personalizados para la gestión de seguridad y encriptación.

## 🛠️ Stack Tecnológico y Arquitectura
* **Framework:** Playwright + TypeScript
* **Patrón de Diseño Web:** Page Object Model (POM)
* **Lectura de Datos:** Librería `xlsx` para lectura directa de archivos Excel (DDT).
* **Seguridad:** Encriptación SHA-256 nativa de Node.js (`crypto`) inyectada mediante Fixtures automáticos.
* **Gestión de Entornos:** `dotenv` para el manejo dinámico de variables de entorno (QA y CERT).

---

## 📋 Pre-requisitos
Para ejecutar este proyecto, necesitas tener instalado lo siguiente en tu sistema:
1. [Node.js](https://nodejs.org/) (Versión 18 o superior).
2. [Git](https://git-scm.com/) para clonar el repositorio.

---

## ⚙️ Instalación y Configuración

Clonar el repositorio:
git clone https://github.com/Papit4/challenge-automation-ECP.git
cd challenge-automation-ECP

Instalar dependencias:
npm install

Instalar navegadores de Playwright:
npx playwright install chromium

Configuración de Variables de Entorno (¡IMPORTANTE!):
Por estrictas políticas de seguridad, las claves secretas no se exponen en este repositorio.
Debes crear dos archivos en la raíz del proyecto basándote en el archivo .env.example:

Crea un archivo llamado .env.qa y ponle dentro esta línea:
SECRET_KEY=ingresa_la_clave_aqui

Crea un archivo llamado .env.cert y ponle dentro esta línea:
SECRET_KEY=ingresa_la_clave_aqui

--- EJECUCIÓN DE LAS PRUEBAS ---
El framework soporta la inyección dinámica del entorno. Por defecto, ejecutará el ambiente "qa".

Para usuarios de Windows (PowerShell):

Ejecutar pruebas en ambiente QA:
$env:TEST_ENV="qa"; npx playwright test

Ejecutar pruebas en ambiente CERT:
$env:TEST_ENV="cert"; npx playwright test

Para usuarios de Mac/Linux (o Git Bash):

Ejecutar pruebas en ambiente QA:
TEST_ENV=qa npx playwright test

Ejecutar pruebas en ambiente CERT:
TEST_ENV=cert npx playwright test

--- EJECUCIÓN POR ETIQUETAS (TAGS) ---

Solo Pruebas de API (PokeAPI y JSONPlaceholder):
npx playwright test --grep "@api"

Solo Prueba Web (Wikipedia):
npx playwright test --grep "@web"

--- REPORTES Y EVIDENCIAS ---
Playwright generará un reporte HTML detallado al finalizar, con pasos, capturas y videos solo en caso de fallos. Para abrir el reporte, ejecuta el siguiente comando:

npx playwright show-report

Gestión de Archivos Descargados:
Durante la prueba Web (Wikipedia), las imágenes de los Pokémon se descargan dinámicamente. El framework validará y creará automáticamente la carpeta "images/" en la raíz del proyecto, sobrescribiendo los archivos en ejecuciones futuras para cumplir con los requisitos.
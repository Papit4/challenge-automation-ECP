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

**1. Clonar el repositorio:**

git clone https://github.com/Papit4/challenge-automation-ECP


**2. Instalar dependencias:**
\`\`\`bash
npm install
\`\`\`

**3. Instalar navegadores de Playwright:**
\`\`\`bash
npx playwright install chromium
\`\`\`

**4. Configuración de Variables de Entorno (¡IMPORTANTE!):**
Por estrictas políticas de seguridad (simulando un entorno real Fintech), las claves secretas no se exponen en este repositorio ni en la documentación.

Debes crear dos archivos en la raíz del proyecto basándote en el archivo `.env.example`:

* Crea un archivo llamado **`.env.qa`** y asigna a la variable `SECRET_KEY` el valor correspondiente al ambiente **QA** que fue provisto en el documento PDF del challenge.
* Crea un archivo llamado **`.env.cert`** y asigna a la variable `SECRET_KEY` el valor correspondiente al ambiente **CERT** provisto en el documento PDF del challenge.

La estructura interna de ambos archivos debe verse exactamente así:
\`\`\`env
SECRET_KEY=ingresa_la_clave_aqui
\`\`\`

## ▶️ Ejecución de las Pruebas

El framework soporta la inyección dinámica del entorno mediante la variable `TEST_ENV`. Por defecto, ejecutará el entorno `qa`.

### Para usuarios de Windows (PowerShell):
Ejecutar todas las pruebas en el ambiente QA o CERT:

```powershell
$env:TEST_ENV="qa"; npx playwright test
$env:TEST_ENV="cert"; npx playwright test


### Para usuarios de Windows (PowerShell):

Ejecutar **todas** las pruebas en el ambiente QA:

$env:TEST_ENV="cert"; npx playwright test

### Para usuarios de Mac/Linux (o Git Bash):

TEST_ENV=qa npx playwright test
TEST_ENV=cert npx playwright test

---

## 🎯 Ejecución por Etiquetas (Tags)
Si deseas ejecutar suites de pruebas específicas, puedes hacer uso del parámetro `--grep`:

* **Solo Pruebas de API (PokeAPI y JSONPlaceholder):**
 npx playwright test --grep "@api"
 
* **Solo Prueba Web (Wikipedia):**
npx playwright test --grep "@web"

---

## 📊 Reportes y Evidencias

Playwright está configurado para generar un reporte HTML detallado al finalizar la ejecución, el cual incluye los pasos detallados de cada prueba (`test.step`), capturas de pantalla y videos **únicamente en caso de que una prueba falle**.

Para abrir y visualizar el reporte interactivo, ejecuta el siguiente comando:

npx playwright show-report


### 📁 Gestión de Archivos Descargados
Durante la prueba Web (Wikipedia), las imágenes de los Pokémon son descargadas interactuando dinámicamente con el DOM. El framework validará y creará automáticamente la carpeta `images/` en la raíz del proyecto. Si la prueba se ejecuta múltiples veces, las imágenes se sobrescribirán de forma automática cumpliendo con los requisitos de la prueba.
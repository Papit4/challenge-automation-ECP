import { test, expect } from '../Fixtures/base.fixture';
import { getPokemonData } from '../Utils/excelReader';
import { WikipediaPage } from '../Pages/WikipediaPage';
import * as fs from 'fs';
import * as path from 'path';

// Cargamos los datos del Excel
const pokemonList = getPokemonData();

test.describe('Prueba Web - Wikipedia', { tag: ['@web', '@wikipedia'] }, () => {

    for (const data of pokemonList) {

        test(`Validar Wikipedia y descargar imagen para: ${data.name}`, async ({ page, request }) => {

            // Instanciamos nuestro POM
            const wikiPage = new WikipediaPage(page);

            await test.step(`1. Ingresar a Wikipedia buscando a ${data.name}`, async () => {
                await wikiPage.navigate(data.name);
            });

            await test.step('2. Validar el título de la página', async () => {
                const title = await wikiPage.getTitleText();
                expect(title.toLowerCase()).toContain(data.name.toLowerCase());
            });

            await test.step('3. Extraer y loguear el creador del dibujo', async () => {
                let creador = 'Dato no disponible';
                try {
                    // El try-catch evita que la prueba falle si un Pokémon no tiene creador listado
                    creador = await wikiPage.getCreatorText();
                } catch (error) {
                    console.log(`⚠️ Nota: No se encontró el campo "Created by" para ${data.name}`);
                }
                console.log(`🎨 Creador de ${data.name}: ${creador.replace(/\n/g, ', ')}`);
            });

            await test.step('4. Descargar y guardar la imagen interactuando con el DOM', async () => {
                const imageElement = await wikiPage.getImageElement();
                let imgSrc = await imageElement.getAttribute('src');

                if (!imgSrc) throw new Error('No se encontró el atributo src en la imagen');

                if (imgSrc.startsWith('//')) {
                    imgSrc = `https:${imgSrc}`;
                }

                // Extraemos el nombre original del archivo (ej: Pikachu.png)
                const urlObj = new URL(imgSrc);
                const filename = path.basename(urlObj.pathname);

                // Verificamos si la carpeta "images" existe, si no, la creamos (Requisito 6b)
                const imagesDirPath = path.resolve(__dirname, '../images');
                if (!fs.existsSync(imagesDirPath)) {
                    fs.mkdirSync(imagesDirPath, { recursive: true });
                }

                const filePath = path.join(imagesDirPath, filename);

                // Descargamos la imagen en memoria y la guardamos físicamente
                const imageResponse = await request.get(imgSrc);
                const imageBuffer = await imageResponse.body();

                // writeFileSync por defecto sobrescribe si ya existe (Requisito 6c y 6d)
                fs.writeFileSync(filePath, imageBuffer);
                console.log(`✅ Imagen guardada: images/${filename}`);

                // --- 7. ASERCIONES SOBRE LA IMAGEN DESCARGADA ---

                // a. Validar extensión (case insensitive)
                const extension = path.extname(filename).toLowerCase();
                const allowedExtensions = ['.jpg', '.jpeg', '.png', '.svg'];
                expect(allowedExtensions).toContain(extension);

                // b. Validar que el peso del archivo sea menor a 500,000 bytes
                const fileStats = fs.statSync(filePath);
                expect(fileStats.size).toBeLessThan(500000);
            });
        });
    }
});
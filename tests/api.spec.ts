    //  Importamos carpeta Fixtures
    import { test, expect } from '../Fixtures/base.fixture';
    import { getPokemonData } from '../Utils/excelReader';

    // Cargamos los datos del Excel
    const pokemonList = getPokemonData();

    test.describe('Prueba API - Parte 1: PokeAPI', { tag: ['@api', '@pokeapi'] }, () => {

        // Iteramos por cada Pokémon en tu Excel
        for (const data of pokemonList) {

            // El requerimiento dice: "usando el ID como también el nombre"

            test(`Validar GET Pokémon: ${data.name} (ID: ${data.id})`, async ({ request }) => {

                // 1. Guardar tiempo de inicio
                const startTime = Date.now();

                // 2. Hacer petición GET usando el ID del Excel
                const response = await request.get(`https://pokeapi.co/api/v2/pokemon/${data.id}`);

                // 3. Calcular tiempo de respuesta
                const responseTime = Date.now() - startTime;

                // --- ASERCIONES ---

                // a. El tiempo de respuesta debe ser menor a 10 segundos (10000 ms)
                expect(responseTime).toBeLessThan(10000);

                // Validar que la respuesta sea 200 OK
                expect(response.ok()).toBeTruthy();

                const responseBody = await response.json();

                // b. Validar ID y Name contra los datos del Excel
                expect(responseBody.id).toBe(data.id);
                expect(responseBody.name).toBe(data.name);

                // El Excel trae: "overgrow, chlorophyll" -> Lo convertimos a un array ["overgrow", "chlorophyll"]
                const expectedAbilities = data.abilities.split(',').map(ability => ability.trim());

                // Extraemos solo los nombres de las habilidades de la API en un nuevo array
                const actualAbilities = responseBody.abilities.map((a: any) => a.ability.name);

                // Verificamos que la cantidad de habilidades coincida
                expect(actualAbilities.length).toBe(expectedAbilities.length);

                // Verificamos que cada habilidad del Excel exista en la respuesta de la API
                for (const expectedAbility of expectedAbilities) {
                    expect(actualAbilities).toContain(expectedAbility);
                }
            });
        }


    });


    test.describe('Prueba API - Parte 2: JSONPlaceholder (Happy & Unhappy Paths)', { tag: ['@api', '@jsonplaceholder'] }, () => {

        // 1. Definimos nuestra batería de pruebas (Data-Driven Testing)
        const escenarios = [
            {
                descripcion: 'Happy Path - Todos los tipos de datos correctos',
                payload: { title: 'Reto Monnet', body: 'Playwright', userId: 99 },
                esHappyPath: true
            },
            {
                descripcion: 'Unhappy Path - userId enviado como STRING en vez de NUMBER',
                payload: { title: 'Reto Monnet', body: 'Playwright', userId: 'noventaynueve' }, // ¡Error intencional!
                esHappyPath: false
            },
            {
                descripcion: 'Unhappy Path - title enviado como NULL',
                payload: { title: null, body: 'Playwright', userId: 99 }, // ¡Error intencional!
                esHappyPath: false
            }
        ];

        // 2. Iteramos sobre los escenarios
        for (const escenario of escenarios) {

            test(`POST /posts - ${escenario.descripcion}`, async ({ request }) => {

                // Si es un Unhappy Path, le advertimos a Playwright que ESPERAMOS que el test falle
                // al llegar a nuestras aserciones estrictas de tipo.
                if (!escenario.esHappyPath) {
                    test.fail(true, 'Se espera que falle porque el payload tiene tipos de datos incorrectos');
                }

                // Ejecutamos la petición con el payload dinámico
                const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
                    data: escenario.payload
                });

                const responseBody = await response.json();

                console.log(`\n--- Evaluando: ${escenario.descripcion} ---`);
                console.log(JSON.stringify(responseBody, null, 2));

                // Aserciones básicas de estado
                expect(response.status()).toBe(201);

                // --- VALIDACIONES ESTRICTAS DE CONTRATO---

                // Validamos que los tipos de datos sean los correctos
                expect(typeof responseBody.id).toBe('number');
                expect(typeof responseBody.title).toBe('string');
                expect(typeof responseBody.body).toBe('string');
                expect(typeof responseBody.userId).toBe('number');

                // Validamos la exactitud
                expect(responseBody.title).toBe(escenario.payload.title);
                expect(responseBody.body).toBe(escenario.payload.body);
                expect(responseBody.userId).toBe(escenario.payload.userId);
            });
        }
    });
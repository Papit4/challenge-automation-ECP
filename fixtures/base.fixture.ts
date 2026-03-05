import { test as base } from '@playwright/test';
import * as crypto from 'crypto';

// Extendemos el test base de Playwright
export const test = base.extend<{ cryptoLogger: void }>({

  cryptoLogger: [async ({}, use, testInfo) => {

    // --- 1. SETUP (Antes de cada test) ---
    const secretKey = process.env.SECRET_KEY;

    if (!secretKey) {
      throw new Error("¡SECRET_KEY no está definida! Revisa que el archivo .env esté configurado correctamente.");
    }

    // Encriptar la clave usando SHA-256 nativo de Node.js
    const hashedKey = crypto.createHash('sha256').update(secretKey).digest('hex');

    console.log(`\n=========================================`);
    console.log(`▶ Iniciando Test: ${testInfo.title}`);
    console.log(`🔑 Clave Secreta (SHA-256): ${hashedKey}`);
    console.log(`=========================================\n`);

    // --- 2. EJECUCIÓN DEL TEST ---
    // La función use() pausa el fixture, corre tu test y luego vuelve aquí
    await use();

    // --- 3. TEARDOWN (Después de cada test) ---
    const endDate = new Date();
    console.log(`\n=========================================`);
    console.log(`⏹ Test finalizado. Fecha y hora: ${endDate.toLocaleString()}`);
    console.log(`=========================================\n`);

  }, { auto: true }],
});

export { expect } from '@playwright/test';
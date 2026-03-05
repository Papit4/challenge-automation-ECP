// ¡IMPORTANTE! Importamos 'test' desde nuestro fixture, no desde @playwright/test
import { test, expect } from '../fixtures/base.fixture';

test('Mi primer test con fixture automático', async ({ page }) => {
    console.log("Ejecutando los pasos de la prueba...");
    expect(true).toBeTruthy();
});
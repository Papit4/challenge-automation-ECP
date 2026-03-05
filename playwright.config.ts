import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

// Leemos una variable que enviaremos por consola (por defecto usará 'qa')
const environment = process.env.TEST_ENV || 'qa';

// Le decimos a dotenv que cargue el archivo correspondiente (.env.qa o .env.cert)
dotenv.config({ path: path.resolve(__dirname, `.env.${environment}`) });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html', // Genera el reporte HTML que piden

  use: {
    // Estas configuraciones cumplen con el requisito de generar capturas/videos al fallar
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
    // Puedes dejar Firefox y WebKit comentados por ahora para que los tests corran más rápido
  ],
});
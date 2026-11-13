import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:5177', channel: 'msedge', headless: true },
  webServer: { command: 'npm run dev -- --host 127.0.0.1 --port 5177 --strictPort', url: 'http://127.0.0.1:5177', reuseExistingServer: true },
})
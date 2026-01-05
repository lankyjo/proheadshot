import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'node:process';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all envs regardless of the `VITE_` prefix.
  // Fix: Explicitly import process from node:process to resolve the error where 'cwd' does not exist on type 'Process'.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Allows use of process.env.API_KEY in the client code
      'process.env.API_KEY': JSON.stringify(env.API_KEY || process.env.API_KEY)
    }
  };
});
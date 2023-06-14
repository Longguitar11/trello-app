import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

const plugins = [tsconfigPaths(), react()];

// https://vitejs.dev/config/
export default defineConfig({
  plugins,
});

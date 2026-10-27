import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { microappConfig } from "./microapp.config";

function xoosManifestPlugin(): Plugin {
  return {
    name: "xoos-manifest",
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "xoos-manifest.json",
        source: JSON.stringify(
          {
            schemaVersion: microappConfig.schemaVersion,
            microappKey: microappConfig.microappKey,
            version: microappConfig.version,
            elementName: microappConfig.elementName,
            entry: "xoos-microapp.js",
            deliveryType: microappConfig.deliveryType,
            contractVersion: microappConfig.contractVersion,
            minimumRuntimeVersion: microappConfig.minimumRuntimeVersion,
          },
          null,
          2,
        ),
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), xoosManifestPlugin()],
  publicDir: false,
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    outDir: "dist-microapp",
    emptyOutDir: true,
    target: "es2020",
    lib: {
      entry: path.resolve(__dirname, "src/microapp/entry.ts"),
      formats: ["es"],
      fileName: () => "xoos-microapp.js",
    },
    rollupOptions: {
      output: { inlineDynamicImports: true },
    },
  },
});

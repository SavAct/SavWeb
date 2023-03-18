import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import InlineVue from "./vite-plugin-inline-vue";
import MinifyVue from "./vite-plugin-vue-minify";
import { ViteMinifyPlugin } from "vite-plugin-minify";
import { createServer } from "http";
import { join } from "path";
import { spawn } from "child_process";
import express from "express";

const folder = "/savact.app";
const file = "index.html";
const port = 8000;

export default defineConfig({
  plugins: [
    ViteMinifyPlugin({ collapseWhitespace: true }),
    MinifyVue({
      collapseWhitespace: true,
      removeAttributeQuotes: false,
      keepClosingSlash: true,
    }),
    InlineVue(),
    viteSingleFile({ removeViteModuleLoader: true }),
  ],
});

if (process.env.NODE_ENV != "production") {
  throw new Error("This config needs the production mode");
}

// Create server for SavAct browser
const app = express();
const httpServer = createServer(app);
const open = process.platform === "win32" ? "start" : "open";

app.use(express.static(join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, `${folder}/${file}`));
});

httpServer.listen(8000, () => {
  const url = `http://localhost:${port}/savact.app#_browser_`;
  console.info("Server runs on", url);
  spawn(open, [url], { shell: true });
});

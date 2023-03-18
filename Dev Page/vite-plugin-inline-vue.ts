import { Plugin } from "vite";
import ts from "typescript";
import { parse } from "@vue/compiler-sfc";

/* This PlugIn converts a Vue file with TypeScript to a pure JavaScript file. */

const configFileName = ts.findConfigFile(
  "./",
  ts.sys.fileExists,
  "tsconfig.json"
); // Automatisches Auffinden der tsconfig.json-Datei

// Lesen der tsconfig.json-Datei
const configFile = ts.readConfigFile(configFileName, ts.sys.readFile);
const configJson = configFile.config;

// Parsen der Compiler-Optionen aus der tsconfig.json
const parsedConfig = ts.parseJsonConfigFileContent(configJson, ts.sys, "./");

function getVueParts(file: string) {
  const a = parse(file);
  return {
    template: a.descriptor.template.content,
    script: a.descriptor.script.content,
    style: a.descriptor.styles,
  };
}

function VueFileToTs(file: string) {
  const { template, script, style } = getVueParts(file);

  if (style !== undefined && style.length > 0) {
    throw "This version does not work with style tag in .vue-files";
  }

  let s = -1;
  if (script !== undefined) {
    // Search for vue.***Component***(***{
    let l: number = -1;
    do {
      s = script.indexOf("Vue.");
      l = s;
      if (s >= 0) {
        s = script.indexOf("Component", s + 4);
        l = s - l;
        if (s >= 0) {
          s = script.indexOf("(", s + 9);
          if (s >= 0) {
            s = script.indexOf("{", s + 1);
          }
        }
      }
    } while (l > 14);

    if (s > -1) {
      if (template !== undefined) {
        // Vue script and template
        return `${script.substring(
          0,
          s + 1
        )}template:\`${template}\`,${script.substring(s + 1)}`;
      } else {
        // Vue script but no template
        return script;
      }
    } else {
      if (template !== undefined) {
        // Template but no Vue script
        return `export default Vue.defineComponent({
        template: \`${template}\`,
        setup() {
          return {};
        },
      }); ${script}`;
      } else {
        // No template and no Vue script
        return script;
      }
    }
  } else {
    if (template !== undefined) {
      // No script but template
      return `export default Vue.defineComponent({
      template: \`${template}\`,
      setup() {
        return {};
      },
    });`;
    } else {
      // No script no template
      return "";
    }
  }
}

const InlineVue = (): Plugin => {
  return {
    name: "vue",
    async transform(code, id) {
      if (id.endsWith(".vue")) {
        const transformedCode = VueFileToTs(code);
        const transpiled = ts.transpileModule(transformedCode, {
          compilerOptions: parsedConfig.options,
        });

        return {
          code: transpiled.outputText,
          map: transpiled.sourceMapText,
        };
      }
    },
  };
};

export default InlineVue;

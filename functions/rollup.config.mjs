import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import env from 'rollup-plugin-dotenv'

export default {
  input: "./src/index.ts",
  output: {
    file: "./lib/index.js",
    format: "cjs",
    sourcemap: 'inline',
  },
  plugins: [
    resolve({
      preferBuiltins: true,
      extensions: [".mjs", ".js", ".json", ".node", ".ts"],
    }),
    babel({
      babelHelpers: "bundled",
      extensions: [".ts", ".js"],
    }),
    commonjs(),
    json(),
    env()
  ],
};

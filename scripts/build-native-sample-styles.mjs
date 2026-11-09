import fs from "node:fs/promises";
import path from "node:path";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";

// Compiles only copied presentation styles, without starting or building a project.
for (const project of ["carbonsense", "finshield"]) {
  const from = path.resolve(`src/components/project-samples/${project}/styles.css`);
  const to = path.resolve(`public/project-samples/${project}-native.css`);
  const result = await postcss([tailwindcss({ optimize: true })]).process(await fs.readFile(from, "utf8"), { from, to });
  await fs.writeFile(to, result.css);
  console.log(`${project}: ${result.css.length} bytes`);
}

#!/usr/bin/env node

import { promises as fs } from "fs";
import { readline } from "../utils/readline.js";

let dirToCreate = process.argv[2];
if (!dirToCreate) {
  dirToCreate = await readline("请输入要创建的目录名: ");
}

// 得到组件名字
const componentName = dirToCreate.split("/").pop();

// 创建目录
await fs.mkdir(dirToCreate);

const templateDir = "./scripts/newComponent/templates";

const templateNames = await fs.readdir(templateDir);

const templates = templateNames.map((name) =>
  fs.readFile(`${templateDir}/${name}`)
);

const replacedTemplates = (await Promise.all(templates)).map((template) =>
  template.toString().replace(/COMPONENT_NAME/g, componentName)
);

await Promise.all(
  replacedTemplates.map((template, index) =>
    fs.writeFile(`${dirToCreate}/${templateNames[index]}`, template)
  )
);

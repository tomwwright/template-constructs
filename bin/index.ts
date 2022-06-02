import { BaseProject } from "../lib/projects/base";
import * as fs from "fs";
import { TypescriptProject } from "../lib/projects/typescript";

async function run() {
  const baseProject = new BaseProject({
    name: "test",
    team: "sre",
    description: "Testing project template",
    directory: "out/base",
  });

  baseProject.synth(fs);

  const typescriptProject = new TypescriptProject({
    name: "test-typescript",
    team: "sre",
    description: "Testing TypeScript project template",
    directory: "out/typescript",
  });

  typescriptProject.synth(fs);
}

run();

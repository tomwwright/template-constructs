import * as path from "path";
import { Directory } from "../../constructs/directory";
import { JsonFile } from "../../constructs/jsonFile";
import { TemplateFile } from "../../constructs/templateFile";
import { BaseProject, BaseProjectProps } from "../base";

type TypescriptProjectProps = BaseProjectProps & {};

export class TypescriptProject extends BaseProject {
  public readonly packageJson: JsonFile;
  constructor(props: TypescriptProjectProps) {
    super(props);

    this.catalogInfo.file.addOverride({
      spec: {
        type: "library",
        owner: props.team,
      },
    });

    this.packageJson = new JsonFile(this, "PackageJson", {
      path: "package.json",
      content: {
        name: props.name,
        version: "0.1.0",
        private: true,
        scripts: {
          build: "tsc",
          watch: "tsc -w",
          "app:run": "ts-node bin/index.ts",
        },
        devDependencies: {
          "@types/jest": "^27.0.2",
          "@types/node": "10.17.27",
          "ts-node": "^9.0.0",
          typescript: "~3.9.7",
        },
        dependencies: {
          constructs: "^10.1.24",
          "source-map-support": "^0.5.16",
        },
      },
    });

    const bin = new Directory(this, "bin");

    new TemplateFile(bin, "index.ts", {
      path: "index.ts",
      template: path.join(__dirname, "templates", "index.ts"),
    });
  }
}

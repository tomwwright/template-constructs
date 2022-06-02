import { CatalogInfo } from "../../constructs/catalogInfo";
import { File } from "../../constructs/file";
import { Project, ProjectProps } from "../../constructs/project";

export type BaseProjectProps = ProjectProps & {
  description: string;
  team: string;
};

export class BaseProject extends Project {
  public readonly catalogInfo: CatalogInfo;
  public readonly readme: File;
  constructor(props: BaseProjectProps) {
    super(props);

    this.catalogInfo = new CatalogInfo(this, "CatalogInfo", {
      definition: {
        apiVersion: "backstage.io/v1alpha1",
        kind: "Component",
        metadata: {
          name: props.name,
          description: props.description,
        },
        spec: {
          type: "service",
          owner: props.team,
          lifecycle: "development",
        },
      },
    });

    this.readme = new File(this, "README", {
      path: "readme.md",
      content: `
      ## Blank README

      Add content here!
      `,
    });
  }
}

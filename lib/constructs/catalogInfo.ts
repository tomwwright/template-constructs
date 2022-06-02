import { Component } from "./component";
import { YamlFile } from "./yamlFile";

export type CatalogInfoProps = {
  definition: {
    apiVersion: "backstage.io/v1alpha1";
    kind: "Component" | "Location";
    metadata: {
      name: string;
      description: string;
      links?: {
        title: string;
        url: string;
      }[];
    };
    annotations: {
      [annotation: string]: string;
    };
    spec: {
      type: "library" | "service" | "website";
      owner: string;
      lifecycle: "experimental" | "development" | "production";
    };
  };
};

export class CatalogInfo extends Component {
  public readonly yamlFile;
  constructor(scope: Component, id: string, props: CatalogInfoProps) {
    super(scope, id);

    this.yamlFile = new YamlFile(this, "YamlFile", {
      path: "catalog-info.yaml",
      content: props.definition,
    });
  }
}

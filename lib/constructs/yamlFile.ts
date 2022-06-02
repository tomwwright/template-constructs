import * as yaml from "yaml";
import { Component } from "./component";
import { File } from "./file";

type YamlFileProps = {
  path: string;
  content: any;
};

export class YamlFile extends Component {
  constructor(scope: Component, id: string, props: YamlFileProps) {
    super(scope, id);

    const content = yaml.stringify(props.content);

    new File(this, id, {
      path: props.path,
      content,
    });
  }
}

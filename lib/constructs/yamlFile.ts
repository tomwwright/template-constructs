import * as yaml from "yaml";
import { Component } from "./component";
import { File } from "./file";

type YamlFileProps = {
  path: string;
  content: any;
};

export class YamlFile extends Component {
  public readonly props: YamlFileProps;
  constructor(scope: Component, id: string, props: YamlFileProps) {
    super(scope, id);
    this.props = Object.assign({}, props);

    const content = () => yaml.stringify(this.props.content);

    new File(this, id, {
      path: props.path,
      content,
    });
  }

  addOverride(content: any) {
    Object.assign(this.props.content, content);
  }
}

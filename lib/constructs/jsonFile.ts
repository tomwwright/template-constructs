import { Component } from "./component";
import { File } from "./file";

type JsonFileProps = {
  path: string;
  content: any;
};

export class JsonFile extends Component {
  private readonly props: JsonFileProps;
  constructor(scope: Component, id: string, props: JsonFileProps) {
    super(scope, id);

    new File(this, "Json", {
      path: props.path,
      content: () => JSON.stringify(props.content, null, 2),
    });
  }

  addOverride(content: any) {
    Object.assign(this.props.content, content);
  }
}

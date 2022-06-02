import * as path from "path";
import { Component, Filesystem } from "./component";

type FileProps = {
  path: string;
  content?: string;
  lines?: string[];
};

export class File extends Component {
  private props: FileProps;
  constructor(scope: Component, id: string, props: FileProps) {
    super(scope, id);
    this.props = Object.assign({}, props);
  }

  get content() {
    return this.props.content ?? this.props.lines?.join("\n");
  }

  synth(fs: Filesystem) {
    const contextPath = this.node.tryGetContext("path") ?? "";
    const content = this.props.content;
    fs.writeFileSync(
      path.join(contextPath, this.props.path),
      this.props.content
    );
  }
}

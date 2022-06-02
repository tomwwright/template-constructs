import * as path from "path";
import { Component, Filesystem } from "./component";

type FileProps = {
  path: string;
  content: string | (() => string);
};

export class File extends Component {
  private props: FileProps;
  constructor(scope: Component, id: string, props: FileProps) {
    super(scope, id);
    this.props = Object.assign({}, props);
  }

  synth(fs: Filesystem) {
    const content =
      typeof this.props.content === "string"
        ? this.props.content
        : this.props.content();
    fs.writeFileSync(this.getPath(this.props.path), content);
  }
}

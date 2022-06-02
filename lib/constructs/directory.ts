import { Component, Filesystem } from "./component";

export class Directory extends Component {
  private readonly path: string;
  constructor(scope: Component, path: string) {
    super(scope, path);
    this.path = path;
    this.setPath(this.path);
  }

  synth(fs: Filesystem) {
    fs.mkdirSync(this.getPath(), {
      recursive: true,
    });
  }
}

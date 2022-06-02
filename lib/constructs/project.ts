import { Component, Filesystem } from "./component";
import { collectComponents } from "./util";

export type ProjectProps = {
  name: string;
  directory?: string;
};

export class Project extends Component {
  constructor(props: ProjectProps) {
    super(undefined as any, props.name);
    this.setPath(props.directory ?? "");
  }

  synth(fs: Filesystem) {
    // ensure the directory of the template exists
    fs.mkdirSync(this.getPath(), {
      recursive: true,
    });

    const components = collectComponents(this);
    for (const component of components) {
      console.log(`synth: ${component.node.path}`);
      component.synth(fs);
    }
    return true;
  }
}

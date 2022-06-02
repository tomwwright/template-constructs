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

  synth(fs?: Filesystem) {
    const components = collectComponents(this);
    for (const component of components) {
      component.synth(fs);
    }
    return true;
  }
}

import { Component, Filesystem } from "./component";

type TemplateProps = {
  path: string;
  template: string;
};

export class TemplateFile extends Component {
  private props: TemplateProps;
  constructor(scope: Component, id: string, props: TemplateProps) {
    super(scope, id);
    this.props = Object.assign({}, props);
  }

  synth(fs: Filesystem) {
    fs.writeFileSync(this.props.path, fs.readFileSync(this.props.template));
  }
}

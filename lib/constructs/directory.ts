import { Component } from "./component";

export type DirectoryProps = {
  path: string;
};

export class Directory extends Component {
  constructor(scope: Component, id: string, props: DirectoryProps) {
    super(scope, id);
    this.setPath(props.path);
  }
}

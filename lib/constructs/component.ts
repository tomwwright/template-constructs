import { Construct } from "constructs";
import * as _fs from "fs";
import * as _path from "path";

export type Filesystem = typeof _fs;

export interface ISynthable {
  synth(fs?: Filesystem): void;
}

export class Component extends Construct implements ISynthable {
  synth(_?: Filesystem) {}
  setPath(path: string) {
    const contextPath = this.node.tryGetContext("path") ?? "";
    this.node.setContext("path", _path.join(contextPath, path));
  }
}

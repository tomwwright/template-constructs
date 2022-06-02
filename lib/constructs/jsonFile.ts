import { Component } from "./component";
import { File } from "./file";

type JsonProps = {
  path: string;
  content: any;
};

export class JsonFile extends File {
  private readonly promise: Promise<string>;
  constructor(scope: Component, id: string, props: JsonProps) {
    super(scope, id, props);

    new File(this, "Json", {
      path: props.path,
      content: JSON.stringify(props.content, null, 2),
    });
  }
}

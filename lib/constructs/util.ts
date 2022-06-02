import { Component } from "./component";

export const collectComponents = (
  component: Component,
  collection: Component[] = []
): Component[] => {
  for (const child of component.node.children) {
    if (child instanceof Component) {
      collection.push(...[child, ...collectComponents(child)]);
    }
  }
  return collection;
};

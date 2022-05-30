import React from "react";
import calcTree from "relatives-tree";
import { Node, ExtNode } from "relatives-tree/lib/types";
import Connector from "./connector";

type PropsType = {
  nodes: ReadonlyArray<Node>;
  rootId: string;
  width: number;
  height: number;
  placeholders?: boolean;
  className?: string;
  renderNode: (node: ExtNode) => React.ReactNode;
};

export default React.memo<PropsType>(function ReactFamilyTree({
  nodes,
  rootId,
  width,
  height,
  placeholders,
  className,
  renderNode,
}: PropsType): JSX.Element {
  const {
    canvas: { width: canvasWidth, height: canvasHeight },
    connectors,
    nodes: dataNodes,
  } = calcTree(nodes, {
    rootId,
    placeholders,
  });

  const localWidth = width / 2;
  const localHeight = height / 2;

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: canvasWidth * width,
        height: canvasHeight * height,
      }}
    >
      {connectors.map((connector, idx) => (
        <Connector
          key={idx}
          connector={connector}
          width={localWidth}
          height={localHeight}
        />
      ))}
      {dataNodes.map(renderNode)}
    </div>
  );
});

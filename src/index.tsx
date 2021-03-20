import React from 'react';
import calcTree from 'relatives-tree';
import { Node, ExtNode } from 'relatives-tree/lib/types';
import Connector from './connector';

interface Props {
  nodes: ReadonlyArray<Node>;
  rootId: string;
  width: number;
  height: number;
  placeholders?: boolean;
  className?: string;
  renderNode: (node: ExtNode) => React.ReactNode;
}

export default React.memo<Props>(function ReactFamilyTree(props) {
  const data = calcTree(props.nodes, {
    rootId: props.rootId,
    placeholders: props.placeholders,
  });

  const width = props.width / 2;
  const height = props.height / 2;

  return (
    <div
      className={props.className}
      style={{
        position: 'relative',
        width: data.canvas.width * width,
        height: data.canvas.height * height,
      }}
    >
      {data.connectors.map((connector, idx) => (
        <Connector
          key={idx}
          connector={connector}
          width={width}
          height={height}
        />
      ))}
      {data.nodes.map(props.renderNode)}
    </div>
  );
});

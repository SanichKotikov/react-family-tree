import React from 'react';
import relTree, { IFamilyNode, IFamilyExtNode } from 'relatives-tree';
import Connector from './connector';

interface Props {
  nodes: IFamilyNode[];
  rootId: string;
  width: number;
  height: number;
  canvasClassName?: string;
  renderNode: (node: IFamilyExtNode) => void;
}

export default React.memo<Props>(function ReactFamilyTree(props) {
  const data = relTree(props.nodes, props.rootId);

  const width = props.width / 2;
  const height = props.height / 2;

  return (
    <div
      className={props.canvasClassName}
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

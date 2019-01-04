import * as React from 'react';
import relTree, { hasHiddenRelatives, IFamilyNode } from 'relatives-tree';
import Connector from './connector';

interface IRenderNodeOptions {
  x: number;
  y: number;
  sub: boolean;
}

interface Props {
  nodes: IFamilyNode[];
  rootId: string;
  width: number;
  height: number;
  canvasClassName?: string;
  renderNode: (node: IFamilyNode, options: IRenderNodeOptions) => void;
}

const ReactFamilyTree: React.FunctionComponent<Props> = (props) => {
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
      {data.families.map(family => {
        const fX = family.left * width;
        const fY = family.top * height;

        return (
          <React.Fragment key={family.id}>
            {(family.type === 'parent' || family.type === 'root') && (
              family.pUnits.map((unit) => (
                unit.nodes.map((node, idx) => props.renderNode(node, {
                  x: fX + (unit.shift * width) + (idx * (width * 2)),
                  y: fY,
                  sub: hasHiddenRelatives(family, node),
                }))
              ))
            )}
            {(family.type === 'child' || family.type === 'root') && (
              family.cUnits.map((unit) => (
                unit.nodes.map((node, idx) => props.renderNode(node, {
                  x: fX + (unit.shift * width) + (idx * (width * 2)),
                  y: fY + props.height,
                  sub: hasHiddenRelatives(family, node),
                }))
              ))
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ReactFamilyTree;

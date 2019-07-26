import React from 'react';
import { IConnector } from 'relatives-tree';

interface Props {
  connector: IConnector;
  width: number;
  height: number;
}

export default React.memo<Props>(function Connector({ connector, width, height }) {
  const [x1, y1, x2, y2] = connector.points;

  return (
    <i
      style={{
        position: 'absolute',
        width: Math.max(1, (x2 - x1) * width + 1),
        height: Math.max(1, (y2 - y1) * height + 1),
        background: `#999`,
        transform: `translate(${x1 * width}px, ${y1 * height}px)`,
        pointerEvents: 'none',
      }}
    />
  );
});

# react-family-tree

React component that renders a family tree.
[Demo](https://sanichkotikov.github.io/react-family-tree-example/).

## Install

```bash
npm i -S react-family-tree
```

## Usage

```jsx
import ReactFamilyTree from 'react-family-tree';
import FamilyNode from './your-components/FamilyNode';

const WIDTH = 70;
const HEIGHT = 80;

<ReactFamilyTree
    nodes={[...]}
    rootId={rootId}
    width={WIDTH}
    height={HEIGHT}
    renderNode={(node) => (
        <FamilyNode
            key={node.id}
            node={node}
            style={{
                width: WIDTH,
                height: HEIGHT,
                transform: `translate(${node.left * (WIDTH / 2)}px, ${node.top * (HEIGHT / 2)}px)`,
            }}
        />
    )}
/>
```

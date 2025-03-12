import { useSelector } from "react-redux";
import Node from "./Node";
import Connection from "./Connection";

const Tree = ({ setSelectedNode, setIsZoomed }) => {
  const nodes = useSelector((state) => state.tree.nodes);

  return (
    <group>
      {nodes.map((node) => (
        <Node
          key={node.id}
          node={node}
          setSelectedNode={setSelectedNode}
          setIsZoomed={setIsZoomed}
        />
      ))}
      {nodes.flatMap((node) =>
        node.parents.map((parentId) => {
          const parent = nodes.find((n) => n.id === parentId);
          return parent ? (
            <Connection
              key={`line-${node.id}-${parentId}`}
              parent={parent}
              child={node}
            />
          ) : null;
        })
      )}
    </group>
  );
};

export default Tree;

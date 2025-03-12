import "./App.css";
import { Canvas, useThree } from "@react-three/fiber";
import Tree from "./components/Tree";
import { useState, useEffect, useRef } from "react";
import DetailsPanel from "./components/DetailsPanel";
import anime from "animejs";
import { useSelector } from "react-redux";

const CameraAnimation = () => {
  const { camera } = useThree();
  const nodes = useSelector((state) => state.tree.nodes);

  useEffect(() => {
    const nodeCount = nodes.length;
    const distance = Math.max(10 + nodeCount * 2, 20);
    anime({
      targets: camera.position,
      z: [100, distance],
      duration: 2000,
      easing: "easeInOutQuad",
      update: () => camera.updateProjectionMatrix(),
    });
  }, [nodes.length]);

  return null;
};

const DraggableCanvas = ({ children, disabled }) => {
  const { camera } = useThree();
  const isDragging = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });
  const dragSpeed = 0.06;
  const minZoom = 10;
  const maxZoom = 100;

  const onMouseDown = (e) => {
    if (disabled) return;
    isDragging.current = true;
    lastPosition.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e) => {
    if (disabled || !isDragging.current) return;
    const deltaX = (e.clientX - lastPosition.current.x) * dragSpeed;
    const deltaY = (e.clientY - lastPosition.current.y) * dragSpeed;

    camera.position.x -= deltaX;
    camera.position.y += deltaY;
    camera.lookAt(camera.position.x, camera.position.y, 0);

    lastPosition.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  const onWheel = (e) => {
    if (disabled) return;
    const zoomSpeed = 1;
    let newZ = Math.max(
      minZoom,
      Math.min(maxZoom, camera.position.z + e.deltaY * 0.1 * zoomSpeed)
    );

    anime({
      targets: camera.position,
      z: newZ,
      duration: 500,
      easing: "easeOutQuad",
      update: () => camera.updateProjectionMatrix(),
    });
  };

  useEffect(() => {
    if (disabled) return;
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("wheel", onWheel);

    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("wheel", onWheel);
    };
  }, [disabled]);

  useEffect(() => {
    camera.near = 0.1;
    camera.updateProjectionMatrix();
  }, [camera]);

  return <>{children}</>;
};

const App = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div style={{ display: "flex" }}>
      <Canvas>
        <DraggableCanvas disabled={isZoomed}>
          <ambientLight />
          <Tree setSelectedNode={setSelectedNode} setIsZoomed={setIsZoomed} />
          <CameraAnimation />
        </DraggableCanvas>
      </Canvas>
      {selectedNode && <DetailsPanel node={selectedNode} />}
    </div>
  );
};

export default App;

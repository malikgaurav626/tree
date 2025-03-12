import React, { useEffect, useRef, useState } from "react";
import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import anime from "animejs";

const Node = ({ node, setSelectedNode, setIsZoomed }) => {
  const meshRef = useRef();
  const cardRef = useRef();
  const { camera } = useThree();
  const [hovered, setHovered] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!meshRef.current) return;
    anime({
      targets: meshRef.current.position,
      x: [node.axis * 10 + 20, node.axis * 10],
      y: [-node.level * 10 - 20, -node.level * 10],
      duration: 1000,
      easing: "easeOutExpo",
    });
  }, []);

  const animateCameraLookAt = (targetX, targetY, targetZ) => {
    anime({
      targets: camera,
      duration: 1000,
      easing: "easeInOutQuad",
      update: () => {
        camera.lookAt(targetX, targetY, targetZ);
      },
    });
  };

  const animateCamera = (x, y, z) => {
    anime({
      targets: camera.position,
      x: [camera.position.x, x],
      y: [camera.position.y, y],
      z: [camera.position.z, z],
      duration: 1000,
      delay: 500,
      easing: "easeInOutQuad",
      complete: () => animateCameraLookAt(x, y, 0),
    });
  };

  const handleZoomIn = () => {
    setIsZoomed(true);
    setZoomed(true);
    setHovered(false);
    anime({
      targets: meshRef.current.position,
      z: [meshRef.current.position.z, 5],
      duration: 1000,
      easing: "easeInOutQuad",
    });
    animateCamera(node.axis * 10, -node.level * 10, 20);
  };

  const handleZoomOut = () => {
    setZoomed(false);
    setHovered(false);
    anime({
      targets: meshRef.current.position,
      x: [meshRef.current.position.x, node.axis * 10],
      y: [meshRef.current.position.y, -node.level * 10],
      z: [meshRef.current.position.z, 0],
      duration: 1000,
      easing: "easeInOutQuad",
      complete: () => {
        setIsZoomed(false);
      },
    });
    animateCamera(node.axis * 10, -node.level * 10, 30);
  };

  if (!node) {
    return null;
  }

  return (
    <group ref={meshRef} position={[node.axis * 10, -node.level * 10, 0]}>
      <Html ref={cardRef} transform>
        <div className="card-container">
          <div
            className="card"
            onClick={handleZoomIn}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => !zoomed && setHovered(false)}
            style={{
              width: zoomed ? "100vw" : "220px",
              height: zoomed ? "100vh" : "auto",
              padding: "16px",
              background: "#ecf0f3",
              color: "#000",
              backdropFilter: "blur(10px)",
              cursor: "pointer",
              userSelect: "none",
              fontFamily: "Inter, sans-serif",
              fontSize: zoomed ? "22px" : "16px",
              textAlign: "center",
              transition: "all 0.4s ease-in-out",
              overflow: "auto",
              position: zoomed ? "fixed" : "relative",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: zoomed ? 1000 : "auto",
            }}
          >
            <img
              src={node.image || `https://robohash.org/${node.id}?size=100x100`}
              alt={node.name}
              style={{
                width: zoomed ? "350px" : "100px",
                borderRadius: "50%",
                marginBottom: "10px",
                transition: "width 0.4s ease-in-out",
              }}
            />
            <strong>{node.name}</strong>
            <p>Age: {node.age}</p>
            <p>Status: {node.alive ? "Alive" : "Deceased"}</p>
            <p>Occupation: {node.occupation}</p>
            <p>Data: {node.data}</p>
            {zoomed && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomOut();
                }}
                style={{
                  marginTop: "20px",
                  padding: "12px 16px",
                  background: "#222",
                  color: "#ecf0f3",
                  border: "2px solid #333",
                  borderRadius: "8px",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                Back to Tree
              </button>
            )}
          </div>
        </div>
      </Html>
    </group>
  );
};

export default Node;

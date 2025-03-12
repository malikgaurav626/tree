import React, { useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping } from "three";
import anime from "animejs";

const VINE_TEXTURE_URL = "/public/vine-texture.png"; // Global texture URL

const Connection = ({ parent, child }) => {
  const vineTexture = useLoader(TextureLoader, VINE_TEXTURE_URL);
  const [animatedPositions, setAnimatedPositions] = useState(null);

  useEffect(() => {
    if (!parent || !child) return;

    const parentPos = [parent.axis * 10, -parent.level * 10, 0];
    const midPos = [parent.axis * 10, -child.level * 10, 0];
    const childPos = [child.axis * 10, -child.level * 10, 0];

    const initialPoints = [parentPos, parentPos, parentPos];
    setAnimatedPositions(initialPoints);

    anime({
      targets: initialPoints,
      duration: 1000,
      easing: "easeInOutQuad",
      update: function (anim) {
        const progress = anim.progress / 100;
        initialPoints[1] = [
          parentPos[0],
          parentPos[1] + (midPos[1] - parentPos[1]) * progress,
          0,
        ];
        initialPoints[2] = [
          parentPos[0] + (childPos[0] - parentPos[0]) * progress,
          midPos[1],
          0,
        ];
        setAnimatedPositions([...initialPoints]);
      },
    });
  }, [parent, child]);

  if (!parent || !child || !animatedPositions) return null;

  // Texture adjustments
  vineTexture.wrapS = RepeatWrapping;
  vineTexture.wrapT = RepeatWrapping;
  vineTexture.repeat.set(1, 5); // Adjust tiling for vines
  vineTexture.offset.set(0.2, 0); // Adjust this to pick one vine from the texture

  return (
    <>
      {/* Vertical Vine */}
      <mesh
        position={[
          animatedPositions[0][0],
          (animatedPositions[0][1] + animatedPositions[1][1]) / 2,
          0,
        ]}
      >
        <planeGeometry
          args={[
            0.5,
            Math.abs(animatedPositions[0][1] - animatedPositions[1][1]),
          ]}
        />
        <meshBasicMaterial map={vineTexture} transparent />
      </mesh>

      {/* Horizontal Vine */}
      <mesh
        position={[
          (animatedPositions[1][0] + animatedPositions[2][0]) / 2,
          animatedPositions[1][1],
          0,
        ]}
      >
        <planeGeometry
          args={[
            Math.abs(animatedPositions[1][0] - animatedPositions[2][0]),
            0.5,
          ]}
        />
        <meshBasicMaterial map={vineTexture} transparent />
      </mesh>
    </>
  );
};

export default Connection;

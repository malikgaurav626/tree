import React, { useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping } from "three";
import anime from "animejs";

const VINE_TEXTURE_URL = "/green-vine-texture.png"; // No /public in path

const Connection = ({ parent, child }) => {
  const vineTexture = useLoader(TextureLoader, VINE_TEXTURE_URL);
  const [animatedPoints, setAnimatedPoints] = useState(null);

  useEffect(() => {
    if (!parent || !child) return;

    const parentPos = [parent.axis * 10, -parent.level * 10, 0];
    const midPos = [parent.axis * 10, -child.level * 10, 0];
    const childPos = [child.axis * 10, -child.level * 10, 0];

    const initial = [parentPos, parentPos, parentPos];
    setAnimatedPoints(initial);

    anime({
      targets: initial,
      duration: 1000,
      easing: "easeInOutQuad",
      update: (anim) => {
        const p = anim.progress / 100;
        initial[1] = [
          parentPos[0],
          parentPos[1] + (midPos[1] - parentPos[1]) * p,
          0,
        ];
        initial[2] = [
          parentPos[0] + (childPos[0] - parentPos[0]) * p,
          midPos[1],
          0,
        ];
        setAnimatedPoints([...initial]);
      },
    });
  }, [parent, child]);

  if (!animatedPoints) return null;

  vineTexture.wrapS = RepeatWrapping;
  vineTexture.wrapT = RepeatWrapping;
  vineTexture.repeat.set(1, 5 / 2);
  vineTexture.offset.set(0.2, 0);

  const [p1, p2, p3] = animatedPoints;

  const verticalLength = Math.abs(p1[1] - p2[1]);
  const horizontalLength = Math.abs(p2[0] - p3[0]);

  return (
    <>
      {/* Vertical vine */}
      {verticalLength > 0 && (
        <mesh position={[p1[0], (p1[1] + p2[1]) / 2, 0]} rotation={[0, 0, 0]}>
          <planeGeometry args={[2.5, verticalLength]} />
          <meshBasicMaterial map={vineTexture} transparent />
        </mesh>
      )}

      {/* Horizontal vine */}
      {horizontalLength > 0 && (
        <mesh
          position={[(p2[0] + p3[0]) / 2, p2[1], 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <planeGeometry args={[2.5, horizontalLength]} />
          <meshBasicMaterial map={vineTexture} transparent />
        </mesh>
      )}
    </>
  );
};

export default Connection;

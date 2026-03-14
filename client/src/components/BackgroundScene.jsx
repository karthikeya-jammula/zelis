import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial, Stars } from "@react-three/drei";
import { useRef } from "react";

function BrainOrb() {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (!meshRef.current) {
      return;
    }

    meshRef.current.rotation.x = clock.getElapsedTime() * 0.15;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.25;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.8} floatIntensity={2}>
      <Icosahedron ref={meshRef} args={[1.25, 12]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#26b8ad"
          emissive="#0f6f67"
          roughness={0.1}
          metalness={0.8}
          distort={0.35}
          speed={2}
        />
      </Icosahedron>
    </Float>
  );
}

export default function BackgroundScene() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-90">
      <Canvas camera={{ position: [0, 0, 5], fov: 55 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[2, 2, 2]} intensity={4} color="#3dc6b8" />
        <pointLight position={[-2, -2, 2]} intensity={2.4} color="#ff7c5f" />
        <Stars radius={80} depth={40} count={1300} factor={2.8} />
        <BrainOrb />
      </Canvas>
    </div>
  );
}

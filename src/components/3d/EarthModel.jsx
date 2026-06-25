import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

const EarthModel = () => {
  const earthRef = useRef();
  const atmosphereRef = useRef();

  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.05;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += delta * 0.055;
      atmosphereRef.current.rotation.z += delta * 0.01;
    }
  });

  return (
    <group>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Core Earth */}
      <Sphere ref={earthRef} args={[2.5, 64, 64]}>
        <meshStandardMaterial 
          color="#06b6d4" 
          wireframe 
          transparent
          opacity={0.3}
          emissive="#06b6d4"
          emissiveIntensity={0.2}
        />
      </Sphere>

      {/* Holographic Atmosphere / Heat Layer */}
      <Sphere ref={atmosphereRef} args={[2.6, 64, 64]}>
        <MeshDistortMaterial 
          color="#f97316"
          transparent
          opacity={0.15}
          distort={0.4}
          speed={2}
          emissive="#ef4444"
          emissiveIntensity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 3, 5]} intensity={1.5} color="#3b82f6" />
      <pointLight position={[-5, -3, -5]} intensity={2} color="#14b8a6" />
    </group>
  );
};

export default EarthModel;

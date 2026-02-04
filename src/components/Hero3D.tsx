import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Hero3D Component
 * 
 * Abstract, tech-inspired 3D geometry with:
 * - Subtle shader lighting and depth
 * - Smooth rotation and floating motion
 * - Mouse-reactive movement
 * - Elegant, calm aesthetic (not game-like)
 */

// Animated floating geometry that responds to mouse
const FloatingGeometry: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const icoRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Main sphere - gentle rotation and mouse follow
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.1 + mouse.y * 0.2;
      meshRef.current.rotation.y = time * 0.15 + mouse.x * 0.2;
      meshRef.current.position.x = mouse.x * 0.3;
      meshRef.current.position.y = mouse.y * 0.2;
    }

    // Orbiting torus
    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.3;
      torusRef.current.rotation.z = time * 0.2;
      torusRef.current.position.x = Math.sin(time * 0.5) * 2.5;
      torusRef.current.position.z = Math.cos(time * 0.5) * 2.5;
      torusRef.current.position.y = Math.sin(time * 0.3) * 0.5;
    }

    // Floating icosahedron
    if (icoRef.current) {
      icoRef.current.rotation.x = time * 0.2;
      icoRef.current.rotation.y = time * 0.25;
      icoRef.current.position.x = Math.cos(time * 0.4) * 3;
      icoRef.current.position.z = Math.sin(time * 0.4) * 2;
      icoRef.current.position.y = Math.cos(time * 0.5) * 0.8 - 0.5;
    }
  });

  // Custom gradient material color
  const primaryColor = useMemo(() => new THREE.Color('#00d4ff'), []);
  const secondaryColor = useMemo(() => new THREE.Color('#0a1628'), []);

  return (
    <>
      {/* Ambient and directional lighting for depth */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#00d4ff" />
      <directionalLight position={[-5, -5, -5]} intensity={0.2} color="#ffffff" />
      <pointLight position={[0, 0, 3]} intensity={0.8} color="#00d4ff" distance={10} />

      {/* Main distorted sphere - hero element */}
      <Float
        speed={2}
        rotationIntensity={0.5}
        floatIntensity={1}
      >
        <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color={primaryColor}
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.9}
          />
        </Sphere>
      </Float>

      {/* Orbiting torus ring */}
      <Torus ref={torusRef} args={[0.6, 0.1, 16, 100]} position={[2, 0, 0]}>
        <meshStandardMaterial
          color={primaryColor}
          emissive={primaryColor}
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.7}
        />
      </Torus>

      {/* Floating icosahedron accent */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
        <Icosahedron ref={icoRef} args={[0.4]} position={[-2, -0.5, 1]}>
          <meshStandardMaterial
            color={primaryColor}
            emissive={primaryColor}
            emissiveIntensity={0.2}
            metalness={0.7}
            roughness={0.3}
            wireframe
          />
        </Icosahedron>
      </Float>

      {/* Particle field - ambient depth */}
      <ParticleField />
    </>
  );
};

// Ambient particle field for depth
const ParticleField: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particleCount = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00d4ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Main exported component with Canvas wrapper
const Hero3D: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <color attach="background" args={['#0b0f14']} />
        <fog attach="fog" args={['#050508', 5, 20]} />
        <FloatingGeometry />
      </Canvas>
    </div>
  );
};

export default Hero3D;

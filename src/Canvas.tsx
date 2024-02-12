import React, { useRef } from 'react';

import {
  AccumulativeShadows,
  Center,
  Decal,
  Environment,
  // OrbitControls,
  RandomizedLight,
  useGLTF,
  useTexture,
} from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import * as THREE from 'three';
import { Group, Object3DEventMap, Vector3 } from 'three';
import { GLTF } from 'three-stdlib';
import { useSnapshot } from 'valtio';

import state from './store.ts';

const defaultPosition = new Vector3(0, 0, 2);
export default function AppCanvas({ position = defaultPosition, fov = 35 }) {
  return (
    <Canvas
      gl={{ preserveDrawingBuffer: true }}
      shadows
      style={{ height: '100vh' }}
      eventSource={document.getElementById('root')!}
      eventPrefix="client"
      camera={{ position, fov }}
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <CameraRig>
        <Center>
          <Shirt />
          <Backdrop />
        </Center>
      </CameraRig>

      {/* adding mouse drag controll */}
      {/* <OrbitControls /> */}
    </Canvas>
  );
}

type GLTFResult = GLTF & {
  nodes: {
    T_Shirt_male: THREE.Mesh;
  };
  materials: {
    lambert1: THREE.MeshStandardMaterial;
  };
};

function Shirt(props: JSX.IntrinsicElements['group']) {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/shirt.glb') as GLTFResult;

  const texture = useTexture(`/${snap.selectedDecal}.png`);

  // easing for color transition
  useFrame((_, delta) => {
    easing.dampC(
      (materials.lambert1 as any).color,
      snap.selectedColor,
      0.25,
      delta,
    );
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
      >
        <Decal
          position={[0, 0.04, 0.15]}
          rotation={[0, 0, 0]}
          scale={0.15}
          map={texture}
        />
      </mesh>
    </group>
  );
}

function Backdrop() {
  const shadows = useRef<any>();
  const snap = useSnapshot(state);

  useFrame((_, delta) => {
    easing.dampC(
      (shadows.current as any).getMesh().material.color,
      snap.selectedColor,
      0.25,
      delta,
    );
  });
  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.25}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.55}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={5}
        intensity={0.25}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  );
}

function CameraRig({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<Group<Object3DEventMap> | null>(null);

  useFrame((frameState, delta) => {
    easing.dampE(
      groupRef.current!.rotation,
      [frameState.pointer.y / 5, -frameState.pointer.x / 2, 0],
      0.25,
      delta,
    );
  });

  return <group ref={groupRef}>{children}</group>;
}

useGLTF.preload('/shirt.glb');
['react', 'no', 'leaf'].forEach(useTexture.preload);

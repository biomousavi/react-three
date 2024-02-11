import React, { useRef } from 'react';

import {
  AccumulativeShadows,
  Center,
  Environment,
  // OrbitControls,
  RandomizedLight,
  useGLTF,
} from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { Group, Object3DEventMap, Vector3 } from 'three';
import { useSnapshot } from 'valtio';

import state from './store.ts';

const defaultPosition = new Vector3(0, 0, 2);
export default function AppCanvas({ position = defaultPosition, fov = 35 }) {
  return (
    <Canvas
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

function Shirt(props: any) {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/t_shirt.glb');

  // easing for color transition
  useFrame((_, delta) => {
    easing.dampC(
      (materials.Body_FRONT_2664 as any).color,
      snap.selectedColor,
      0.25,
      delta,
    );
    easing.dampC(
      (materials.Sleeves_FRONT_2669 as any).color,
      snap.selectedColor,
      0.25,
      delta,
    );
  });

  return (
    <group {...props} dispose={null}>
      <group rotation={[-1.661, 0.003, 0]} position={[0, -0.3, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Object_6 as any).geometry}
            material={materials.Body_FRONT_2664}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Object_8 as any).geometry}
            material={materials.Body_FRONT_2664}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Object_10 as any).geometry}
            material={materials.Body_FRONT_2664}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Object_11 as any).geometry}
            material={materials.Body_FRONT_2664}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Object_12 as any).geometry}
            material={materials.Body_FRONT_2664}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Object_14 as any).geometry}
            material={materials.Body_FRONT_2664}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Object_15 as any).geometry}
            material={materials.Body_FRONT_2664}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Object_16 as any).geometry}
            material={materials.Body_FRONT_2664}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Object_18 as any).geometry}
            material={materials.Sleeves_FRONT_2669}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Object_20 as any).geometry}
            material={materials.Sleeves_FRONT_2669}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/t_shirt.glb');

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
      position={[0, 1, -0.4]}
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

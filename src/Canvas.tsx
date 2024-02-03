import {
  AccumulativeShadows,
  Center,
  Environment,
  OrbitControls,
  RandomizedLight,
  useGLTF,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Vector3 } from 'three';

const defaultPosition = new Vector3(0, 0, 2);
export default function AppCanvas({ position = defaultPosition, fov = 35 }) {
  return (
    <Canvas
      shadows
      style={{ height: '100vh' }}
      flat
      linear
      eventSource={document.getElementById('root')!}
      eventPrefix="client"
      camera={{ position, fov }}
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <Center>
        <Shirt />
        <Backdrop />
      </Center>
      <OrbitControls />
    </Canvas>
  );
}

function Shirt(props: any) {
  const { nodes, materials } = useGLTF('/t_shirt.glb');
  return (
    <group {...props} dispose={null}>
      <group rotation={[-1.661, 0.003, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_6.geometry}
            material={materials.Body_FRONT_2664}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_8.geometry}
            material={materials.Body_FRONT_2664}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_10.geometry}
            material={materials.Body_FRONT_2664}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_11.geometry}
            material={materials.Body_FRONT_2664}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_12.geometry}
            material={materials.Body_FRONT_2664}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_14.geometry}
            material={materials.Body_FRONT_2664}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_15.geometry}
            material={materials.Body_FRONT_2664}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_16.geometry}
            material={materials.Body_FRONT_2664}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_18.geometry}
            material={materials.Sleeves_FRONT_2669}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_20.geometry}
            material={materials.Sleeves_FRONT_2669}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/t_shirt.glb');

function Backdrop() {
  return (
    <AccumulativeShadows
      temporal
      frames={60}
      alphaTest={0.35}
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

// Model.tsx
import { useGLTF } from '@react-three/drei';
import { ComponentProps } from 'react';

type Props = Omit<ComponentProps<'primitive'>, 'object'>;

export default function Model(props: Props) {

    
  const { scene } = useGLTF('/src/texture/threejs_model/perseverance_-_nasa_mars_landing_2021.glb');

  return (
    <primitive object={scene} scale={1.5} position={[0, -2, 0]} {...props} />
  );
}

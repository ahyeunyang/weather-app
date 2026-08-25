import { Float } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Mesh } from 'three'
import styles from './CharacterStage.module.scss'

function PlaceholderCharacter() {
  const mesh = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.28
    }
  })

  return (
    <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.65}>
      <mesh ref={mesh} castShadow>
        <icosahedronGeometry args={[1.35, 5]} />
        <meshStandardMaterial color="#83c9ff" roughness={0.28} metalness={0.06} />
      </mesh>
    </Float>
  )
}

export function CharacterStage() {
  return (
    <div className={styles.stage} aria-label="3D 캐릭터 미리보기 영역">
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.8} />
        <directionalLight position={[3, 4, 5]} intensity={2.6} color="#ffffff" />
        <directionalLight position={[-4, -2, 2]} intensity={1.2} color="#8ebfff" />
        <PlaceholderCharacter />
      </Canvas>
    </div>
  )
}

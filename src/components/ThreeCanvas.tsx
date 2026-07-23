import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { THEMES } from '../data/themeData';
import { ThemeId } from '../types';
import { soundFx } from '../utils/audio';
import { Maximize2, RefreshCw, Eye, Sparkles } from 'lucide-react';

interface ThreeCanvasProps {
  currentTheme: ThemeId;
  shapeType?: 'a-logo' | 'cube' | 'torus' | 'pyramid' | 'sphere' | 'prism' | 'cylinder' | 'knot';
  interactiveControls?: boolean;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  currentTheme,
  shapeType = 'a-logo',
  interactiveControls = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wireframe, setWireframe] = useState(false);
  const [exploded, setExploded] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(0.008);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const materialsRef = useRef<THREE.Material[]>([]);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const light1Ref = useRef<THREE.PointLight | null>(null);
  const light2Ref = useRef<THREE.PointLight | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'default'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Clear previous elements
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 2. Theme color setup
    const theme = THEMES[currentTheme] || THEMES['artisticFlair'] || THEMES['deepPurple'];
    const pColor = new THREE.Color(theme.primaryColorHex);
    const sColor = new THREE.Color(theme.secondaryColorHex);

    // 3. Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.8);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const light1 = new THREE.PointLight(pColor, 3, 15);
    light1.position.set(-3, 2, 3);
    scene.add(light1);
    light1Ref.current = light1;

    const light2 = new THREE.PointLight(sColor, 3, 15);
    light2.position.set(3, -2, 3);
    scene.add(light2);
    light2Ref.current = light2;

    // 4. Mesh Creation
    const group = new THREE.Group();
    meshGroupRef.current = group;
    scene.add(group);

    materialsRef.current = [];

    const createMaterial = (color: THREE.Color, isGlass = false) => {
      const mat = new THREE.MeshStandardMaterial({
        color: color,
        metalness: isGlass ? 0.85 : 0.6,
        roughness: isGlass ? 0.15 : 0.35,
        transparent: isGlass,
        opacity: isGlass ? 0.85 : 1.0,
        wireframe: wireframe
      });
      materialsRef.current.push(mat);
      return mat;
    };

    if (shapeType === 'a-logo') {
      // Sculpted 3D 'A' Monolith
      const matMain = createMaterial(pColor, true);
      const matAccent = createMaterial(sColor, false);

      // Left Pillar of 'A'
      const leftGeo = new THREE.CylinderGeometry(0.2, 0.35, 3.2, 16);
      const leftPillar = new THREE.Mesh(leftGeo, matMain);
      leftPillar.position.set(-0.7, 0, 0);
      leftPillar.rotation.z = -Math.PI / 8;

      // Right Pillar of 'A'
      const rightPillar = new THREE.Mesh(leftGeo, matMain);
      rightPillar.position.set(0.7, 0, 0);
      rightPillar.rotation.z = Math.PI / 8;

      // Crossbar of 'A'
      const barGeo = new THREE.BoxGeometry(1.2, 0.22, 0.35);
      const crossbar = new THREE.Mesh(barGeo, matAccent);
      crossbar.position.set(0, -0.3, 0.1);

      // Apex Crown Prism
      const apexGeo = new THREE.OctahedronGeometry(0.35, 0);
      const apexMesh = new THREE.Mesh(apexGeo, matMain);
      apexMesh.position.set(0, 1.45, 0);

      group.add(leftPillar);
      group.add(rightPillar);
      group.add(crossbar);
      group.add(apexMesh);

      // Surrounding Floating Glass Cubes and Metal Torus Rings
      const torusGeo = new THREE.TorusGeometry(2.2, 0.08, 16, 100);
      const torusMat = createMaterial(sColor, false);
      const ringMesh = new THREE.Mesh(torusGeo, torusMat);
      ringMesh.rotation.x = Math.PI / 3;
      group.add(ringMesh);

      const cubeGeo = new THREE.BoxGeometry(0.4, 0.4, 0.4);
      for (let i = 0; i < 6; i++) {
        const floatCube = new THREE.Mesh(cubeGeo, matMain);
        const angle = (i / 6) * Math.PI * 2;
        floatCube.position.set(Math.cos(angle) * 2.8, Math.sin(angle) * 2.2, (Math.random() - 0.5) * 2);
        floatCube.rotation.set(Math.random(), Math.random(), Math.random());
        floatCube.name = `floatCube_${i}`;
        group.add(floatCube);
      }
    } else {
      // Custom Service Shapes
      let geo: THREE.BufferGeometry;
      switch (shapeType) {
        case 'cube':
          geo = new THREE.BoxGeometry(2, 2, 2);
          break;
        case 'torus':
          geo = new THREE.TorusGeometry(1.6, 0.6, 24, 100);
          break;
        case 'pyramid':
          geo = new THREE.ConeGeometry(1.8, 2.5, 4);
          break;
        case 'sphere':
          geo = new THREE.IcosahedronGeometry(1.8, 2);
          break;
        case 'prism':
          geo = new THREE.CylinderGeometry(1.2, 1.6, 2.4, 6);
          break;
        case 'knot':
          geo = new THREE.TorusKnotGeometry(1.3, 0.4, 100, 16);
          break;
        default:
          geo = new THREE.BoxGeometry(2, 2, 2);
      }
      const mat = createMaterial(pColor, true);
      const mesh = new THREE.Mesh(geo, mat);
      group.add(mesh);

      // Inner glowing core
      const innerGeo = new THREE.IcosahedronGeometry(0.8, 1);
      const innerMat = createMaterial(sColor, false);
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      group.add(innerMesh);
    }

    // 5. Star Particles Field
    const particleCount = 350;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 16;

      const c = Math.random() > 0.5 ? pColor : sColor;
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      color: pColor,
      size: 0.05,
      transparent: true,
      opacity: 0.85
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 6. Mouse Listener
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / width) * 2 - 1;
      const y = -((e.clientY - rect.top) / height) * 2 + 1;
      mousePos.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 7. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (group) {
        // Smooth rotation
        group.rotation.y += rotationSpeed;
        group.rotation.x = Math.sin(elapsedTime * 0.5) * 0.15 + mousePos.current.y * 0.3;
        group.rotation.z = mousePos.current.x * 0.2;

        // Animate floating orbit cubes
        group.children.forEach((child) => {
          if (child.name.startsWith('floatCube_')) {
            const id = parseInt(child.name.split('_')[1], 10);
            const dist = exploded ? 4.2 : 2.8;
            const angle = (id / 6) * Math.PI * 2 + elapsedTime * 0.6;
            child.position.x = THREE.MathUtils.lerp(child.position.x, Math.cos(angle) * dist, 0.05);
            child.position.y = THREE.MathUtils.lerp(child.position.y, Math.sin(angle) * (dist * 0.7), 0.05);
            child.rotation.x += 0.02;
            child.rotation.y += 0.02;
          }
        });
      }

      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.03;
        particlesRef.current.rotation.x = elapsedTime * 0.015;
      }

      if (light1Ref.current && light2Ref.current) {
        light1Ref.current.position.x = Math.sin(elapsedTime * 1.2) * 4 + mousePos.current.x * 2;
        light1Ref.current.position.y = Math.cos(elapsedTime * 0.8) * 3 + mousePos.current.y * 2;
        light2Ref.current.position.x = -Math.sin(elapsedTime * 0.9) * 4;
        light2Ref.current.position.y = -Math.cos(elapsedTime * 1.1) * 3;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const newW = containerRef.current.clientWidth;
      const newH = containerRef.current.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [currentTheme, shapeType, wireframe, exploded, rotationSpeed]);

  const toggleWireframe = () => {
    soundFx.playClick();
    setWireframe(!wireframe);
  };

  const toggleExplode = () => {
    soundFx.playClick();
    setExploded(!exploded);
  };

  const cycleSpeed = () => {
    soundFx.playClick();
    setRotationSpeed((prev) => (prev >= 0.024 ? 0.004 : prev + 0.008));
  };

  return (
    <div className="relative w-full h-full min-h-[350px] flex items-center justify-center overflow-hidden rounded-2xl group">
      <div ref={containerRef} className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Interactive 3D Control Bar Overlay */}
      {interactiveControls && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 opacity-70 group-hover:opacity-100 transition-all duration-300 shadow-2xl">
          <button
            onClick={toggleWireframe}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono transition-all ${
              wireframe ? 'bg-purple-500/30 text-purple-200 border border-purple-400/50' : 'text-slate-300 hover:text-white'
            }`}
            title="Toggle Wireframe Architecture"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{wireframe ? 'Wireframe: ON' : 'Solid'}</span>
          </button>

          <div className="w-[1px] h-3 bg-white/20" />

          <button
            onClick={toggleExplode}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono transition-all ${
              exploded ? 'bg-amber-500/30 text-amber-200 border border-amber-400/50' : 'text-slate-300 hover:text-white'
            }`}
            title="Explode Geometry Components"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{exploded ? 'Explode: ON' : 'Compact'}</span>
          </button>

          <div className="w-[1px] h-3 bg-white/20" />

          <button
            onClick={cycleSpeed}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono text-slate-300 hover:text-white transition-all"
            title="Adjust Rotation Speed"
          >
            <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: `${3 / (rotationSpeed * 100)}s` }} />
            <span>{(rotationSpeed * 100).toFixed(0)}x Speed</span>
          </button>
        </div>
      )}
    </div>
  );
};

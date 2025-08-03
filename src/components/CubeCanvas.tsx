import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { RotateCcw, Play, Pause, RotateCw } from 'lucide-react';

interface CubeCanvasProps {
  isAnimating: boolean;
  onAnimationToggle: () => void;
  onShuffle: () => void;
  onSolve: () => void;
}

export const CubeCanvas = ({ isAnimating, onAnimationToggle, onShuffle, onSolve }: CubeCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const cubeGroupRef = useRef<THREE.Group>();
  const animationIdRef = useRef<number>();
  
  const [isDragging, setIsDragging] = useState(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0d1117);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(4, 4, 4);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(400, 400);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x0ea5e9, 1);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const accentLight = new THREE.DirectionalLight(0x059669, 0.8);
    accentLight.position.set(-5, 5, -5);
    scene.add(accentLight);

    // Create Rubik's cube
    const cubeGroup = new THREE.Group();
    cubeGroupRef.current = cubeGroup;

    const colors = [
      0xff0000, // Red
      0x00ff00, // Green  
      0x0000ff, // Blue
      0xffff00, // Yellow
      0xff8000, // Orange
      0xffffff, // White
    ];

    const size = 0.95;
    const gap = 0.05;

    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        for (let z = 0; z < 3; z++) {
          const geometry = new THREE.BoxGeometry(size, size, size);
          
          const materials = colors.map(color => 
            new THREE.MeshPhongMaterial({ 
              color,
              shininess: 100,
              specular: 0x222222
            })
          );
          
          const cube = new THREE.Mesh(geometry, materials);
          cube.position.set(
            (x - 1) * (size + gap),
            (y - 1) * (size + gap),
            (z - 1) * (size + gap)
          );
          cube.castShadow = true;
          cube.receiveShadow = true;
          
          cubeGroup.add(cube);
        }
      }
    }

    scene.add(cubeGroup);

    // Animation loop
    const animate = () => {
      if (isAnimating && cubeGroupRef.current) {
        cubeGroupRef.current.rotation.x += 0.005;
        cubeGroupRef.current.rotation.y += 0.01;
      }
      
      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Mouse controls
    const handleMouseDown = (event: MouseEvent) => {
      setIsDragging(true);
      previousMousePosition.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging || !cubeGroupRef.current) return;

      const deltaMove = {
        x: event.clientX - previousMousePosition.current.x,
        y: event.clientY - previousMousePosition.current.y
      };

      cubeGroupRef.current.rotation.y += deltaMove.x * 0.01;
      cubeGroupRef.current.rotation.x += deltaMove.y * 0.01;

      previousMousePosition.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleWheel = (event: WheelEvent) => {
      if (!cameraRef.current) return;
      
      const factor = event.deltaY > 0 ? 1.1 : 0.9;
      cameraRef.current.position.multiplyScalar(factor);
      
      // Clamp the distance
      const distance = cameraRef.current.position.length();
      if (distance < 3) cameraRef.current.position.normalize().multiplyScalar(3);
      if (distance > 15) cameraRef.current.position.normalize().multiplyScalar(15);
    };

    const canvas = renderer.domElement;
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isAnimating, isDragging]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div 
        ref={containerRef} 
        className="border border-border rounded-lg overflow-hidden shadow-lg"
        style={{ background: 'var(--gradient-bg)' }}
      />
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onAnimationToggle}
          className="border-primary/20 hover:border-primary/40"
        >
          {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onShuffle}
          className="border-primary/20 hover:border-primary/40"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
        
        <Button 
          variant="default" 
          size="sm" 
          onClick={onSolve}
          className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg"
        >
          <RotateCw className="w-4 h-4 mr-1" />
          Solve
        </Button>
      </div>
    </div>
  );
};
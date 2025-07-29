"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function IndustrialSphere() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current || typeof window === 'undefined') return;

    const currentMount = mountRef.current;
    
    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 2.5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Geometry & Material
    const geometry = new THREE.IcosahedronGeometry(2, 1);
    const wireframe = new THREE.WireframeGeometry(geometry);
    
    const material = new THREE.LineBasicMaterial({ 
      color: 0x98D98E, // Primary color
      linewidth: 1,
      transparent: true,
      opacity: 0.15
    });

    const sphere = new THREE.LineSegments(wireframe, material);
    scene.add(sphere);

    // Mouse tracking
    const mouse = new THREE.Vector2();
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        targetRotationX = mouse.y * 0.1;
        targetRotationY = mouse.x * 0.1;
    }
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      // Easing / Lerping for smoother animation
      sphere.rotation.x += (targetRotationX - sphere.rotation.x) * 0.05;
      sphere.rotation.y += (targetRotationY - sphere.rotation.y) * 0.05;
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (currentMount) {
        const width = currentMount.clientWidth;
        const height = currentMount.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    };
    window.addEventListener('resize', handleResize);
    
    // Initial resize call
    handleResize();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" aria-label="Interactive 3D industrial animation" />;
}

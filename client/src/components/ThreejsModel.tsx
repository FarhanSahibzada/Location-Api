import { compose } from '@reduxjs/toolkit';
import React, { useEffect, useRef } from 'react'
import * as three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function Threejsmodel() {
  const canvas_ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvas_ref.current) return;


    //intialze webgl
    const renderer = new three.WebGLRenderer({
      canvas: canvas_ref.current,
      antialias: true,
      alpha: true
    });
    const width = canvas_ref.current.clientWidth;
    const height = canvas_ref.current.clientHeight;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    //intialze scene 
    const scene = new three.Scene();

    const ambientLight = new three.AmbientLight(0xffffff, 5);
    const pointLight = new three.PointLight(0xffffff, 10);
    pointLight.position.set(1, 1, 1);

    scene.add(pointLight);
    scene.add(ambientLight);

    //scene.add(earth_shape);


    const loader = new GLTFLoader();

    loader.load('/src/texture/threejs_model/perseverance_-_nasa_mars_landing_2021.glb', (gltf) => {
      const model = gltf.scene;
      model.scale.set(1.8, 1.8, 1.8);
      model.position.set(0, -2, 0);
      scene.add(model);
    });

    // y and x axis of the shape 

    // const axishelper = new three.AxesHelper(2);
    // scene.add(axishelper)



    // camera
    const camera = new three.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 400);
    camera.position.set(12, 10, 5);



    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.enableZoom = false;


    const resizeRenderer = () => {
      console.log(canvas_ref.current?.parentElement?.clientWidth)
      const width = canvas_ref.current?.parentElement?.clientWidth || window.innerWidth;
      const height = canvas_ref.current?.parentElement?.clientHeight || window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    resizeRenderer();
    window.addEventListener('resize', resizeRenderer);

    //clock three js
    // const clock = new three.Clock();
    // let previous_time = 0;

    const animate = () => {
      requestAnimationFrame(animate);



      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
      canvas_ref.current?.remove();
    };

  }, [])

  return (
    <canvas
      ref={canvas_ref}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />

  )
}



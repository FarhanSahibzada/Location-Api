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
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    //intialze scene 
    const scene = new three.Scene();
    scene.background = new three.Color('black');

    const ambientLight = new three.AmbientLight(0xffffff, 5);
    const pointLight = new three.PointLight(0xffffff, 10);
    pointLight.position.set(1, 1, 1);

    scene.add(pointLight);
    scene.add(ambientLight);

    //scene.add(earth_shape);


    const loader = new GLTFLoader();

    loader.load('/src/texture/threejs_model/perseverance_-_nasa_mars_landing_2021.glb', (gltf) => {
      const model = gltf.scene;
      model.scale.set(2, 2, 2);
      model.position.set(0,0, 0);
      scene.add(model);
    });

    // y and x axis of the shape 

    // const axishelper = new three.AxesHelper(2);
    // scene.add(axishelper)



    // camera
    const camera = new three.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 400);
    camera.position.set(5, 10, 5);



    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.minDistance = 20;
    controls.maxDistance = 200;


    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    })

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
    <canvas ref={canvas_ref}>

    </canvas>
  )
}



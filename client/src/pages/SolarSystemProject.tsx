import { compose } from '@reduxjs/toolkit';
import React, { useEffect, useRef } from 'react'
import * as three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';


interface createplant_parathesis {
  name: string,
  radius: number,
  distance: number,
  speed: number,
  material: three.Material,
  moons?: any[]
}

interface createmoon_parathesis {
  name: string,
  radius: number,
  distance: number,
  speed: number,
  color?: number
}


export default function SolarSystemProject() {

  const canvas_ref = useRef<HTMLCanvasElement | null>(null)

  const createOrbit = (radius: number, segments =100, color = 0xffffff) => {
    const points: three.Vector3[] = [];

    for (let i = 0; i <= segments; i++) {
  
      const angle = (i / segments) * Math.PI * 2;
      // console.log("angle==", i / segments)
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      points.push(new three.Vector3(x, 0, z));
    }
// console.log(points)

    const geometry = new three.BufferGeometry().setFromPoints(points);
    const material = new three.LineBasicMaterial({ color });
    const line = new three.LineLoop(geometry, material);

    return line;
  };



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

    // All textures load
    const texture = new three.TextureLoader();
    const earth_texture = texture.load('/src/texture/solar_system_assets/2k_earth_daymap.jpg');
    const mars_texture = texture.load('/src/texture/solar_system_assets/2k_mars.jpg');
    const mercury_texture = texture.load('/src/texture/solar_system_assets/2k_mercury.jpg');
    const moon_texture = texture.load('/src/texture/solar_system_assets/2k_moon.jpg');
    const sun_texture = texture.load('/src/texture/solar_system_assets/2k_sun.jpg');
    const venus_texture = texture.load('/src/texture/solar_system_assets/2k_venus_surface.jpg');

    // geometry
    const geometry1 = new three.SphereGeometry(1, 32, 32);

    // buffer setting attributes


    //material
    const sun_material = new three.MeshStandardMaterial({
      map: sun_texture,
      // emissive: new three.Color(0xffff00),
      // emissiveIntensity: 0.3,
    });
    const earth_material = new three.MeshStandardMaterial({ map: earth_texture });
    const mercury_material = new three.MeshStandardMaterial({ map: mercury_texture });
    const venus_material = new three.MeshStandardMaterial({ map: venus_texture });
    const mars_material = new three.MeshStandardMaterial({ map: mars_texture });
    const moon_material = new three.MeshStandardMaterial({ map: moon_texture });

    //Mesh       
    const sun_shape = new three.Mesh(geometry1, sun_material);
    sun_shape.layers.set(1);
    //  const earth_shape = new three.Mesh(geometry1, earth_material);
    //    const moon_shape = new three.Mesh(geometry1, moon_material);
    sun_shape.scale.setScalar(5)


    // earth_shape.scale.setScalar(2)
    // moon_shape.scale.setScalar(0.3)
    // earth_shape.position.x = 10;
    //  moon_shape.position.x = 2;

    //adding more things to the scenee
    //  scene.fog = new three.Fog(0xffffff, 1, 200);
    const ambientLight = new three.AmbientLight(0xffffff, 5);
    const pointLight = new three.PointLight(0xffffff, 10);
    pointLight.position.set(1, 1, 1);

    scene.add(pointLight);
    scene.add(ambientLight);
    scene.add(sun_shape);
    //scene.add(earth_shape);


    // y and x axis of the shape 

    // const axishelper = new three.AxesHelper(2);
    // scene.add(axishelper)


    const planets = [
      {
        name: "Mercury",
        radius: 0.8,
        distance: 10,
        speed: 0.01,
        material: mercury_material,
        moons: [],
      },
      {
        name: "Venus",
        radius: 1,
        distance: 15,
        speed: 0.007,
        material: venus_material,
        moons: [],
      },
      {
        name: "Earth",
        radius: 1.3,
        distance: 20,
        speed: 0.005,
        material: earth_material,
        moons: [
          {
            name: "Moon",
            radius: 0.3,
            distance: 3,
            speed: 0.015,
          },
        ],
      },
      {
        name: "Mars",
        radius: 1,
        distance: 25,
        speed: 0.003,
        material: mars_material,
        moons: [
          {
            name: "Phobos",
            radius: 0.3,
            distance: 2,
            speed: 0.02,
          },
          {
            name: "Deimos",
            radius: 0.3,
            distance: 3,
            speed: 0.015,
            color: 0xffffff,
          },
        ],
      },
    ];


    const createPlanet = (planet: createplant_parathesis) => {
      const planetMesh = new three.Mesh(
        geometry1,
        planet.material
      )
      planetMesh.scale.setScalar(planet.radius)
      planetMesh.position.x = planet.distance
      return planetMesh
    }

    const createMoon = (moon: createmoon_parathesis) => {
      const moonMesh = new three.Mesh(
        geometry1,
        moon_material
      )
      moonMesh.scale.setScalar(moon.radius)
      moonMesh.position.x = moon.distance
      return moonMesh
    }


    const planetMeshes = planets.map((planet) => {
      const planetMesh = createPlanet(planet)

      const orbit = createOrbit(planet.distance);

      scene.add(orbit)
      scene.add(planetMesh)

      planet.moons.forEach((moon) => {
        const moonMesh = createMoon(moon)
        planetMesh.add(moonMesh)
      })
      return planetMesh
    })

    // camera
    const camera = new three.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 400);
    camera.position.set(0, 100, 25); 
    camera.layers.enable(0);
    camera.layers.enable(1)
    
    
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = false;
    controls.minDistance = 20;
    controls.maxDistance = 200;


    //Bloom (glow) effect
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new three.Vector2(window.innerWidth, window.innerHeight),
      0.4, // strength
      1,   // radius
      0.01 // threshold
    );

    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);



    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    })

    //clock three js
    // const clock = new three.Clock();
    // let previous_time = 0;

    const animate = () => {
      requestAnimationFrame(animate);

      planetMeshes.forEach((planet, planetIndex) => {
        planet.rotation.y += planets[planetIndex].speed;
        planet.position.x = Math.sin(planet.rotation.y) * planets[planetIndex].distance
        planet.position.z = Math.cos(planet.rotation.y) * planets[planetIndex].distance
        planet.children.forEach((moon, moonIndex) => {
          moon.rotation.y += planets[planetIndex].moons[moonIndex].speed
          moon.position.x = Math.sin(moon.rotation.y) * planets[planetIndex].moons[moonIndex].distance
          moon.position.z = Math.cos(moon.rotation.y) * planets[planetIndex].moons[moonIndex].distance
        })
      })


      controls.update();
      composer.render();

    };
    animate();

    return () => {
      composer.dispose();
      canvas_ref.current?.remove();
    };

  }, [])

  return (
    <canvas ref={canvas_ref}>

    </canvas>
  )
}



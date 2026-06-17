/* ============================================================
   ATELIER NOIR — Three.js Hero Effect
   Subtle floating particles with warm gold tones
   Falls back to CSS grain if WebGL unavailable
   ============================================================ */

export function initHeroEffect() {
  const container = document.querySelector('.hero__canvas');
  const grain = document.querySelector('.hero__grain');
  if (!container) return;

  // Check reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (grain) grain.classList.add('hero__grain--active');
    return;
  }

  // Check WebGL support
  try {
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
    if (!gl) throw new Error('No WebGL');
  } catch (e) {
    // Fallback to CSS grain
    if (grain) grain.classList.add('hero__grain--active');
    return;
  }

  // ── Three.js Scene ──
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    container.offsetWidth / container.offsetHeight,
    0.1,
    100
  );
  camera.position.z = 30;

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: false,
    powerPreference: 'low-power',
  });
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  // ── Particles ──
  const PARTICLE_COUNT = 800;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const opacities = new Float32Array(PARTICLE_COUNT);
  const speeds = new Float32Array(PARTICLE_COUNT);
  const sizes = new Float32Array(PARTICLE_COUNT);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 60;       // x
    positions[i * 3 + 1] = (Math.random() - 0.5) * 40;   // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30;   // z
    opacities[i] = Math.random() * 0.5 + 0.1;
    speeds[i] = Math.random() * 0.3 + 0.05;
    sizes[i] = Math.random() * 2.5 + 0.5;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aOpacity', new THREE.BufferAttribute(opacities, 1));
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

  // Shader material for warm gold particles
  const vertexShader = `
    attribute float aOpacity;
    attribute float aSize;
    varying float vOpacity;
    void main() {
      vOpacity = aOpacity;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = aSize * (20.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    varying float vOpacity;
    void main() {
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;
      float alpha = smoothstep(0.5, 0.0, dist) * vOpacity;
      // Warm gold color: #c9a96a
      gl_FragColor = vec4(0.788, 0.663, 0.416, alpha * 0.35);
    }
  `;

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // ── Subtle light orb ──
  const orbGeometry = new THREE.SphereGeometry(0.5, 8, 8);
  const orbMaterial = new THREE.MeshBasicMaterial({
    color: 0xc9a96a,
    transparent: true,
    opacity: 0.08,
  });
  const orb = new THREE.Mesh(orbGeometry, orbMaterial);
  orb.position.set(5, 2, 10);
  scene.add(orb);

  // ── Mouse interaction ──
  let mouseX = 0;
  let mouseY = 0;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  });

  // ── Animation loop ──
  let time = 0;
  let animationId;

  function animate() {
    animationId = requestAnimationFrame(animate);
    time += 0.003;

    const posArray = geometry.attributes.position.array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Gentle floating motion
      posArray[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.003 * speeds[i];
      posArray[i * 3] += Math.cos(time * 0.5 + i * 0.1) * 0.002 * speeds[i];

      // Wrap particles that drift too far
      if (posArray[i * 3 + 1] > 22) posArray[i * 3 + 1] = -22;
      if (posArray[i * 3 + 1] < -22) posArray[i * 3 + 1] = 22;
    }

    geometry.attributes.position.needsUpdate = true;

    // Subtle camera response to mouse
    camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 1.5 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    // Animate orb
    orb.position.x = 5 + Math.sin(time * 2) * 3;
    orb.position.y = 2 + Math.cos(time * 1.5) * 2;
    orb.scale.setScalar(1 + Math.sin(time * 3) * 0.2);

    renderer.render(scene, camera);
  }

  animate();

  // ── Resize handler ──
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      camera.aspect = container.offsetWidth / container.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.offsetWidth, container.offsetHeight);
    }, 200);
  });

  // ── Cleanup ──
  return () => {
    cancelAnimationFrame(animationId);
    renderer.dispose();
    geometry.dispose();
    material.dispose();
  };
}

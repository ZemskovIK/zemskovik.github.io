function initThreeJS() {
  const container = document.getElementById('threejs-container')
  if (!container) return

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 30

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  container.appendChild(renderer.domElement)

  const particlesGeometry = new THREE.BufferGeometry()
  const particleCount = 1000

  const posArray = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 100
  }

  particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(posArray, 3)
  )

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.2,
    color: 0x6e48aa,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  })

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
  scene.add(particlesMesh)

  function animate() {
    requestAnimationFrame(animate)

    particlesMesh.rotation.x += 0.0005
    particlesMesh.rotation.y += 0.0005

    renderer.render(scene, camera)
  }

  animate()

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
}

window.addEventListener('load', initThreeJS)

import * as THREE from 'three'

// Create the scene and camera
const canvas = document.querySelector("canvas")
const canvasWidth = canvas.offsetWidth
const canvasHeight = canvas.offsetHeight

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(50, canvasWidth / canvasHeight, 0.1, 1000)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({ 
    canvas, 
    antialias: true,
    alpha: true, 
    premultipliedAlpha: false 
})
renderer.setSize(canvasWidth, canvasHeight)

// Add the cube to the scene
const geometry = new THREE.BoxGeometry(5, 5, 5)
const material = new THREE.MeshBasicMaterial({ color: 0xd39bff })
const cube = new THREE.Mesh(geometry, material)
cube.rotation.set(0.5, 0.5, 0)
scene.add(cube)

camera.position.z = 50

// Change the cube's size
const sizeInput = document.getElementById("size-input")
let size = sizeInput.value

sizeInput.oninput = () => {
    size = sizeInput.value
}

function cubeSize() {
    size = sizeInput.value
}

function render() {
    requestAnimationFrame(render)
    cube.position.z = size
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    renderer.render(scene, camera)
}
render()

// Create a live background using the camera stream
const userCamera = navigator.mediaDevices.enumerateDevices()
const video = document.querySelector("video")
let videoWidth = null
let videoHeight = null

function setVideo() {
    const vidTexture = new THREE.VideoTexture(video)
    vidTexture.colorSpace = THREE.SRGBColorSpace
    const vidGeometry = new THREE.BoxGeometry(videoWidth, videoHeight, 0)
    const vidMaterial = new THREE.MeshBasicMaterial({ map: vidTexture })
    const vidDisplay = new THREE.Mesh(vidGeometry, vidMaterial)
    vidDisplay.position.z = 0
    scene.add(vidDisplay)
}

// Determine the size of the stream to make it fit the viewport
function getSize() {
    const aspectRatio = video.videoWidth / video.videoHeight
    if (canvasHeight > canvasWidth) {
        videoWidth = (canvasHeight * aspectRatio) / 15
        videoHeight = canvasHeight / 15
        setVideo()
    } else if (canvasWidth > canvasHeight) {
        videoWidth = canvasWidth / 15
        videoHeight = (canvasWidth / aspectRatio) / 15
        setVideo()
    }
}

// Create the button to use the camera
function setButton() {
    const button = document.createElement("button")
    button.insertAdjacentText("afterbegin", "Use camera")
    button.onclick = () => {
        navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }
        }).then((stream) => {
            video.srcObject = stream
            videoWidth = video.videoWidth
            videoHeight = video.videoHeight
            video.onloadedmetadata = () => {
                video.play()
                getSize()
            }
        })
    }
    const p = document.createElement("p")
    p.insertAdjacentText("afterbegin", "Or use your camera")
    const div = document.createElement("div")
    div.insertAdjacentElement("afterbegin", p)
    div.insertAdjacentElement("beforeend", button)
    document.querySelector("article").insertAdjacentElement("beforeend", div)
}

// The button is only available if the device has a camera to begin with
if (userCamera.kind = "videoinput") {
    setButton()
}

// Create a background using an image
const input = document.getElementById("image-input")

input.oninput = () => {
    const imgSource = URL.createObjectURL(input.files[0])
    const imgTexture = new THREE.TextureLoader().load(imgSource)
    imgTexture.colorSpace = THREE.SRGBColorSpace
    const imgGeometry = new THREE.BoxGeometry(canvasWidth / 10, canvasHeight / 10, 0)
    const imgMaterial = new THREE.MeshBasicMaterial({ map: imgTexture })
    const imgDisplay = new THREE.Mesh(imgGeometry, imgMaterial)
    imgDisplay.position.z = 0
    scene.add(imgDisplay)
}

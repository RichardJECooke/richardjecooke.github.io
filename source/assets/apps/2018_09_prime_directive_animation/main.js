//TODO
/*
add names to objects
add restart button
create time sequenced code



*/

//refs
//sketchfab: https://sketchfab.com/search?features=downloadable&q=tree&sort_by=-pertinence&type=models
//https://sketchfab.com/models/76d4b22511aa41829da542b01ade8698#download

//constants
const songFilename = '/assets/apps/2018_09_prime_directive_animation/2018-09 - Richard JE Cooke - Prime Directive - Version 6.mp3';
const volume = 0.5;
//scene
const canvasWidth = window.innerWidth - 0;  //const canvasWidth = 1920;
const canvasHeight = window.innerHeight - 30;  //const canvasHeight = 1080;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvasWidth /canvasHeight, 0.1, 1000 ); //FoV, aspect, near clip, far clip
const renderer = new THREE.WebGLRenderer({antialias:true});
//audio
const audioListener = new THREE.AudioListener();
const audio = new THREE.Audio(audioListener);
const audioLoader = new THREE.AudioLoader();
//shapes
let ground = null;
let bass1 = null;
let bass2 = null;
let sphere = null;
//logic
let isPlaying = true; //TODO set to false
let shouldLog = false; //enable to print out console messages for debugging

window.onload = start;

function start()
{
	createScene();
	animate();
}

function createScene()
{
	renderer.setSize(canvasWidth, canvasHeight);
	document.body.appendChild(renderer.domElement);
	camera.position.y = 20; //put camera above the ground
	camera.lookAt(new THREE.Vector3(0, 0, 0)); //point camera at center of scene
	loadAudio();
	addGround();
	addBass1()
	startTimeMs = Date.now();
	window.scene = scene; // used for debugging Three.js inspector in Chrome
}

function addGround()
{
	let geometry = new THREE.BoxGeometry(100, 1, 100);
	let material = new THREE.MeshBasicMaterial({'color': '#131'});
	ground = new THREE.Mesh(geometry, material);
	scene.add(ground);
}

function addBass1()
{
	let geometry = new THREE.BoxGeometry(1, 1, 1);
	let material = new THREE.MeshBasicMaterial({'color': '#228'});
	bass1 = new THREE.Mesh(geometry, material);
	scene.add(bass1);
	bass1.position.x  = -22;
	bass1.position.y  = 10;
	bass1.position.z  = 0;
}

function loadAudio()
{
	camera.add(audioListener);
	audioLoader.load(songFilename, function(buffer) {
		audio.setBuffer(buffer);
		audio.setLoop(false);
		audio.setVolume(volume);
	});
}

function animate()
{
	if (!isPlaying) return;
	requestAnimationFrame(animate);
	bass1.position.x += 0.1;
	camera.position.z -= 0.1;
	camera.lookAt(new THREE.Vector3(0, 0, 0)); //point camera at center of scene
	renderer.render(scene, camera);
}

function onPlayClicked()
{
	isPlaying = true;
	audio.play();
	animate();
}

function onPauseClicked()
{
	isPlaying = false;
	audio.pause();
}

function getTime() //in ms
{
	return audio.context.currentTime;
}

function log(message)
{
	if (!shouldLog) return;
	console.log(message);
}



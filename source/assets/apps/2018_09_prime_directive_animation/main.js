//TODO
/*
add names to objects
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
const camera = new THREE.PerspectiveCamera(75, canvasWidth / canvasHeight, 0.1, 1000 ); //FoV, aspect, near clip, far clip
const renderer = new THREE.WebGLRenderer({antialias:true});
//audio
let audioListener = null;
let audio = null;
let audioLoader = null;
//shapes
let ground = null;
let bass1 = null;
let bass2 = null;
let sphere = null;
//logic
let isPlaying = false;
let shouldLog = true; //enable to print out console messages for debugging

window.onload = start;

function start()
{
	createCanvas();
	createScene();
	animate();
}

function createCanvas()
{
	renderer.setSize(canvasWidth, canvasHeight);
	document.body.appendChild(renderer.domElement);
}

function createScene()
{
	camera.position.x = 0;
	camera.position.y = 50; //put camera above the ground
	camera.position.z = 0;
	camera.lookAt(new THREE.Vector3(0, 0, 0)); //point camera at center of scene
	addGround();
	addBass1()
	loadAudio();
	window.scene = scene; // used for debugging Three.js inspector in Chrome
	onPlayClicked(); //todo remove
}

function addGround()
{
	let geometry = new THREE.BoxGeometry(1000, 1, 1000);
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
	bass1.position.x  = 22;
	bass1.position.y  = 1;
	bass1.position.z  = 0;
}

function loadAudio()
{
	audioListener = new THREE.AudioListener();
	audio = new THREE.Audio(audioListener);
	audioLoader = new THREE.AudioLoader();
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
	bass1.position.x -= 0.1;
	//camera.position.z -= 0.1;
	//camera.lookAt(new THREE.Vector3(0, 0, 0)); //point camera at center of scene
	renderer.render(scene, camera);
}

function onPlayClicked()
{
	if (isPlaying) return;
	isPlaying = true;
	audio.play();
	animate();
}

function onPauseClicked()
{
	if (!isPlaying) return;
	isPlaying = false;
	audio.pause();
}

async function onRestartClicked()
{
	onPauseClicked();
	resetAnimation();
	onPlayClicked();
}

function resetAnimation()
{
	scene.remove(ground);
	scene.remove(bass1);
	scene.remove(bass2);
	scene.remove(sphere);
	camera.remove(audioListener);
	audio.context.close();
	audioListener = null;
	audio = null;
	audioLoader = null;
	createScene();
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

//await sleep(500);
// function sleep(ms)
// {
// 	return new Promise(resolve => setTimeout(resolve, ms));
// }

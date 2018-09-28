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
const listener = new THREE.AudioListener();
const song = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();
//shapes
let _bass1 = null;
let _bass2 = null;
let _sphere = null;
//logic
let isPlaying = false;

window.onload = start;

function start()
{
	createScene();
	let geometry = new THREE.BoxGeometry( 1, 1, 1 );
	let material = new THREE.MeshBasicMaterial( { 'color': '#841' } );
	_bass1 = new THREE.Mesh( geometry, material);
	scene.add(_bass1);
	camera.position.z = 10;
	animate();
}

function createScene()
{
	renderer.setSize(canvasWidth, canvasHeight);
	document.body.appendChild(renderer.domElement);
	loadAudio();

}

function loadAudio()
{
	camera.add(listener);
	audioLoader.load(songFilename, function( buffer ) {
		song.setBuffer(buffer);
		song.setLoop(false);
		song.setVolume(volume);
	});
}

function animate()
{
	if (!isPlaying) return;
	requestAnimationFrame(animate);
	_bass1.rotation.x += 0.01;
	_bass1.rotation.y += 0.02;
	_bass1.rotation.z += 0.03;
	renderer.render(scene, camera);
}

function userClickedPlay()
{
	console.log('play');
	isPlaying = true;
	song.play();
	animate();
}

function userClickedPause()
{
	console.log('pause');
	isPlaying = false;
	song.pause();
}

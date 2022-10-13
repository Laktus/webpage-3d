import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useState } from 'react';
import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { ScrollControls, Scroll, useScroll, Html } from '@react-three/drei';
import './App.css';
import { rotateAboutPoint, rotateAboutPointImmutable } from '../../utils/three-functions';
import { useSpring } from '@react-spring/three';
import { useEffect } from 'react';
import { useRef } from 'react';
import { screenDescr } from "../../utils/utils";

extend({ TextGeometry });

export default function App() {
	const [active, setActive] = useState(0);

	//This is a shared spring used to animate all other properties.
	//The idea is to animate the active property between 0 and 1, which triggers animation for the other properties.
	const { spring } = useSpring({
		spring: active,
		config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
	});

	return (
		<div className="App">
			<Canvas shadowMap>
				<ScrollControls damping={10} horizontal pages={screenDescr.length - 1}>
					<Screens/>
				</ScrollControls>
			</Canvas>
		</div>
	);
}

function Screens() {
	const data = useScroll();
	const scrollTimer = useRef();

	const animPoints = Array(screenDescr.length)
		.fill()
		.map((_,i) => i * 2 * Math.PI / screenDescr.length)

	const size = 2 * Math.PI * (screenDescr.length-1) / screenDescr.length;

	useEffect(() => {
		data.el.onscroll = () => {
			if(scrollTimer.current !== null){
				clearTimeout(scrollTimer.current);
			}
	
			scrollTimer.current = setTimeout(() => {
				let closest;
				let closestPoint;
				animPoints.forEach( animPoint => {
					const offsetAngle = size * data.offset;
					const diff = Math.abs(animPoint - offsetAngle);
						
					if(closest == null || diff < closest){
						closest = diff;
						closestPoint = animPoint;
					}
				})
	
				data.el.scrollLeft = closestPoint / size * (data.el.scrollWidth - data.el.clientWidth);
			}, 50);
		}
	}, [animPoints, data, size])

	useFrame(state => {
		rotateAboutPointImmutable(
			state.camera,
			new THREE.Vector3(0,0,0),
			new THREE.Vector3(0,1,0),
			data.offset * size,
			false,
			new THREE.Vector3(0,0,5),
			new THREE.Vector3(0,0,0)
		)
	})

	return screenDescr.map((screen, i) => <Screen 
			key={i} 
			index={i} 
			underlyingHtml={screen.underlyingHtml}
			{...screen}
		/>
	)
}

function Screen(props){
	const groupRef = useRef();
	//TODO: Move this to different .js
	const SCREEN_SCALE = 0.075;

	useEffect(() => {
		rotateAboutPointImmutable(
			groupRef.current,
			props.anchor,
			props.rotation,
			(2 * Math.PI / screenDescr.length) * props.index,
			true,
			new THREE.Vector3(0,0,3),
			new THREE.Vector3(0,0,0)
		)
	});

	return (
		<group ref={groupRef} scale={SCREEN_SCALE}>
			<Html transform>
				{props.component}
			</Html>
		</group>
	)
}
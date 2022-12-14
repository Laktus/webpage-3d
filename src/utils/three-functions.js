import * as THREE from "three";
import _ from "lodash";

export function rotateAboutPointImmutable(obj, point, axis, theta, pointIsWorld, initialPos, initialRot){
    const position = _.cloneDeep(initialPos);

    pointIsWorld = (pointIsWorld === undefined)? false : pointIsWorld;
  
    if(pointIsWorld){
        obj.parent.localToWorld(obj.position); // compensate for world coordinate
    }
  
    position.sub(point); // remove the offset
    position.applyAxisAngle(axis, theta); // rotate the POSITION
    position.add(point); // re-add the offset
  
    if(pointIsWorld){
        obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
    }
  
    obj.position.set(position.x, position.y, position.z);
    
    obj.setRotationFromAxisAngle(axis, theta);
    obj.rotateX(initialRot.x);
    obj.rotateY(initialRot.y);
    obj.rotateZ(initialRot.z);
}

export function rotateAboutPoint(obj, point, axis, theta, pointIsWorld) {
    pointIsWorld = (pointIsWorld === undefined)? false : pointIsWorld;
  
    if(pointIsWorld){
        obj.parent.localToWorld(obj.position); // compensate for world coordinate
    }
  
    obj.position.sub(point); // remove the offset
    obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
    obj.position.add(point); // re-add the offset
    console.log(obj.position);
  
    if(pointIsWorld){
        obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
    }
  
    obj.rotateOnAxis(axis, theta); // rotate the OBJECT
}

export function fitCameraToObject( camera, object, offset, controls ) {
    offset = offset || 1.25;

    const boundingBox = new THREE.Box3();

    // get bounding box of object - this will be used to setup controls and camera
    boundingBox.setFromObject( object );

    const center = boundingBox.getCenter();

    const size = boundingBox.getSize();

    // get the max side of the bounding box (fits to width OR height as needed )
    const maxDim = Math.max( size.x, size.y, size.z );
    const fov = camera.fov * ( Math.PI / 180 );
    let cameraZ = Math.abs( maxDim / 4 * Math.tan( fov * 2 ) );

    cameraZ *= offset; // zoom out a little so that objects don't fill the screen

    camera.position.z = cameraZ;

    const minZ = boundingBox.min.z;
    const cameraToFarEdge = ( minZ < 0 ) ? -minZ + cameraZ : cameraZ - minZ;

    camera.far = cameraToFarEdge * 3;
    camera.updateProjectionMatrix();

    if ( controls ) {

      // set camera to rotate around center of loaded object
      controls.target = center;

      // prevent camera from zooming out far enough to create far plane cutoff
      controls.maxDistance = cameraToFarEdge * 2;

      controls.saveState();

    } else {
        camera.lookAt( center )
   }
}
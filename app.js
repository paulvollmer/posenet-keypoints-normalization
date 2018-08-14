import * as posenet from '@tensorflow-models/posenet';
import {resizePose, normalizePose, keypointsOneDimensional} from './src/index';
import {renderToCanvas} from 'posenet-keypoints-viewer'

// settings
const imageScaleFactor = 0.5;
const outputStride = 16;
const flipHorizontal = false;

function main() {
  const imageElement = document.getElementById('input')
  posenet.load()
  .then((net) => {
    return net.estimateSinglePose(imageElement, imageScaleFactor, flipHorizontal, outputStride)
  })
  .then((pose) => {
    document.getElementById('data-original').innerHTML = JSON.stringify(pose, '', '  ');
    renderToCanvas('visualize', pose.keypoints, 500, 500, 3, 1, '#222')

    const boundingBox = posenet.getBoundingBox(pose.keypoints);
    // document.getElementById('data-bounding-box').innerHTML = JSON.stringify(boundingBox, '', '  ');

    const poseResized = resizePose(boundingBox, pose.keypoints)
    document.getElementById('data-resized').innerHTML = JSON.stringify(poseResized, '', '  ');

    const poseNormalized = normalizePose(posenet.getBoundingBox(poseResized), poseResized)
    document.getElementById('data-normalized').innerHTML = JSON.stringify(poseNormalized, '', '  ');

    const poseOneDimensionalArray = keypointsOneDimensional(poseNormalized)
    document.getElementById('data-one-dimensional').innerHTML = JSON.stringify(poseOneDimensionalArray, '', '  ');
  })
}



window.onload = function() {
  main()
}

import * as posenet from '@tensorflow-models/posenet';
import {resizePose, normalizePose} from './src/index';
import {drawPose} from 'posenet-keypoints-viewer'

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

    const boundingBox = posenet.getBoundingBox(pose.keypoints);
    document.getElementById('data-bounding-box').innerHTML = JSON.stringify(boundingBox, '', '  ');

    const poseResized = resizePose(boundingBox, pose.keypoints)
    document.getElementById('data-resized').innerHTML = JSON.stringify(poseResized, '', '  ');

    const poseNormalized = normalizePose(poseResized)
    document.getElementById('data-normalized').innerHTML = JSON.stringify(poseNormalized, '', '  ');

    // const canvas = document.getElementById('visualize');
    // let ctx = canvas.getContext('2d');
    // // draw the background
    // ctx.fillStyle = '#ccc';
    // ctx.fillRect(0, 0, 500, 500);
    // // draw the pose
    //
    // console.log(pose);
    // drawPose(ctx, pose.keypoints);

  })
}

window.onload = function() {
  main()
}

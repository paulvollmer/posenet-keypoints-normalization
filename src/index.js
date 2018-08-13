import * as posenet from '@tensorflow-models/posenet';

/**
 * resize a pose to the given bounding box
 *
 * @param {Object} bBox - The posenet boundingbox data
 * @param {Object} keypoints - The posenet keypoints
 * @return {Object}
 */
export function resizePose(bBox, keypoints) {
  let newKeypoints = keypoints;
  for (let i = 0; i < newKeypoints.length; i++) {
    newKeypoints[i].position.x = newKeypoints[i].position.x -bBox.minX;
    newKeypoints[i].position.y = newKeypoints[i].position.y -bBox.minY;
  }
  return keypoints;
}

/**
 * normalize pose
 * based on https://medium.com/tensorflow/move-mirror-an-ai-experiment-with-pose-estimation-in-the-browser-using-tensorflow-js-2f7b769f9b23
 * @param {Object} keypoints - The posenet keypoints
 * @return {Object}
 */
export function normalizePose(keypoints) {
  const boundingBox = posenet.getBoundingBox(keypoints);
  let newKeypoints = keypoints;
  for (let i = 0; i < newKeypoints.length; i++) {
    newKeypoints[i].position.x = l2normalize(newKeypoints[i].position.x,
      boundingBox.maxX, boundingBox.minX);
    newKeypoints[i].position.y = l2normalize(newKeypoints[i].position.y,
      boundingBox.maxY, boundingBox.minY);
  }
  return newKeypoints;
}

/**
 * normalize the given value
 * @param {number} val - ...
 * @param {number} max - ...
 * @param {number} min - ...
 * @return {Object}
 */
export function l2normalize(val, max, min) {
  return (val - min) / (max - min);
}

function strToVector(str) {
  const strArr = str.split(' ');
  const x = parseInt(strArr[0], 10);
  const y = parseInt(strArr[1], 10);
  const z = parseInt(strArr[2], 10);
  return new THREE.Vector3(x, y, z);
}

const FACES = {
  front: {
    position: '0 0 -500',
    vert: '-y',
    horiz: 'x'
  },
  left: {
    position: '-500 0 0',
    vert: '-y',
    horiz: '-z'
  },
  back: {
    position: '0 0 500',
    vert: '-y',
    horiz: '-x'
  },
  right: {
    position: '500 0 0',
    vert: '-y',
    horiz: 'z'
  },
  top: {
    position: '0 500 0',
    vert: '-z',
    horiz: 'x'
  },
  bottom: {
    position: '0 -500 0',
    vert: 'z',
    horiz: 'x'
  }
};

/**
 * [calculateSegmentCorners description]
 * @param  Vec3   faceCenterPos      [description]
 * @param  String horizDir             [description]
 * @param  String vertDir             [description]
 * @param  Integer FACE_LENGTH        [description]
 * @param  Integer horizSegments   [description]
 * @param  Integer vertSegments [description]
 * @param  Integer segHorizIndex        [description]
 * @param  Integer segVertIndex        [description]
 * @return {[type]}                    [description]
 */
function calculateSegmentCorners(
  faceCenterPos,
  horizDir,
  vertDir,
  FACE_LENGTH,
  horizSegments,
  vertSegments,
  segHorizIndex,
  segVertIndex
) {
  // row position

  const cornerPosition = faceCenterPos.clone();

  const segmentWidth = FACE_LENGTH / horizSegments;
  const segmentHeight = FACE_LENGTH / vertSegments;
  const NEG_DIR_SIGN = '-';

  const VERT_DIRECTION_MULTIPLIER = vertDir.indexOf(NEG_DIR_SIGN) >= 0 ? -1 : 1;
  const HORIZ_DIRECTION_MULTIPLIER = horizDir.indexOf(NEG_DIR_SIGN) >= 0 ? -1 : 1;

  const vertAxis = vertDir.replace(NEG_DIR_SIGN, '');
  const horizAxis = horizDir.replace(NEG_DIR_SIGN, '');

  const PARSEINT_RADIX = 10;

  const x =
    parseInt(faceCenterPos[horizAxis], PARSEINT_RADIX) -
    parseInt((HORIZ_DIRECTION_MULTIPLIER * FACE_LENGTH) / 2, PARSEINT_RADIX) +
    parseInt((segHorizIndex - 0.5) * HORIZ_DIRECTION_MULTIPLIER * segmentWidth, PARSEINT_RADIX);

  const y =
    parseInt(faceCenterPos[vertAxis], PARSEINT_RADIX) -
    parseInt((VERT_DIRECTION_MULTIPLIER * FACE_LENGTH) / 2, PARSEINT_RADIX) +
    parseInt((segVertIndex - 0.5) * VERT_DIRECTION_MULTIPLIER * segmentHeight, PARSEINT_RADIX);

  const centerVecPos = cornerPosition.clone();
  centerVecPos[horizAxis] = x;
  centerVecPos[vertAxis] = y;
  // calculating corner positions

  //
  //  ________________
  // |1              2|    ----------> (+x)
  // |                |   |
  // |     center     |   |
  // |                |   |
  // |3______________4|   v (+y)
  //
  //
  const corner1X = x + VERT_DIRECTION_MULTIPLIER * (segmentWidth / 2);
  const corner1Y = y + HORIZ_DIRECTION_MULTIPLIER * (segmentHeight / 2);

  const corner1VecPos = cornerPosition.clone();
  corner1VecPos[horizAxis] = corner1X;
  corner1VecPos[vertAxis] = corner1Y;

  const corner2X = x - VERT_DIRECTION_MULTIPLIER * (segmentWidth / 2);
  const corner2Y = y + HORIZ_DIRECTION_MULTIPLIER * (segmentHeight / 2);

  const corner2VecPos = cornerPosition.clone();
  corner2VecPos[horizAxis] = corner2X;
  corner2VecPos[vertAxis] = corner2Y;

  const corner3X = x + VERT_DIRECTION_MULTIPLIER * (segmentWidth / 2);
  const corner3Y = y - HORIZ_DIRECTION_MULTIPLIER * (segmentHeight / 2);

  const corner3VecPos = cornerPosition.clone();
  corner3VecPos[horizAxis] = corner3X;
  corner3VecPos[vertAxis] = corner3Y;

  const corner4X = x - VERT_DIRECTION_MULTIPLIER * (segmentWidth / 2);
  const corner4Y = y - HORIZ_DIRECTION_MULTIPLIER * (segmentHeight / 2);

  const corner4VecPos = cornerPosition.clone();
  corner4VecPos[horizAxis] = corner4X;
  corner4VecPos[vertAxis] = corner4Y;

  return {
    corners: [corner1VecPos, corner2VecPos, corner3VecPos, corner4VecPos],
    center: centerVecPos
  };
}

// faceId look up table temporary patch because
// of the texxture-mapping/gaze mapping mismatch
function faceIdLUTMonkeyPatch(horizSegments, vertSegments) {
  const gazeMapping = [];
  const uvMapping = [];

  for (let i = 1; i <= horizSegments; i += 1) {
    for (let j = 1; j <= vertSegments; j += 1) {
      gazeMapping.push(`${i}${j}`);
    }
  }

  for (let i = 1; i <= horizSegments; i += 1) {
    for (let j = vertSegments; j >= 1; j -= 1) {
      uvMapping.push(`${j}${i}`);
    }
  }

  const result = {};
  gazeMapping.forEach((key, i) => {
    result[key] = uvMapping[i];
  });
  return result;
}

/**
 * [prepareObjectDataPoints description]
 * @param  Integer rows [description]
 * @param  Integer cols [description]
 * @return {[type]}      [description]
 */
function prepareCornerPoints(horizSegments, vertSegments) {
  const faceSegmentObj = {};
  const FACE_LENGTH = 1000;

  const faceIdGazeUVMappingObj = faceIdLUTMonkeyPatch(horizSegments, vertSegments);

  Object.keys(FACES).forEach(faceName => {
    for (let horSeg = 1; horSeg <= horizSegments; horSeg += 1) {
      for (let verSeg = 1; verSeg <= vertSegments; verSeg += 1) {
        const facePos = faceIdGazeUVMappingObj[`${verSeg}${horSeg}`];
        const faceId = `${faceName}#${facePos}`;
        const horizDir = FACES[faceName].horiz;
        const vertDir = FACES[faceName].vert;

        const faceVec3Position = strToVector(FACES[faceName].position);

        const faceSegmentCorners = calculateSegmentCorners(
          faceVec3Position,
          horizDir,
          vertDir,
          FACE_LENGTH,
          horizSegments,
          vertSegments,
          horSeg,
          verSeg
        );

        // for

        // faceVec3Position[faceSegmentCorners.rowaxis.name] = faceSegmentCorners.rowaxis.value;

        // const faceSegmentCorners = calculate()

        faceSegmentObj[faceId] = {};
        faceSegmentObj[
          faceId
        ].transform = `cm_${faceName},segpat_${horizSegments}${vertSegments},segid_${facePos},w_2048,h_2048`;
        faceSegmentObj[faceId].points = faceSegmentCorners.corners;
        faceSegmentObj[faceId].center = faceSegmentCorners.center;
      }
    }
  });
  return faceSegmentObj;
}

function generateCornerId(point) {
  return `${point.x}${point.y}${point.z}`;
}

function mapCornerPointToConnectedSegments(cornerPoints) {
  const mappedObj = {};

  Object.keys(cornerPoints).forEach(faceId => {
    const faceCornerPoints = cornerPoints[faceId].points;
    faceCornerPoints.forEach(point => {
      const cornerId = generateCornerId(point);

      if (!mappedObj[cornerId]) {
        mappedObj[cornerId] = {
          position: point,
          faces: [faceId],
          facesloaded: 0
        };
      } else {
        mappedObj[cornerId].faces.push(faceId);
      }
    });
  });

  return mappedObj;
}

export { prepareCornerPoints, mapCornerPointToConnectedSegments };

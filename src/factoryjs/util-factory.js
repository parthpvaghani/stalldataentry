/* eslint-disable */
/* eslint-disable no-unused-vars */
// import config from '../../common/constants/constants';
import {
  config
} from 'react-transition-group';
import BaseUrl from '../common/utils/base-urls';
import firebase from '../firebase';
// import mrc from '../../common/network/melzo-rest-client';

function getProjectIndexUsingProjectId(projects, projectid) {
  return projects.map((x) => x._id).indexOf(projectid);
}

function getProjectUsingProjectId(projects, projectid) {
  return projects[getProjectIndexUsingProjectId(projects, projectid)];
}

function getSceneIndex(scenes, sceneId) {
  return scenes.map((x) => x.sceneid).indexOf(sceneId);
}

function getGridIndex(grids, gridId) {
  return grids.map((x) => x._id).indexOf(gridId);
}

function getMenu3dIndex(menu3ds, menu3dId) {
  return menu3ds.map((x) => x._id).indexOf(menu3dId);
}

function getMenu3dCellIndex(menu3dCells, menu3dCellId) {
  return menu3dCells.map((x) => x._id).indexOf(menu3dCellId);
}

function getGridCellIndex(gridCells, gridCellId) {
  return gridCells.map((x) => x._id).indexOf(gridCellId);
}

function getCarouselIndex(carousels, carouselId) {
  return carousels.map((x) => x._id).indexOf(carouselId);
}

function getCarouselItemIndex(carouselItems, carouselItemId) {
  return carouselItems.map((x) => x._id).indexOf(carouselItemId);
}

function getSceneUsingSceneId(scenes, sceneId) {
  return scenes[getSceneIndex(scenes, sceneId)];
}

function getSceneUtils(scenes, sceneId) {
  return scenes[getSceneIndex(scenes, sceneId)];
}

function getGrid(grids, gridId) {
  return grids[getGridIndex(grids, gridId)];
}

function getGridCell(gridCells, gridCellId) {
  return gridCells[getGridCellIndex(gridCells, gridCellId)];
}

function getMenu3d(menu3ds, menu3dId) {
  return menu3ds[getMenu3dIndex(menu3ds, menu3dId)];
}

function getMenu3dCell(menu3dCells, menu3dCellId) {
  return menu3dCells[getMenu3dCellIndex(menu3dCells, menu3dCellId)];
}

function getCarousel(carousels, carouselId) {
  return carousels[getCarouselIndex(carousels, carouselId)];
}

function getCarouselItem(carouselItems, carouselItemId) {
  return carouselItems[getCarouselItemIndex(carouselItems, carouselItemId)];
}

// ***** Widget utils
function createAnimDomElement(attribute, from, to, dur, fill, begin) {
  const anim = document.createElement('a-animation');
  anim.setAttribute("attribute", attribute);
  anim.setAttribute("from", from);
  anim.setAttribute("to", to);
  anim.setAttribute("dur", dur);
  anim.setAttribute("fill", fill);
  anim.setAttribute("begin", begin);
  return anim;
}

// ***** Button utils
function getButtonIndexUsingIds(scenes, sceneId, btnId) {
  return getSceneUsingSceneId(scenes, sceneId).switchbuttons.map((x) => x._id).indexOf(btnId);
}

function getButtonUsingIds(scenes, sceneId, btnId) {
  return getSceneUsingSceneId(scenes, sceneId).switchbuttons[getButtonIndexUsingIds(scenes, sceneId, btnId)];
}

// ***** Image utils
function getImageIndexUsingIds(scenes, sceneId, imgId) {
  return getSceneUsingSceneId(scenes, sceneId).images.map((x) => x._id).indexOf(imgId);
}

function getImageUsingIds(scenes, sceneId, imgId) {
  return getSceneUsingSceneId(scenes, sceneId).images[getImageIndexUsingIds(scenes, sceneId, imgId)];
}
// ***** Image 360 View utils
function getImage360ViewIndexUsingIds(scenes, sceneId, imgId) {
  return getSceneUsingSceneId(scenes, sceneId).images360view.map((x) => x._id).indexOf(imgId);
}

function getImage360ViewUsingIds(scenes, sceneId, imgId) {
  return getSceneUsingSceneId(scenes, sceneId).images360view[getImage360ViewIndexUsingIds(scenes, sceneId, imgId)];
}

// ***** GIF utils
function getGifIndexUsingIds(scenes, sceneId, gifId) {
  return getSceneUsingSceneId(scenes, sceneId).gifs.map((x) => x._id).indexOf(gifId);
}

function getGifUsingIds(scenes, sceneId, gifId) {
  return getSceneUsingSceneId(scenes, sceneId).gifs[getGifIndexUsingIds(scenes, sceneId, gifId)];
}

// ***** Sound utils
function getSoundIndexUsingIds(scenes, sceneId, soundid) {
  return getSceneUsingSceneId(scenes, sceneId).sounds.map((x) => x._id).indexOf(soundid);
}

function getSoundUsingIds(scenes, sceneId, soundid) {
  return getSceneUsingSceneId(scenes, sceneId).sounds[getSoundIndexUsingIds(scenes, sceneId, soundid)];
}

// ***** ImagePopup utils
function getImagePopupIndexUsingIds(scenes, sceneId, imgPopupId) {
  return getSceneUsingSceneId(scenes, sceneId).imagepopups.map((x) => x._id).indexOf(imgPopupId);
}

function getImagePopupUsingIds(scenes, sceneId, imgPopupId) {
  return getSceneUsingSceneId(scenes, sceneId).imagepopups[getImagePopupIndexUsingIds(scenes, sceneId, imgPopupId)];
}

// ***** AudioPA utils
function getAudioPAIndexUsingIds(scenes, sceneId, audioPAId) {
  return getSceneUsingSceneId(scenes, sceneId).audiopa.map((x) => x._id).indexOf(audioPAId);
}

function getAudioPAUsingIds(scenes, sceneId, audioPAId) {
  return getSceneUsingSceneId(scenes, sceneId).audiopa[getAudioPAIndexUsingIds(scenes, sceneId, audioPAId)];
}

// ***** Popup Utils
function getPopupIndexUsingIds(scenes, sceneId, popupId) {
  return getSceneUsingSceneId(scenes, sceneId).popups.map((x) => x._id).indexOf(popupId);
}

function getPopupUsingIds(scenes, sceneId, popupId) {
  return getSceneUsingSceneId(scenes, sceneId).popups[getPopupIndexUsingIds(scenes, sceneId, popupId)];
}

// ***** Video Utils
function getVideoIndexUsingIds(scenes, sceneId, videoId) {
  return getSceneUsingSceneId(scenes, sceneId).videos.map((x) => x._id).indexOf(videoId);
}

function getVideoUsingIds(scenes, sceneId, videoId) {
  return getSceneUsingSceneId(scenes, sceneId).videos[getVideoIndexUsingIds(scenes, sceneId, videoId)];
}

// ***** Carousel Utils
function getCarouselIndexUsingIds(scenes, sceneId, carouselId) {
  return getSceneUsingSceneId(scenes, sceneId).carousels.map((x) => x._id).indexOf(carouselId);
}

function getCarouselUsingIds(scenes, sceneId, carouselId) {
  return getSceneUsingSceneId(scenes, sceneId).carousels[getCarouselIndexUsingIds(scenes, sceneId, carouselId)];
}

// ***** Fixed Text Utils
function getFixedTextIndexUsingIds(scenes, sceneId, fixedTextId) {
  return getSceneUsingSceneId(scenes, sceneId).fixedtextarray.map((x) => x._id).indexOf(fixedTextId);
}

function getFixedTextUsingIds(scenes, sceneId, fixedTextId) {
  return getSceneUsingSceneId(scenes, sceneId).fixedtextarray[getFixedTextIndexUsingIds(scenes, sceneId, fixedTextId)];
}

// ***** Grid Plane Utils
function getGridPlaneIndexUsingIds(scenes, sceneId, gridPlaneId) {
  return getSceneUsingSceneId(scenes, sceneId).grids.map((x) => x._id).indexOf(gridPlaneId);
}

function getGridPlaneUsingIds(scenes, sceneId, gridPlaneId) {
  return getSceneUsingSceneId(scenes, sceneId).grids[getGridPlaneIndexUsingIds(scenes, sceneId, gridPlaneId)];
}

// ***** gltfModel utils
function getGltfModelIndexUsingIds(scenes, sceneId, gltfModelId) {
  return getSceneUsingSceneId(scenes, sceneId).gltfmodels.map((x) => x._id).indexOf(gltfModelId);
}

function getGltfModelUsingIds(scenes, sceneId, gltfModelId) {
  console.log(getSceneUsingSceneId(scenes, sceneId));
  return getSceneUsingSceneId(scenes, sceneId).gltfmodels[getGltfModelIndexUsingIds(scenes, sceneId, gltfModelId)];
}

// ---------\/ navMenuCell \/---------

function getNavMenuCellIndexUsingIds(navMenuCells, navMenuCellId) {
  return navMenuCells.map((x) => x._id).indexOf(navMenuCellId);
}

function getMaxModifiedPosIndex(cells) {
  if (cells.length === 0)
    return null;
  return Math.max(Math, cells.map((cell) => cell.modifiedPosIndex));
}

function getMinModifiedPosIndex(cells) {
  if (cells.length === 0)
    return null;
  return Math.min(Math, cells.map((cell) => cell.modifiedPosIndex));
}

// ---------/\ navMenuCell /\---------

function getDocumentIndexUsingIds(scenes, sceneId, documentId) {
  return getSceneUsingSceneId(scenes, sceneId).documents.map((x) => x._id).indexOf(documentId);
}

function getDocumentUsingIds(scenes, sceneId, documentId) {
  return getSceneUsingSceneId(scenes, sceneId).documents[getDocumentIndexUsingIds(scenes, sceneId, documentId)];
}

function sphericalCoordinates(x, y, z) {
  const r = Math.sqrt((x ** 2) + (y ** 2) + (z ** 2));
  const xy = Math.sqrt((x ** 2) + (y ** 2));

  const theta = Math.acos(y / r) * 180 / Math.PI;
  const fi = Math.acos(x / xy) * 180 / Math.PI;

  return {
    azimuth: theta,
    elevation: fi
  };
}

function getReticlePosition(depth) {
  let thisDepth = depth;
  if (!depth) thisDepth = 10;
  let myVec;
  if ('#camera') {
    const cameraEl = document.querySelector('#camera');
    const obj = cameraEl.object3D;
    const camPositionVec = new THREE.Vector3(obj.position.x, obj.position.y, obj.position.z);
    myVec = new THREE.Vector3(0, 0, -1 * thisDepth);
    myVec.addVectors(myVec, camPositionVec);

    myVec.applyAxisAngle(new THREE.Vector3(0, 0, 1), obj.rotation._z);
    myVec.applyAxisAngle(new THREE.Vector3(1, 0, 0), obj.rotation._x);
    myVec.applyAxisAngle(new THREE.Vector3(0, 1, 0), obj.rotation._y); // Order of rotation matter, here it is YXZ
    return myVec.x + " " + myVec.y + " " + myVec.z;
  }
  return null;
}

function getReticlePositionObj(depth) {
  let thisDepth = depth;
  if (!depth) thisDepth = 10;
  let myVec;
  if ('#camera') {
    const cameraEl = document.querySelector('#camera');
    const obj = cameraEl.object3D;
    const camPositionVec = new THREE.Vector3(obj.position.x, obj.position.y, obj.position.z);
    myVec = new THREE.Vector3(0, 0, -1 * thisDepth);
    myVec.addVectors(myVec, camPositionVec);
    myVec.applyAxisAngle(new THREE.Vector3(0, 0, 1), obj.rotation._z);
    myVec.applyAxisAngle(new THREE.Vector3(1, 0, 0), obj.rotation._x);
    myVec.applyAxisAngle(new THREE.Vector3(0, 1, 0), obj.rotation._y); // Order of rotation matter, here it is YXZ
    return myVec;
  }
  return null;
}

function changePositionDepth(depth, position) {
  // updates position string according to depth.
  const positionVertices = position.split(" ");
  const posVec = new THREE.Vector3(positionVertices[0], positionVertices[1], positionVertices[2]);
  const normalVec = posVec.normalize();
  // Returns position String.
  return normalVec.x * depth + " " + normalVec.y * depth + " " + normalVec.z * depth;
}

function changePositionDepthObj(depth, position) {
  // Updates position object according to depth.
  const posVec = new THREE.Vector3(position.x, position.y, position.z);
  const normalVec = posVec.normalize();
  // Returns position Object.
  return normalVec.multiplyScalar(depth);
}

function logReticlePosOnFirebase(imgSrc, sceneid, curReticlePos) {
  const r = Math.sqrt((curReticlePos.x ** 2) + (curReticlePos.y ** 2) + (curReticlePos.z ** 2));

  const xz = Math.sqrt((curReticlePos.x ** 2) + (curReticlePos.z ** 2));

  const e = (Math.acos(curReticlePos.y / r) * 180) / (Math.PI);
  let a = (Math.acos(curReticlePos.x / xz) * 180) / (Math.PI);
  if (curReticlePos.z > 0) {
    a = 360 - a;
  }
  // const newImg = new Image();
  // // CHECK : this operation makes another network request for image ***************************
  // newImg.src = imgSrc;
  // newImg.onload () {
  //   const imgHeight = newImg.height;
  //   const imgWidth = newImg.width;
  //   const imgPosX = imgWidth - (a / 360) * imgWidth;
  //   const imgPosY = (e / 180) * imgHeight;
  //   //TODO: Heatmap Disalbe/Enable from project settings.
  //   // firebase.database().ref("heat-map-data/" + sceneid + '/').push([imgPosX, imgPosY]);
  // };
}


function getFileExtension(filename) {
  const re = /(?:\.([^.]+))?$/;
  return re.exec(filename)[1];
}


function getCameraOrientation() {
  if (('#camera')) {
    const dir = {};
    const cameraEl = document.querySelector('#camera');
    const obj = cameraEl.object3D;
    dir.z = obj.rotation._z;
    dir.x = obj.rotation._x;
    dir.y = obj.rotation._y;
    return dir;
  }
  return null;
}

function getPosVectorFromMagnitudeAndDirection(magnitude, direction) {
  const posVec = new THREE.Vector3(0, 0, -1 * magnitude);
  posVec.applyAxisAngle(new THREE.Vector3(0, 0, 1), direction.z);
  posVec.applyAxisAngle(new THREE.Vector3(1, 0, 0), direction.x);
  posVec.applyAxisAngle(new THREE.Vector3(0, 1, 0), direction.y);
  return posVec.x + " " + posVec.y + " " + posVec.z;
}

function detectmob() {
  if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
    return true;
  }
  return false;
}

function detectGyroScope() {
  // var createGyroModeButton = function(event) {
  //   if (event.rotationRate.alpha || event.rotationRate.beta || event.rotationRate.gamma) {
  //     // $rootScope.hasGyroscope = true;
  //   }
  // }
  // window.addEventListener("devicemotion", createGyroModeButton);
};


function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return String(s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4());
}

function getThumbnailUrl(url, width, height, resType) {
  let thisUrl = url;
  if (!url) {
    return "";
  }

  let widthKey;
  if (width < 1) {
    widthKey = 'wp_' + width;
  } else {
    widthKey = 'w_' + width;
  }

  let heightKey;
  if (width < 1) {
    heightKey = 'hp_' + height;
  } else {
    heightKey = 'h_' + height;
  }

  if ((resType === 'video') || resType === "stream") {
    if (thisUrl.endsWith('.m3u8')) {
      return 'images/fallback-project-streaming.png';
    };

    const ext = thisUrl.split('.').pop();
    thisUrl = thisUrl.replace(ext, 'png');
  }

  if (resType === 'widgetgltfmodel') {
    thisUrl = BaseUrl.baseUrlModels + thisUrl;
  } else {
    thisUrl = BaseUrl.images + "smis-transform/" + widthKey + "," + heightKey + "/" + thisUrl;
  }

  if (resType === 'bgImage') {
    // thisUrl = filter('cmface')(thisUrl, 'front');
    // thisUrl = thisUrl.filter((x) => x === 'front');
  }

  if (resType === 'image') {
    // keep url as it is
  }
  return thisUrl;
}


function objToArray(obj) {
  return Object.keys(obj).map((key) => obj[key]);
}

function getUserToken() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // user is signed in
        resolve(user.getIdToken(false));
      } else {
        // anonymous user, proceed with token as null
        resolve(null);
      }
    })
  });
}

function getUserUid() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // user is signed in
        resolve(user.uid);
      } else {
        // anonymous user, proceed with token as null
        resolve(null);
      }
    })
  });
}

function getUserEmailId() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // user is signed in
        resolve(user.email);
      } else {
        // anonymous user, proceed with token as null
        resolve(null);
      }
    })
  });
}

function getResId(prefix, resource) {

  let getUrl;
  let url;
  let widgetId;
  if(prefix==='carousel'){
    getUrl = {
      'image2d': resource.src,
      'sound': resource.src,
      'video2d': resource.src,
      'video360': resource.bgimage,
      'gridCell': resource.src,
      'menu3dCell': resource.src,
      'imagepopup': resource.src,
      'gltfmodel': resource.src,
      'carousel': resource._id
    };
    url = getUrl[prefix];
    widgetId = resource._id;
  }
  else{
  getUrl = {
    'image2d': resource.src,
    'sound': resource.src,
    'video2d': resource.src,
    'video360': resource.bgimage,
    'gridCell': resource.src,
    'menu3dCell': resource.src,
    'imagepopup': resource.src,
    'gltfmodel': resource.src,
    'carousel': resource.id
  };
  url = getUrl[prefix];
  widgetId = resource.id;
}


  if (url && widgetId) {
    const transformed = url.replace(/[^a-zA-Z0-9]/g, '');
    const ret = prefix + widgetId + transformed.substr(transformed.length - 40);
    return ret;
  }
  return null;
}


const getResType = {
  'switchbutton': null,
  'widgetfixedtext': null,
  'widgetgrid': null,
  'widgetcarousel': null,
  'widget360view': 'image',
  'widgetimage': 'image',
  'widgetgif': 'image',
  'widgetsound': 'sound',
  'widgetvideo': 'video',
  'image360': 'image',
  'video360': 'video',
  'widgetdocument': 'document',
  'widgetgltfmodel': 'model',
  'widgetgridcell': 'image',
  'navMenuCell': 'image',
  'widgetimagepopup': 'image',
  'widgetmenu3dcell': 'image',
  'widgetmenu3dhomecell': 'image'
}

function getLocation() {
  // /* 
  // @Doc
  // Successfull json response structure
  // 'response.data'
  // {
  // "ip": "",
  // "city": "",
  // "region": "",
  // "country": "",
  // "loc": "",
  // "org": "",
  // "postal": ""
  // }
  // */

  // return $q(function (resolve, reject) {

  //   $http.get('https://ipinfo.io/json').then(function (response) {
  //     resolve(response.data);
  //   }, function (err) {
  //     reject();
  //   });
  // });
}

function getWindowDimensions() {
  // return an obj containing window inner
  // height and width (used in proj html file)
  return {
    'width': window.innerWidth,
    'height': window.innerHeight
  }
}

function getVideoDashUrl(url) {
  const ext = url.split('.').pop();
  this.url = url.replace('.' + ext, "/index.mpd");
  this.url = config.baseUrlDash() + url;
  return url;
}

function getImageArtUrl(url, art) {
  if (!art || (art === '')) {
    return url;
  }
  this.url = url || '';
  return "https://res.cloudinary.com/smis/image/fetch/e_art:" + art + '/' + url;
}

function broadcast(elem, type, data) {
  const els = elem.querySelectorAll('[broadcast]');
  for (let i = 0; i < els.length; i + 1) {
    els[i].emit(type, data, false);
  }
}

function nestedPropExists(obj, ...args) {
  // const args = Array.prototype.slice.call(arguments, 1);

  for (let i = 0; i < args.length; i + 1) {
    if (!obj || !obj.hasOwnProperty.call(args[i])) {
      return false;
    }
    this.obj = obj[args[i]];
  }
  return true;
}

/* @Doc
 * notifType: 
 * "primary", "info", "success", "warning", "error"
 */
function showNotification(notifType, notifMessage) {
  Notification({
    message: notifMessage
  }, notifType);
}

function isChrome() {
  const isChromium = window.chrome;
  const winNav = window.navigator;
  const vendorName = winNav.vendor;
  const isOpera = winNav.userAgent.indexOf("OPR") > -1;
  const isIEedge = winNav.userAgent.indexOf("Edge") > -1;
  const isIOSChrome = winNav.userAgent.match("CriOS");

  if (isIOSChrome) {
    return true;
  } else if (
    isChromium !== null &&
    typeof isChromium !== "undefined" &&
    vendorName === "Google Inc." &&
    isOpera === false &&
    isIEedge === false
  ) {
    return true;
  }
  return false;
}

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

export {
  guid,
  getThumbnailUrl,
  getSceneIndex,
  getSceneUsingSceneId,
  getImageIndexUsingIds,
  getButtonIndexUsingIds,
  getGifIndexUsingIds,
  getSoundIndexUsingIds,
  getImagePopupIndexUsingIds,
  getVideoIndexUsingIds,
  getPopupIndexUsingIds,
  getFixedTextIndexUsingIds,
  getGrid,
  getGridIndex,
  getGridCell,
  getGridCellIndex,
  getCarousel,
  getSoundUsingIds,
  getCarouselIndex,
  getCarouselItem,
  getCarouselItemIndex,
  getGltfModelUsingIds,
  getGltfModelIndexUsingIds,
  getNavMenuCellIndexUsingIds,
  getDocumentIndexUsingIds,
  getMenu3d,
  getMenu3dIndex,
  getMenu3dCell,
  getMenu3dCellIndex,
  getAudioPAUsingIds,
  getAudioPAIndexUsingIds,
  getSceneUtils,
  getReticlePosition,
  getReticlePositionObj,
  getImageUsingIds,
  getImagePopupUsingIds,
  getGifUsingIds,
  getVideoUsingIds,
  getFixedTextUsingIds,
  getResType,
  getUserToken,
  getUserUid,
  getProjectUsingProjectId,
  changePositionDepth,
  changePositionDepthObj,
  getPopupUsingIds,
  getResId,
  getUserEmailId,
  getCarouselUsingIds,
  getGridPlaneUsingIds,
  getImage360ViewIndexUsingIds,
  getImage360ViewUsingIds,
  toTitleCase
};

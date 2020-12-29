/* eslint-disable no-unused-vars */
import {
  createSoundLocal,
  deleteSoundLocal,
  updateSoundLocal,
  duplicateSoundLocal
} from './project-local-factory';
import {
  createSoundNetwork,
  deleteSoundNetwork,
  updateSoundNetwork,
  duplicateSoundNetwork
} from './project-network';
import {
  factory
} from './create-factory';
import {
  guid,
  getUserToken
} from './util-factory';

function duplicateSound(sceneid, dupSoundObj) {
  const loadSound = getLoadingSound(dupSoundObj);
  duplicateSoundLocal(sceneid, loadSound);
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      duplicateSoundNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid
      }, dupSoundObj).then(
        (responseNewSound) => {
          if (duplicateSoundLocal(sceneid, responseNewSound.data)) {
            resolve(responseNewSound);
          } else {
            reject();
          }
          deleteSoundLocal(sceneid, loadSound._id);
        },
        (error) => {
          //   message = "Error: " + error.status + " " + error.statusText;
        }
      );
    }).catch((err) => {});
  });
};

function createSound(sceneid, newSoundObj) {
  const loadSound = getLoadingSound(newSoundObj);
  createSoundLocal(sceneid, loadSound);
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      createSoundNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid
      }, newSoundObj).then(
        (responseNewSound) => {
          if (createSoundLocal(sceneid, responseNewSound.data)) {
            resolve(responseNewSound);
          } else {
            reject();
          }
          deleteSoundLocal(sceneid, loadSound._id);
        },
        (error) => {
          //   message = "Error: " + error.status + " " + error.statusText;
        }
      );
    }).catch((err) => {});
  });
};

function updateSound(sceneid, updatedSoundObj) {

  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      updateSoundLocal(sceneid, updatedSoundObj);
      updateSoundNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "soundid": updatedSoundObj._id
      }, updatedSoundObj.updatedVal).then(
        (response) => {
          resolve(response);
        },
        (error) => {
          //   message = "Error: " + error.status + " " + error.statusText;
        }
      );
    }).catch((err) => {});
  });
};

function deleteSound(sceneid, soundid) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      deleteSoundNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "soundid": soundid
      }).then(
        (response) => {
          if (deleteSoundLocal(sceneid, soundid)) {
            resolve(response);
          } else {
            reject();
          }
        },
        (error) => {
          //   message = "Error: " + error.status + " " + error.statusText;
        }
      );
    }).catch((err) => {});
  });
}

function getLoadingSound(newSoundObj) {
  let loadingSoundObj = {};
  loadingSoundObj = Object.assign({}, newSoundObj);
  loadingSoundObj._id = guid();
  loadingSoundObj.imageSrc = "image/public/image2d/fallback-image2d.png";
  return loadingSoundObj;
}

export {
  createSound,
  getLoadingSound,
  deleteSound,
  updateSound,
  duplicateSound
}

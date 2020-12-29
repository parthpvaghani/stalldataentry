/* eslint-disable no-unused-vars */
import firebase from 'firebase'
import config from '../../common/utils/base-urls';
import mrc from '../../common/network/melzo-rest-client';
// ********************************** \/ Scene \/ ********************************** //

function fetchAllScenes(obj) {
  // return $resource(config.serverUrl() + 'aepc_projects/' + obj.projectid + "/scenes/", {}, {
  //   query: {
  //     method: 'GET',
  //     isArray: true
  //   }
  // });

  // WIP. Convert all $resource query to mrc format
  return new Promise((resolve, reject) => {
    mrc
      .get(`aepc_projects/${obj.projectid}/scenes/`, {
        headers: {
          'x-access-token': obj.token
        },
        baseURL: config.serverUrl()
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function duplicateSceneNetwork(obj, dupSceneObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/duplicate/`, dupSceneObj, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function createSceneNetwork(obj, thisScene) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/`, thisScene, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function getScene(obj) {
  return new Promise((resolve, reject) => {
    mrc
      .get(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/`, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function updateSceneNetwork(obj, updatedSceneObj) {
  return new Promise((resolve, reject) => {
    mrc
      .put(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/`, updatedSceneObj, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function deleteSceneNetwork(obj) {
  return new Promise((resolve, reject) => {
    mrc
      .delete(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}`, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// ********************************** /\ Scene /\ ********************************** //

// ********************************** \/ Button \/ ********************************** //

function duplicateButtonNetwork(obj, dupButtonObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/buttons/duplicate/`, dupButtonObj, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function createButtonNetwork(obj, newSwitchbutton) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/buttons/`, newSwitchbutton, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function updateButtonNetwork(obj) {
  //   return $resource(config.serverUrl() + 'aepc_projects/' + obj.projectid + "/scenes/" + obj.sceneid + "/buttons/" + obj.buttonid, {}, {
  //     put: {
  //       method: 'PUT',
  //       headers: {
  //         'x-access-token': obj.token
  //       }
  //     }
  //   });
  return new Promise((resolve, reject) => {
    mrc
      .put(config.serverUrl + `aepc_projects/'${obj.projectid}/scenes/${obj.sceneid}/buttons/${obj.buttonid}`, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function deleteButtonNetwork(obj) {
  //   return $resource(config.serverUrl() + 'aepc_projects/' + obj.projectid + "/scenes/" + obj.sceneid + "/buttons/" + obj.buttonid, {}, {
  //     delete: {
  //       method: 'DELETE',
  //       headers: {
  //         'x-access-token': obj.token
  //       }
  //     }
  //   });
  return new Promise((resolve, reject) => {
    mrc
      .delete(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/buttons/${obj.buttonid}`, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// ********************************** /\ Button /\ ********************************** //

// ********************************** \/ Image2D \/ ********************************** //

function duplicateImageNetwork(obj, dupImageObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/images/duplicate/`, dupImageObj, {
        headers: {
          'x-access-token': obj.token
        },
        data: obj
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function createImageNetwork(obj, newImageObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/images/`, newImageObj, {
        headers: {
          'x-access-token': obj.token
        }
        // baseURL: config.serverUrl,
        // data: newImageObj
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });

}

function updateImageNetwork(obj, updatedVal) {
  return new Promise((resolve, reject) => {
    mrc
      .put(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/images/${obj.imageid}`, updatedVal, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function deleteImageNetwork(obj) {
  return new Promise((resolve, reject) => {
    mrc
      .delete(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/images/${obj.imageid}`, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// ********************************** /\ Image2D /\ ********************************** //

// ********************************** \/ Image 360 View \/ ********************************** //

function createImage360ViewNetwork(obj, newImageObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/images360view/`, newImageObj, {
        headers: {
          'x-access-token': obj.token
        }
        // baseURL: config.serverUrl,
        // data: newImageObj
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}
function updateImage360ViewNetwork(obj, updatedVal) {
  return new Promise((resolve, reject) => {
    mrc
      .put(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/images360view/${obj.imageid}`, updatedVal, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function deleteImage360ViewNetwork(obj) {
  return new Promise((resolve, reject) => {
    mrc
      .delete(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/images360view/${obj.imageid}`, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// ********************************** /\ Image 360 View /\ ********************************** //

// ********************************** \/ GIF \/ ********************************** //

function duplicateGifNetwork(obj, dupGifObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/gifs/duplicate/`, dupGifObj, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function createGifNetwork(obj, newGifObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/gifs/`, newGifObj, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function updateGifNetwork(obj, updatedVal) {
  return new Promise((resolve, reject) => {
    mrc
      .put(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/gifs/${obj.gifid}`, updatedVal, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function deleteGifNetwork(obj) {
  return new Promise((resolve, reject) => {
    mrc
      .delete(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/gifs/${obj.gifid}`, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// ********************************** /\ GIF /\ ********************************** //

// ********************************** \/ SOUND \/ ********************************** //

function duplicateSoundNetwork(obj, dupSoundObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/sounds/duplicate/`, dupSoundObj, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function createSoundNetwork(obj, newSoundObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/sounds/`, newSoundObj, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function updateSoundNetwork(obj, updatedVal) {
  return new Promise((resolve, reject) => {
    mrc
      .put(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/sounds/${obj.soundid}`, updatedVal, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function deleteSoundNetwork(obj) {
  // return $resource(config.serverUrl() + 'aepc_projects/' + obj.projectid + "/scenes/" + obj.sceneid + "/sounds/" + obj.soundid, {}, {
  //   delete: {
  //     method: 'DELETE',
  //     headers: {
  //       'x-access-token': obj.token
  //     }
  //   }
  // });
  return new Promise((resolve, reject) => {
    mrc
      .delete(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/sounds/${obj.soundid}`, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// ********************************** /\ SOUND /\ ********************************** //

// ********************************** \/ Image Popup \/ ********************************** //

function duplicateImagePopupNetwork(obj, dupImagePopupObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/imagepopups/duplicate/`, dupImagePopupObj, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function createImagePopupNetwork(obj, imagePopupObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/imagepopups/`, imagePopupObj, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

function updateImagePopupNetwork(obj, updatedVal) {
  return new Promise((resolve, reject) => {
    mrc
      .put(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/imagepopups/${obj.imagepopupid}`, updatedVal, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function deleteImagePopupNetwork(obj) {
  // return $resource(config.serverUrl() + 'aepc_projects/' + obj.projectid + "/scenes/" + obj.sceneid + "/imagepopups/" + obj.imagepopupid, {}, {
  //   delete: {
  //     method: 'DELETE',
  //     headers: {
  //       'x-access-token': obj.token
  //     }
  //   }
  // });
  return new Promise((resolve, reject) => {
    mrc
      .delete(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/imagepopups/${obj.imagepopupid}`, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// ********************************** /\ Image Popup /\ ********************************** //

// ********************************** \/ Video2D \/ ********************************** //

function duplicateVideoNetwork(obj, dupVideoObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/videos/duplicate/`, dupVideoObj, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function createVideoNetwork(obj, newVideoObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/videos/`, newVideoObj, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function updateVideoNetwork(obj, updatedVal) {
  return new Promise((resolve, reject) => {
    mrc
      .put(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/videos/${obj.videoid}`, updatedVal, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function deleteVideoNetwork(obj) {
  // return $resource(config.serverUrl() + 'aepc_projects/' + obj.projectid + "/scenes/" + obj.sceneid + "/videos/" + obj.videoid, {}, {
  //   delete: {
  //     method: 'DELETE',
  //     headers: {
  //       'x-access-token': obj.token
  //     }
  //   }
  // });
  return new Promise((resolve, reject) => {
    mrc
      .delete(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/videos/${obj.videoid}`, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// ********************************** /\ Video2D /\ ********************************** //

// ********************************** \/ Popup \/ ********************************** //

function duplicatePopupNetwork(obj, dupPopupObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/popups/duplicate/`, dupPopupObj, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function createPopupNetwork(obj, newPopupObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/popups/`, newPopupObj, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function updatePopupNetwork(obj, updatedVal) {
  return new Promise((resolve, reject) => {
    mrc
      .put(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/popups/${obj.popupid}`, updatedVal, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function deletePopupNetwork(obj) {
  return new Promise((resolve, reject) => {
    mrc
      .delete(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/popups/${obj.popupid}`, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// ********************************** /\ Popup /\ ********************************** //

// ********************************** \/ Fixed Text \/ ********************************** //

function duplicateFixedTextNetwork(obj, dupFixedTextObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/fixedtextarray/duplicate/`, dupFixedTextObj, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function createFixedTextNetwork(obj, fixedTextObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/fixedtextarray`, fixedTextObj, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function updateFixedTextNetwork(obj, updatedVal) {
  return new Promise((resolve, reject) => {
    mrc
      .put(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/fixedtextarray/${obj.fixedtextid}`, updatedVal, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function deleteFixedTextNetwork(obj) {
  // return $resource(config.serverUrl() + 'aepc_projects/' + obj.projectid + "/scenes/" + obj.sceneid + "/fixedtextarray/" + obj.fixedtextid, {}, {
  //   delete: {
  //     method: 'DELETE',
  //     headers: {
  //       'x-access-token': obj.token
  //     }
  //   }
  // });
  return new Promise((resolve, reject) => {
    mrc
      .delete(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/fixedtextarray/${obj.fixedtextid}`, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}
// ********************************** /\ Fixed Text /\ ********************************** //

// ********************************** \/ Grid \/ ********************************** //

function duplicateGridNetwork(obj, dupGridObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/grids/duplicate/`, dupGridObj, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function createGridNetwork(obj, newGridObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/grids`, newGridObj, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function updateGridNetwork(obj, updatedVal) {
  return new Promise((resolve, reject) => {
    mrc
      .put(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/grids/${obj.gridid}`, updatedVal, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function deleteGridNetwork(obj) {
  // return $resource(config.serverUrl() + 'aepc_projects/' + obj.projectid + "/scenes/" + obj.sceneid + "/grids/" + obj.gridid, {}, {
  //   delete: {
  //     method: 'DELETE',
  //     headers: {
  //       'x-access-token': obj.token
  //     }
  //   }
  // });
  return new Promise((resolve, reject) => {
    mrc
      .delete(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/grids/${obj.gridid}`, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// ********************************** /\ Grid /\ ********************************** //

// ********************************** \/ Grid Cell \/ ********************************** //

function createGridCellNetwork(obj, newGridCellObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/grids/${obj.gridid}/cells/`, newGridCellObj, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function updateGridCellNetwork(obj, updatedVal) {
  return new Promise((resolve, reject) => {
    mrc
      .put(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/grids/${obj.gridid}/cells/${obj.gridcellid}`, updatedVal, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function deleteGridCellNetwork(obj) {
  // return $resource(config.serverUrl() + 'aepc_projects/' + obj.projectid + "/scenes/" + obj.sceneid + "/grids/" + obj.gridid + "/cells/" + obj.gridcellid, {}, {
  //   delete: {
  //     method: 'DELETE',
  //     headers: {
  //       'x-access-token': obj.token
  //     }
  //   }
  // });
  return new Promise((resolve, reject) => {
    mrc
      .delete(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/grids/${obj.gridid}/cells/${obj.gridcellid}`, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// ********************************** /\ Grid Cell /\ ********************************** //

// ********************************** \/ Carousel \/ ********************************** //

function duplicateCarouselNetwork(obj, dupCarouselObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/carousels/duplicate`, dupCarouselObj, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function createCarouselNetwork(obj, newCarouselObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/carousels`, newCarouselObj, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function updateCarouselNetwork(obj, updatedVal) {
  return new Promise((resolve, reject) => {
    mrc
      .put(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/carousels/${obj.carouselid}`, updatedVal, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function deleteCarouselNetwork(obj) {
  // return $resource(config.serverUrl() + 'aepc_projects/' + obj.projectid + "/scenes/" + obj.sceneid + "/carousels/" + obj.carouselid, {}, {
  //   delete: {
  //     method: 'DELETE',
  //     headers: {
  //       'x-access-token': obj.token
  //     }
  //   }
  // });
  return new Promise((resolve, reject) => {
    mrc
      .delete(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/carousels/${obj.carouselid}`, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// ********************************** \/ Carousel \/ ********************************** //

// ********************************** \/ Carousel Item \/ ********************************** //

function createCarouselItemNetwork(obj, newCarouselItemObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/carousels/${obj.carouselid}/items/`, newCarouselItemObj, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function updateCarouselItemNetwork(obj, updatedVal) {
  return new Promise((resolve, reject) => {
    mrc
      .put(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/carousels/${obj.carouselid}/items/${obj.carouselitemid}`, updatedVal, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function updateCarouselItemsOrderNetwork(obj, updatedVal) {
  return new Promise((resolve, reject) => {
    mrc
      .put(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/carousels/${obj.carouselid}/items/${obj.carouselitemid}/updateorder/`, updatedVal, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

function deleteCarouselItemNetwork(obj) {
  // return $resource(config.serverUrl() + 'aepc_projects/' + obj.projectid + "/scenes/" + obj.sceneid + "/carousels/" + obj.carouselid + "/items/" + obj.carouselitemid, {}, {
  //   delete: {
  //     method: 'DELETE',
  //     headers: {
  //       'x-access-token': obj.token
  //     }
  //   }
  // });
  return new Promise((resolve, reject) => {
    mrc
      .delete(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/carousels/${obj.carouselid}/items/${obj.carouselitemid}`, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// ********************************** /\ Carousel Item /\ ********************************** //

// ********************************** \/ Gltf Model \/ ********************************** //

function duplicateGltfModelNetwork(obj, dupGltfModelObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/gltfmodels/duplicate/`, dupGltfModelObj, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function createGltfModelNetwork(obj, newGltfObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/gltfmodels/`, newGltfObj, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function updateGltfModelNetwork(obj, updatedVal) {
  return new Promise((resolve, reject) => {
    mrc
      .put(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/gltfmodels/${obj.gltfmodelid}`, updatedVal, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function deleteGltfModelNetwork(obj) {
  // return $resource(config.serverUrl() + 'aepc_projects/' + obj.projectid + "/scenes/" + obj.sceneid + "/gltfmodels/" + obj.gltfmodelid, {}, {
  //   delete: {
  //     method: 'DELETE',
  //     headers: {
  //       'x-access-token': obj.token
  //     }
  //   }
  // });
  return new Promise((resolve, reject) => {
    mrc
      .delete(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/gltfmodels/${obj.gltfmodelid}`, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// ********************************** /\ Gltf Model /\ ********************************** //

// ********************************** \/ navMenu \/ **********************************

function updateNavMenuNetwork(obj, updatedVal) {
  return new Promise((resolve, reject) => {
    mrc
      .put(config.serverUrl + `aepc_projects/${obj.projectid}/navmenu/`, updatedVal, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function createNavMenuCellNetwork(obj) {
  // return $resource(config.serverUrl() + 'aepc_projects/' + obj.projectid + "/navmenu/cell", {}, {
  //   post: {
  //     method: 'POST',
  //     headers: {
  //       'x-access-token': obj.token
  //     }
  //   }
  // });
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/navmenu/cell`, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// ********************************** /\ navMenu /\ **********************************

// ********************************** /\ document  /\ **********************************

function duplicateDocumentNetwork(obj, dupDocumentObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/documents/duplicate/`, dupDocumentObj, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function createDocumentNetwork(obj, newDocumentObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/documents`, newDocumentObj, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function updateDocumentNetwork(obj, updatedVal) {
  return new Promise((resolve, reject) => {
    mrc
      .put(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/documents/${obj.documentid}`, updatedVal, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function deleteDocumentNetwork(obj) {
  // return $resource(config.serverUrl() + 'aepc_projects/' + obj.projectid + "/scenes/" + obj.sceneid + "/documents/" + obj.documentid, {}, {
  //   delete: {
  //     method: 'DELETE',
  //     headers: {
  //       'x-access-token': obj.token
  //     }
  //   }
  // });
  return new Promise((resolve, reject) => {
    mrc
      .delete(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/documents/${obj.documentid}`, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// ********************************** /\ document  /\ **********************************

// ********************************** \/ Menu3d \/ ********************************** //

function duplicateMenu3dNetwork(obj, dupMenu3dObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/menu3ds/duplicate/`, dupMenu3dObj, {
        headers: {
          'x-access-token': obj.token
        },
        data: obj
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function createMenu3dNetwork(obj, menu3dObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/menu3ds`, menu3dObj, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function updateMenu3dNetwork(obj, updatedVal) {
  // return $resource(config.serverUrl() + 'aepc_projects/' + obj.projectid + "/scenes/" + obj.sceneid + "/menu3ds/" + obj.menu3did + "", {}, {
  //   put: {
  //     method: 'PUT',
  //     headers: {
  //       'x-access-token': obj.token
  //     }
  //   }
  // });

  return new Promise((resolve, reject) => {
    mrc
      .put(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/menu3ds/${obj.menu3did}`, updatedVal, {
        headers: {
          'x-access-token': obj.token
        },
        data: obj
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function deleteMenu3dNetwork(obj) {
  // return $resource(config.serverUrl() + 'aepc_projects/' + obj.projectid + "/scenes/" + obj.sceneid + "/menu3ds/" + obj.menu3did, {}, {
  //   delete: {
  //     method: 'DELETE',
  //     headers: {
  //       'x-access-token': obj.token
  //     }
  //   }
  // });

  return new Promise((resolve, reject) => {
    mrc
      .delete(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/menu3ds/${obj.menu3did}`, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}


// ********************************** /\ Menu3d /\ ********************************** //

// ********************************** \/ Menu3d Cell \/ ********************************** //

function createMenu3dCellNetwork(obj, newMenu3dCellObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/menu3ds/${obj.menu3did}/cells/`, newMenu3dCellObj, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}


function updateMenu3dCellNetwork(obj, updatedValue) {
  return new Promise((resolve, reject) => {
    mrc
      .put(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/menu3ds/${obj.menu3did}/cells/${obj.menu3dcellid}`, updatedValue, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}



function deleteMenu3dCellNetwork(obj) {
  // return $resource(config.serverUrl() + 'aepc_projects/' + obj.projectid + "/scenes/" + obj.sceneid + "/menu3ds/" + obj.menu3did + "/cells/" + obj.menu3dcellid, {}, {
  //   delete: {
  //     method: 'DELETE',
  //     headers: {
  //       'x-access-token': obj.token
  //     }
  //   }
  // });

  return new Promise((resolve, reject) => {
    mrc
      .delete(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/menu3ds/${obj.menu3did}/cells/${obj.menu3dcellid}`, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// ********************************** /\ Menu3d Cell /\ ********************************** //

// ********************************** \/ Audio PA \/ ********************************** //

function createAudioPANetwork(obj, newAudioPAObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/audiopa`, newAudioPAObj, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function updateAudioPANetwork(obj, updatedValue) {
  return new Promise((resolve, reject) => {
    mrc
      .put(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/audiopa/${obj.audiopaid}`, updatedValue, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function deleteAudioPANetwork(obj) {
  // return $resource(config.serverUrl() + 'aepc_projects/' + obj.projectid + "/scenes/" + obj.sceneid + "/audiopa/" + obj.audiopaid, {}, {
  //   delete: {
  //     method: 'DELETE',
  //     headers: {
  //       'x-access-token': obj.token
  //     }
  //   }
  // });
  return new Promise((resolve, reject) => {
    mrc
      .delete(config.serverUrl + `aepc_projects/${obj.projectid}/scenes/${obj.sceneid}/audiopa/${obj.audiopaid}`, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// ********************************** /\ Audio PA /\ ********************************** //

// ********************************** \/ General \/ ********************************** //

function getHeatMapNetwork(obj) {
  // return $resource(config.heatMapServerUrl() + "genheatmap", {}, {
  //   post: {
  //     method: 'POST',
  //     headers: {
  //       'x-access-token': obj.token,
  //       'accept': 'image/png'
  //     },
  //     responseType: 'arraybuffer',
  //     transformResponse: function (data) {
  //       var pngBlob;
  //       if (data) {
  //         pngBlob = new Blob([data], {
  //           type: 'image/png'
  //         });
  //       }
  //       return {
  //         response: pngBlob
  //       };
  //     }
  //   }
  // });
  return new Promise((resolve, reject) => {
    mrc
      .post(config.heatMapServerUrl + `genheatmap`, {
        headers: {
          'x-access-token': obj.token,
          'accept': 'image/png'
        },
        responseType: 'arraybuffer',
        transformResponse(data) {
          let pngBlob;
          if (data) {
            pngBlob = new Blob([data], {
              type: 'image/png'
            });
          }
          return {
            response: pngBlob
          };
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function addViewNetwork(obj) {
  // return $resource(config.serverUrl() + 'aepc_projects/' + obj.projectid + '/views', {}, {
  //   put: {
  //     method: 'PUT'
  //   }
  // });

  return new Promise((resolve, reject) => {
    mrc
      .put(config.serverUrl + `aepc_projects/${obj.projectid}/views`, {
        headers: {
          'x-access-token': obj.token
        },
        data: obj
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}


function updateProjectSoundNetwork(obj, updatedValue) {
  return new Promise((resolve, reject) => {
    mrc
      .put(config.serverUrl + `aepc_projects/${obj.projectid}/projectsound`, updatedValue, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// ********************************** /\ General /\ ********************************** //

// ********************************** /\ General /\ ********************************** //

function scheduleVideoCall(obj, mailObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `contactus`, mailObj, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function contactExhiBitor(obj, mailObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl+`contactus/contactMember`, mailObj, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        console.log('contact exhibitor api res',res)
        resolve(res);
      })
      .catch(err => {
        console.log('contact exhibitor api err',err)
        reject(err);
      });
  });
}





// ********************************** /\ General /\ ********************************** //

export {
  contactExhiBitor,
  duplicateImageNetwork,
  createImageNetwork,
  updateImageNetwork,
  deleteImageNetwork,
  createSceneNetwork,
  deleteSceneNetwork,
  updateSceneNetwork,
  createAudioPANetwork,
  createButtonNetwork,
  createCarouselItemNetwork,
  createCarouselNetwork,
  createDocumentNetwork,
  createFixedTextNetwork,
  createGifNetwork,
  createGltfModelNetwork,
  createGridCellNetwork,
  createGridNetwork,
  createImagePopupNetwork,
  createMenu3dCellNetwork,
  createMenu3dNetwork,
  createNavMenuCellNetwork,
  createPopupNetwork,
  createSoundNetwork,
  createVideoNetwork,
  deleteAudioPANetwork,
  deleteButtonNetwork,
  deleteCarouselItemNetwork,
  deleteCarouselNetwork,
  deleteDocumentNetwork,
  deleteFixedTextNetwork,
  deleteGifNetwork,
  deleteGltfModelNetwork,
  deleteGridCellNetwork,
  deleteGridNetwork,
  deleteImagePopupNetwork,
  deleteMenu3dCellNetwork,
  deleteMenu3dNetwork,
  deletePopupNetwork,
  deleteSoundNetwork,
  deleteVideoNetwork,
  duplicateButtonNetwork,
  duplicateCarouselNetwork,
  duplicateDocumentNetwork,
  duplicateFixedTextNetwork,
  duplicateGifNetwork,
  duplicateGltfModelNetwork,
  duplicateGridNetwork,
  duplicateImagePopupNetwork,
  duplicateMenu3dNetwork,
  duplicatePopupNetwork,
  duplicateSceneNetwork,
  duplicateSoundNetwork,
  duplicateVideoNetwork,
  updateAudioPANetwork,
  updateButtonNetwork,
  updateCarouselItemNetwork,
  updateCarouselItemsOrderNetwork,
  updateCarouselNetwork,
  updateDocumentNetwork,
  updateFixedTextNetwork,
  updateGifNetwork,
  updateGltfModelNetwork,
  updateGridCellNetwork,
  updateGridNetwork,
  updateImagePopupNetwork,
  updateMenu3dCellNetwork,
  updateMenu3dNetwork,
  updateNavMenuNetwork,
  updatePopupNetwork,
  updateProjectSoundNetwork,
  updateSoundNetwork,
  updateVideoNetwork,
  createImage360ViewNetwork,
  updateImage360ViewNetwork,
  deleteImage360ViewNetwork,
  scheduleVideoCall
}

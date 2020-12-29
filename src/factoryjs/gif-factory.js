/* eslint-disable no-unused-vars */
import {
  duplicateGifLocal,
  deleteGifLocal,
  updateGifLocal,
  createGifLocal
} from './project-local-factory';
import {
  createGifNetwork,
  deleteGifNetwork,
  updateGifNetwork,
  duplicateGifNetwork
} from './project-network';
import {
  factory
} from './create-factory';
import {
  guid,
  getUserToken
} from './util-factory';

function duplicateGif(sceneid, dupGifObj) {
  const loadImg = getLoadingGif(dupGifObj);
  duplicateGifLocal(sceneid, loadImg);

  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      duplicateGifNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid
      }, dupGifObj).then(
        (responseNewGif) => {
          if (duplicateGifLocal(sceneid, responseNewGif.data)) {
            resolve(responseNewGif);
          } else {
            reject();
          }
          deleteGifLocal(sceneid, loadImg._id);
        },
        (error) => {
          //   message = "Error: " + error.status + " " + error.statusText;
        }
      );
    }).catch((err) => {});
  });
}

function createGif(sceneid, newGifObj) {
  const loadImg = getLoadingGif(newGifObj);
  createGifLocal(sceneid, loadImg);
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      createGifNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid
      }, newGifObj).then(
        (responseNewGif) => {
          if (createGifLocal(sceneid, responseNewGif.data)) {
            resolve(responseNewGif);
          } else {
            reject();
          }
          deleteGifLocal(sceneid, loadImg._id);
        },
        (error) => {
          //   message = "Error: " + error.status + " " + error.statusText;
        }
      );
    }).catch((err) => {});
  });
};

function updateGif(sceneid, updatedGifObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      updateGifLocal(sceneid, updatedGifObj);
      updateGifNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "gifid": updatedGifObj._id
      }, updatedGifObj.updatedVal).then(
        (responseNewGif) => {
          // const obj = {
          //   operation: 'PUT',
          //   project_id: factory.project._id,
          //   scene_id: sceneid,
          //   object_type: 'widgetgif',
          //   updated_obj: JSON.parse(angular.toJson(updatedImgObj))
          // };
          // updateLiveProjChangesToFirebase(obj);
          resolve(responseNewGif);
        },
        (error) => {
          //   message = "Error: " + error.status + " " + error.statusText;
        }
      );
    }).catch((err) => {});
  });
};

function deleteGif(sceneid, gifid) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      deleteGifNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "gifid": gifid
      }).then(
        (response) => {
          if (deleteGifLocal(sceneid, gifid)) {
            // const obj = {
            //   operation: 'DELETE',
            //   project_id: factory.project._id,
            //   scene_id: sceneid,
            //   object_type: 'widgetgif',
            //   updated_obj: gifid
            // };
            // updateLiveProjChangesToFirebase(obj);
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

function getLoadingGif(newGifObj) {
  let loadingGifObj = {};
  loadingGifObj = Object.assign({}, newGifObj);
  loadingGifObj._id = guid();
  // loadingGifObj.src = "image/public/image2d/fallback-image2d.png";
  loadingGifObj.src = 'images/sample.gif';
  return loadingGifObj;
}

export {
  createGif,
  getLoadingGif,
  deleteGif,
  updateGif,
  duplicateGif
}

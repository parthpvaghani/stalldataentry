/* eslint-disable no-unused-vars */
import {
  createImagePopupLocal,
  deleteImagePopupLocal,
  updateImagePopupLocal,
  duplicateImagePopupLocal
} from './project-local-factory';
import {
  createImagePopupNetwork,
  deleteImagePopupNetwork,
  updateImagePopupNetwork,
  duplicateImagePopupNetwork
} from './project-network';
import {
  factory
} from './create-factory';
import {
  guid,
  getUserToken
} from './util-factory';

function duplicateImagePopup(sceneid, imagePopupObj) {

  const loadImg = getLoadingImagePopup(imagePopupObj);
  duplicateImagePopupLocal(sceneid, loadImg);

  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      duplicateImagePopupNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid
      }, imagePopupObj).then(
        (responseNewImagePopup) => {
          if (duplicateImagePopupLocal(sceneid, responseNewImagePopup.data)) {
            resolve(responseNewImagePopup);
          } else {
            reject();
          }
          deleteImagePopupLocal(sceneid, loadImg._id);
        },
        (error) => {
          //   message = "Error: " + error.status + " " + error.statusText;
        }
      );
    }).catch((err) => {});
  });
}

function createImagePopup(sceneid, imagePopupObj) {
  const loadImg = getLoadingImagePopup(imagePopupObj);
  createImagePopupLocal(sceneid, loadImg);
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      createImagePopupNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid
      }, imagePopupObj).then(
        (responseNewImage) => {
          if (createImagePopupLocal(sceneid, responseNewImage.data)) {
            // const obj = {
            //   operation: 'POST',
            //   project_id: factory.project._id,
            //   scene_id: sceneid,
            //   object_type: 'widgetimagepopup',
            //   updated_obj: JSON.parse(angular.toJson(responseNewImagePopup))
            // };
            // updateLiveProjChangesToFirebase(obj);
            resolve(responseNewImage);
          } else {
            reject();
          }
          deleteImagePopupLocal(sceneid, loadImg._id);
        },
        (error) => {
          //   message = "Error: " + error.status + " " + error.statusText;
        }
      );
    }).catch((err) => {});
  });
};

function updateImagePopup(sceneid, updatedImgPopupObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      updateImagePopupLocal(sceneid, updatedImgPopupObj);
      updateImagePopupNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "imagepopupid": updatedImgPopupObj._id
      }, updatedImgPopupObj.updatedVal).then(
        (responseNewImage) => {
          // const obj = {
          //   operation: 'PUT',
          //   project_id: factory.project._id,
          //   scene_id: sceneid,
          //   object_type: 'widgetimagepopup',
          //   updated_obj: JSON.parse(angular.toJson(updatedImgPopupObj))
          // };
          // updateLiveProjChangesToFirebase(obj);
          resolve(responseNewImage);
        },
        (error) => {
          //   message = "Error: " + error.status + " " + error.statusText;
        }
      );
    }).catch((err) => {});
  });
};


function deleteImagePopup(sceneid, imagepopupid) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      deleteImagePopupNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "imagepopupid": imagepopupid
      }).then(
        (response) => {
          if (deleteImagePopupLocal(sceneid, imagepopupid)) {
            // const obj = {
            //   operation: 'DELETE',
            //   project_id: factory.project._id,
            //   scene_id: sceneid,
            //   object_type: 'widgetimagepopup',
            //   updated_obj: imagepopupid
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

function getLoadingImagePopup(imagePopupObj) {
  let loadingImagePopupObj = {};
  loadingImagePopupObj = Object.assign({}, imagePopupObj);
  loadingImagePopupObj._id = guid();
  loadingImagePopupObj.src = "image/public/image2d/fallback-image2d.png";
  return loadingImagePopupObj;
}

export {
  createImagePopup,
  getLoadingImagePopup,
  deleteImagePopup,
  updateImagePopup,
  duplicateImagePopup
}

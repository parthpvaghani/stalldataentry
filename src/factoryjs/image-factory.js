/* eslint-disable */
import {
  createImageLocal,
  deleteImageLocal,
  updateImageLocal,
  duplicateImageLocal
} from './project-local-factory';
import {
  createImageNetwork,
  deleteImageNetwork,
  updateImageNetwork,
  duplicateImageNetwork
} from './project-network';
import {
  factory
} from './create-factory';
import {
  guid,
  getUserToken
} from './util-factory';

function duplicateImage(sceneid, dupImageObj) {
  const loadImg = getLoadingImage(dupImageObj);
  duplicateImageLocal(sceneid, loadImg);

  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      duplicateImageNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid
      }, dupImageObj).then(
        (responseNewImage) => {
          if (duplicateImageLocal(sceneid, responseNewImage.data)) {
            resolve(responseNewImage);
          } else {
            reject();
          }
          deleteImageLocal(sceneid, loadImg._id);
        },
        (error) => {
          //   message = "Error: " + error.status + " " + error.statusText;
        }
      );
    }).catch((err) => {});
  });
}

function createImage(sceneid, newImageObj) {
  const loadImg = getLoadingImage(newImageObj);
  createImageLocal(sceneid, loadImg);
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      createImageNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid
      }, newImageObj).then(
        (responseNewImage) => {
          if (createImageLocal(sceneid, responseNewImage.data)) {
            resolve(responseNewImage);
          } else {
            reject();
          }
          deleteImageLocal(sceneid, loadImg._id);
        },
        (error) => {
          //   message = "Error: " + error.status + " " + error.statusText;
        }
      );
    }).catch((err) => {});
  });
}

function updateImage(sceneid, updatedImgObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      updateImageLocal(sceneid, updatedImgObj);
      updateImageNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "imageid": updatedImgObj._id
      }, updatedImgObj.updatedVal).then(
        (response) => {
          // const obj = {
          //   operation: 'PUT',
          //   project_id: factory.project._id,
          //   scene_id: sceneid,
          //   object_type: 'widgetimage',
          //   updated_obj: JSON.parse(angular.toJson(updatedImgObj))
          // };
          // updateLiveProjChangesToFirebase(obj);
          resolve(response);
        },
        (error) => {
          //   message = "Error: " + error.status + " " + error.statusText;
        }
      );
    }).catch((err) => {});
  });
}

function deleteImage(sceneid, imageid) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      deleteImageNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "imageid": imageid
      }).then(
        (response) => {
          if (deleteImageLocal(sceneid, imageid)) {
            // const obj = {
            //   operation: 'DELETE',
            //   project_id: factory.project._id,
            //   scene_id: sceneid,
            //   object_type: 'widgetimage',
            //   updated_obj: imageid
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

function getLoadingImage(newImageObj) {
  let loadingImageObj = {};
  loadingImageObj = Object.assign({}, newImageObj);
  //   copy(newImageObj, loadingImageObj);
  loadingImageObj._id = guid();
  loadingImageObj.src = "image/public/image2d/fallback-image2d.png";
  return loadingImageObj;
}

export {
  createImage,
  getLoadingImage,
  deleteImage,
  updateImage,
  duplicateImage
}

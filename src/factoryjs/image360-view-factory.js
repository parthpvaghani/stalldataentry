/* eslint-disable no-unused-vars */
import {
    createImage360ViewLocal,
    deleteImage360ViewLocal,
    updateImage360ViewLocal
  } from './project-local-factory';
  import {
    createImage360ViewNetwork,
    updateImage360ViewNetwork,
    deleteImage360ViewNetwork
  } from './project-network';
  import {
    factory
  } from './create-factory';
  import {
    guid,
    getUserToken
  } from './util-factory';
  
  function createImage360View(sceneid, newImageObj) {
    
    const loadImg = getLoadingImage(newImageObj);
    createImage360ViewLocal(sceneid, loadImg);
    return new Promise((resolve, reject) => {
      getUserToken().then((token) => {
        createImage360ViewNetwork({
          "projectid": factory.project._id,
          "token": token,
          "sceneid": sceneid
        }, newImageObj).then(
          (responseNewImage) => {
            if (createImage360ViewLocal(sceneid, responseNewImage.data)) {
              resolve(responseNewImage);
            } else {
              reject();
            }
            deleteImage360ViewLocal(sceneid, loadImg._id);
          },
          (error) => {
            //   message = "Error: " + error.status + " " + error.statusText;
          }
        );
      }).catch((err) => {});
    });
  }
  
function updateImage360View(sceneid, updatedImgObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      updateImage360ViewLocal(sceneid, updatedImgObj);
      updateImage360ViewNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "imageid": updatedImgObj._id
      }, updatedImgObj.updatedVal).then(
        (response) => {
          resolve(response);
        },
        (error) => {
        }
      );
    }).catch((err) => {});
  });
}
function deleteImage360View(sceneid, imageid) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      deleteImage360ViewNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "imageid": imageid
      }).then(
        (response) => {
          if (deleteImage360ViewLocal(sceneid, imageid)) {
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
    createImage360View,
    getLoadingImage,
    updateImage360View,
    deleteImage360View
  }
  
/* eslint-disable no-unused-vars */
import {
  createGltfModelLocal,
  deleteGltfModelLocal,
  updateGltfModelLocal,
  duplicateGltfModelLocal
} from './project-local-factory';
import {
  createGltfModelNetwork,
  deleteGltfModelNetwork,
  updateGltfModelNetwork,
  duplicateGltfModelNetwork
} from './project-network';
import {
  factory
} from './create-factory';
import {
  guid,
  getUserToken
} from './util-factory';

function duplicateGltfModel(sceneid, gltfModelObj) {
  const loadGltfModel = getLoadingGltfModel(gltfModelObj);
  duplicateGltfModelLocal(sceneid, loadGltfModel);

  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      duplicateGltfModelNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid
      }, gltfModelObj).then(
        (responseNewGltfModel) => {
          if (duplicateGltfModelLocal(sceneid, responseNewGltfModel.data)) {
            resolve(responseNewGltfModel);
          } else {
            reject();
          }
          deleteGltfModelLocal(sceneid, loadGltfModel._id);
        },
        (error) => {
          //   message = "Error: " + error.status + " " + error.statusText;
        }
      );
    }).catch((err) => {});
  });
}

function createGltfModel(sceneid, gltfModelObj) {
  const loadGltfModel = getLoadingGltfModel(gltfModelObj);
  createGltfModelLocal(sceneid, loadGltfModel);
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      createGltfModelNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid
      }, gltfModelObj).then(
        (responseNewGltfModel) => {
          if (createGltfModelLocal(sceneid, responseNewGltfModel.data)) {
            resolve(responseNewGltfModel);
          } else {
            reject();
          }
          deleteGltfModelLocal(sceneid, loadGltfModel._id);
        },
        (error) => {
          //   message = "Error: " + error.status + " " + error.statusText;
        }
      );
    }).catch((err) => {});
  });
};

function updateGltfModel(sceneid, updatedGltfModelObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      updateGltfModelLocal(sceneid, updatedGltfModelObj);
      updateGltfModelNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "gltfmodelid": updatedGltfModelObj._id
      }, updatedGltfModelObj.updatedVal).then(
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
};


function deleteGltfModel(sceneid, gltfmodelid) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      deleteGltfModelNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "gltfmodelid": gltfmodelid
      }).then(
        (response) => {
          if (deleteGltfModelLocal(sceneid, gltfmodelid)) {
            // const obj = {
            //   operation: 'DELETE',
            //   project_id: factory.project._id,
            //   scene_id: sceneid,
            //   object_type: 'widgetimage',
            //   updated_obj: gltfmodelid
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

function getLoadingGltfModel(gltfModelObj) {
  let loadingGltfModelObj = {};
  loadingGltfModelObj = Object.assign({}, gltfModelObj);
  loadingGltfModelObj._id = guid();
  // TODO: Update loadingGltfModel src
  loadingGltfModelObj.src = "../images/Crate1.gltf";
  return loadingGltfModelObj;
}

export {
  createGltfModel,
  getLoadingGltfModel,
  deleteGltfModel,
  updateGltfModel,
  duplicateGltfModel
}

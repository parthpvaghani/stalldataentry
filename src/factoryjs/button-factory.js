/* eslint-disable no-unused-vars */
import {
  createButtonLocal,
  deleteButtonLocal,
  updateButtonLocal,
  duplicateButtonLocal
} from './project-local-factory';
import {
  createButtonNetwork,
  deleteButtonNetwork,
  updateButtonNetwork,
  duplicateButtonNetwork
} from './project-network';
import {
  factory
} from './create-factory';
import {
  guid,
  getUserToken
} from './util-factory';

function duplicateButton(sceneid, duplicateButtonObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      duplicateButtonNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid
      }, duplicateButtonObj).then(
        (responseNewButton) => {
          if (duplicateButtonLocal(sceneid, responseNewButton.data)) {
            resolve(responseNewButton);
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

function createButton(sceneid, newSwitchbutton) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      createButtonNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid
      }, newSwitchbutton).then(
        (responseNewImage) => {
          if (createButtonLocal(sceneid, responseNewImage.data)) {
            // const obj = {
            //   operation: 'POST',
            //   project_id: factory.project._id,
            //   scene_id: sceneid,
            //   object_type: 'switchbutton',
            //   updated_obj: JSON.parse(angular.toJson(responseNewButton))
            // };
            // updateLiveProjChangesToFirebase(obj);
            resolve(responseNewImage);
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

/*
    updatedBtnObj = {
        _id: $scope.selectedEntity._id,
        updatedVal: {
            target: targetSceneId
        }
    }
*/
function updateButton(sceneid, updatedBtnObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      updateButtonLocal(sceneid, updatedBtnObj);
      updateButtonNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "buttonid": updatedBtnObj._id
      }, updatedBtnObj.updatedVal).then(
        (responseNewImage) => {
          //   const obj = {
          //     operation: 'PUT',
          //     project_id: factory.project._id,
          //     scene_id: sceneid,
          //     object_type: 'switchbutton',
          //     updated_obj: JSON.parse(angular.toJson(updatedBtnObj))
          //   };
          //   updateLiveProjChangesToFirebase(obj);
          resolve(responseNewImage);
        },
        (error) => {
          //   message = "Error: " + error.status + " " + error.statusText;
        }
      );
    }).catch((err) => {});
  });
}

function deleteButton(sceneid, buttonid) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      deleteButtonNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "buttonid": buttonid
      }).then(
        (response) => {
          if (deleteButtonLocal(sceneid, buttonid)) {
            // const obj = {
            //   operation: 'DELETE',
            //   project_id: factory.project._id,
            //   scene_id: sceneid,
            //   object_type: 'switchbutton',
            //   updated_obj: buttonid
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

export {
  createButton,
  deleteButton,
  updateButton,
  duplicateButton
}

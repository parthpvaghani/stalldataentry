/* eslint-disable no-unused-vars */
import {
  createAudioPALocal,
  deleteAudioPALocal,
  updateAudioPALocal,
  duplicateAudioPALocal
} from './project-local-factory';
import {
  createAudioPANetwork,
  deleteAudioPANetwork,
  updateAudioPANetwork,
  duplicateAudioPANetwork
} from './project-network';
import {
  factory
} from './create-factory';
import {
  guid,
  getUserToken
} from './util-factory';

function createAudioPA(sceneid, newAudioPA) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      createAudioPANetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid
      }, newAudioPA).then(
        (responseNewAudioPA) => {
          if (createAudioPALocal(sceneid, responseNewAudioPA.data)) {
            // var obj = {
            //   operation: 'POST',
            //   project_id: createFactory.project._id,
            //   scene_id: sceneid,
            //   object_type: 'switchbutton',
            //   updated_obj: JSON.parse(angular.toJson(responseNewButton))
            // };
            // projectFactory.updateLiveProjChangesToFirebase(obj);
            resolve(responseNewAudioPA);
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
};

/*
    updatedBtnObj = {
        _id: $scope.selectedEntity._id,
        updatedVal: {
            target: targetSceneId
        }
    }
*/
function updateAudioPA(sceneid, updatedAudioPAObj) {

  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      updateAudioPALocal(sceneid, updatedAudioPAObj);
      updateAudioPANetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "audiopaid": updatedAudioPAObj._id
      }, updatedAudioPAObj.updatedVal).then(
        (response) => {
          // var obj = {
          //   operation: 'PUT',
          //   project_id: createFactory.project._id,
          //   scene_id: sceneid,
          //   object_type: 'audiopa',
          //   updated_obj: JSON.parse(angular.toJson(updatedAudioPAObj))
          // };
          // projectFactory.updateLiveProjChangesToFirebase(obj);
          resolve(response);
        },
        (error) => {
          //   message = "Error: " + error.status + " " + error.statusText;
        }
      );
    }).catch((err) => {});
  });
};



function deleteAudioPA(sceneid, audiopaid) {

  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      deleteAudioPANetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "audiopaid": audiopaid
      }).then(
        (response) => {
          if (deleteAudioPALocal(sceneid, audiopaid)) {
            // var obj = {
            //   operation: 'DELETE',
            //   project_id: createFactory.project._id,
            //   scene_id: sceneid,
            //   object_type: 'switchbutton',
            //   updated_obj: audiopaid
            // };
            // projectFactory.updateLiveProjChangesToFirebase(obj);
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
};

export {
  createAudioPA,
  deleteAudioPA,
  updateAudioPA
}

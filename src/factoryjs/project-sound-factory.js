/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import {
  updateProjectSoundLocal
} from './project-local-factory';
import {
  updateProjectSoundNetwork
} from './project-network';
import {
  factory
} from './create-factory';
import {
  getUserToken
} from './util-factory';

function updateProjectSound(updatedProjectSoundObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      updateProjectSoundLocal(updatedProjectSoundObj);
      updateProjectSoundNetwork({
        "projectid": factory.project._id,
        "token": token
      }, updatedProjectSoundObj).then(
        (response) => {
          // const obj = {
          //   operation: 'PUT',
          //   project_id: factory.project._id,
          //   scene_id: sceneid,
          //   object_type: 'widgetimage',
          //   updated_obj: JSON.parse(angular.toJson(updatedImgObj))
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
}

export {
  updateProjectSound
}

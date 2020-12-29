/* eslint-disable no-unused-vars */
import {
  createFixedTextLocal,
  deleteFixedTextLocal,
  updateFixedTextLocal,
  duplicateFixedTextLocal
} from './project-local-factory';
import {
  createFixedTextNetwork,
  deleteFixedTextNetwork,
  updateFixedTextNetwork,
  duplicateFixedTextNetwork
} from './project-network';
import {
  factory
} from './create-factory';
import {
  guid,
  getUserToken
} from './util-factory';


function duplicateFixedText(sceneid, fixedTextObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      duplicateFixedTextNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid
      }, fixedTextObj).then(
        (responseNewFixedText) => {
          if (duplicateFixedTextLocal(sceneid, responseNewFixedText.data)) {
            resolve(responseNewFixedText);
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

function createFixedText(sceneid, fixedTextObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      createFixedTextNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid
      }, fixedTextObj).then(
        (responseNewFixedText) => {
          if (createFixedTextLocal(sceneid, responseNewFixedText.data)) {
            // var obj = {
            //     operation: 'POST',
            //     project_id: createFactory.project._id,
            //     scene_id: sceneid,
            //     object_type: 'widgetfixedtext',
            //     updated_obj: JSON.parse(angular.toJson(responseNewFixedText))
            // };
            // projectFactory.updateLiveProjChangesToFirebase(obj);
            resolve(responseNewFixedText);
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


function updateFixedText(sceneid, updatedFixedTextObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      updateFixedTextLocal(sceneid, updatedFixedTextObj);
      updateFixedTextNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "fixedtextid": updatedFixedTextObj._id
      }, updatedFixedTextObj.updatedVal).then(
        (responseNewImage) => {
          resolve(responseNewImage);
        },
        (error) => {
          //   message = "Error: " + error.status + " " + error.statusText;
        }
      );
    }).catch((err) => {});
  });
};

function deleteFixedText(sceneid, fixedtextid) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      deleteFixedTextNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "fixedtextid": fixedtextid
      }).then(
        (response) => {
          if (deleteFixedTextLocal(sceneid, fixedtextid)) {
            // var obj = {
            //     operation: 'DELETE',
            //     project_id: createFactory.project._id,
            //     scene_id: sceneid,
            //     object_type: 'widgetfixedtext',
            //     updated_obj: fixedtextid
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
}

export {
  createFixedText,
  deleteFixedText,
  updateFixedText,
  duplicateFixedText
}

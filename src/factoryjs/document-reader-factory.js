/* eslint-disable no-unused-vars */
import {
  createDocumentLocal,
  deleteDocumentLocal,
  updateDocumentLocal,
  duplicateDocumentLocal
} from './project-local-factory';
import {
  createDocumentNetwork,
  deleteDocumentNetwork,
  updateDocumentNetwork,
  duplicateDocumentNetwork
} from './project-network';
import {
  factory
} from './create-factory';
import {
  guid,
  getUserToken
} from './util-factory';

function duplicateDocument(sceneid, documentObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      duplicateDocumentNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid
      }, documentObj).then(
        (responseNewDocument) => {
          if (duplicateDocumentNetwork(sceneid, responseNewDocument.data)) {
            resolve(responseNewDocument);
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

function createDocument(sceneid, documentObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      createDocumentNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid
      }, documentObj).then(
        (responseNewDocument) => {
          if (createDocumentLocal(sceneid, responseNewDocument.data)) {
            // let obj = {
            //   operation: 'POST',
            //   project_id: factory.project._id,
            //   scene_id: sceneid,
            //   object_type: 'widgetdocument',
            //   updated_obj: JSON.parse(angular.toJson(responseNewDocument))
            // };
            resolve(responseNewDocument);
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

function updateDocument(sceneid, updatedDocumentObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      updateDocumentLocal(sceneid, updatedDocumentObj);
      updateDocumentNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "documentid": updatedDocumentObj._id
      }, updatedDocumentObj.updatedVal).then(
        (response) => {
          resolve(response);
        },
        (error) => {
          //   message = "Error: " + error.status + " " + error.statusText;
        }
      );
    }).catch((err) => {});
  });
}

function deleteDocument(sceneid, documentid) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      deleteDocumentNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "documentid": documentid
      }).then(
        (response) => {
          if (deleteDocumentLocal(sceneid, documentid)) {
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
  createDocument,
  deleteDocument,
  updateDocument,
  duplicateDocument
}

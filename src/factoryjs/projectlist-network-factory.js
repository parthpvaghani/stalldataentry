/* eslint-disable no-unused-vars */
import config from '../common/utils/base-urls';
import mrc from '../common/network/melzo-rest-client';
import firebase from '../firebase';

function getprojectsNetwork(obj) {
  return new Promise((resolve, reject) => {
    mrc
      // .get(config.serverUrl + `aepc_projects/all/${obj.category}/${obj.type}/${obj.startindex}/${obj.count}`, {
      .get(config.serverUrl + `aepc_projects/all/${obj.category}/${obj.startindex}/${obj.count}`, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function deleteprojectsNetwork(obj) {
  return new Promise((resolve, reject) => {
    mrc
      .delete(config.serverUrl + `aepc_projects`, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function postProjectNetwork(obj, newProj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects`, newProj, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function getProjectNetwork(obj) {
  return new Promise((resolve, reject) => {
    mrc
      .get(config.serverUrl + `aepc_projects/${obj.projectid}`, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function duplicateProjectNetwork(obj, duplicateProjObj) {
  return new Promise((resolve, reject) => {
    mrc
      .post(config.serverUrl + `aepc_projects/${obj.projectid}/duplicate`, duplicateProjObj, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function updateProjectNetwork(obj, updatedProject) {
  return new Promise((resolve, reject) => {
    mrc
      .put(config.serverUrl + `aepc_projects/${obj.projectid}`, updatedProject, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function deleteProjectNetwork(obj) {
  console.log("ON network OBJECT :: ", obj.projectid.projectid)
  return new Promise((resolve, reject) => {
    mrc
      .delete(config.serverUrl + `aepc_projects/${obj.projectid.projectid}`, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function compareProjectVersionNetwork(obj) {
  return new Promise((resolve, reject) => {
    mrc
      .get(config.serverUrl + `aepc_projects/${obj.projectid}/checkversion/${obj.version}`, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function updateScenesOrderNetwork(obj, updatedOrderObj) {
  return new Promise((resolve, reject) => {
    mrc
      .put(config.serverUrl + `aepc_projects/${obj.projectid}/sceneorder`, updatedOrderObj, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function addStarNetwork(obj) {
  return new Promise((resolve, reject) => {
    mrc
      .put(config.serverUrl + `aepc_projects/${obj.projectid}/stars`, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function removeStarNetwork(obj) {
  return new Promise((resolve, reject) => {
    mrc
      .delete(config.serverUrl + `aepc_projects/${obj.projectid}/stars`, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function getViewNetwork(obj) {
  return new Promise((resolve, reject) => {
    mrc
      .get(config.serverUrl + `aepc_projects/${obj.projectid}/views`, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function getStarNetwork(obj) {
  return new Promise((resolve, reject) => {
    mrc
      .get(config.serverUrl + `aepc_projects/${obj.projectid}/stars`, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export {
  updateProjectNetwork,
  getStarNetwork,
  getprojectsNetwork,
  deleteprojectsNetwork,
  getProjectNetwork,
  postProjectNetwork,
  duplicateProjectNetwork,
  deleteProjectNetwork,
  compareProjectVersionNetwork,
  updateScenesOrderNetwork,
  addStarNetwork,
  removeStarNetwork,
  getViewNetwork
}

/* eslint-disable no-unused-vars */
import {
  createNavMenuLocal,
  deleteNavMenuLocal,
  updateNavMenuLocal,
  duplicateNavMenuLocal,
  createNavMenuCellLocal,
  updateNavMenuCellLocal,
  deleteNavMenuCellLocal
} from './project-local-factory';
import {
  createNavMenuNetwork,
  deleteNavMenuNetwork,
  updateNavMenuNetwork,
  duplicateNavMenuNetwork,
  createNavMenuCellNetwork
} from './project-network';
import {
  factory
} from './create-factory';
import {
  guid,
  getUserToken
} from './util-factory';


// const currCellPlaceHolderIndex;
// const prevCellPlaceHolderIndex;

// const navMenu;

const themeTypes = {
  LINEAR: "linear",
  CIRCULAR: "circular",
  RADIAL: "radial"
};

function getNewCell(index) {
  return {
    value: 'Menu',
    target: '',
    iconSrc: '',
    modifiedPosIndex: index,
    background: {
      color: '#0F1619'
    }
  };
}

function updateNavMenu(sceneid, updatedNavMenuObj) {
  // thisupdateNavMenuLocal(null, updatedNavMenuObj);
  // thisupdateNavMenuNetwork(updatedNavMenuObj);
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      updateNavMenuNetwork({
        "projectid": factory.project._id,
        "token": token
      }, updatedNavMenuObj.updatedVal).then(
        (updatedNavMenu) => {
          resolve(updatedNavMenu);
          if (updateNavMenuLocal(updatedNavMenuObj)) {
            resolve(updatedNavMenu);
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

function thisupdateNavMenuLocal(sceneid, updatedNavMenuObj) {
  updateNavMenuLocal(updatedNavMenuObj);
}

function thisupdateNavMenuNetwork(updatedNavMenuObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      updateNavMenuNetwork({
        "projectid": factory.project._id,
        "token": token
      }, updatedNavMenuObj.updatedVal).then(
        (updatedNavMenu) => {
          resolve(updatedNavMenu);
        },
        (error) => {
          //   message = "Error: " + error.status + " " + error.statusText;
        }
      );
    }).catch((err) => {});
  });
}

function createNavMenuCell(newNavMenuCellObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      createNavMenuCellNetwork({
        "projectid": factory.project._id,
        "token": token
      }, newNavMenuCellObj).then(
        (newNavMenuCell) => {
          if (createNavMenuCellLocal(newNavMenuCell.data)) {
            resolve(newNavMenuCell);
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

function updateNavMenuCell(sceneid, updatedNavMenuObj) {
  updateNavMenuCellLocal(updatedNavMenuObj);
  const obj = {
    updatedVal: {
      cells: factory.navMenu.cells
    }
  }
  updateNavMenuNetwork(obj);
}

function deleteNavMenuCell(sceneid, cellid) {
  deleteNavMenuCellLocal(sceneid, cellid);
  // TODO: Delete API
  const obj = {
    updatedVal: {
      cells: factory.navMenu.cells
    }
  }
  updateNavMenuNetwork(obj);
}

export {
  updateNavMenu,
  createNavMenuCell,
  updateNavMenuCell,
  deleteNavMenuCell
}

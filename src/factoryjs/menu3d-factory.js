/* eslint-disable no-unused-vars */
import {
  createMenu3dLocal,
  deleteMenu3dLocal,
  updateMenu3dLocal,
  duplicateMenu3dLocal,
  createMenu3dCellLocal,
  deleteMenu3dCellLocal,
  updateMenu3dCellLocal,
  duplicateMenu3dCellLocal,
  updateMenu3dHomeCellLocal
} from './project-local-factory';
import {
  createMenu3dNetwork,
  deleteMenu3dNetwork,
  updateMenu3dNetwork,
  duplicateMenu3dNetwork,
  createMenu3dCellNetwork,
  deleteMenu3dCellNetwork,
  updateMenu3dCellNetwork,
  duplicateMenu3dCellNetwork
} from './project-network';
import {
  factory
} from './create-factory';
import {
  guid,
  getReticlePositionObj,
  getUserToken
} from './util-factory';

const emptyCellModifiedPosIndex = 1000000;

/** 
 * Refactor: 1.Replace 'homeLogo' with 'homeCell'
 *           2.Replace 'modifiedPosIndex' with 'sequenceIndex'
 *           3.Replace 'spacing' with margin
 */

function getNewMenu3dCell(cell) {
  return {
    iconSrc: '',
    target: '',
    text: {
      value: cell.text.value,
      color: 'white',
    },
    background: {
      color: '#0F1619'
    },
    themes: {
      linear: {
        modifiedPosIndex: cell.themes.linear.modifiedPosIndex
      },
      radial: {
        modifiedPosIndex: cell.themes.radial.modifiedPosIndex
      }
    }
  };
};

function getNewMenu3d() {
  return {
    enable3d: true,
    animation: {
      enabled: false,
      easing: 'ease-in-out-back',
      triggerTheta: 60
    },
    homeLogo: {
      _id: guid(),
      src: "",
      target: "",
      width: 2,
      height: 2,
      themes: {
        'linear': {
          modifiedPosIndex: 2
        },
        'radial': {
          modifiedPosIndex: 0
        }
      }
    },
    position: getReticlePositionObj(10),
    scale: {
      x: 0.7,
      y: 0.7,
      z: 0.7
    },
    depth: 10,
    textScale: 2.5,
    themeType: 'radial',
    themes: {
      linear: {
        spacing: 0.5,
        height: 1.5,
        width: 3,
        minModifiedPosIndex: 0, // min( min(cell's modifiedPosIndex), homeLogo's modifiedPosIndex)
        maxModifiedPosIndex: 4 // min( min(cell's modifiedPosIndex), homeLogo's modifiedPosIndex)
      },
      radial: {
        rotation: {
          x: 0,
          y: 0,
          z: -90
        },
        thetaStart: 0,
        thetaEnd: 360,
        thetaMargin: 5,
        radiusInner: 2,
        radiusOuter: 4
      }
    },
    cells: [
      getNewMenu3dCell({
        text: {
          value: 'menu1'
        },
        themes: {
          linear: {
            modifiedPosIndex: 0
          },
          radial: {
            modifiedPosIndex: 0
          }
        }
      }),
      getNewMenu3dCell({
        text: {
          value: 'menu2'
        },
        themes: {
          linear: {
            modifiedPosIndex: 1
          },
          radial: {
            modifiedPosIndex: 1
          }
        }
      }),
      getNewMenu3dCell({
        text: {
          value: 'menu3'
        },
        themes: {
          linear: {
            modifiedPosIndex: 3
          },
          radial: {
            modifiedPosIndex: 2
          }
        }
      }),
      getNewMenu3dCell({
        text: {
          value: 'menu4'
        },
        themes: {
          linear: {
            modifiedPosIndex: 4
          },
          radial: {
            modifiedPosIndex: 3
          }
        }
      })
    ]
  };
};

function duplicateMenu3d(sceneid, menu3dObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      duplicateMenu3dNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid
      }, menu3dObj).then(
        (responseNewMenu3d) => {
          if (duplicateMenu3dLocal(sceneid, responseNewMenu3d.data)) {
            resolve(responseNewMenu3d);
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

function createMenu3d(sceneid, menu3dObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      createMenu3dNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid
      }, menu3dObj).then(
        (responseNewMenu3d) => {
          if (createMenu3dLocal(sceneid, responseNewMenu3d.data)) {
            resolve(responseNewMenu3d);
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

function updateMenu3d(sceneid, updatedMenu3dObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      updateMenu3dNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "menu3did": updatedMenu3dObj._id
      }, updatedMenu3dObj.updatedVal).then(
        (updatedMenu3d) => {
          updateMenu3dLocal(sceneid, updatedMenu3dObj);
          resolve(updatedMenu3d);
        },
        (error) => {
          //   message = "Error: " + error.status + " " + error.statusText;
        }
      );
    }).catch((err) => {});
  });
}

function deleteMenu3d(sceneid, menu3did) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      deleteMenu3dNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "menu3did": menu3did
      }).then(
        (response) => {
          if (deleteMenu3dLocal(sceneid, menu3did)) {
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

function createMenu3dCell(sceneid, menu3did, newMenu3dCellObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      createMenu3dCellNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "menu3did": menu3did
      }, newMenu3dCellObj).then(
        (responseNewMenu3dCell) => {
          if (createMenu3dCellLocal(sceneid, menu3did, responseNewMenu3dCell.data)) {
            resolve(responseNewMenu3dCell);
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

function updateMenu3dCell(sceneid, updatedMenu3dCellObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      updateMenu3dCellNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "menu3did": updatedMenu3dCellObj.menu3dId,
        "menu3dcellid": updatedMenu3dCellObj._id
      }, updatedMenu3dCellObj.updatedVal).then(
        (updatedMenu3dCell) => {
          if (updateMenu3dCellLocal(sceneid, updatedMenu3dCellObj.menu3dId, updatedMenu3dCellObj)) {
            resolve(updatedMenu3dCell);
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

function deleteMenu3dCell(sceneid, menu3did, menu3dcellid) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      deleteMenu3dCellNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "menu3did": menu3did,
        "menu3dcellid": menu3dcellid
      }).then(
        (response) => {
          if (deleteMenu3dCellLocal(sceneid, menu3did, menu3dcellid)) {
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

function updateMenu3dHome(sceneid, updatedMenu3dObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      updateMenu3dNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "menu3did": updatedMenu3dObj.menu3dId
      }, updatedMenu3dObj.updatedVal).then(
        (updatedMenu3d) => {
          if (updateMenu3dHomeCellLocal(sceneid, updatedMenu3dObj.menu3dId, updatedMenu3dObj.updatedVal.homeLogo)) {
            resolve(updatedMenu3d);
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

function onMenu3dCellDelete(menu3d, deletedMenu3dCell) {
  // menu3d-theme-linear
  const themeType = 'linear';
  // cell
  for (let i = menu3d.cells.length - 1; i >= 0; i -= 1) {
    if (menu3d.cells[i].themes.linear.modifiedPosIndex === emptyCellModifiedPosIndex) continue;
    if (menu3d.cells[i].themes.linear.modifiedPosIndex > deletedMenu3dCell.themes.linear.modifiedPosIndex) {
      this.menu3d.cells[i].themes.linear.modifiedPosIndex -= 1;
    }
  }
  // homeCell
  if (menu3d.homeLogo.themes.linear.modifiedPosIndex > deletedMenu3dCell.themes.linear.modifiedPosIndex) {
    this.menu3d.homeLogo.themes.linear.modifiedPosIndex -= 1;
  }
  if (deletedMenu3dCell.themes.linear.modifiedPosIndex === menu3d.themes.linear.minModifiedIndex) {
    this.menu3d.themes.linear.minModifiedIndex += 1;
  } else if (deletedMenu3dCell.themes.linear.modifiedPosIndex <= menu3d.themes.linear.maxModifiedPosIndex) {
    this.menu3d.themes.linear.maxModifiedPosIndex -= 1;
  }
  // menu3d-theme-radial
  // Decrement the modifiedPosIndex of cells having modifiedPosIndex greater than deleleted.
  for (let i = menu3d.cells.length - 1; i >= 0; i -= 1) {
    if (menu3d.cells[i].themes.radial.modifiedPosIndex > deletedMenu3dCell.themes.radial.modifiedPosIndex) {
      this.menu3d.cells[i].themes.radial.modifiedPosIndex -= 1;
    }
  }
}

export {
  getNewMenu3d,
  duplicateMenu3d,
  createMenu3d,
  updateMenu3d,
  deleteMenu3d,
  createMenu3dCell,
  updateMenu3dCell,
  deleteMenu3dCell,
  updateMenu3dHome,
  onMenu3dCellDelete,
  getNewMenu3dCell,
  emptyCellModifiedPosIndex
}

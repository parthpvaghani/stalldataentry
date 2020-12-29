/* eslint-disable no-unused-vars */
import {
  createGridLocal,
  deleteGridLocal,
  updateGridLocal,
  duplicateGridLocal,
  createGridCellLocal,
  deleteGridCellLocal,
  updateGridCellLocal,
  duplicateGridCellLocal
} from './project-local-factory';
import {
  createGridNetwork,
  deleteGridNetwork,
  updateGridNetwork,
  duplicateGridNetwork,
  createGridCellNetwork,
  deleteGridCellNetwork,
  updateGridCellNetwork,
  duplicateGridCellNetwork
} from './project-network';
import {
  factory
} from './create-factory';
import {
  guid,
  getReticlePositionObj,
  getReticlePosition,
  getUserToken
} from './util-factory';

const headerRatio = 0.1;

const currentGrid = {};

const defaultCellObj = {
  title: "",
  target: "",
  src: ""
};

function duplicateGrid(sceneid, gridObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      duplicateGridNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid
      }, gridObj).then(
        (responseNewGrid) => {
          if (duplicateGridLocal(sceneid, responseNewGrid.data)) {
            resolve(responseNewGrid);
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

function createGrid(sceneid, gridObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      createGridNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid
      }, gridObj).then(
        (responseNewGrid) => {
          if (createGridLocal(sceneid, responseNewGrid.data)) {
            resolve(responseNewGrid);
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

function updateGrid(sceneid, updatedGridObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      updateGridNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "gridid": updatedGridObj._id
      }, updatedGridObj.updatedVal).then(
        (updatedGrid) => {
          updateGridLocal(sceneid, updatedGridObj);
          resolve(updatedGrid);
        },
        (error) => {
          //   message = "Error: " + error.status + " " + error.statusText;
        }
      );
    }).catch((err) => {});
  });
}

function deleteGrid(sceneid, gridid) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      deleteGridNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "gridid": gridid
      }).then(
        (response) => {
          if (deleteGridLocal(sceneid, gridid)) {
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


function createGridCell(sceneid, gridid, newGridCellObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      createGridCellNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "gridid": gridid
      }, newGridCellObj).then(
        (responseNewGridCell) => {
          if (createGridCellLocal(sceneid, gridid, responseNewGridCell.data)) {
            resolve(responseNewGridCell);
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


function updateGridCell(sceneid, updatedGridCellObj) {
  return new Promise((resolve, reject) => {
    updateGridCellLocal(sceneid, updatedGridCellObj.gridId, updatedGridCellObj);
    getUserToken().then((token) => {
      updateGridCellNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "gridid": updatedGridCellObj.gridId,
        "gridcellid": updatedGridCellObj._id
      }, updatedGridCellObj.updatedVal).then(
        (updatedGridCell) => {
          resolve(updatedGridCell);
        },
        (error) => {
          //   message = "Error: " + error.status + " " + error.statusText;
        }
      );
    }).catch((err) => {});
  });
}

function deleteGridCell(sceneid, gridid, gridcellid) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      deleteGridCellNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "gridid": gridid,
        "gridcellid": gridcellid
      }).then(
        (response) => {
          if (deleteGridCellLocal(sceneid, gridid, gridcellid)) {
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

function getGridDimension(selectedImgsLen) {
  const sqrt = Math.sqrt(selectedImgsLen);
  const thisCols = Math.ceil(sqrt); // columns because since Math.ceil(sqrt) will always be greater than or equal to Math.ceil(selectedImgsLen / cols);
  const thisRows = Math.ceil(selectedImgsLen / thisCols);
  return {
    rows: thisRows,
    cols: thisCols
  }
}

function prepareNewGrid(selectedImgs) {
  return new Promise((resolve, reject) => {
    const gridDimension = getGridDimension(selectedImgs.length);
    const defaultDepth = 20;
    const newGridPlane = {
      title: {
        text: 'Grid',
        color: 'white',
        fontsize: '22',
        fontfamily: 'roboto'
      },
      position: getReticlePosition(defaultDepth),
      scale: 1.5,
      rows: gridDimension.rows,
      cols: gridDimension.cols,
      padding: 2,
      cellProperties: {
        margin: 2
      },

      planeProperties: {
        color: "black",
        opacity: 0.3,
        thetaLength: 40,
        radius: defaultDepth,
        height: 10
      }
    };

    const cells = [];
    for (let row = 0; row < newGridPlane.rows; row += 1) {
      for (let col = 0; col < newGridPlane.cols; col += 1) {
        const index = row * newGridPlane.cols + col;
        cells.push({
          title: {
            text: 'Cell',
            color: 'white',
            fontsize: '2',
            fontfamily: 'roboto'
          },
          target: "",
          src: (selectedImgs[index] ? selectedImgs[index] : ""),
          rowIndex: row,
          colIndex: col
        });
      }
    };
    newGridPlane.cells = cells;
    newGridPlane.title.position = {
      x: 0,
      y: newGridPlane.planeProperties.height * 0.35,
      z: newGridPlane.planeProperties.radius
    };
    resolve(newGridPlane)
  });
}

function prepareNewGridCell() {
  return new Promise((resolve, reject) => {
    const thisRows = factory.selectedEntity.obj.rows;
    const thisCols = factory.selectedEntity.obj.cols;

    const arrCellExist = {};
    for (let i = thisCols - 1; i >= 0; i -= 1) {
      for (let j = thisRows - 1; j >= 0; j -= 1) {
        arrCellExist[j * thisCols + i] = false;
      }
    }

    for (let i = factory.selectedEntity.obj.cells.length - 1; i >= 0; i -= 1) {
      arrCellExist[factory.selectedEntity.obj.cells[i].rowIndex * thisCols + factory.selectedEntity.obj.cells[i].colIndex] = true;
    }

    let newRowIndex = thisRows - 1;
    let newColIndex = -1;

    for (let i = thisCols - 1; i >= 0; i -= 1) {
      for (let j = thisRows - 1; j >= 0; j -= 1) {
        if (!arrCellExist[j * thisCols + i]) {
          newRowIndex = j;
          newColIndex = i;
        }
      }
    }

    const newGridCell = {
      title: {
        text: "Cell Title",
        color: "white",
        fontsize: 2,
        fontfamily: "roboto"
      },
      rowIndex: newRowIndex,
      colIndex: newColIndex,
      src: "image/public/image2d/38f60e0a-954a-4322-a098-2414bf1dd1dd.jpg"
    };

    if (newColIndex === -1) {
      const updatedGrid = factory.selectedEntity.obj;
      updatedGrid.cols += 1;
      updatedGrid.planeProperties.thetaLength = getPlaneThetaLength(updatedGrid);
      for (let i = updatedGrid.cells.length - 1; i >= 0; i -= 1) {
        updatedGrid.cells[i].colIndex += 1;
      }

      const updatedGridObj = {
        _id: updatedGrid._id,
        updatedVal: updatedGrid
      }

      updateGrid(factory.currentSceneId, updatedGridObj)
        .then(() => {
          newGridCell.colIndex = 0;
          resolve(newGridCell);
        });

    } else {
      resolve(newGridCell);
    }
  });
}

function getCellsinRow(gridModel, rowIndex) {
  const cells = [];
  for (let i = gridModel.cells.length - 1; i >= 0; i -= 1) {
    if (gridModel.cells[i].rowIndex === rowIndex) {
      cells.push(gridModel.cells[i]);
    }
  }
  return cells;
}

function getCellsInColumn(gridModel, colIndex) {
  const cells = [];
  for (let i = gridModel.cells.length - 1; i >= 0; i -= 1) {
    if (gridModel.cells[i].colIndex === colIndex) {
      cells.push(gridModel.cells[i]);
    }
  }
  return cells;
}

function getPlaneThetaLength(gridModel) {
  return (gridModel.cols * (gridModel.cellProperties.thetaLength + (2 * gridModel.margin))) + (2 * gridModel.padding);
}

function getPlaneHeight(gridModel) {
  return (1 / (1 - headerRatio)) * (gridModel.padding + ((gridModel.rows) * (gridModel.height + thetaToArcLength(gridModel, 2 * gridModel.margin))));
}

function headerHeight(gridModel) {
  return headerRatio * gridModel.height;
}

function bodyHeight(gridModel) {
  return (1 - headerRatio) * gridModel.height;
}

function thetaToArcLength(gridModel, theta) {
  return theta * gridModel.radius * 3.14 / 180;
}

function getCellPositionX(gridModel, colNum, gridcellposition) {
  if (gridcellposition === 'gridcellposition') {
    let theta = ((colNum - (gridModel.cols / 2)) * (gridModel.itemProps.thetaLength + (2 * gridModel.margin)));
    theta += gridModel.margin;
    theta += gridModel.itemProps.thetaLength / 2;
    const x = gridModel.radius * Math.tan(theta * (3.14 / 180));
    return x;
  }
  let theta = ((colNum - (gridModel.cols / 2)) * (gridModel.cellProperties.thetaLength + (2 * gridModel.margin)));
  theta += gridModel.margin;
  theta += gridModel.cellProperties.thetaLength / 2;
  const x = gridModel.radius * Math.tan(theta * (3.14 / 180));
  return x;
}

function getCellPosition(gridModel, rowNum) {
  let y = ((rowNum - ((gridModel.rows - 1) / 2)) * (gridModel.height + thetaToArcLength(gridModel, 2 * gridModel.margin)));
  y -= headerHeight(gridModel) / 2;
  return {
    'x': 0,
    'y': y,
    'z': 0
  };
}

function getCellThetaLength(gridModel) {
  return ((gridModel.cellProperties.thetaLength - (2 * gridModel.padding)) / gridModel.cols) - (2 * gridModel.margin);
}

function getCellHeight(gridModel) {
  return (((bodyHeight(gridModel) - gridModel.padding) / gridModel.rows) - thetaToArcLength(gridModel, 2 * gridModel.cellProperties.margin));
}

function getCellThetaStart(gridModel, colNum) {
  let thetaStart = ((colNum - (gridModel.cols / 2)) * (gridModel.cellProperties.thetaLength + (2 * gridModel.cellProperties.margin)));
  thetaStart += gridModel.cellProperties.margin;
  return thetaStart;
}

function getCellDragPlanePosition(gridModel, row, col, gridcellposition) {
  const pos = new THREE.Vector2(
    getCellPositionX(gridModel, col, gridcellposition),
    gridModel.radius
  );

  pos.normalize();
  pos.multiplyScalar(gridModel.radius);

  return {
    x: pos.getComponent(0),
    y: getCellPosition(gridModel, row).y,
    z: pos.getComponent(1)
  };
}

export {
  createGrid,
  deleteGrid,
  updateGrid,
  duplicateGrid,
  createGridCell,
  deleteGridCell,
  updateGridCell,
  prepareNewGrid,
  prepareNewGridCell,
  getCellsinRow,
  getCellsInColumn,
  getCellDragPlanePosition,
  getCellThetaLength,
  getCellThetaStart,
  getPlaneHeight,
  getCellHeight,
  getCellPosition
}

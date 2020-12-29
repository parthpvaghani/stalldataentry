/* eslint-disable no-unused-vars */
import {
  createCarouselLocal,
  deleteCarouselLocal,
  updateCarouselLocal,
  duplicateCarouselLocal,
  createCarouselItemLocal,
  deleteCarouselItemLocal,
  updateCarouselItemLocal,
  duplicateCarouselItemLocal,
  updateCarouselItemOrderLocal
} from './project-local-factory';
import {
  createCarouselNetwork,
  deleteCarouselNetwork,
  updateCarouselNetwork,
  duplicateCarouselNetwork,
  createCarouselItemNetwork,
  deleteCarouselItemNetwork,
  updateCarouselItemNetwork,
  duplicateCarouselItemNetwork,
  updateCarouselItemOrderNetwork
} from './project-network';
import {
  factory
} from './create-factory';
import {
  guid,
  getReticlePositionObj,
  getUserToken
} from './util-factory';

const currentCarousel = {};

const defaultCarouselItem = {
  title: "",
  subTitle: "",
  target: "",
  src: ""
};

function duplicateCarousel(sceneid, carouselObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      duplicateCarouselNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid
      }, carouselObj).then(
        (responseNewCarousel) => {
          if (duplicateCarouselLocal(sceneid, responseNewCarousel.data)) {
            resolve(responseNewCarousel);
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

function createCarousel(sceneid, carouselObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      createCarouselNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid
      }, carouselObj).then(
        (responseNewCarousel) => {
          if (createCarouselLocal(sceneid, responseNewCarousel.data)) {
            resolve(responseNewCarousel);
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

function updateCarousel(sceneid, updatedCarouselObj) {

  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      updateCarouselNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "carouselid": updatedCarouselObj._id
      }, updatedCarouselObj.updatedVal).then(
        (response) => {
          updateCarouselLocal(sceneid, updatedCarouselObj);
          resolve(response);
        },
        (error) => {
          //   message = "Error: " + error.status + " " + error.statusText;
        }
      );
    }).catch((err) => {});
  });
}

function deleteCarousel(sceneid, carouselid) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      deleteCarouselNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "carouselid": carouselid
      }).then(
        (response) => {
          if (deleteCarouselLocal(sceneid, carouselid)) {
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

function prepareNewCarousel(selectedImgs) {

  return new Promise((resolve, reject) => {
    const thisDepth = 20;
    const newCarousel = {
      position: getReticlePositionObj(thisDepth),
      depth: thisDepth,
      opacity: 1,
      width: 10,
      height: 10,
      autoSwitch: true,
      interval: 2
    };
    const carouselItems = [];
    for (let index = 0; index < selectedImgs.length; index += 1) {
      carouselItems.push({
        title: {
          text: 'Cell',
          color: 'white',
          fontsize: '2',
          fontfamily: 'roboto'
        },
        target: "",
        src: (selectedImgs[index] ? selectedImgs[index] : "")
      });
    }
    newCarousel.items = carouselItems;
    resolve(newCarousel)
  });
}

function createCarouselItem(carouselid, newCarouselItemObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      createCarouselItemNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": factory.currentSceneId,
        "carouselid": carouselid
      }, newCarouselItemObj).then(
        (responseNewCarouselItem) => {
          if (createCarouselItemLocal(factory.currentSceneId, carouselid, responseNewCarouselItem.data)) {
            resolve(responseNewCarouselItem);
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

function updateCarouselItem(updatedCarouselItemObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      updateCarouselItemNetwork({
        "token": token,
        "projectid": updatedCarouselItemObj.projectid,
        "sceneid": updatedCarouselItemObj.sceneid,
        "carouselid": updatedCarouselItemObj.carouselid,
        "carouselitemid": updatedCarouselItemObj.carouselitemid
      }, updatedCarouselItemObj.updatedVal).then(
        (response) => {
          updateCarouselItemLocal(updatedCarouselItemObj.sceneid, updatedCarouselItemObj.carouselid, updatedCarouselItemObj);
          resolve(response);
        },
        (error) => {
          //   message = "Error: " + error.status + " " + error.statusText;
        }
      );
    }).catch((err) => {});
  });
}

function updateCarouselItemsOrder(updatedCarouselItemObj) {

  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      updateCarouselItemOrderNetwork({
        "token": token,
        "projectid": updatedCarouselItemObj.projectid,
        "sceneid": updatedCarouselItemObj.sceneid,
        "carouselid": updatedCarouselItemObj.carouselid,
        "carouselitemid": updatedCarouselItemObj.carouselitemid
      }, updatedCarouselItemObj.updatedVal).then(
        (response) => {
          updateCarouselItemOrderLocal(updatedCarouselItemObj.sceneid, updatedCarouselItemObj.carouselid, response);
          document.querySelector('#carousel' + updatedCarouselItemObj.carouselid).emit('itemschanged', {}, false);
          resolve(response);
        },
        (error) => {
          //   message = "Error: " + error.status + " " + error.statusText;
        }
      );
    }).catch((err) => {});
  });
}

function deleteCarouselItem(carouselid, carouselitemid) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      deleteCarouselItemNetwork({
        "token": token,
        "projectid": factory.project._id,
        "sceneid": factory.currentSceneId,
        "carouselid": carouselid,
        "carouselitemid": carouselitemid
      }).then(
        (response) => {
          deleteCarouselItemLocal(factory.currentSceneId, carouselid, carouselitemid);
          resolve(response);
        },
        (error) => {
          //   message = "Error: " + error.status + " " + error.statusText;
        }
      );
    }).catch((err) => {});
  });
}

function prepareNewCarouselItem(url) {
  const newCarouselItem = {
    title: {
      text: 'Add Title',
      color: 'white',
      fontsize: '2',
      fontfamily: 'roboto'
    },
    target: "",
    src: url
  };
  return newCarouselItem;
}

export {
  duplicateCarousel,
  createCarousel,
  updateCarousel,
  deleteCarousel,
  prepareNewCarousel,
  createCarouselItem,
  updateCarouselItem,
  updateCarouselItemsOrder,
  deleteCarouselItem,
  prepareNewCarouselItem
}

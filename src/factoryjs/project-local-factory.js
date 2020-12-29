/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable one-var */
import {
  destroyProjectModal,
  currentScene,
  getScene,
  factory
} from './create-factory';
import {
  guid,
  getThumbnailUrl,
  getSceneIndex,
  getImageIndexUsingIds,
  getButtonIndexUsingIds,
  getGifIndexUsingIds,
  getSoundIndexUsingIds,
  getImagePopupIndexUsingIds,
  getVideoIndexUsingIds,
  getPopupIndexUsingIds,
  getFixedTextIndexUsingIds,
  getGrid,
  getGridIndex,
  getGridCell,
  getGridCellIndex,
  getCarousel,
  getCarouselIndex,
  getCarouselItem,
  getCarouselItemIndex,
  getGltfModelIndexUsingIds,
  getNavMenuCellIndexUsingIds,
  getDocumentIndexUsingIds,
  getMenu3d,
  getMenu3dIndex,
  getMenu3dCell,
  getMenu3dCellIndex,
  getAudioPAIndexUsingIds,
  getSceneUtils,
  getImage360ViewIndexUsingIds
} from './util-factory';

// ********************************** \/ Scene \/ ********************************** //

function duplicateSceneLocal(responseScene) {
  factory.project.scenes.push(responseScene.data);
}



function createSceneLocal(responseScene) {
  factory.project.scenes.push(responseScene.data);
};


function updateSceneLocal(updatedSceneObj) {
  const updatedScene = updatedSceneObj.updatedVal,
    sceneToUpdate = getScene(updatedScene.sceneid),
    filteredSceneToUpdate = sceneToUpdate,
    sceneDiff = AFRAME.utils.diff(filteredSceneToUpdate, updatedScene);
  for (const key in sceneDiff) {
    if (sceneDiff[key]) {
      if (JSON.toJson(filteredSceneToUpdate[key]) !== JSON.toJson(updatedScene[key])) {
        sceneToUpdate[key] = updatedScene[key];
      }
      if (key === 'bgimage' && updatedScene.srcType === 'bgImage') {
        if (sceneToUpdate.sceneid === currentScene()) {
          document.querySelector('a-scene').emit('updateSceneBackground', {
            'sceneid': updatedScene.sceneid
          });
        } else {
          document.querySelector('a-scene').emit('clearCubemapResStatus', {
            'sceneid': updatedScene.sceneid
          });
        }
      }
    } else {
      delete sceneToUpdate[key];
    }
  }
}

function deleteSceneLocal(sceneid) {
  const removedSceneIndex = getSceneIndex(factory.project.scenes, sceneid);
  if (removedSceneIndex >= 0) {
    factory.project.scenes.splice(removedSceneIndex, 1);
    return removedSceneIndex;
  }
  return null;
}

// ********************************** /\ Scene /\ ********************************** //

// ********************************** \/ Button \/ ********************************** //

function duplicateButtonLocal(sceneid, duplicateButton) {
  const sceneIndex = getSceneIndex(factory.project.scenes, sceneid);
  if (sceneIndex >= 0) {
    factory.project.scenes[sceneIndex].switchbuttons.push(duplicateButton);
    return true;
  }
  return false;
}

function createButtonLocal(sceneid, button) {
  const sceneIndex = getSceneIndex(factory.project.scenes, sceneid);
  if (sceneIndex >= 0) {
    factory.project.scenes[sceneIndex].switchbuttons.push(button);
    return true;
  }
  return false;
}

function updateButtonLocal(sceneid, updatedBtnObj) {
  const btnIndex = getButtonIndexUsingIds(factory.project.scenes, sceneid, updatedBtnObj._id);
  if (btnIndex >= 0) {
    for (const key in updatedBtnObj.updatedVal) {
      currentScene().switchbuttons[btnIndex][key] = updatedBtnObj.updatedVal[key];
    }
    return currentScene().switchbuttons[btnIndex];
  }
  return null;
}

function deleteButtonLocal(sceneid, buttonid) {
  const btnIndex = getButtonIndexUsingIds(factory.project.scenes, sceneid, buttonid);
  if (btnIndex >= 0) {
    currentScene().switchbuttons.splice(btnIndex, 1);
    return true;
  }
  return false;
}

// ********************************** /\ Button /\ ********************************** //

// ********************************** \/ Image2D \/ ********************************** //

function duplicateImageLocal(sceneid, dupImage) {
  const sceneIndex = getSceneIndex(factory.project.scenes, sceneid);
  if (sceneIndex >= 0) {
    factory.project.scenes[sceneIndex].images.push(dupImage);
    return true;
  }
  return false;

}

function createImageLocal(sceneid, image) {
  const sceneIndex = getSceneIndex(factory.project.scenes, sceneid);
  if (sceneIndex >= 0) {
    factory.project.scenes[sceneIndex].images.push(image);
    return true;
  }
  return false;
}

function updateImageLocal(sceneid, updatedImgObj) {
  const imgIndex = getImageIndexUsingIds(factory.project.scenes, sceneid, updatedImgObj._id);
  if (imgIndex >= 0) {
    for (const key in updatedImgObj.updatedVal) {
      currentScene().images[imgIndex][key] = updatedImgObj.updatedVal[key];
    }
    return currentScene().images[imgIndex];
  }
  return null;
}

function deleteImageLocal(sceneid, imageid) {
  const imgIndex = getImageIndexUsingIds(factory.project.scenes, sceneid, imageid);
  if (imgIndex >= 0) {
    currentScene().images.splice(imgIndex, 1);
    return true;
  }
  return false;
};

// ********************************** /\ Image2D /\ ********************************** //

// ********************************** \/ Image 360 View \/ ********************************** //

function createImage360ViewLocal(sceneid, image) {
  const sceneIndex = getSceneIndex(factory.project.scenes, sceneid);
  if (sceneIndex >= 0) {
    factory.project.scenes[sceneIndex].images360view.push(image);
    return true;
  }
  return false;
}

function updateImage360ViewLocal(sceneid, updatedImgObj) {
  const imgIndex = getImage360ViewIndexUsingIds(factory.project.scenes, sceneid, updatedImgObj._id);
  if (imgIndex >= 0) {
    for (const key in updatedImgObj.updatedVal) {
      currentScene().images360view[imgIndex][key] = updatedImgObj.updatedVal[key];
    }
    return currentScene().images360view[imgIndex];
  }
  return null;
}

function deleteImage360ViewLocal(sceneid, imageid) {
  const imgIndex = getImage360ViewIndexUsingIds(factory.project.scenes, sceneid, imageid);
  if (imgIndex >= 0) {
    currentScene().images360view.splice(imgIndex, 1);
    return true;
  }
  return false;
};

// ********************************** /\ Image 360 View /\ ********************************** //

// ********************************** \/ GIF \/ ********************************** //

function duplicateGifLocal(sceneid, dupGif) {
  const sceneIndex = getSceneIndex(factory.project.scenes, sceneid);
  if (sceneIndex >= 0) {
    factory.project.scenes[sceneIndex].gifs.push(dupGif);
    return true;
  }
  return false;
}

function createGifLocal(sceneid, gif) {
  const sceneIndex = getSceneIndex(factory.project.scenes, sceneid);
  if (sceneIndex >= 0) {
    factory.project.scenes[sceneIndex].gifs.push(gif);
    console.log('in project-local', factory.project);
    return true;
  }
  return false;
}

function updateGifLocal(sceneid, updatedGifObj) {
  const imgIndex = getGifIndexUsingIds(factory.project.scenes, sceneid, updatedGifObj._id);
  if (imgIndex >= 0) {
    for (const key in updatedGifObj.updatedVal) {
      currentScene().gifs[imgIndex][key] = updatedGifObj.updatedVal[key];
    }
    return currentScene().gifs[imgIndex];
  }
  return null;
}

function deleteGifLocal(sceneid, gifId) {
  const imgIndex = getGifIndexUsingIds(factory.project.scenes, sceneid, gifId);
  if (imgIndex >= 0) {
    currentScene().gifs.splice(imgIndex, 1);
    return true;
  }
  return false;
}

// ********************************** /\ GIF /\ ********************************** //

// ********************************** \/ SOUND \/ ********************************** //

function duplicateSoundLocal(sceneid, dupSound) {
  const sceneIndex = getSceneIndex(factory.project.scenes, sceneid);
  if (sceneIndex >= 0) {
    factory.project.scenes[sceneIndex].sounds.push(dupSound);
    return true;
  }
  return false;
}

function createSoundLocal(sceneid, sound) {
  const sceneIndex = getSceneIndex(factory.project.scenes, sceneid);
  if (sceneIndex >= 0) {
    factory.project.scenes[sceneIndex].sounds.push(sound);
    return true;
  }
  return false;
}

function updateSoundLocal(sceneid, updatedSoundObj) {
  const soundIndex = getSoundIndexUsingIds(factory.project.scenes, sceneid, updatedSoundObj._id);
  if (soundIndex >= 0) {
    for (const key in updatedSoundObj.updatedVal) {
      currentScene().sounds[soundIndex][key] = updatedSoundObj.updatedVal[key];
    }
    return currentScene().sounds[soundIndex];
  }
  return null;
}

function deleteSoundLocal(sceneid, soundid) {
  const soundIndex = getSoundIndexUsingIds(factory.project.scenes, sceneid, soundid);
  if (soundIndex >= 0) {
    currentScene().sounds.splice(soundIndex, 1);
    return true;
  }
  return false;
}

// ********************************** /\ SOUND /\ ********************************** //

// ********************************** \/ Image Popup \/ ********************************** //

function duplicateImagePopupLocal(sceneid, dupImagePopup) {
  const sceneIndex = getSceneIndex(factory.project.scenes, sceneid);
  if (sceneIndex >= 0) {
    factory.project.scenes[sceneIndex].imagepopups.push(dupImagePopup);
    return true;
  }
  return false;
};

function createImagePopupLocal(sceneid, imagePopup) {
  const sceneIndex = getSceneIndex(factory.project.scenes, sceneid);
  if (sceneIndex >= 0) {
    factory.project.scenes[sceneIndex].imagepopups.push(imagePopup);
    return true;
  }
  return false;
}

function updateImagePopupLocal(sceneid, updatedImgObj) {
  const imgIndex = getImagePopupIndexUsingIds(factory.project.scenes, sceneid, updatedImgObj._id);
  if (imgIndex >= 0) {
    for (const key in updatedImgObj.updatedVal) {
      currentScene().imagepopups[imgIndex][key] = updatedImgObj.updatedVal[key];
    }
    return currentScene().imagepopups[imgIndex];
  }
  return null;
}

function deleteImagePopupLocal(sceneid, imagepopupid) {
  const imgIndex = getImagePopupIndexUsingIds(factory.project.scenes, sceneid, imagepopupid);
  if (imgIndex >= 0) {
    currentScene().imagepopups.splice(imgIndex, 1);
    return true;
  }
  return false;
}

// ********************************** /\ Image Popup /\ ********************************** //

// ********************************** \/ Video2D \/ ********************************** //

function duplicateVideoLocal(sceneid, dupVideo) {
  const sceneIndex = getSceneIndex(factory.project.scenes, sceneid);
  if (sceneIndex >= 0) {
    factory.project.scenes[sceneIndex].videos.push(dupVideo);
    return true;
  }
  return false;
}

function createVideoLocal(sceneid, video) {
  const sceneIndex = getSceneIndex(factory.project.scenes, sceneid);
  if (sceneIndex >= 0) {
    factory.project.scenes[sceneIndex].videos.push(video);
    return true;
  }
  return false;
}

function updateVideoLocal(sceneid, updatedVidObj) {
  const vidIndex = getVideoIndexUsingIds(factory.project.scenes, sceneid, updatedVidObj._id);
  if (vidIndex >= 0) {
    for (const key in updatedVidObj.updatedVal) {
      currentScene().videos[vidIndex][key] = updatedVidObj.updatedVal[key];
    }
    return currentScene().videos[vidIndex];
  }
  return null;
}

function deleteVideoLocal(sceneid, videoid) {
  const videoIndex = getVideoIndexUsingIds(factory.project.scenes, sceneid, videoid);
  if (videoIndex >= 0) {
    currentScene().videos.splice(videoIndex, 1);
    return true;
  }
  return false;
}

// ********************************** /\ Video2D /\ ********************************** //

// ********************************** \/ Popup \/ ********************************** //

function duplicatePopupLocal(sceneid, dupPopup) {
  const sceneIndex = getSceneIndex(factory.project.scenes, sceneid);
  if (sceneIndex >= 0) {
    factory.project.scenes[sceneIndex].popups.push(dupPopup);
    return true;
  }
  return false;
}

function createPopupLocal(sceneid, popup) {
  const sceneIndex = getSceneIndex(factory.project.scenes, sceneid);
  if (sceneIndex >= 0) {
    factory.project.scenes[sceneIndex].popups.push(popup);
    return true;
  }
  return false;
}

function updatePopupLocal(sceneid, updatedPopupObj) {
  const popupIndex = getPopupIndexUsingIds(factory.project.scenes, sceneid, updatedPopupObj._id);
  if (popupIndex >= 0) {
    for (const key in updatedPopupObj.updatedVal) {
      currentScene().popups[popupIndex][key] = updatedPopupObj.updatedVal[key];
    }
    return currentScene().popups[popupIndex];
  }
  return null;
}

function deletePopupLocal(sceneid, popupid) {
  const popupIndex = getPopupIndexUsingIds(factory.project.scenes, sceneid, popupid);
  if (popupIndex >= 0) {
    currentScene().popups.splice(popupIndex, 1);
    return true;
  }
  return false;
}

// ********************************** /\ Popup /\ ********************************** //

// ********************************** \/ Fixed Text \/ ********************************** //

function duplicateFixedTextLocal(sceneid, dupFixedText) {
  const sceneIndex = getSceneIndex(factory.project.scenes, sceneid);
  if (sceneIndex >= 0) {
    factory.project.scenes[sceneIndex].fixedtextarray.push(dupFixedText);
    return true;
  }
  return false;

}

function createFixedTextLocal(sceneid, fixedText) {
  const sceneIndex = getSceneIndex(factory.project.scenes, sceneid);
  if (sceneIndex >= 0) {
    factory.project.scenes[sceneIndex].fixedtextarray.push(fixedText);
    return true;
  }
  return false;
}

function updateFixedTextLocal(sceneid, updatedFixedText) {
  const fixedTextIndex = getFixedTextIndexUsingIds(factory.project.scenes, sceneid, updatedFixedText._id);
  if (fixedTextIndex >= 0) {
    for (const key in updatedFixedText.updatedVal) {
      currentScene().fixedtextarray[fixedTextIndex][key] = updatedFixedText.updatedVal[key];
    }
    return currentScene().fixedtextarray[fixedTextIndex];
  }
  return null;
}

function deleteFixedTextLocal(sceneid, fixedtextid) {
  const fixedTextIndex = getFixedTextIndexUsingIds(factory.project.scenes, sceneid, fixedtextid);
  if (fixedTextIndex >= 0) {
    currentScene().fixedtextarray.splice(fixedTextIndex, 1);
    return true;
  }
  return false;
}

// ********************************** /\ Fixed Text /\ ********************************** //

// ********************************** \/ Grid \/ ********************************** //

function duplicateGridLocal(sceneid, dupGrid) {
  const scene = getSceneUtils(factory.project.scenes, sceneid);
  if (!scene)
    return false;

  scene.grids.push(dupGrid);
  return true;
}

function createGridLocal(sceneid, grid) {
  const scene = getSceneUtils(factory.project.scenes, sceneid);
  if (!scene)
    return false;

  scene.grids.push(grid);
  return true;
}

function updateGridLocal(sceneid, updatedGridObj) {
  const scene = getSceneUtils(factory.project.scenes, sceneid);
  if (!scene)
    return false;

  const grid = getGrid(scene.grids, updatedGridObj._id);
  if (!grid)
    return false;

  for (const key in updatedGridObj.updatedVal) {
    grid[key] = updatedGridObj.updatedVal[key];
  }
  return grid;
}

function deleteGridLocal(sceneid, gridid) {
  const scene = getSceneUtils(factory.project.scenes, sceneid);
  if (!scene)
    return false;

  const gridIndex = getGridIndex(scene.grids, gridid);
  if (gridIndex < 0)
    return false;

  scene.grids.splice(gridIndex, 1);
  return true;
}

// ********************************** /\ Grid /\ ********************************** //

// ********************************** \/ Grid Cell \/ ********************************** //

function createGridCellLocal(sceneid, gridid, gridCell) {
  const scene = getSceneUtils(factory.project.scenes, sceneid);
  if (!scene)
    return false;

  const grid = getGrid(scene.grids, gridid);
  if (!grid)
    return false;

  grid.cells.push(gridCell);
  return true;
}

function updateGridCellLocal(sceneid, gridid, updatedGridCell) {
  const scene = getSceneUtils(factory.project.scenes, sceneid);
  if (!scene)
    return false;

  const grid = getGrid(scene.grids, gridid);
  if (!grid)
    return false;

  const gridCell = getGridCell(grid.cells, updatedGridCell._id);
  if (!gridCell)
    return false;

  for (const key in updatedGridCell.updatedVal) {
    gridCell[key] = updatedGridCell.updatedVal[key];
  }
  return gridCell;
}

function deleteGridCellLocal(sceneid, gridid, gridCellid) {
  const scene = getSceneUtils(factory.project.scenes, sceneid);
  if (!scene)
    return false;

  const grid = getGrid(scene.grids, gridid);
  if (!grid)
    return false;

  const gridCellIndex = getGridCellIndex(grid.cells, gridCellid);
  if (gridCellIndex < 0)
    return false;

  grid.cells.splice(gridCellIndex, 1);
  return true;
}

// ********************************** /\ Grid Cell /\ ********************************** //

// ********************************** \/ Carousel \/ ********************************** //

function duplicateCarouselLocal(sceneid, dupCarouselObj) {
  const scene = getSceneUtils(factory.project.scenes, sceneid);
  if (!scene)
    return false;

  scene.carousels.push(dupCarouselObj);
  return true;
}

function createCarouselLocal(sceneid, carouselObj) {
  const scene = getSceneUtils(factory.project.scenes, sceneid);
  if (!scene)
    return false;

  scene.carousels.push(carouselObj);
  return true;
}

function updateCarouselLocal(sceneid, updatedCarouselObj) {
  const scene = getSceneUtils(factory.project.scenes, sceneid);
  if (!scene)
    return false;

  const carousel = getCarousel(scene.carousels, updatedCarouselObj._id);
  if (!carousel)
    return false;

  for (const key in updatedCarouselObj.updatedVal) {
    carousel[key] = updatedCarouselObj.updatedVal[key];
  }
  return carousel;
}

function deleteCarouselLocal(sceneid, carouselid) {
  const scene = getSceneUtils(factory.project.scenes, sceneid);
  if (!scene)
    return false;

  const carouselIndex = getCarouselIndex(scene.carousels, carouselid);
  if (carouselIndex < 0)
    return false;

  scene.carousels.splice(carouselIndex, 1);
  return true;
}

// ********************************** /\ Carousel /\ ********************************** //

// ********************************** \/ Carousel Item \/ ********************************** //

function createCarouselItemLocal(sceneid, carouselid, carouselItem) {
  const scene = getSceneUtils(factory.project.scenes, sceneid);
  if (!scene)
    return false;

  const carousel = getCarousel(scene.carousels, carouselid);
  if (!carousel)
    return false;

  carousel.items.push(carouselItem);
  return true;
}

function updateCarouselItemLocal(sceneid, carouselid, updatedCarouselItem) {
  const scene = getSceneUtils(factory.project.scenes, sceneid);
  if (!scene)
    return false;

  const carousel = getCarousel(scene.carousels, carouselid);
  if (!carousel)
    return false;

  const carouselItem = getCarouselItem(carousel.cells, updatedCarouselItem._id);
  if (!carouselItem)
    return false;

  for (const key in updatedCarouselItem.updatedVal) {
    carouselItem[key] = updatedCarouselItem.updatedVal[key];
  }
  return carouselItem;
}

function updateCarouselItemsOrderLocal(sceneid, carouselid, newItemsArray) {
  const scene = getSceneUtils(factory.project.scenes, sceneid);
  if (!scene)
    return false;

  const carousel = getCarousel(scene.carousels, carouselid);
  if (!carousel)
    return false;

  carousel.items = newItemsArray;
  return carousel.items;
}

function deleteCarouselItemLocal(sceneid, carouselid, carouselItemId) {
  const scene = getSceneUtils(factory.project.scenes, sceneid);
  if (!scene)
    return false;

  const carousel = getCarousel(scene.carousels, carouselid);
  if (!carousel)
    return false;

  const carouselItemIndex = getCarouselItemIndex(carousel.items, carouselItemId);
  if (carouselItemIndex < 0)
    return false;

  carousel.items.splice(carouselItemIndex, 1);
  return true;
}

// ********************************** /\ Carousel Item /\ ********************************** //

// ********************************** \/ Gltf Model \/ **********************************

function duplicateGltfModelLocal(sceneid, dupGltfModel) {
  const sceneIndex = getSceneIndex(factory.project.scenes, sceneid);
  if (sceneIndex >= 0) {
    factory.project.scenes[sceneIndex].gltfmodels.push(dupGltfModel);
    return true;
  }
  return false;
}

function createGltfModelLocal(sceneid, gltfModel) {
  const sceneIndex = getSceneIndex(factory.project.scenes, sceneid);
  if (sceneIndex >= 0) {
    factory.project.scenes[sceneIndex].gltfmodels.push(gltfModel);
    return true;
  }
  return false;
}

function updateGltfModelLocal(sceneid, updatedGltfModelObj) {
  const gltfModelIndex = getGltfModelIndexUsingIds(factory.project.scenes, sceneid, updatedGltfModelObj._id);
  if (gltfModelIndex >= 0) {
    for (const key in updatedGltfModelObj.updatedVal) {
      currentScene().gltfmodels[gltfModelIndex][key] = updatedGltfModelObj.updatedVal[key];
    }
    return currentScene().gltfmodels[gltfModelIndex];
  }
  return null;
}

function deleteGltfModelLocal(sceneid, gltfModelid) {
  const gltfModelIndex = getGltfModelIndexUsingIds(factory.project.scenes, sceneid, gltfModelid);
  if (gltfModelIndex >= 0) {
    currentScene().gltfmodels.splice(gltfModelIndex, 1);
    return true;
  }
  return false;
}

// ********************************** /\ Gltf Model /\ **********************************

// ********************************** \/ navMenuCell \/ **********************************

function createNavMenuCellLocal(navMenuCell) {
  factory.project.navMenu.cells.push(navMenuCell);
  return true;
}

function updateNavMenuCellLocal(updatedNavMenuCellObj) {
  const navMenuCellIndex = getNavMenuCellIndexUsingIds(factory.project.navMenu.cells, updatedNavMenuCellObj._id);
  if (navMenuCellIndex >= 0) {
    for (const key in updatedNavMenuCellObj.updatedVal) {
      factory.project.navMenu.cells[navMenuCellIndex][key] = updatedNavMenuCellObj.updatedVal[key];
    }
    return factory.project.navMenu.cells[navMenuCellIndex];
  }
  return null;
}

function deleteNavMenuCellLocal(sceneid, navMenuCellid) {
  const navMenuCellIndex = getNavMenuCellIndexUsingIds(factory.project.navMenu.cells, navMenuCellid);
  if (navMenuCellIndex >= 0) {
    factory.project.navMenu.cells.splice(navMenuCellIndex, 1);
    return true;
  }
  return false;
}

// ********************************** /\ navMenuCell /\ **********************************

// ********************************** \/ navMenu \/ **********************************

function updateNavMenuLocal(updatedNavMenuObj) {
  for (const key in updatedNavMenuObj.updatedVal) {
    factory.project.navMenu[key] = updatedNavMenuObj.updatedVal[key];
  }
  return factory.project.navMenu;
}

// ********************************** /\ navMenu /\ **********************************

// ********************************** \/ document \/ **********************************
function duplicateDocumentLocal(sceneid, documentObj) {
  const sceneIndex = getSceneIndex(factory.project.scenes, sceneid);
  if (sceneIndex >= 0) {
    factory.project.scenes[sceneIndex].documents.push(documentObj);
    return true;
  }
  return false;
}

function createDocumentLocal(sceneid, documentObj) {
  const sceneIndex = getSceneIndex(factory.project.scenes, sceneid);
  if (sceneIndex >= 0) {
    factory.project.scenes[sceneIndex].documents.push(documentObj);
    return true;
  }
  return false;
}

function updateDocumentLocal(sceneid, updatedDocumentObj) {
  const documentIndex = getDocumentIndexUsingIds(factory.project.scenes, sceneid, updatedDocumentObj._id);
  if (documentIndex >= 0) {
    for (const key in updatedDocumentObj.updatedVal) {
      currentScene().documents[documentIndex][key] = updatedDocumentObj.updatedVal[key];
    }
    return currentScene().documents[documentIndex];
  }
  return null;
}

function deleteDocumentLocal(sceneid, documentid) {
  const documentIndex = getDocumentIndexUsingIds(factory.project.scenes, sceneid, documentid);
  if (documentIndex >= 0) {
    currentScene().documents.splice(documentIndex, 1);
    return true;
  }
  return false;
}

// ********************************** /\ document /\ **********************************

// ********************************** \/ Menu3d \/ ********************************** //

function duplicateMenu3dLocal(sceneid, menu3d) {
  const scene = getSceneUtils(factory.project.scenes, sceneid);
  if (!scene)
    return false;

  scene.menu3ds.push(menu3d);
  return true;
}

function createMenu3dLocal(sceneid, menu3d) {
  const scene = getSceneUtils(factory.project.scenes, sceneid);
  if (!scene)
    return false;

  scene.menu3ds.push(menu3d);
  return true;
}

function updateMenu3dLocal(sceneid, updatedMenu3dObj) {
  const scene = getSceneUtils(factory.project.scenes, sceneid);
  if (!scene)
    return false;

  const menu3d = getMenu3d(scene.menu3ds, updatedMenu3dObj._id);
  if (!menu3d)
    return false;

  for (const key in updatedMenu3dObj.updatedVal) {
    menu3d[key] = updatedMenu3dObj.updatedVal[key];
  }
  return menu3d;
}

function deleteMenu3dLocal(sceneid, menu3did) {
  const scene = getSceneUtils(factory.project.scenes, sceneid);
  if (!scene)
    return false;

  const menu3dIndex = getMenu3dIndex(scene.menu3ds, menu3did);
  if (menu3dIndex < 0)
    return false;

  scene.menu3ds.splice(menu3dIndex, 1);
  return true;
}

// // ********************************** /\ Menu3d /\ ********************************** //

// // ********************************** \/ Menu3d Cell \/ ********************************** //

function createMenu3dCellLocal(sceneid, menu3did, menu3dCell) {
  const scene = getSceneUtils(factory.project.scenes, sceneid);
  if (!scene)
    return false;

  const menu3d = getMenu3d(scene.menu3ds, menu3did);
  if (!menu3d)
    return false;

  menu3d.cells.push(menu3dCell);
  return true;
}

function updateMenu3dCellLocal(sceneid, menu3did, updatedMenu3dCell) {
  const scene = getSceneUtils(factory.project.scenes, sceneid);
  if (!scene)
    return false;

  const menu3d = getMenu3d(scene.menu3ds, menu3did);
  if (!menu3d)
    return false;

  const menu3dCell = getMenu3dCell(menu3d.cells, updatedMenu3dCell._id);
  if (!menu3dCell)
    return false;

  for (const key in updatedMenu3dCell.updatedVal) {
    menu3dCell[key] = updatedMenu3dCell.updatedVal[key];
  }
  return menu3dCell;
}

function deleteMenu3dCellLocal(sceneid, menu3did, menu3dCellid) {
  const scene = getSceneUtils(factory.project.scenes, sceneid);
  if (!scene)
    return false;

  const menu3d = getMenu3d(scene.menu3ds, menu3did);
  if (!menu3d)
    return false;

  const menu3dCellIndex = getMenu3dCellIndex(menu3d.cells, menu3dCellid);
  if (menu3dCellIndex < 0)
    return false;

  menu3d.cells.splice(menu3dCellIndex, 1);
  return true;
}

// ********************************** /\ Menu3d Cell /\ ********************************** //

// ********************************** \/ Audio PA \/ ********************************** //

function createAudioPALocal(sceneid, audiopa) {
  const scene = getSceneUtils(factory.project.scenes, sceneid);
  if (!scene)
    return false;

  scene.audiopa.push(audiopa);
  return true;
}

function updateAudioPALocal(sceneid, updatedAudioPAObj) {
  const audioPAIndex = getAudioPAIndexUsingIds(factory.project.scenes, sceneid, updatedAudioPAObj._id);

  if (audioPAIndex >= 0) {
    for (const key in updatedAudioPAObj.updatedVal) {
      currentScene().audiopa[audioPAIndex][key] = updatedAudioPAObj.updatedVal[key];
    }
    return currentScene().audiopa[audioPAIndex];
  }
  return null;
}

function deleteAudioPALocal(sceneid, audiopaid) {
  const audioPAIndex = getAudioPAIndexUsingIds(factory.project.scenes, sceneid, audiopaid);
  if (audioPAIndex >= 0) {
    currentScene().audiopa.splice(audioPAIndex, 1);
    return true;
  }
  return false;
}

// ********************************** /\ Audio PA /\ ********************************** //

// ********************************** \/ Menu3dHome Cell \/ ********************************** //

function updateMenu3dHomeCellLocal(sceneid, menu3did, updatedMenu3dHomeCell) {
  const scene = getSceneUtils(factory.project.scenes, sceneid);
  if (!scene)
    return false;

  const menu3d = getMenu3d(scene.menu3ds, menu3did);
  if (!menu3d)
    return false;

  for (const key in updatedMenu3dHomeCell) {
    menu3d.homeLogo[key] = updatedMenu3dHomeCell[key];
  }
  return menu3d.homeLogo;
}

// ********************************** /\ Menu3dHome Cell /\ ********************************** //

// ********************************** \/ ProjectSound \/ ********************************** //

function updateProjectSoundLocal(updatedProjectSoundObj) {
  factory.project.sound = updatedProjectSoundObj;
}

// ********************************** /\ ProjectSound /\ ********************************** //

export {
  createImageLocal,
  duplicateImageLocal,
  updateImageLocal,
  deleteImageLocal,
  createSceneLocal,
  deleteSceneLocal,
  updateSceneLocal,
  createAudioPALocal,
  createButtonLocal,
  createCarouselItemLocal,
  createCarouselLocal,
  createDocumentLocal,
  createFixedTextLocal,
  createGifLocal,
  createGltfModelLocal,
  createGridCellLocal,
  createGridLocal,
  createImagePopupLocal,
  createMenu3dCellLocal,
  createMenu3dLocal,
  createNavMenuCellLocal,
  createPopupLocal,
  createSoundLocal,
  createVideoLocal,
  deleteAudioPALocal,
  deleteButtonLocal,
  deleteCarouselItemLocal,
  deleteCarouselLocal,
  deleteDocumentLocal,
  deleteFixedTextLocal,
  deleteGifLocal,
  deleteGltfModelLocal,
  deleteGridCellLocal,
  deleteGridLocal,
  deleteImagePopupLocal,
  deleteMenu3dCellLocal,
  deleteMenu3dLocal,
  deleteNavMenuCellLocal,
  deletePopupLocal,
  deleteSoundLocal,
  deleteVideoLocal,
  updateAudioPALocal,
  updateButtonLocal,
  updateCarouselItemLocal,
  updateCarouselItemsOrderLocal,
  updateCarouselLocal,
  updateDocumentLocal,
  updateFixedTextLocal,
  updateGifLocal,
  updateGltfModelLocal,
  updateGridCellLocal,
  updateGridLocal,
  updateImagePopupLocal,
  updateMenu3dCellLocal,
  updateMenu3dHomeCellLocal,
  updateMenu3dLocal,
  updateNavMenuCellLocal,
  updateNavMenuLocal,
  updatePopupLocal,
  updateProjectSoundLocal,
  updateSoundLocal,
  updateVideoLocal,
  duplicateButtonLocal,
  duplicateCarouselLocal,
  duplicateDocumentLocal,
  duplicateFixedTextLocal,
  duplicateGifLocal,
  duplicateGltfModelLocal,
  duplicateGridLocal,
  duplicateImagePopupLocal,
  duplicateMenu3dLocal,
  duplicatePopupLocal,
  duplicateSoundLocal,
  duplicateVideoLocal,
  duplicateSceneLocal,
  createImage360ViewLocal,
  deleteImage360ViewLocal,
  updateImage360ViewLocal
}

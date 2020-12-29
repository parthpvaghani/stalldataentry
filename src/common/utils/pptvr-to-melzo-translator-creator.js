import WIDGET_TYPES from '../constants/widget-types';

const srcType = {
  bgImage: 'image360',
  stream: 'video360'
};

function targetToEso(id, target) {
  if (target) {
    const isMelzoProjectLink = target.includes('melzo.com');
    if (isMelzoProjectLink) {
      return {
        id,
        sourceId: 'self',
        sourceEvent: 'click',
        eventToEmit: 'switch-project',
        metaData: {
          bubble: true,
          link: target
        }
      };
    }

    if (target.startsWith('http')) {
      return {
        id,
        sourceId: 'self',
        sourceEvent: 'click',
        eventToEmit: 'openlink',
        metaData: {
          bubble: true,
          link: target
        }
      };
    }
    return {
      id,
      sourceId: 'self',
      sourceEvent: 'click',
      eventToEmit: 'changescene',
      metaData: {
        bubble: true,
        sceneId: target
      }
    };
  }
  return {};
}

function strToVector(str) {
  const strArr = str.split(' ');
  return {
    x: strArr[0],
    y: strArr[1],
    z: strArr[2]
  };
}

function convertMenu3d(menu3ds) {
  const melzoMenu3dList = {};
  if (!menu3ds) return melzoMenu3dList;
  menu3ds.forEach(menu3d => {
    const id = menu3d._id;
    const melzoMenu3d = {};
    melzoMenu3d.id = id;
    melzoMenu3d.type = WIDGET_TYPES.menu3d;
    melzoMenu3d.themeType = menu3d.themeType;
    melzoMenu3d.depth = menu3d.depth;
    melzoMenu3d.transform = {
      position: menu3d.position,
      scale: menu3d.scale
    };
    melzoMenu3d.persistent = {
      isEnabled: menu3d.persistent.isEnabled,
      excludeFrom: menu3d.persistent.excludeFrom
    };
    // actions
    // animations
    // esol
    melzoMenu3d.textScale = menu3d.textScale;
    melzoMenu3d.menu3dAnimation = {
      triggerRadius: menu3d.animation.triggerTheta,
      isEnabled: menu3d.animation.enabled
    };
    // homeLogo
    melzoMenu3d.homeLogo = {
      id: menu3d.homeLogo._id,
      src: menu3d.homeLogo.src,
      type: WIDGET_TYPES.menu3dHomeCell,
      geometry: {
        height: menu3d.homeLogo.height,
        width: menu3d.homeLogo.width
      },
      themes: {
        radial: {
          posIndex: menu3d.homeLogo.themes.radial.modifiedPosIndex
        },
        linear: {
          posIndex: menu3d.homeLogo.themes.linear.modifiedPosIndex
        }
      },
      esol: {}
    };
    if (menu3d.homeLogo.target) {
      melzoMenu3d.homeLogo.components = {
        class: 'raycaster-solid clickable'
      };
      const esoId = 'eso' + melzoMenu3d.homeLogo.id;
      melzoMenu3d.homeLogo.esol[esoId] = targetToEso(
        esoId,
        menu3d.homeLogo.target
      );
    }

    // themes
    melzoMenu3d.themes = {
      radial: {
        rotation: menu3d.themes.radial.rotation,
        thetaStart: menu3d.themes.radial.thetaStart,
        thetaEnd: menu3d.themes.radial.thetaEnd,
        thetaMargin: menu3d.themes.radial.thetaMargin,
        radiusInner: menu3d.themes.radial.radiusInner,
        radiusOuter: menu3d.themes.radial.radiusOuter
      },
      linear: {
        spacing: menu3d.themes.linear.spacing,
        height: menu3d.themes.linear.height,
        width: menu3d.themes.linear.width,
        minPosIndex: menu3d.themes.linear.minPosIndex,
        maxPosIndex: menu3d.themes.linear.maxPosIndex
      }
    };

    const menu3dOpenAnimationEso = {
      id: 'open' + menu3d.homeLogo._id,
      sourceId: menu3d.homeLogo._id,
      sourceEvent: 'conical-vicinity-reticle-enter',
      eventToEmit: 'open-menu', // Action
      metaData: {
        bubble: false
      }
    };

    const menu3dCloseAnimationEso = {
      id: 'close' + menu3d.homeLogo._id,
      sourceId: menu3d.homeLogo._id,
      sourceEvent: 'conical-vicinity-reticle-leave',
      eventToEmit: 'close-menu', // Action
      metaData: {
        bubble: false
      }
    };

    // cells
    melzoMenu3d.cells = {};
    menu3d.cells.forEach(cell => {
      const cellId = cell._id;
      const melzoCell = {
        id: cellId,
        type: WIDGET_TYPES.menu3dCell,
        text: {
          color: cell.text.color,
          value: cell.text.value
        },
        background: {
          color: cell.background.color
        },
        themes: {
          linear: {
            posIndex: cell.themes.linear.modifiedPosIndex
          },
          radial: {
            posIndex: cell.themes.radial.modifiedPosIndex
          }
        },
        esol: {}
      };
      // TODO: Implement it properly.
      if (cell.target) {
        melzoCell.components = {
          class: 'raycaster-solid clickable'
        };
        const cellEsoId = 'eso' + cellId;
        melzoCell.esol[cellEsoId] = targetToEso(cellEsoId, cell.target);
      } else {
        melzoCell.components = {
          class: 'raycaster-solid'
        };
      }

      // if animation is enabled
      if (melzoMenu3d.menu3dAnimation.isEnabled) {
        melzoCell.esol[menu3dOpenAnimationEso.id] = menu3dOpenAnimationEso;
        melzoCell.esol[menu3dCloseAnimationEso.id] = menu3dCloseAnimationEso;
      }

      melzoMenu3d.cells[cellId] = melzoCell;
    });

    melzoMenu3dList[id] = melzoMenu3d;
  });
  return melzoMenu3dList;
}

// function convertDocument(documents) {}
function convertModel(gltfmodels) {
  const melzogltfmodelList = {};
  if (!gltfmodels) return melzogltfmodelList;
  gltfmodels.forEach(gltfmodel => {
    const gltfmodelId = gltfmodel._id;

    const melzogltfmodel = {
      id: gltfmodelId,
      src: gltfmodel.src,
      type: WIDGET_TYPES.gltfmodel,
      isAutoRotation: gltfmodel.isAutoRotation,
      name: gltfmodel.name,
      isMovable: gltfmodel.isMovable,
      isCustomController: gltfmodel.isCustomController,
      isGravityEnable: gltfmodel.isGravityEnable,
      transform: {
        // position: strToVector(gltfmodel.position),
        position: {
          x: gltfmodel.position.x,
          y: gltfmodel.position.y,
          z: gltfmodel.position.z
        },
        rotation: {
          x: gltfmodel.rotation.x,
          y: gltfmodel.rotation.y,
          z: gltfmodel.rotation.z
        },
        scale: {
          x: gltfmodel.scale.x,
          y: gltfmodel.scale.y,
          z: gltfmodel.scale.z
        },
        depth: gltfmodel.depth
      },
      persistent: {
        isEnabled: gltfmodel.persistent.isEnabled,
        excludeFrom: gltfmodel.persistent.excludeFrom
      }
    };
    melzogltfmodelList[gltfmodelId] = melzogltfmodel;
  });

  return melzogltfmodelList;
}

function convertCarousel(carousels) {
  const melzoCarouselList = {};
  if (!carousels) return melzoCarouselList;
  carousels.forEach(carousel => {
    const items = {};

    carousel.items.forEach(item => {
      items[item._id] = {
        id: item._id,
        src: item.src,
        esol: {},
        type: 'image2d',
        transform: {
          position: {
            x: carousel.width / 2,
            y: 0,
            z: 0
          }
        },
        geometry: {
          height: carousel.height / 2,
          width: carousel.width / 2
        }
      };

      if (item.target && item.target !== 'UNKNOWN') {
        // TODO: Implement it properly.
        // class="raycaster-solid"
        items[item._id].components = {
          class: 'raycaster-solid'
        };

        // eso
        const esoId = 'esoCarousel' + item._id;
        items[item._id].esol[esoId] = targetToEso(esoId, item.target);
      }
    });

    const carouselId = carousel._id;
    const melzoCarousel = {
      id: carouselId,
      _id: carouselId,
      type: 'carousel',
      transformation: {
        position: {
          x: carousel.position.x,
          y: carousel.position.y,
          z: carousel.position.z
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0
        },
        scale: {
          x: 1,
          y: 1,
          z: 1
        }
      },
      interval: carousel.interval,
      depth: carousel.depth,
      geometry: {
        height: carousel.height,
        width: carousel.width
      },
      material: {
        opacity: carousel.opacity
      },
      slideWaitTime: {
        unit: 'ms',
        value: 500
      },
      animationDuration: {
        unit: 'ms',
        value: carousel.interval * 1000
      },
      autoPlay: carousel.autoSwitch,
      direction: 'normal',
      slides: {
        order: 'organized',
        items
      },
      persistent: {
        isEnabled: carousel.persistent.isEnabled,
        excludeFrom: carousel.persistent.excludeFrom
      }
    };

    melzoCarouselList[carouselId] = melzoCarousel;
  });

  return melzoCarouselList;
}
//
function convertGrid(grids) {
  const melzoGridList = {};
  if (!grids) return melzoGridList;
  grids.forEach(grid => {
    const cells = {};
    grid.cells.forEach(cell => {
      cells[cell._id] = {
        id: cell._id,
        src: cell.src,
        rowIndex: cell.rowIndex,
        colIndex: cell.colIndex,
        type: 'curvedimage',
        esol: {},
        opacity: 1,
        scale: {
          x: 1,
          y: 1,
          z: 1
        },
        target: cell.target,
        animations: {}
      };

      if (cell.target && cell.target !== 'UNKNOWN') {
        // TODO: Implement it properly.
        // class="raycaster-solid"
        cells[cell._id].components = {
          class: 'raycaster-solid clickable'
        };

        cells[cell._id].opacity = 0.8;

        // eso
        const esoId = 'esocurvedImg' + cell._id;
        cells[cell._id].esol[esoId] = targetToEso(esoId, cell.target);

        const scaleUpId = 'anim-scaleup';
        cells[cell._id].animations[scaleUpId] = {
          id: scaleUpId,
          name: 'scaleup',

          anims: {
            presets: [],
            customs: {
              scale: {
                property: 'scale',
                to: '1.05 1.05 0.95',
                dur: 100
              },
              opacity: {
                property: 'opacity',
                to: 1,
                dur: 100
              }
            }
          },

          startEvents: 'mouseenter',
          resumeEvents: '',
          pauseEvents: '',
          esoIdList: []
        };

        const scaleDownId = 'anim-scaledown';
        cells[cell._id].animations[scaleDownId] = {
          id: scaleDownId,
          name: 'scaledown',

          anims: {
            presets: [],
            customs: {
              scale: {
                property: 'scale',
                to: '1 1 1',
                dur: 100
              },
              opacity: {
                property: 'opacity',
                to: 0.8,
                dur: 100
              }
            }
          },

          startEvents: 'mouseleave',
          resumeEvents: '',
          pauseEvents: '',
          esoIdList: []
        };
      }
    });

    const gridId = grid._id;
    const gridBackgroundOpacity =
      parseFloat(grid.planeProperties.opacity) <= 0.2 ?
        0 :
        grid.planeProperties.opacity;
    const melzoGrid = {
      id: gridId,
      type: 'grid',
      cols: grid.cols,
      rows: grid.rows,
      planeProperties: {
        margin: grid.cellProperties.margin,
        radius: grid.planeProperties.radius,
        thetaLength: grid.planeProperties.thetaLength,
        transform: {
          scale: {
            x: grid.scale,
            y: grid.scale,
            z: grid.scale
          },
          position: {
            x: grid.position.split(' ')[0],
            y: grid.position.split(' ')[1],
            z: grid.position.split(' ')[2]
          }
        },
        geometry: {
          height: grid.planeProperties.height
        },
        material: {
          opacity: gridBackgroundOpacity,
          color: grid.planeProperties.color
        }
      },
      cellProperties: {
        thetaLength: grid.cellProperties.thetaLength,
        height: grid.cellProperties.height
      },
      cells,
      persistent: {
        isEnabled: grid.persistent.isEnabled,
        excludeFrom: grid.persistent.excludeFrom
      }
    };

    melzoGridList[gridId] = melzoGrid;
  });

  return melzoGridList;
}

function convertText(fixedtextarray) {
  const melzoText3dList = {};
  if (!fixedtextarray) return melzoText3dList;
  fixedtextarray.forEach(text3d => {
    const text3dId = text3d._id;
    const melzoText3d = {
      id: text3dId,
      type: WIDGET_TYPES.text3d,
      persistent: {
        isEnabled: text3d.persistent.isEnabled,
        excludeFrom: text3d.persistent.excludeFrom
      }
    };

    const {
      scale,
      position,
      height,
      width,
      opacity,
      depth,
      backgroundcolor: color
    } = text3d;
    const posArr = position.split(' ');
    melzoText3d.plane = {
      transform: {
        position: {
          x: posArr[0],
          y: posArr[1],
          z: posArr[2]
        },
        scale: {
          x: scale,
          y: scale,
          z: scale
        }
      },
      geometry: {
        height,
        width,
        depth
      },
      material: {
        opacity,
        color
      }
    };

    melzoText3d.text = {
      align: text3d.horizontalalign,
      material: {
        opacity: text3d.textopacity,
        color: text3d.textcolor
      },
      value: text3d.text,
      fontType: text3d.fonttype
    };

    melzoText3dList[text3dId] = melzoText3d;
  });
  return melzoText3dList;
}

function convertVideos(videos) {
  const melzoVideoList = {};
  if (!videos) return melzoVideoList;
  videos.forEach(video => {
    const melzoVideo = {
      id: video._id,
      type: 'video2d',
      src: video.src,
      autoPlay: video.autoPlay,
      transform: {
        position: {
          x: video.position.split(' ')[0],
          y: video.position.split(' ')[1],
          z: video.position.split(' ')[2]
        },
        scale: {
          x: video.scale,
          y: video.scale,
          z: video.scale
        },
        depth: video.depth
      },
      geometry: {
        height: video.height,
        width: video.width,
        depth: video.depth
      },
      material: {
        opacity: video.opacity
      },
      esol: video.esol_temp,
      persistent: {
        isEnabled: video.persistent.isEnabled,
        excludeFrom: video.persistent.excludeFrom
      },
      volume: video.volume,
      enablePopup: video.enablePopup !== undefined?video.enablePopup:false,
      lock: video.lock !== undefined?video.lock:false
    };

    melzoVideoList[video._id] = melzoVideo;
  });

  return melzoVideoList;
}

// Default value of globalPosition is {x:0, y:0, z:0}.
// Check whether default value of globalPosition udpated.
function isGlobalPositionUpdated(globalPosition) {
  return (
    globalPosition.x !== 0 || globalPosition.y !== 0 || globalPosition.z !== 0
  );
}

function convertImagePopup(imagePopups) {
  const melzoPopupList = {};
  if (!imagePopups) return melzoPopupList;

  imagePopups.forEach(imagePopup => {
    // Parent
    const parentId = 'popup-parent' + imagePopup._id;
    const parentOpacity =
      parseFloat(imagePopup.opacity) <= 0.2 ? 0 : imagePopup.opacity;
    const melzoPopupParent = {
      id: parentId,
      src: imagePopup.src,
      type: WIDGET_TYPES.image2d,
      transform: {
        position: strToVector(imagePopup.position),
        scale: {
          x: imagePopup.scale,
          y: imagePopup.scale,
          z: imagePopup.scale
        },
        depth: imagePopup.depth
      },
      geometry: {
        height: imagePopup.height,
        width: imagePopup.width
      },
      material: {
        opacity: parentOpacity
      },
      actions: {},
      animations: {},
      esol: {},
      persistent: imagePopup.persistent
    };

    if (imagePopup.target) {
      melzoPopupParent.components = {
        class: 'raycaster-solid clickable'
      };
      // change scene
      const melzoPopupParentEsoId = 'eso' + parentId;
      const eso = targetToEso(melzoPopupParentEsoId, imagePopup.target);
      melzoPopupParent.esol[melzoPopupParentEsoId] = eso;
    } else {
      // Needed to detect mouseenter event to show popup.
      melzoPopupParent.components = {
        class: 'raycaster-solid'
      };
    }

    melzoPopupList[parentId] = melzoPopupParent;

    // Child
    const childId = 'popup-child' + imagePopup._id;
    let childPos;
    if (isGlobalPositionUpdated(imagePopup.popup.globalPosition)) {
      childPos = imagePopup.popup.globalPosition;
    } else {
      childPos = {
        x: parseFloat(melzoPopupParent.transform.position.x) +
          imagePopup.popup.position.x,
        y: parseFloat(melzoPopupParent.transform.position.y) +
          imagePopup.popup.position.y,
        z: parseFloat(melzoPopupParent.transform.position.z) +
          imagePopup.popup.position.z
      };
    }

    const melzoPopupChild = {
      id: childId,
      src: imagePopup.popup.src,
      type: WIDGET_TYPES.image2d,
      transform: {
        position: childPos,
        scale: {
          x: imagePopup.popup.scale,
          y: imagePopup.popup.scale,
          z: imagePopup.popup.scale
        },
        depth: imagePopup.popup.depth
      },
      geometry: {
        height: imagePopup.popup.height,
        width: imagePopup.popup.width
      },
      material: {
        opacity: 0
      },
      actions: {},
      animations: {},
      esol: {},
      persistent: imagePopup.persistent
    };

    if (imagePopup.popup.target) {
      melzoPopupChild.components = {
        class: 'clickable'
      };
      // change scene
      const melzoPopupChildEsoId = 'eso' + childId;
      const eso = targetToEso(melzoPopupChildEsoId, imagePopup.popup.target);
      melzoPopupChild.esol[melzoPopupChildEsoId] = eso;
    }

    melzoPopupList[childId] = melzoPopupChild;

    // Animations
    const showPopupAnimId = 'show-popup' + imagePopup._id;
    melzoPopupChild.animations[showPopupAnimId] = {
      id: showPopupAnimId,
      name: 'show-popup',

      anims: {
        presets: [],
        customs: {
          opacity: {
            property: 'opacity',
            // TODO:
            // fadein animation is not working for first time when to: 1. Need to figure out the reason
            to: parseFloat(imagePopup.popup.opacity) - 0.001,
            dur: 400
          }
        }
      },
      startEvents: 'fadein',
      resumeEvents: '',
      pauseEvents: '',
      esoIdList: []
    };

    const hidePopupAnimId = 'hide-popup' + imagePopup._id;
    melzoPopupChild.animations[hidePopupAnimId] = {
      id: hidePopupAnimId,
      name: 'hide-popup',

      anims: {
        presets: [],
        customs: {
          opacity: {
            property: 'opacity',
            to: 0,
            dur: 400
          }
        }
      },
      startEvents: 'fadeout',
      resumeEvents: '',
      pauseEvents: '',
      esoIdList: []
    };

    // ESO: trigger 'add-state-mouseovered' or 'remove-state-mouseovered' actions on child-image2d and parent-image2d.
    let esoAddStateMouseoveredId =
      'eso-add-state-mouseovered-child' + imagePopup._id;
    melzoPopupChild.esol[esoAddStateMouseoveredId] = {
      id: esoAddStateMouseoveredId,
      sourceId: 'self',
      sourceEvent: 'mouseenter',
      eventToEmit: 'add-state-mouseovered', // Action
      metaData: {
        bubble: false
      }
    };
    esoAddStateMouseoveredId =
      'eso-add-state-mouseovered-parent' + imagePopup._id;
    melzoPopupParent.esol[esoAddStateMouseoveredId] = {
      id: esoAddStateMouseoveredId,
      sourceId: 'self',
      sourceEvent: 'mouseenter',
      eventToEmit: 'add-state-mouseovered', // Action
      metaData: {
        bubble: false
      }
    };
    let esoRemoveStateMouseoveredId =
      'eso-remove-state-mouseovered-child' + imagePopup._id;
    melzoPopupChild.esol[esoRemoveStateMouseoveredId] = {
      id: esoRemoveStateMouseoveredId,
      sourceId: 'self',
      sourceEvent: 'mouseleave',
      eventToEmit: 'remove-state-mouseovered', // Action
      metaData: {
        bubble: false
      }
    };
    esoRemoveStateMouseoveredId =
      'eso-remove-state-mouseovered-parent' + imagePopup._id;
    melzoPopupParent.esol[esoRemoveStateMouseoveredId] = {
      id: esoRemoveStateMouseoveredId,
      sourceId: 'self',
      sourceEvent: 'mouseleave',
      eventToEmit: 'remove-state-mouseovered', // Action
      metaData: {
        bubble: false
      }
    };

    // ESO: trigger 'show-popup' or 'hide-popup' actions on child-image2d.
    let esoShowPopupId = 'eso-show-popup-child' + imagePopup._id;
    melzoPopupChild.esol[esoShowPopupId] = {
      id: esoShowPopupId,
      sourceId: 'self',
      sourceEvent: 'mouseenter',
      eventToEmit: 'show-image2d-in-popup', // Action
      metaData: {
        bubble: false
      }
    };
    esoShowPopupId = 'eso-show-popup-parent' + imagePopup._id;
    melzoPopupChild.esol[esoShowPopupId] = {
      id: esoShowPopupId,
      sourceId: parentId,
      sourceEvent: 'mouseenter',
      eventToEmit: 'show-image2d-in-popup', // Action
      metaData: {
        bubble: false
      }
    };
    let esoHidePopupId = 'eso-hide-popup-child' + imagePopup._id;
    melzoPopupChild.esol[esoHidePopupId] = {
      id: esoHidePopupId,
      sourceId: 'self',
      sourceEvent: 'mouseleave',
      eventToEmit: 'hide-image2d-in-popup', // Action
      metaData: {
        bubble: false,
        parentId
      }
    };
    esoHidePopupId = 'eso-hide-popup-parent' + imagePopup._id;
    melzoPopupChild.esol[esoHidePopupId] = {
      id: esoHidePopupId,
      sourceId: parentId,
      sourceEvent: 'mouseleave',
      eventToEmit: 'hide-image2d-in-popup', // Action
      metaData: {
        bubble: false,
        parentId
      }
    };
  });

  return melzoPopupList;
}
// function convertVideos(videos) {}
function convertSounds(sounds) {
  const melzoSoundList = {};
  if (!sounds) return melzoSoundList;
  sounds.forEach(sound => {
    const soundId = sound._id;

    const melzoSound = {
      id: soundId,
      type: WIDGET_TYPES.sound,
      imageSrc: sound.imageSrc,
      soundSrc: sound.soundSrc,
      volume: sound.volume,
      autoplay: sound.autoplay,
      transform: {
        position: sound.position,
        scale: {
          x: sound.scale,
          y: sound.scale,
          z: sound.scale
        },
        depth: sound.depth
      },
      geometry: {
        height: sound.height,
        width: sound.width
      },
      material: {
        opacity: sound.opacity
      },
      actions: {},
      animations: {},
      esol: {},
      persistent: {
        isEnabled: false,
        excludeFrom: []
      }
    };

    if (!sound.autoplay) {
      melzoSound.components = {
        class: 'raycaster-solid'
      };

      const playSoundEsoId = 'eso-play-sound' + soundId;
      melzoSound.esol[playSoundEsoId] = {
        id: playSoundEsoId,
        sourceId: 'self',
        sourceEvent: 'mouseenter',
        eventToEmit: 'playSound',
        metaData: {
          bubble: false
        }
      };

      const pauseSoundEsoId = 'eso-pause-sound' + soundId;
      melzoSound.esol[pauseSoundEsoId] = {
        id: pauseSoundEsoId,
        sourceId: 'self',
        sourceEvent: 'mouseleave',
        eventToEmit: 'pauseSound',
        metaData: {
          bubble: false
        }
      };
    }

    melzoSoundList[soundId] = melzoSound;
  });

  return melzoSoundList;
}

function convertImages(images) {
  const melzoImage2dList = {};
  if (!images) return melzoImage2dList;
  images.forEach(image => {
    const imageId = image._id;

    const melzoImage2d = {
      id: imageId,
      src: image.src,
      type: WIDGET_TYPES.image2d,
      vicinity: {
        isVicinityEnabled: image.vicinityEnabled,
        triggerRadius: image.triggerTheta
      },
      transform: {
        position: strToVector(image.position),
        scale: {
          x: image.scale,
          y: image.scale,
          z: image.scale
        },
        depth: image.depth
      },
      geometry: {
        height: image.height,
        width: image.width
      },
      material: {
        opacity: image.opacity
      },
      actions: {},
      animations: {},
      esol: {},
      persistent: {
        isEnabled: image.persistent.isEnabled,
        excludeFrom: image.persistent.excludeFrom
      },
      animation: image.animation?image.animation:'none',
      collectionName:image.collectionName,
      enablePopup: image.enablePopup !== undefined?image.enablePopup:false
    };

    if (image.isTargetEnabled) {
      melzoImage2d.components = {
        class: 'raycaster-solid clickable'
      };
      // change scene
      const imageEsoId = 'eso' + imageId;
      melzoImage2d.target = image.target;
      const imageEso = targetToEso(imageEsoId, image.target);
      melzoImage2d.esol[imageEsoId] = imageEso;

      // scale up on mouseenter, scale down on mouseleave
      const scaledOpacity = melzoImage2d.material.opacity;
      melzoImage2d.material.opacity -= 0.1;

      const scaleUpId = 'anim-scaleup';
      melzoImage2d.animations[scaleUpId] = {
        id: scaleUpId,
        name: 'scaleup',

        anims: {
          presets: [],
          customs: {
            scale: {
              property: 'scale',
              to: '1.1 1.1 1.1',
              dur: 100
            },
            opacity: {
              property: 'opacity',
              to: scaledOpacity,
              dur: 100
            }
          }
        },

        startEvents: 'mouseenter',
        resumeEvents: '',
        pauseEvents: '',
        esoIdList: []
      };

      const scaleDownId = 'anim-scaledown';
      melzoImage2d.animations[scaleDownId] = {
        id: scaleDownId,
        name: 'scaledown',

        anims: {
          presets: [],
          customs: {
            scale: {
              property: 'scale',
              to: '1 1 1',
              dur: 100
            },
            opacity: {
              property: 'opacity',
              to: scaledOpacity - 0.2,
              dur: 100
            }
          }
        },

        startEvents: 'mouseleave',
        resumeEvents: '',
        pauseEvents: '',
        esoIdList: []
      };
    }

    melzoImage2dList[imageId] = melzoImage2d;
  });

  return melzoImage2dList;
}
function convertImages360View(images) {
  const melzoImage2dList = {};
  if (!images) return melzoImage2dList;
  images.forEach(image => {
    const imageId = image._id;

    const melzoImage2d = {
      id: imageId,
      src: image.src,
      images: image.images,
      type: WIDGET_TYPES.image360View,
      vicinity: {
        isVicinityEnabled: image.vicinityEnabled,
        triggerRadius: image.triggerTheta
      },
      transform: {
        position: strToVector(image.position),
        scale: { x: image.scale, y: image.scale, z: image.scale },
        depth: image.depth
      },
      geometry: {
        height: image.height,
        width: image.width
      },
      material: {
        opacity: image.opacity
      },
      actions: {},
      animations: {},
      esol: {},
      persistent: {
        isEnabled: image.persistent.isEnabled,
        excludeFrom: image.persistent.excludeFrom
      },
      animation: image.animation?image.animation:'none',
      collectionName:image.collectionName
    };

    if (image.isTargetEnabled) {
      melzoImage2d.components = {
        class: 'raycaster-solid clickable'
      };
      // change scene
      const imageEsoId = 'eso' + imageId;
      const imageEso = targetToEso(imageEsoId, image.target);
      melzoImage2d.esol[imageEsoId] = imageEso;

      // scale up on mouseenter, scale down on mouseleave
      const scaledOpacity = melzoImage2d.material.opacity;
      melzoImage2d.material.opacity -= 0.1;

      const scaleUpId = 'anim-scaleup';
      melzoImage2d.animations[scaleUpId] = {
        id: scaleUpId,
        name: 'scaleup',

        anims: {
          presets: [],
          customs: {

            opacity: {
              property: 'opacity',
              to: scaledOpacity,
              dur: 100
            }
          }
        },

        startEvents: 'mouseenter',
        resumeEvents: '',
        pauseEvents: '',
        esoIdList: []
      };

      const scaleDownId = 'anim-scaledown';
      melzoImage2d.animations[scaleDownId] = {
        id: scaleDownId,
        name: 'scaledown',

        anims: {
          presets: [],
          customs: {

            opacity: {
              property: 'opacity',
              to: scaledOpacity - 0.2,
              dur: 100
            }
          }
        },

        startEvents: 'mouseleave',
        resumeEvents: '',
        pauseEvents: '',
        esoIdList: []
      };
    }

    melzoImage2dList[imageId] = melzoImage2d;
  });

  return melzoImage2dList;
}


function convertGifs(gifs) {
  const melzoGifList = {};
  if (!gifs) return melzoGifList;

  gifs.forEach(gif => {
    const gifId = gif._id;
    const melzoGif = {
      id: gifId,
      type: 'gif',
      src: gif.src,
      geometry: {
        height: gif.height,
        width: gif.width
      },
      transform: {
        position: {
          x: gif.position.split(' ')[0],
          y: gif.position.split(' ')[1],
          z: gif.position.split(' ')[2]
        },
        scale: {
          x: gif.scale,
          y: gif.scale,
          z: gif.scale
        },
        depth: gif.depth
      },
      material: {
        opacity: gif.opacity
      },
      numOfFrames: gif.noOfFrames,
      startFrame: gif.startFrame,
      loops: gif.loops,
      isPlayerGif: gif.isPlayerGif,
      playerId: gif.playerId,
      isTargetEnabled: gif.isTargetEnabled,
      clickInBeginning: gif.clickInBeginning,
      playMode: gif.playMode,
      actions: {},
      animations: {},
      esol: {},
      persistent: {
        isEnabled: gif.persistent.isEnabled,
        excludeFrom: gif.persistent.excludeFrom
      }
    };

    if (gif.isTargetEnabled) {
      // change scene
      const gifEsoId = 'eso' + gifId;
      const gifEso = targetToEso(gifEsoId, gif.target);
      melzoGif.esol[gifEsoId] = gifEso;
    }

    // Remove clickable class
    if (gif.isTargetEnabled && gif.clickInBeginning) {
      const removeClickableClassEsoId = 'eso-remove-clickable-class' + gifId;
      melzoGif.esol[removeClickableClassEsoId] = {
        id: removeClickableClassEsoId,
        sourceId: 'reticle',
        sourceEvent: 'reticle-animation-end-started',
        eventToEmit: 'remove-clickable-class',
        metaData: {
          bubble: false
        }
      };
    }

    melzoGifList[gifId] = melzoGif;
  });

  return melzoGifList;
}

function convertSwitchbuttons(switchBtns) {
  const melzoSwitchBtnList = {};
  if (!switchBtns) return melzoSwitchBtnList;

  switchBtns.forEach(switchBtn => {
    const switchBtnId = switchBtn._id;
    const melzoSwitchBtn = {
      id: switchBtnId,
      src: 'https://d2me8xtj4564r4.cloudfront.net/image/public/image2d/switch-button.png',
      type: 'image2d',
      transform: {
        position: strToVector(switchBtn.position),
        scale: {
          x: switchBtn.scale,
          y: switchBtn.scale,
          z: switchBtn.scale
        }
      },
      material: {
        opacity: switchBtn.opacity
      },
      actions: {},
      animations: {},
      esol: {},
      persistent: switchBtn.persistent
    };
    if (switchBtn.target && switchBtn.target !== 'UNKNOWN') {
      // TODO: Implement it properly.
      melzoSwitchBtn.components = {
        class: 'raycaster-solid clickable'
      };

      // eso
      const esoId = 'esoSwitchBtn' + switchBtnId;
      melzoSwitchBtn.esol[esoId] = targetToEso(esoId, switchBtn.target);
    }
    melzoSwitchBtnList[switchBtnId] = melzoSwitchBtn;
  });

  return melzoSwitchBtnList;
}

// isEnabled: ,
function convertAudioPA(audiopas) {
  const melzoaudioPAList = {};

  audiopas.forEach(audiopa => {
    const audiopaid = audiopa._id;
    const melzoAudioPA = {
      id: audiopaid,
      src: audiopa.src,
      type: 'audiopa',
      transform: {
        position: strToVector(audiopa.position),
        scale: {
          x: audiopa.scale,
          y: audiopa.scale,
          z: audiopa.scale
        }
      },
      depth: audiopa.depth,
      geometry: {
        height: audiopa.height,
        width: audiopa.width
      },
      material: {
        opacity: audiopa.opacity
      },
      language: audiopa.language,
      actions: {},
      animations: {},
      agentId: audiopa.agentId,
      esol: audiopa.esol_temp,
      persistent: {
        isEnabled: audiopa.persistent.isEnabled,
        excludeFrom: audiopa.persistent.excludeFrom
      }
    };

    melzoaudioPAList[audiopaid] = melzoAudioPA;
  });

  return melzoaudioPAList;
}

function convertSceneToMelzo(scene) {
  const melzoScene = {};
  if (!scene) return melzoScene;
  const sceneId = scene.sceneid;
  melzoScene.id = sceneId;
  melzoScene.backgroundId = 'bg' + scene.sceneid;
  melzoScene.shouldShowNavMenu = scene.homeMenuEnabled;
  melzoScene.widgets = Object.assign({},
    convertMenu3d(scene.menu3ds),
    // convertDocument(scene.documents),
    convertModel(scene.gltfmodels),
    convertCarousel(scene.carousels),
    convertGrid(scene.grids),
    convertText(scene.fixedtextarray),
    convertImagePopup(scene.imagepopups),
    convertVideos(scene.videos),
    convertSounds(scene.sounds),
    convertImages(scene.images),
    convertImages360View(scene.images360view),
    convertGifs(scene.gifs),
    convertSwitchbuttons(scene.switchbuttons),
    convertAudioPA(scene.audiopa)
  );
  return melzoScene;
}

function translatePptvrToMelzo(pptvrJSON) {
  const melzoJSON = {};
  melzoJSON.id = pptvrJSON._id;
  melzoJSON.projectname = pptvrJSON.projectname;
  melzoJSON.description = pptvrJSON.description;
  melzoJSON.projectCategory = pptvrJSON.projectCategory;
  melzoJSON.socialCardImage = pptvrJSON.socialCardImage;
  melzoJSON.stars = pptvrJSON.stars;
  melzoJSON.uid = pptvrJSON.uid;
  melzoJSON.views = pptvrJSON.views;
  melzoJSON.splashLogo = pptvrJSON.splashLogo;
  melzoJSON.version = pptvrJSON.version;
  melzoJSON.starredby = pptvrJSON.starredby;
  melzoJSON.isEnabled = pptvrJSON.isEnabled; // ?
  melzoJSON.featured = pptvrJSON.featured;
  melzoJSON.planType = pptvrJSON.planType;
  melzoJSON.checkProjectViewIn = pptvrJSON.checkProjectViewIn;
  melzoJSON.maxProjectViewBeforeSignIn = pptvrJSON.maxProjectViewBeforeSignIn;
  melzoJSON.loginSceneNumber = pptvrJSON.loginSceneNumber;
  melzoJSON.loginSceneNumberPostMaxProjectView =
    pptvrJSON.loginSceneNumberPostMaxProjectView;

  melzoJSON.isLoginNeeded = pptvrJSON.isLoginNeeded;
  // start - setting panel
  if (pptvrJSON.sceneRotationTime) {
    melzoJSON.sceneRotationTime = pptvrJSON.sceneRotationTime;
  } else {
    melzoJSON.sceneRotationTime = 45;
  }
  if (pptvrJSON.scrolling) {
    melzoJSON.scrolling = pptvrJSON.scrolling;
  } else {
    melzoJSON.scrolling = { vertical: true, horizontal: true };
  }
  if (pptvrJSON.uiContainer) {
    melzoJSON.uiContainer = pptvrJSON.uiContainer;
  } else {
    melzoJSON.uiContainer = { gyroMode: true, melzoLogo:true, projectName: true, signIn: true, vrMode: true, like: true, share: true, home: true };
  }
  if (melzoJSON.uiContainer.melzoLogo === 'undefined' || melzoJSON.uiContainer.melzoLogo === null) {
    melzoJSON.uiContainer.melzoLogo = true;
  }
  if (melzoJSON.uiContainer.gyroMode === 'undefined' || melzoJSON.uiContainer.gyroMode === null) {
    melzoJSON.uiContainer.gyroMode = true;
  }
  if (pptvrJSON.reticleProperties) {
    melzoJSON.reticleProperties = pptvrJSON.reticleProperties;
  } else {
    melzoJSON.reticleProperties = { size: 0.08, color: "white" };
  }
  if (pptvrJSON.interactionType) {
    melzoJSON.interactionType = pptvrJSON.interactionType;
  } else {
    melzoJSON.interactionType = "reticle";
  }
  if (pptvrJSON.isSplashEnabled) {
    melzoJSON.isSplashEnabled = pptvrJSON.isSplashEnabled;
  } else {
    melzoJSON.isSplashEnabled = true;
  }
  if (pptvrJSON.fov) {
    melzoJSON.fov = pptvrJSON.fov;
  } else {
    melzoJSON.fov = 80;
  }
  if (pptvrJSON.isInteractionEnabled) {
    melzoJSON.isInteractionEnabled = pptvrJSON.isInteractionEnabled;
  } else {
    melzoJSON.isInteractionEnabled = true;
  }
  if (pptvrJSON.isSceneRotation === 'undefined' || pptvrJSON.isSceneRotation === null) {
    melzoJSON.isSceneRotation = true;
  } else {
    melzoJSON.isSceneRotation = pptvrJSON.isSceneRotation;
  }
  if (pptvrJSON.isCenterPosition === 'undefined' || pptvrJSON.isCenterPosition === null) {
    melzoJSON.isCenterPosition = true;
  } else {
    melzoJSON.isCenterPosition = pptvrJSON.isCenterPosition;
  }
  // end - setting panel

  melzoJSON.self = pptvrJSON.self;

  const {
    scenes
  } = pptvrJSON;

  // Background
  melzoJSON.backgrounds = {};
  // TODO: Implement defaultSceneOrientation properly
  // Not sure about: defaultSceneOrientation attr
  scenes.forEach(scene => {
    const bgId = 'bg' + scene.sceneid;
    melzoJSON.backgrounds[bgId] = {
      id: bgId,
      type: srcType[scene.srcType],
      src: scene.bgimage,
      defaultSceneOrientation: scene.defaultSceneOrientation
    };
  });

  // NavMenu
  melzoJSON.navMenu = {
    isEnabled: pptvrJSON.navMenu.enabled,
    homeLogo: {
      posIndex: pptvrJSON.navMenu.homeLogo.enabled,
      src: pptvrJSON.navMenu.homeLogo.src
    },
    cells: {}
  };

  // Project Sound
  melzoJSON.projectSound = {
    id: 'projectSound',
    type: 'project-sound',
    src: pptvrJSON.sound.src,
    volume: pptvrJSON.sound.volume,
    autoplay: true,
    isEnabled: pptvrJSON.sound.enable
  };

  // Scenes
  melzoJSON.scenes = {};
  scenes.forEach(scene => {
    const melzoSceneJSON = convertSceneToMelzo(scene);
    melzoJSON.scenes[melzoSceneJSON.id] = melzoSceneJSON;
  });

  return melzoJSON;
}

export {
  translatePptvrToMelzo,
  convertSceneToMelzo,
  convertImages,
  convertMenu3d,
  strToVector
};

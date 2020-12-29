/* eslint-disable no-unused-vars */
import {
  factory
} from './create-factory';
import {
  createImage
} from './image-factory';
import {
  createGif
} from './gif-factory';
import {
  createSound
} from './sound-factory';
import {
  createVideo
} from './video-factory';
import {
  createImagePopup
} from './image-popup-factory';
import {
  createDocument
} from './document-reader-factory';
import {
  createGltfModel
} from './gltf-model-factory';
import {
  getReticlePosition,
  guid,
  getReticlePositionObj
} from './util-factory';
import {
  gif,
  sound,
  video2d,
  model,
  imageArts,
  image2d,
  bgImages
} from './res-factory';

const widgetimage = function widgetimage() {
  this.defaultDepth = 15;
  this.resSrcArray = {
    resSrcArray: {
      private: factory.project.assetImages,
      public: image2d
    },
    widgetType: 'widgetimage'
  };

  this.updateSrc = function updateSrc(newSrc) {
    this.defaultObj.src = newSrc;
  };

  this.create = createImage;

  this.defaultObj = {
    position: getReticlePosition(this.defaultDepth),
    src: 'image/public/image2d/fallback-image2d.png',
    height: 2,
    width: 2,
    scale: 1.0,
    isTargetEnabled: false,
    target: 'UNKNOWN',
    depth: this.defaultDepth,
    opacity: 1
  };
};


const widgetgif = function widgetgif() {
  this.defaultDepth = 15;

  this.resSrcArray = {
    resSrcArray: {
      private: factory.project.assetImages,
      public: image2d
    },
    widgetType: 'widgetimage'
  };

  this.updateSrc = function updateSrc(newSrc) {
    this.defaultObj.src = newSrc;
  };

  this.create = createGif;

  this.defaultObj = {
    position: getReticlePosition(this.defaultDepth),
    src: 'image/public/image2d/fallback-image2d.png',
    height: 2,
    width: 2,
    scale: 1.0,
    isTargetEnabled: false,
    target: 'UNKNOWN',
    depth: this.defaultDepth,
    opacity: 1,
    noOfFrames: 10,
    loops: 1,
    startFrame: 1
  };
}

const widgetsound = function widgetsound() {
  this.defaultDepth = 15;

  this.resSrcArray = {
    resSrcArray: {
      private: factory.project.assetImages,
      public: image2d
    },
    widgetType: 'widgetsound'
  };

  this.updateSrc = function updateSrc(newSrc) {
    this.defaultObj.imageSrc = newSrc;
  };

  this.create = createSound;

  this.defaultObj = {
    position: getReticlePositionObj(this.defaultDepth),
    imageSrc: 'image/public/image2d/fallback-image2d.png',
    soundSrc: 'default-sound.mp3',
    depth: this.defaultDepth,
    opacity: 1,
    height: 2,
    width: 2,
    scale: 1.0
  };
}

const widgetvideo = function widgetvideo() {
  this.defaultDepth = 15;

  this.resSrcArray = {
    resSrcArray: {
      private: factory.project.assetVideos,
      public: video2d
    },
    widgetType: 'widgetvideo'
  };

  this.updateSrc = function updateSrc(newSrc) {
    this.defaultObj.src = newSrc;
  };

  this.create = createVideo;

  this.defaultObj = {
    position: getReticlePosition(this.defaultDepth),
    src: video2d[0],
    height: 3,
    width: 5,
    scale: 1.0,
    depth: this.defaultDepth,
    opacity: 1
  };
}

const widgetimagepopup = function widgetimagepopup() {
  this.defaultDepth = 15;

  this.resSrcArray = {
    resSrcArray: {
      private: factory.project.assetImages,
      public: image2d
    },
    widgetType: 'widgetimagepopup'
  };

  this.create = createImagePopup;

  this.updateSrc = function updateSrc(newSrc) {
    this.defaultObj.popup.src = newSrc;
  };

  this.defaultObj = {
    position: getReticlePosition(this.defaultDepth),
    src: 'image/public/image2d/popup_button.png',
    height: 2,
    width: 2,
    scale: 1.0,
    depth: this.defaultDepth,
    opacity: 1,
    popup: {
      _id: guid(),
      src: 'image/public/image2d/fallback-image2d.png',
      height: 3,
      width: 5,
      scale: 1,
      opacity: 1
    }
  };
}

const widgetdocument = function widgetdocument() {
  this.defaultDepth = 5;

  this.resSrcArray = {
    resSrcArray: {
      private: factory.project.assetDocuments,
      public: document
    },
    widgetType: 'widgetdocument'
  };

  this.updateSrc = function updateSrc(newSrc) {
    this.defaultObj.src = newSrc;
  };

  this.create = createDocument;

  this.defaultObj = {
    src: 'document/kleeman_kalman_basics.pdf',
    fullSize: {
      depth: 5,
      position: getReticlePosition(this.defaultDepth),
      opacity: 1
    }
  };
}

const widgetgltfmodel = function widgetgltfmodel() {
  this.defaultDepth = 10;

  this.resSrcArray = {
    resSrcArray: {
      private: factory.project.assetModels,
      public: model
    },
    widgetType: 'widgetgltfmodel'
  };

  this.updateSrc = function updateSrc(newSrc) {
    this.defaultObj.src = newSrc;
  };

  this.create = createGltfModel;

  this.defaultObj = {
    src: '../images/Crate1.gltf',
    position: getReticlePosition(this.defaultDepth),
    rotation: '0 0 0',
    scale: '1 1 1',
    depth: this.defaultDepth
  };
}

const getWidgetObj = {
  'widgetimage': widgetimage,
  'widgetgif': widgetgif,
  'widgetsound': widgetsound,
  'widgetvideo': widgetvideo,
  'widgetimagepopup': widgetimagepopup,
  'widgetdocument': widgetdocument,
  'widgetgltfmodel': widgetgltfmodel
};
export {
  getWidgetObj,
  widgetimage
}

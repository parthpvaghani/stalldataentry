/* eslint-disable no-unused-vars */
import {
  getSceneIndex
} from './util-factory';

const factory = {
  bottomMenuState: 'SCENE_LIST',
  currentSceneId: '',
  anim: {
    currentSceneId: '',
    transitSceneId: null
  },
  project: {
    _id: '5d5e362e83ad38000f0637ce',
    scenes: []
  },

  selectedEntity: {
    obj: {},
    type: null
  },
  liveProgrammingEnabled: false
};

factory.getWidgetAttribute = {
  // Get attribute which will be used in the single-res-selector-dialog controller, since we need to open the assets based on button clicked by the user
  'image2d': 'assetImages',
  'gif': 'assetGifs',
  'video2d': 'assetVideos',
  'image360': 'assetBgImages',
  'video360': 'assetBgVideos'
}

function currentScene() {
  const index = getSceneIndex(factory.project.scenes, factory.currentSceneId);
  return factory.project.scenes[index] || {};
}

function getScene(sceneid) {
  const index = getSceneIndex(factory.project.scenes, sceneid);
  return factory.project.scenes[index];
}

function destroyProjectModal() {
  factory.currentSceneId = null;
  factory.project = {
    '_id': null,
    'scenes': []
  };
  factory.selectedEntity = {
    obj: {},
    type: null
  };
}
export {
  destroyProjectModal,
  currentScene,
  getScene,
  factory
};

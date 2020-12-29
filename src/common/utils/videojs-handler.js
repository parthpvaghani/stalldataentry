/* eslint-disable no-restricted-syntax */

import WIDGET_TYPES from './../constants/widget-types';

function doesProjectContainVideo2d(project) {
  if (!project) return false;

  const scenes = Object.values(project.scenes);

  for (let sceneIndex = scenes.length - 1; sceneIndex >= 0; sceneIndex -= 1) {
    const sceneWidgets = scenes[sceneIndex].widgets;
    for (const key in sceneWidgets) {
      if (sceneWidgets[key].type === WIDGET_TYPES.video2d) {
        return true;
      }
    }
  }

  return false;
}

function doesProjectContainVideo360(project) {
  if (!project) return false;

  const {
    backgrounds
  } = project;
  const scenes = Object.values(project.scenes);

  for (let sceneIndex = scenes.length - 1; sceneIndex >= 0; sceneIndex -= 1) {
    const {
      backgroundId
    } = scenes[sceneIndex];
    if (backgrounds[backgroundId].type === WIDGET_TYPES.video360) {
      return true;
    }
  }

  return false;
}

function doesProjectContainVideo(project) {
  return (
    doesProjectContainVideo2d(project) || doesProjectContainVideo360(project)
  );
}

function videojsHandler() {
  if (doesProjectContainVideo2d(window.projectJSON)) {
    // User click is mandatory to unmute video on mobile devices.
    const setupOpt = {
      html5: {
        nativeAudioTracks: false,
        nativeVideoTracks: false,
        nativeCaptions: false
      },
      hls: {
        overrideNative: true
      }
    };

    const video2dHtmlElClass = '.video2dHtmlEl';
    const video2dHtmlEls = document.querySelectorAll(video2dHtmlElClass);
    for (let i = video2dHtmlEls.length - 1; i >= 0; i -= 1) {
      const video2dHtmlEl = video2dHtmlEls[i];
      video2dHtmlEl.muted = false;
      if (!videojs.players[video2dHtmlEl.id]) {
        const player = videojs(video2dHtmlEl.id, setupOpt);
        player.muted(false);
      } else {
        videojs.players[video2dHtmlEl.id].muted(false);
      }
    }
  }

  if (doesProjectContainVideo360(window.projectJSON)) {
    // User click is mandatory to unmute video on mobile devices.
    const setupOpt = {
      html5: {
        nativeAudioTracks: false,
        nativeVideoTracks: false,
        nativeCaptions: false,
        hls: {
          overrideNative: true
        }
      }
    };
    const innerVideo360ElId = 'innerVideo360HtmlEl';
    const innerVideo360El = document.getElementById(innerVideo360ElId);
    innerVideo360El.muted = false;
    if (!videojs.players[innerVideo360ElId]) {
      const player = videojs(innerVideo360ElId, setupOpt);
      player.muted(false);
    } else {
      videojs.players[innerVideo360ElId].muted(false);
    }

    const outerVideo360ElId = 'outerVideo360HtmlEl';
    const outerVideo360El = document.getElementById(outerVideo360ElId);
    outerVideo360El.muted = false;
    if (!videojs.players[outerVideo360ElId]) {
      const player = videojs(outerVideo360ElId, setupOpt);
      player.muted(false);
    } else {
      videojs.players[outerVideo360ElId].muted(false);
    }
  }
}

/* eslint-disable */

function loadVideojsFiles(project) {
  const {
    body
  } = document;
  const app = document.querySelector('#app');

  $LAB.setGlobalDefaults({
    AlwaysPreserveOrder: true
  });

  if (doesProjectContainVideo(project)) {
    $LAB
      // .script('https://unpkg.com/video.js/dist/video.min.js')
      // .script('/videojs-contrib-hls.js')
      // .script('/video-dash.all.min.js')
      // .script('/videojs-contrib-dash.min.js')
      .script('https://cdn.jsdelivr.net/npm/video.js/dist/video.js')
      .script('/videojs-contrib-hls.js')
      .script(
        'https://cdnjs.cloudflare.com/ajax/libs/dashjs/2.9.3/dash.all.debug.js'
      )
      .script('https://cdn.jsdelivr.net/npm/videojs-contrib-dash/dist/videojs-dash.js')
      .wait(() => {
        body.appendChild(app);
        const videojsFilesLoaded = new CustomEvent('videojs-files-loaded');
        document.dispatchEvent(videojsFilesLoaded);
      });
    return true;
  }
  return false;
}

export {
  videojsHandler,
  loadVideojsFiles,
  doesProjectContainVideo
};

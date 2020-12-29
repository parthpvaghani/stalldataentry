/* eslint-disable dot-notation */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import {
  factory,
  currentScene,
  getScene,
  destroyProjectModal
} from './create-factory';
import {
  duplicateSceneLocal,
  createSceneLocal,
  updateSceneLocal,
  deleteSceneLocal
} from './project-local-factory';
import {
  duplicateSceneNetwork,
  createSceneNetwork,
  updateSceneNetwork,
  deleteSceneNetwork,
  addViewNetwork
} from './project-network';
import {
  guid,
  getUserToken,
  getSceneUsingSceneId
} from './util-factory';
import {
  bgImages
} from './res-factory';
// import PubNub from 'pubnub';
// import mrc from '../../common/network/melzo-rest-client';


function duplicateScene(scene) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      // if (factory.project.scenes.length >= 200) {
      //   return;
      // }
      // const sceneObj = getSceneUsingSceneId(factory.project.scenes, sceneObjId);
      scene.sceneid = guid();
      // sceneObj["sceneid"] = guid();
      // sceneObj.remove("sceneid");
      // sceneObj.put("sceneid", guid());
      duplicateSceneNetwork({
          projectid: factory.project._id,
          token
        }, scene)
        .then((responseScene) => {
          duplicateSceneLocal(responseScene);
          // changeScene(responseScene.data.sceneid);
          resolve(responseScene);
        });
    }).catch((err) => {});
  });
  // const thisScene = scene;
  // return getUserToken().then((token) => {
  //   if (factory.project.scenes.length >= 120) {
  //     return;
  //   }
  //   thisScene.sceneid = guid();
  //   duplicateSceneNetwork({
  //       projectid: factory.project._id,
  //       token
  //     })
  //     .query(thisScene)
  //     .$promise.then((responseScene) => {
  //       duplicateSceneLocal(responseScene);
  //       changeScene(responseScene.sceneid);
  //     });
  // });
}

function createScene() {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      // if (factory.project.scenes.length >= 120) {
      //   return;
      // }
      const scene = {
        sceneid: guid(),
        bgimage: bgImages[0],
        srcType: "bgImage",
        switchbuttons: [],
        images: [],
        homeMenuEnabled: true
      };
      if(scene){
      createSceneNetwork({
        "projectid": factory.project._id,
        "token": token
      }, scene).then(
        (responseScene) => {
          createSceneLocal(responseScene);
          resolve(responseScene);
          // updateLiveSceneChangesToFirebase({
          //   operation: "POST",
          //   projectid: factory.project._id,
          //   scene: responseScene
          // });

          // changeScene(responseScene.sceneid);
        },
        (error) => {
          //   message = "Error: " + error.status + " " + error.statusText;
        }
      );
    }
    }).catch((err) => {});
  });
}

function updateScene(updatedSceneObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      updateSceneLocal(updatedSceneObj);
      updateSceneNetwork({
          projectid: factory.project._id,
          token,
          sceneid: updatedSceneObj._id
        }, updatedSceneObj.updatedVal)
        .then((response) => {
          resolve(response)
        });
    }).catch((err) => {});
  });
}

function updateSceneOnServer(projectid, sceneid) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      updateSceneNetwork({
          projectid,
          token,
          sceneid
        }, getScene(sceneid))
        .then((response) => {
          resolve(response)
        });
    }).catch((err) => {});
  });
  // firebase.auth()
  //   .getToken(false)
  //   .then((token) => updateSceneNetwork({
  //       projectid,
  //       token,
  //       sceneid
  //     })
  //     .query(getScene(sceneid)))
  //   .catch((err) => {
  //     console.log("projectFactory::updateSceneOnServer", err);
  //   });
}

// deleteSceneAlert

function deleteScene(sceneid) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      deleteSceneNetwork({
        projectid: factory.project._id,
        token,
        sceneid
      }).then((responseSceneId) => {
        const removedSceneIndex = deleteSceneLocal(sceneid);
        if (removedSceneIndex) {
          // updateLiveSceneChangesToFirebase({
          //   operation: "DELETE",
          //   projectid: factory.project._id,
          //   scene: {
          //     sceneid
          //   }
          // });
        }
        let newSceneId = factory.currentSceneId;
        if (sceneid === factory.currentSceneId) {
          if (removedSceneIndex === 0) {
            newSceneId = factory.project.scenes[0].sceneid;
          } else {
            newSceneId = factory.project.scenes[removedSceneIndex - 1].sceneid;
          }
          if (factory.currentSceneId) {
            factory.anim.transitSceneId =
              factory.currentSceneId;
          }
          // SET CURRENT SCENEID IMPS
          factory.currentSceneId = newSceneId;
          // THIS
          factory.anim.currentSceneId = newSceneId;
          // responseSceneId = newSceneId;
          resolve(newSceneId);
          // document.querySelector("a-scene").emit("changeScene", {
          //   newSceneId
          // });
        }
        resolve(newSceneId);
      });
    }).catch((err) => {});
  });
}

function changeScene(sceneid, avoidPushInStack, refreshScene) {
  if (isValidUrl(sceneid)) {
    const a = document.createElement("a");
    a.target = "_blank";
    a.href = sceneid;
    a.click();
    return;
  }

  if (
    !sceneid ||
    sceneid === "UNKNOWN" ||
    (sceneid === currentScene() && !refreshScene) ||
    getScene(sceneid) < 0
  ) {
    console.log(
      "projectFactory::changeScene",
      "returning as target sceneid is not valid"
    );
    return;
  }

  if (!avoidPushInStack) {
    // navMenuDefaultCellsFactory.pushSceneId(sceneid);
  }

  if (factory.currentSceneId) {
    factory.anim.transitSceneId = factory.currentSceneId;
  }

  factory.currentSceneId = sceneid;
  factory.anim.currentSceneId = sceneid;
  // document.getElementById('scene').emit('changescene', {
  //   sceneId: sceneid
  // });
}

function addViews(projectid) {
  addViewNetwork({
      projectid
    })
    .put();
}

function getHeatMap() {
  // return new Promise((resolve, reject) => {
  //   $firebaseAuth()
  //     .$getAuth()
  //     .getToken(false)
  //     .then((token) => {
  //       projectNetworkFactory
  //         .getHeatMap({
  //           token
  //         })
  //         .post({
  //           projectid,
  //           sceneid,
  //           imageurl
  //         })
  //         .$promise.then(
  //           (pngBlob) => {
  //             FileSaver.saveAs(pngBlob.response, "heatmap.png");
  //             resolve();
  //           },
  //           (err) => {
  //             console.log(err);
  //             reject();
  //           }
  //         );
  //     });
  // });
}

// eslint-disable-next-line no-unused-vars
function updateLiveProjChangesToFirebase(obj) {
  // TODO: LiveProj Enable/Disable from project settings.
  // firebase.database().ref('go-live/projects/' + obj.project_id).set({
  //     'liveProFirebaseObj': obj
  // });
}

function updateLiveSceneChangesToFirebase(obj) {
  // const pubnub = new PubNub({
  //   // publishKey: "pub-c-4374f339-e8ac-4dd2-98e3-1c76ab0663fe",
  //   // subscribeKey: "sub-c-68295bc4-2bed-11e8-ae0d-3a0cea6ae1c4"
  //   publishKey: "pub-c-9906b65f-b5b0-4e48-a335-ddf1e801386d",
  //   subscribeKey: "sub-c-31da7232-aad2-11e9-a577-e6e01a51e1d3"
  // });

  // const objJSON = JSON.parse(obj)

  // pubnub.publish({
  //   message: {
  //     operation: obj.operation,
  //     scene: objJSON.scene
  //   },
  //   channel: "live-programming"
  // });

  // firebase
  //   .database()
  //   .ref('go-live/projects/' + obj.projectid)
  //   .set({
  //     operation: obj.operation,
  //     scene: angular.fromJson(angular.toJson(obj.scene))
  //   });
}

function isValidUrl(str) {
  return str.indexOf(".") > -1;
}

export {
  duplicateScene,
  updateScene,
  updateLiveProjChangesToFirebase,
  updateLiveSceneChangesToFirebase,
  updateSceneOnServer,
  createScene,
  deleteScene,
  addViews,
  getHeatMap,
  changeScene
}

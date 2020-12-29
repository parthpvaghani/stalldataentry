// import createFactory from '../../creator/create';
// import utilsFactory from '../../creator/project-container/util-factory';
// import projectLocalFactory from '../../creator/project-container/project-local';
// import config from '../../common/constants/config-constants';
// // '$scope', '$rootScope', '$sce', 'projectFactory', 'createFactory', 'utilsFactory', 'sceneMode', 'projectLocalFactory', 'config', '$interval', '$timeout', 'firebaseViewAnalyticsFactory', 'sceneLoadProgressAnimFactory', 'serviceWorkerFactory', '$mdToast', 'projListFactory', '$state',
// var zoomScale = 1;
// var zoomMinVal = 35;
// var zoomMaxVal = 85;
// var prevSceneMode = null;
// var scaling = false;
// var lastScale = -1;

// selectedEntity = createFactory.selectedEntity;
// sceneMode = sceneMode;
// project = createFactory.project;
// createFactory = createFactory;
// isMobileDevice = $rootScope.isMobileDevice;
// currentScene = {};
// isProjCtrlReady = false;
// utilsFactory = utilsFactory;
// config = config;
// sce = $sce;

// currentSceneId = createFactory.currentSceneId;
// transitSceneId = createFactory.transitSceneId;
// anim = createFactory.anim;
// zoomVal = 80;
// gyroModeEnabled = false;

// sceneLoadProgress = sceneLoadProgressAnimFactory;
// firebase = firebase;

// showSaveOfflineBtn = sceneMode.isPreviewMode() && firebase.auth().currentUser && navigator.serviceWorker;

// var firstFirebaseDataSyncing = true;
// var deregisterOnChangeSceneListener;
// const elAscene = document.getElementsByTagName('a-scene');
// var onSceneLoaded = function (e) {

//   //   // TODO: implement properly
//   if (createFactory.currentScene()) {
//     document.querySelector("#video360" + createFactory.currentScene()._id) && document.querySelector("#video360" + createFactory.currentScene()._id).load();
//   }

//   elAscene.addEventListener('reticleAnimationStart', function () {
//     $('#reticle').emit('reticleAnimationStart', {}, false);
//   });

//   elAscene.addEventListener('mousewheel', function (e) {
//     $apply(function () {
//       if (e.wheelDelta / 120 > 0) {
//         if (zoomMaxVal > zoomVal) {
//           zoomVal += zoomScale;
//         }
//       } else {
//         if (zoomMinVal < zoomVal) {
//           zoomVal -= zoomScale;
//         }
//       }
//     });
//   }, {
//     passive: true
//   });

//   document.addEventListener("touchstart", function (e) {
//     if (e.touches.length == 2) {
//       scaling = true;
//       lastScale = -1;
//     }
//   });


//   document.addEventListener("touchmove", function (e) {
//     if (scaling) {
//       var dist = Math.sqrt((e.touches[0].pageX - e.touches[1].pageX) * (e.touches[0].pageX - e.touches[1].pageX) + (e.touches[0].pageY - e.touches[1].pageY) * (e.touches[0].pageY - e.touches[1].pageY));

//       if (lastScale == -1) {
//         lastScale = dist;
//       } else {
//         if (dist < lastScale && zoomMaxVal > zoomVal) {
//           zoomVal += zoomScale;
//         } else if (dist > lastScale && zoomMinVal < zoomVal) {
//           zoomVal -= zoomScale;
//         }
//       }
//     }
//   });

//   document.addEventListener("touchend", function () {
//     if (scaling) {
//       scaling = false;
//     }
//   });

//   $watch('sceneMode.mode', function (newVal, oldVal, scope) {
//     setCameraAttrs();
//   });


//   elAscene.renderer.context.getShaderInfoLog = function () {
//     return ''
//   };

//   elAscene.addEventListener('exit-vr', function () {
//     if (sceneMode.isPreviewDev()) {
//       $timeout(function () {
//         sceneMode.setEditMode();
//       });
//     }
//   });

//   elAscene.addEventListener('enter-vr', function () {
//     $('#camera').setAttribute('position', '0 0 0');
//   });

//   deregisterOnChangeSceneListener = $rootScope.$on('changeScene', function () {
//     $timeout(function () {

//       var index = utilsFactory.getSceneIndex(createFactory.project.scenes, createFactory.currentSceneId) + 1;

//       currentScene = createFactory.currentScene();


//       if (sceneMode.isPreviewMode()) {
//         $state.go('app.previewscene', {
//             projectid: createFactory.project._id,
//             sceneid: 'scene-' + index
//           },

//           {
//             notify: false,
//             reload: false
//           });
//       }
//     });

//   });


//   if (!createFactory.project.self) {
//     // Temporarily disabled
//     // liveProjChangesFirebaseListener();
//   }

//   //   // On right click release cursor pointerlock. Cursor will be visible.
//   document.addEventListener('pointerlockchange', actionOnPointerLockChange, false);
//   document.addEventListener('mozpointerlockchange', actionOnPointerLockChange, false);

//   var releasePointerLock = function (e) {
//     var isRightMB;
//     e = e || window.event;

//     if ("which" in e) // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
//       isRightMB = e.which == 3;
//     else if ("button" in e) // IE, Opera 
//       isRightMB = e.button == 2;

//     if (isRightMB) {
//       document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
//       document.exitPointerLock();
//     }
//   }


//   function actionOnPointerLockChange() {
//     if (document.pointerLockElement === document.querySelector('canvas') ||
//       document.mozPointerLockElement === document.querySelector('canvas')) {
//       document.querySelector('a-scene').addEventListener('click', releasePointerLock, false);
//     } else {
//       document.querySelector('a-scene').removeEventListener('click', releasePointerLock, false);
//     }
//   }

//   $rootScope.$broadcast('project-ready');
// };

// setSceneLoadedListener = function () {
//   // elAscene.addEventListener('timeout', function() {
//   //     onSceneLoaded();
//   // });

//   elAscene.addEventListener('loaded', function () {
//     onSceneLoaded();
//   });
// };

// function setCameraAttrs() {
//   if (sceneMode.isEditMode()) {
//     elAscene.setAttribute('vr-mode-ui', 'enabled: false');
//   } else {
//     elAscene.setAttribute('vr-mode-ui', 'enabled: true');
//   }
//   if (isMobileDevice) {
//     $('#camera').removeAttribute('universal-controls');
//   }
// }

// // var liveSceneChangesFirebaseListener = function () {
// //   var ref = firebase.database().ref('go-live/projects/' + createFactory.project._id);
// //   ref.on('value', function (snapshot) {

// //     if (!snapshot || !snapshot.val())
// //       return;

// //     switch (snapshot.val().operation) {
// //       case 'POST':
// //         projectLocalFactory.createScene(snapshot.val().scene);
// //         break;
// //       case 'PUT':
// //         var updatedSceneObj = {};
// //         updatedSceneObj.updatedVal = snapshot.val().scene;
// //         projectLocalFactory.updateScene(updatedSceneObj);
// //         break;
// //       case 'DELETE':
// //         projectLocalFactory.deleteScene(snapshot.val().scene.sceneid);
// //         break;
// //     }
// //     // $rootScope.$apply() is need in order to bind the updated changes.
// //     $rootScope.$apply();
// //   });
// // }

// // var liveProjChangesFirebaseListener = function () {
// //   var ref = firebase.database().ref('go-live/projects/' + createFactory.project._id + '/liveProFirebaseObj');
// //   ref.on('value', function (snapshot) {
// //     if (firstFirebaseDataSyncing) {
// //       firstFirebaseDataSyncing = false;
// //       return;
// //     }
// //     switch (snapshot.val().object_type) {
// //       case 'scene':
// //         switch (snapshot.val().operation) {
// //           case 'POST':
// //             projectLocalFactory.createScene(snapshot.val().updated_obj);
// //             break;
// //           case 'PUT':
// //             console.log("liveProjChangesFirebaseListener");
// //             projectLocalFactory.updateScene(snapshot.val().updated_obj);
// //             break;
// //           case 'DELETE':
// //             projectLocalFactory.deleteScene(snapshot.val().updated_obj);
// //             break;
// //         }
// //         break;
// //       case 'switchbutton':
// //         switch (snapshot.val().operation) {
// //           case 'POST':
// //             projectLocalFactory.createButton(snapshot.val().scene_id, snapshot.val().updated_obj);
// //             break;
// //           case 'PUT':
// //             projectLocalFactory.updateButton(snapshot.val().scene_id, snapshot.val().updated_obj);
// //             break;
// //           case 'DELETE':
// //             projectLocalFactory.deleteButton(snapshot.val().scene_id, snapshot.val().updated_obj);
// //             break;
// //         }
// //         break;
// //       case 'widgetimage':
// //         switch (snapshot.val().operation) {
// //           case 'POST':
// //             projectLocalFactory.createImage(snapshot.val().scene_id, snapshot.val().updated_obj);
// //             break;
// //           case 'PUT':
// //             projectLocalFactory.updateImage(snapshot.val().scene_id, snapshot.val().updated_obj);
// //             break;
// //           case 'DELETE':
// //             projectLocalFactory.deleteImage(snapshot.val().scene_id, snapshot.val().updated_obj);
// //             break;
// //         }
// //         break;
// //       case 'widgetvideo':
// //         switch (snapshot.val().operation) {
// //           case 'POST':
// //             projectLocalFactory.createVideo(snapshot.val().scene_id, snapshot.val().updated_obj);
// //             break;
// //           case 'PUT':
// //             projectLocalFactory.updateVideo(snapshot.val().scene_id, snapshot.val().updated_obj);
// //             break;
// //           case 'DELETE':
// //             projectLocalFactory.deleteVideo(snapshot.val().scene_id, snapshot.val().updated_obj);
// //             break;
// //         }
// //         break;
// //     }
// //   });
// // }


// function videosphereTargetExists() {
//   return !!document.querySelector('#' + utilsFactory.getResId('video360', currentScene));
// }

// // $on('$destroy', function () {
// //   if (deregisterOnChangeSceneListener) {
// //     deregisterOnChangeSceneListener();
// //   }
// // });

// // // Firebase analytics.
// // firebaseViewAnalyticsFactory.projectViewAdd();
// // $rootScope.$on('changeScene', function () {
// //   firebaseViewAnalyticsFactory.changeScene();
// // });


// // $on('$destroy', function () {
// //   if (deregisterOnChangeSceneListener) {
// //     deregisterOnChangeSceneListener();
// //   }
// // });

// var init = function () {
//   isProjCtrlReady = true;
//   if (!createFactory.project.self) {
//     liveSceneChangesFirebaseListener();
//   }
// }

// init();

// function saveOffline() {
//   var projectId = createFactory.project._id;
//   savingOffline = true;
//   vars = serviceWorkerFactory.vars;
//   projListFactory.fetchProjectNetwork(projectId)
//     .then(serviceWorkerFactory.saveProjectOffline)
//     .then(function () {
//       var pinTo = 'bottom right';
//       var toast = $mdToast.simple()
//         .textContent('Successfully saved Offline.')
//         .highlightAction(true)
//         .highlightClass('md-accent')
//         .position(pinTo)
//         .hideDelay(3000);
//       $mdToast.show(toast);
//     })
//     .catch(function (err) {
//       console.log(err);
//     })
//     .finally(function () {
//       savingOffline = false;
//     })
// }

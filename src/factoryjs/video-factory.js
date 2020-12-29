/* eslint-disable no-unused-vars */
import {
  createVideoLocal,
  deleteVideoLocal,
  updateVideoLocal,
  duplicateVideoLocal
} from './project-local-factory';
import {
  createVideoNetwork,
  deleteVideoNetwork,
  updateVideoNetwork,
  duplicateVideoNetwork
} from './project-network';
import {
  factory
} from './create-factory';
import {
  guid,
  getUserToken
} from './util-factory';

function duplicateVideo(sceneid, videoObj) {

  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      duplicateVideoNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid
      }, videoObj).then(
        (responseNewVideo) => {
          if (duplicateVideoLocal(sceneid, responseNewVideo.data)) {
            resolve(responseNewVideo);
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
  //   return $q(function (resolve, reject) {
  //     $firebaseAuth().$getAuth().getToken(false).then(function (token) {
  //       projectNetworkFactory.duplicateVideo({
  //         "projectid": createFactory.project._id,
  //         "token": token,
  //         "sceneid": sceneid
  //       }).query(videoObj).$promise.then(
  //         function (responseNewVideo) {
  //           if (projectLocalFactory.duplicateVideo(sceneid, responseNewVideo)) {
  //             resolve(responseNewVideo);
  //           } else {
  //             reject();
  //           }
  //         },
  //         function (error) {
  //           reject();
  //         }
  //       );
  //     }).catch(function (err) {
  //       console.log(err);
  //     });
  //   });
}

function createVideo(sceneid, videoObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      createVideoNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid
      }, videoObj).then(
        (responseNewVideo) => {
          if (createVideoLocal(sceneid, responseNewVideo.data)) {
            resolve(responseNewVideo);
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
  //   return $q(function (resolve, reject) {
  //     $firebaseAuth().$getAuth().getToken(false).then(function (token) {
  //       projectNetworkFactory.createVideo({
  //         "projectid": createFactory.project._id,
  //         "token": token,
  //         "sceneid": sceneid
  //       }).query(videoObj).$promise.then(
  //         function (responseNewVideo) {
  //           if (projectLocalFactory.createVideo(sceneid, responseNewVideo)) {
  //             var obj = {
  //               operation: 'POST',
  //               project_id: createFactory.project._id,
  //               scene_id: sceneid,
  //               object_type: 'widgetvideo',
  //               updated_obj: JSON.parse(angular.toJson(responseNewVideo))
  //             };
  //             projectFactory.updateLiveProjChangesToFirebase(obj);
  //             resolve(responseNewVideo);
  //           } else {
  //             reject();
  //           }
  //         },
  //         function (error) {
  //           reject();
  //         }
  //       );
  //     }).catch(function (err) {
  //       console.log(err);
  //     });
  //   });

}

function updateVideo(sceneid, updatedVidObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      updateVideoLocal(sceneid, updatedVidObj);
      updateVideoNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "videoid": updatedVidObj._id
      }, updatedVidObj.updatedVal).then(
        (response) => {
          //   const obj = {
          //     operation: 'PUT',
          //     project_id: createFactory.project._id,
          //     scene_id: sceneid,
          //     object_type: 'widgetvideo',
          //     updated_obj: JSON.parse(angular.toJson(updatedVidObj))
          //   };
          //   updateLiveProjChangesToFirebase(obj);
          resolve(response);
        },
        (error) => {
          //   message = "Error: " + error.status + " " + error.statusText;
        }
      );
    }).catch((err) => {});
  });
  //   return $q(function (resolve, reject) {

  //     $firebaseAuth().$getAuth().getToken(false).then(function (token) {

  //       projectLocalFactory.updateVideo(sceneid, updatedVidObj);

  //       return projectNetworkFactory.updateVideo({
  //         "projectid": createFactory.project._id,
  //         "token": token,
  //         "sceneid": sceneid,
  //         "videoid": updatedVidObj._id
  //       }).put(updatedVidObj.updatedVal).$promise.then(
  //         function (response) {
  //           var obj = {
  //             operation: 'PUT',
  //             project_id: createFactory.project._id,
  //             scene_id: sceneid,
  //             object_type: 'widgetvideo',
  //             updated_obj: JSON.parse(angular.toJson(updatedVidObj))
  //           };
  //           projectFactory.updateLiveProjChangesToFirebase(obj);
  //         }
  //       );


  //     }).catch(function (err) {
  //       console.log(err);
  //     });

  //   });

}

function deleteVideo(sceneid, videoid) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      deleteVideoNetwork({
        "projectid": factory.project._id,
        "token": token,
        "sceneid": sceneid,
        "videoid": videoid
      }).then(
        (response) => {
          if (deleteVideoLocal(sceneid, videoid)) {
            // const obj = {
            //   operation: 'DELETE',
            //   project_id: factory.project._id,
            //   scene_id: sceneid,
            //   object_type: 'widgetvideo',
            //   updated_obj: videoid
            // };
            // updateLiveProjChangesToFirebase(obj);
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
  //   $firebaseAuth().$getAuth().getToken(false).then(function (token) {
  //     projectNetworkFactory.deleteVideo({
  //       "projectid": createFactory.project._id,
  //       "token": token,
  //       "sceneid": sceneid,
  //       "videoid": videoid
  //     }).delete().$promise.then(
  //       function (response) {
  //         if (projectLocalFactory.deleteVideo(sceneid, videoid)) {
  //           var obj = {
  //             operation: 'DELETE',
  //             project_id: createFactory.project._id,
  //             scene_id: sceneid,
  //             object_type: 'widgetvideo',
  //             updated_obj: videoid
  //           };
  //           projectFactory.updateLiveProjChangesToFirebase(obj);
  //         }
  //       }
  //     );
  //   }).catch(function (err) {
  //     console.log(err);
  //   });
}

export {
  createVideo,
  deleteVideo,
  updateVideo,
  duplicateVideo
}

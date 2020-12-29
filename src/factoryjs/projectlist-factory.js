/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
import {
  getProjectUsingProjectId,
  guid,
  getUserToken
} from './util-factory';
import {
  bgImages,
  sound
} from './res-factory';
import {
  updateProjectNetwork,
  postProjectNetwork,
  getprojectsNetwork,
  deleteProjectNetwork,
  updateScenesOrderNetwork,
  duplicateProjectNetwork
} from './projectlist-network-factory';

const projFacObj = {};
projFacObj.privateProjects = [];
projFacObj.publicProjects = [];
projFacObj.favProjects = [];
projFacObj.userStatistics = {};

projFacObj.categories = {
  PRIVATE: 'PRIVATE',
  PUBLIC: 'PUBLIC',
  FAVOURITE: 'FAVOURITE'
};

projFacObj.projects = {
  PRIVATE: projFacObj.privateProjects,
  PUBLIC: projFacObj.publicProjects,
  FAVOURITE: projFacObj.favProjects
};

projFacObj.isFetching = {
  PRIVATE: false,
  PUBLIC: false,
  FAVOURITE: false
};

projFacObj.fetchedAll = {
  PRIVATE: false,
  PUBLIC: false,
  FAVOURITE: false
};

function getProjectsLocal(obj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      getprojectsNetwork({
        token: token,
        category: obj.category,
        // type: obj.type,
        startindex: obj.startindex,
        count: obj.count
      }).then(
        (response) => {
          // response.self = true; // set the self property to true as this project belongs to the user.
          // projFacObj.privateProjects.push(response);
          // console.log('response', projFacObj.privateProjects);
          resolve(response);
        },
        (error) => {
          //   message = "Error: " + error.status + " " + error.statusText;
        }
      );
    }).catch((err) => {});
  });
  // async function refreshProjects(category) {
  //   return await (function (resolve, reject) {
  //     if (!navigator.onLine && CAN_SAVE_OFFLINE) {
  //       indexedDBFactory
  //         .getFromDB('user')
  //         .then(function (user) {
  //           var queryObj = {
  //             savedByUid: user.useruid
  //           };
  //           return Promise.resolve(queryObj);
  //         })
  //         .then(indexedDBFactory.queryUsingProperties)
  //         .then(function (projects) {
  //           copy(projects, projFacObj.projects[category]);
  //           resolve();
  //           return;
  //         })
  //         .catch(function (err) {
  //           copy([], projFacObj.projects[category]);
  //           resolve();
  //           return;
  //         });
  //       // .finally(function() {
  //       // });
  //     } else if (loggedIn) {
  //       firebase.auth()
  //         .getToken(false)
  //         .then(function (token) {
  //           projFacObj.isFetching[category] = true;
  //           ProjListNetworkFactory.getProjects({
  //               token: token,
  //               category: category,
  //               startindex: projFacObj.projects[category].length,
  //               count: 20
  //             })
  //             .query()
  //             .Promise.then(
  //               function (response) {
  //                 projFacObj.fetchedAll[category] = response.fetchedAll;
  //                 var paddedResponse = projFacObj.projects[category].concat(response.projects);
  //                 copy(paddedResponse, projFacObj.projects[category]);
  //                 updateUserStatistics();
  //                 resolve();
  //               },
  //               function (response) {
  //                 var message = 'Error: ' + response.status + ' ' + response.statusText;
  //                 reject(message);
  //               }
  //             )

  //             .finally(function () {
  //               projFacObj.isFetching[category] = false;
  //             });
  //         })
  //         .catch(function (err) {
  //           console.log(err);
  //           reject(err);
  //         });
  //     }
  //   });
  // };
}
// function updateProjectInBackground(project) {
//   projFacObj
//     .compareProjectVersion(project)
//     .then(function (response) {
//       if (response.status == 304) {
//         return Promise.reject(304);
//       }
//       return Promise.resolve(response);
//     })
//     .then(serviceWorkerFactory.saveProjectOffline)
//     .then(function (response) {
//       projFacObj.updateReady();
//     })
//     .catch(function (err) {
//       if (err == 304) {
//         return;
//       }
//       utilsFactory.showNotification('error', 'Some error occured');
//       console.log(err);
//     });
// };

// async function fetchProject(projectid) {
//   // try to fetch from indexedDB first
//   // if notfound/error-occured fetch from network

//   return (function (resolve, reject) {
//     projFacObj
//       .fetchProjectIndexedDB(projectid)

//       .then(function (project) {
//         if (!_.isEmpty(project)) {
//           resolve(project);

//           projFacObj.updateProjectInBackground(project);
//         } else {
//           projFacObj
//             .fetchProjectNetwork(projectid)
//             .then(function (project) {
//               resolve(project);
//             })
//             .catch(function (err) {
//               console.log('some error occured : ');
//               console.log(err);
//             });
//         }
//       })
//       .catch(function (err) {
//         console.log('err', err);
//       });
//   });
// };

// function updateReady() {
//   var pinTo = 'bottom right';
//   var toast = $mdToast
//     .simple()
//     .textContent('Project update ready.')
//     .action('REFRESH')
//     .highlightAction(true)
//     .highlightClass('md-accent') // Accent is used by default, this just demonstrates the usage.
//     .position(pinTo);

//   $mdToast.show(toast).then(function (response) {
//     if (response == 'ok') {
//       window.location.reload();
//     }
//   });
// }

// async function fetchProjectIndexedDB(projectid) {
//   // return empty object if
//   //    ** save offline functionality not available
//   //        -- to imitate that IDB is returning empty response
//   //
//   //    ** error response from indexed db
//   //           -If project not saved offline
//   //           -Some indexed db error
//   //            -- try to load from network if some error occured.
//   //

//   if (!CAN_SAVE_OFFLINE) {
//     return (function (resolve, reject) {
//       resolve({});
//     });
//   }

//   return (function (resolve, reject) {
//     var userInfoQuery = 'user';
//     // indexedDBFactory.getFromDB
//     indexedDBFactory
//       .getFromDB(projectid)
//       .then(function (response) {
//         resolve(response);
//       })
//       .catch(function (err) {
//         resolve({});
//       });
//   });
// };

// function compareProjectVersion(project) {
//   /*
//           project.isLatest property --
//           false: fetch project from network
//           true: dont fetch from network
//           resolve false if : 
//               * indexeddb does not have request project copy
//               * indexeddb has project copy but after comparison on 
//                 the server , the server responds that the project 
//                 copy in indexeddb is not the LATEST version
//               * some error occured during version checking
//           resolve true if:
//               * internet is offline
//               * indexeddb has the LATEST version of project 
//           $resource handles status code of 304 (NOT MODIFIED) as error
//               * Therefore resolve from catch if 304 status code. 
//         */
//   return (function (resolve, reject) {
//     if (!navigator.onLine) {
//       reject(304);
//       return;
//     }

//     if (_.isEmpty(project)) {
//       resolve({});
//       return;
//     }

//     utilsFactory.getUserToken().then(function (token) {
//       ProjListNetworkFactory.compareProjectVersion({
//           projectid: project._id,
//           version: project.version,
//           token: token
//         })
//         .query()
//         .$promise.then(function (response) {
//           resolve(response);
//         })
//         .catch(function (response) {
//           if (response.status == 304) {
//             resolve(response);
//             return;
//           }
//           reject(response);
//         });
//     });
//   });
// }

// function fetchProjectNetwork(projectid) {
//   return utilsFactory.getUserToken().then(function (token) {
//     return ProjListNetworkFactory.getProject({
//       projectid: projectid,
//       token: token
//     }).query().$promise;
//   });
// }

function createProjectLocal(projectnameObj, descriptionObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      const newProj = {
        projectname: projectnameObj,
        description: descriptionObj,
        planType: 'FREE',
        projecttype: 'general',
        featured: false,
        scenes: [{
          sceneid: guid(),
          bgimage: bgImages[0],
          srcType: 'bgImage',
          switchbuttons: [],
          images: []
        }],
        sound: {
          _id: guid(),
          src: sound[0],
          volume: 1,
          enable: false
        }
      };
      postProjectNetwork({
        "token": token
      }, newProj).then(
        (response) => {
          response.self = true; // set the self property to true as this project belongs to the user.
          projFacObj.privateProjects.push(response);
          console.log('response', projFacObj.privateProjects);
          resolve(response);
        },
        (error) => {
          //   message = "Error: " + error.status + " " + error.statusText;
        }
      );
    }).catch((err) => {});
  });
  // return (function (resolve, reject) {
  //   firebase.auth()
  //     .getToken(false)
  //     .then(function (token) {
  //       var newProj = {
  //         projectname: projectname,
  //         description: description,
  //         planType: 'FREE',
  //         featured: false,
  //         scenes: [{
  //           sceneid: utilsFactory.guid(),
  //           bgimage: resFactory.bgImages[0],
  //           srcType: 'bgImage',
  //           switchbuttons: [],
  //           images: []
  //         }],
  //         sound: {
  //           _id: utilsFactory.guid(),
  //           src: resFactory.sound[0],
  //           volume: 1,
  //           enable: false
  //         }
  //       };

  //       ProjListNetworkFactory.postProject({
  //           token: token
  //         })
  //         .post(newProj)
  //         .Promise.then(
  //           function (response) {
  //             response.self = true; // set the self property to true as this project belongs to the user.
  //             projFacObj.privateProjects.push(response);
  //             console.log('response', projFacObj.privateProjects);
  //             resolve(response);
  //           },
  //           function (err) {
  //             console.log(err);
  //           }
  //         );
  //     })
  //     .catch(function (err) {
  //       console.log(err);
  //     });
  // });
}


function duplicateProjectLocal(duplicateProjectObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      // 
      duplicateProjectNetwork({
          token: token,
          projectid: duplicateProjectObj.projectid
        }, duplicateProjectObj)
        // .post(duplicateProjectObj)
        .then(
          (response) => {
            response.self = true; // set the self property to true as this project belongs to the user.
            projFacObj.privateProjects.push(response);
            resolve(response);
          },
          (err) => {
            console.log(err);
          }
        );
    }).catch((err) => {});
  });
}

// function duplicateProjectLocal(duplicateProjectObj) {
//   return (function (resolve, reject) {
//     firebase.auth()
//       .getToken(false)
//       .then(function (token) {
//         ProjListNetworkFactory.duplicateProject({
//             token: token,
//             projectid: duplicateProjectObj.projectid
//           })
//           .post(duplicateProjectObj)
//           .Promise.then(
//             function (response) {
//               response.self = true; // set the self property to true as this project belongs to the user.
//               projFacObj.privateProjects.push(response);
//               resolve(response);
//             },
//             function (err) {
//               console.log(err);
//             }
//           );
//       })
//       .catch(function (err) {
//         console.log(err);
//       });
//   });
// }

function updateProjectLocal(projectObj) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      updateProjectNetwork({
        "token": token,
        "projectid": projectObj._id
      }, projectObj).then(
        (responseUpdatedProject) => {
          // TODO complete server sync
          if (responseUpdatedProject.self) {
            const index = getProjectUsingProjectId(projFacObj.privateProjects, responseUpdatedProject._id);
            projFacObj.privateProjects[index] = responseUpdatedProject;
          } else {
            const index = getProjectUsingProjectId(projFacObj.publicProjects, responseUpdatedProject._id);
            projFacObj.publicProjects[index] = responseUpdatedProject;
          }
          resolve(responseUpdatedProject);
        },
        (error) => {
          //   message = "Error: " + error.status + " " + error.statusText;
        }
      );
    }).catch((err) => {});
  });
}

function deleteProjectLocal(projectid) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      deleteProjectNetwork({
        "token": token,
        "projectid": projectid
      }).then(
        (response) => {
          resolve(response)
        },
        (error) => {
          //   message = "Error: " + error.status + " " + error.statusText;
        }
      );
    }).catch((err) => {});
  });
}

// function deleteFromSW(projectid) {
//   serviceWorkerFactory
//     .deleteProjectOffline(projectid)
//     .then(function (response) {
//       console.log('response : deleted from local');
//     })
//     .catch(function (err) {
//       console.log('err', err);
//     });
// }

function updateScenesOrderLocal(projectId, sceneId, index) {
  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
        updateScenesOrderNetwork({
          projectid: projectId,
          token: token
        }, {
          sceneid: sceneId,
          newindex: index
        }).then(
          (response) => {
            resolve(response)
          },
          (error) => {
            //   message = "Error: " + error.status + " " + error.statusText;
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

// function toggleStarredByMe(project) {
//   firebase.auth()
//     .getToken(false)
//     .then(function (token) {
//       if (project.starredbyme) {
//         project.stars = project.stars - 1;
//         ProjListNetworkFactory.removeStar({
//             token: token,
//             projectid: project._id
//           })
//           .update()
//           .$promise.then(
//             function (response) {
//               // console.log(response);
//               project.stars = response.stars;
//               project.starredbyme = false;
//             },
//             function (error) {
//               $scope.message = 'Error: ' + error.status + ' ' + error.statusText;
//             }
//           );
//       } else {
//         project.stars = project.stars + 1;
//         ProjListNetworkFactory.addStar({
//             token: token,
//             projectid: project._id
//           })
//           .put()
//           .$promise.then(
//             function (response) {
//               // console.log(response);
//               project.stars = response.stars;
//               project.starredbyme = true;
//             },
//             function (error) {
//               $scope.message = 'Error: ' + error.status + ' ' + error.statusText;
//             }
//           );
//       }
//     })
//     .catch(function (err) {
//       console.log(err);
//     });
// };

// function updateUserStatistics() {
//   var viewsAndLikesObj = totalLikesAndViewsOnMyProj();
//   var userStatistics = {
//     totalLikes: viewsAndLikesObj.likes,
//     totalViews: viewsAndLikesObj.views,
//     projectsCreated: projFacObj.privateProjects.length
//   };
//   angular.copy(userStatistics, projFacObj.userStatistics);
// }

// var totalLikesAndViewsOnMyProj = function () {
//   // calculate likes and views during one iteration cycle

//   var totalLikes = 0;
//   var totalViews = 0;

//   for (var i = 0; i < projFacObj.privateProjects.length; i++) {
//     totalLikes = totalLikes + projFacObj.privateProjects[i].stars;
//     totalViews = totalViews + projFacObj.privateProjects[i].views;
//   }

//   return {
//     likes: totalLikes,
//     views: totalViews
//   };
// }

// function getFallbackProfileImg() {
//   return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAH4AfgMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwcCBP/EADUQAAICAQIDAwkHBQAAAAAAAAABAgMEBRESITEGUXFBQmFyc4GxwdEUIiM0NVKhE0NigpH/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAwEEAgX/xAAfEQEBAQABBAMBAAAAAAAAAAAAAQIRAwQhMRIyQVH/2gAMAwEAAhEDEQA/ALwAD7r5oAAAAAAAAAAAAAAAAAAAAAAAAAYlKMIuU2lFLdtvkjBkFdz+0ezlDBipbf3JLk/BETZquoWS4nl2pd0Xw/Atnob083ci8ApVOs6hS0/tEprumtye0zXasuaquiqrn03fKRmujvPkm5UuACb2AAMAAAAAAABoyr9pdQlO37JXL7kdv6n+T7izTlwwlLuW5z+2crbp2Tf3pycm/S2X7fE1rynu8PIAO5ID/kBoWC29ntQeXjuq17218t+9eR/IlymdnbHVq1KXSacJeHX5FzPndXHx3xFs3mAAJvQAAAAAAANebI8dc496aOfSi4zlGXJxezXpR0PqVHtFgvGzHfCP4V3PfbpLy/Uv2++NcJ9SIkGTB3JAAYokNBrdmrY6XmtyfgkXQguzGC6anl2xfFYtoJ8to7/MnT5/W38trYnEAASegAAAAAAAaGvIoqyaZVXRUoS6pmwGMsVLP0DIonxYyd9Xk/ciJnVZB7ThKPrLY6HzXXkjw3U+vC/ei+O41PceLiVQqcW+6SjVTObfdEndK7PtSVuftsnuqV8/oWGMo+a4+G568nzG+vrXhsxIJJLZdEACD0AA0AAAAAaAFU17VpX2zxqJcNMXtJrz39D1jF3eI86vCUztfxcZuFW91ifPh6L3kNk69n3NquxUx7oRW/8A1kUjJ256GJ7SurW2eVkW87L7ZeM2a233swCvxjz5ZUpJ8pNe83VZuXS96si2P+zZoBlzP43mpfG7Q5lT2u4Ll6Vwv+CbwNZxMzaHE6rf22eXwZTTHMlvoZ16bNWOiggOz2q2WyWLky4ppfcm3128jJ84tZubxVpeQAGAAANeQ9se1rqoto59z6nQcn8td6j+DOfrodXa/qewAHWmAAAAAAAA+rTG1qONs9vxEXoomm/qON7VF7OHuftFcegAEFAABjXk/lrvUfwZz9dDoGT+Wu9R/BnP10Ortf1PfsAB1pgAAAAAAAPp039RxvaovZRNN/Ucb2qL2cXc/aK49AAOdR//2Q==';
// }

export {
  updateProjectLocal,
  duplicateProjectLocal,
  createProjectLocal,
  getProjectsLocal,
  deleteProjectLocal,
  updateScenesOrderLocal
}

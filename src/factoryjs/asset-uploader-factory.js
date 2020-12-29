/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import {
  factory
} from './create-factory';
import {
  guid,
  getResType,
  getUserToken
} from './util-factory';
import {
  updateProjectLocal,
  duplicateProjectLocal
} from './projectlist-factory';
/* eslint-disable no-unused-vars */
import config from '../../src/common/utils/base-urls';
import firebase from '../firebase';
import axios from 'axios'
// const getResType = getResType;

const getS3Bucket = {
  'widget360view': config.s3BucketImages,
  'widgetgif': config.s3BucketImages,
  'widgetimage': config.s3BucketImages,
  'widgetsound': config.s3BucketSounds,
  'widgetprojectsound': config.s3BucketSounds,
  'image360': config.s3BucketImages,
  'widgetvideo': config.s3BucketVideos,
  'video360': config.s3BucketVideos,
  'widgetgltfmodel': config.s3BucketModels,
  'widgetdocument': config.s3BucketDocuments,
  'widgetgridcell': config.s3BucketImages,
  'navMenuCell': config.s3BucketImages,
  'widgetimagepopup': config.s3BucketImages,
  'widgetmenu3dcell': config.s3BucketImages,
  'widgetmenu3dhomecell': config.s3BucketImages
};

const getWidgetArrayKey = {
  'widgetimage': 'assetImages',
  'widgetgif': 'assetImages',
  'widget360view': 'assetImages360View',
  'widgetsound': 'assetSounds',
  'image360': 'assetBgImages',
  'widgetvideo': 'assetVideos',
  'video360': 'assetBgVideos',
  'widgetgltfmodel': 'assetModels',
  'widgetdocument': 'assetDocuments',
  'widgetgridcell': 'assetImages',
  'navMenuCell': 'assetImages',
  'widgetimagepopup': 'assetImages',
  'widgetmenu3dcell': 'assetImages',
  'widgetmenu3dhomecell': 'assetImages'
};

function getFileExtension(file) {
  const arr = file.name.split('.');
  if (arr && arr.length > 0) {
    return arr[arr.length - 1];
  }
  return '';
};

function getNormalisedUrl(resource, url) {
  let normalisedurl = url;
  const ext = normalisedurl.split('.').pop();
  normalisedurl = normalisedurl.replace('.' + ext, "");
  if (getResType[resource.widgetType] === 'image') {
    normalisedurl = "/aws-pptvr-cubemap/" + normalisedurl;
  } else {
    normalisedurl = "/aws-pptvr-vod/" + normalisedurl;
  }
  return normalisedurl;
}

function addWidget(url, widgetType) {
  const getWidgetArray = {
    'widgetimage': factory.project.assetImages,
    'widgetgif': factory.project.assetImages,
    'widget360view': factory.project.assetImages360View,
    'widgetsound': factory.project.assetSounds,
    'widgetprojectsound': factory.project.assetSounds,
    'image360': factory.project.assetBgImages,
    'widgetvideo': factory.project.assetVideos,
    'video360': factory.project.assetBgVideos,
    'widgetgltfmodel': factory.project.assetModels,
    'widgetdocument': factory.project.assetDocuments,
    'widgetgridcell': factory.project.assetImages,
    'navMenuCell': factory.project.assetImages,
    'widgetimagepopup': factory.project.assetImages,
    'widgetmenu3dcell': factory.project.assetImages,
    'widgetmenu3dhomecell': factory.project.assetImages
  };
  const widgetArray = getWidgetArray[widgetType];
  widgetArray.push(url);
  const updatedProject = {};
  updatedProject._id = factory.project._id;
  updatedProject[getWidgetArrayKey[widgetType]] = widgetArray;
  updateProjectLocal(updatedProject);
}


function uploadFiles(files, widgetType , checkUploadingThrought) {
  const thiswidgetType = widgetType;
  if (!files || !widgetType) {
    Promise.reject();
  }
  const resources = [];
  for (let index = 0; index < files.length; index += 1) {
    resources.push({
      file: files[index],
      widgetType: thiswidgetType
    });
  }
  let promises
  // run the function over all files.
  if(checkUploadingThrought === true)
  { 
    promises = resources.map(productUploadResToS3);
  }
  else{
    promises = resources.map(uploadResToS3);
  }
  // we now have a promises array and we want to wait for it
  return Promise.all(promises);
}

function getFileName(resource) {
  if (resource.widgetType === 'model' || resource.widgetType === 'widgetdocument' || resource.widgetType === 'widgetsound') {
    return resource.file.name + '$';
  }
  return '';
}

function uploadResToS3(resource) {
  //   const deferred = $q.defer();
  const widgetsFirebaseListener = ['video360', 'image360']
  // MONKEY PATCH TILL SERVER HAS METADATA FOR ASSETS STORED IN PROJECTS
  //
  //
  const filename = getFileName(resource) + guid() + '.' + getFileExtension(resource.file);
  const urlData = {
    "projectid": factory.project._id,
    "restype": getResType[resource.widgetType],
    "widgettype": resource.widgetType,
    "filename": filename
  }

  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      getAWSSignedUrl({
        "token": token
      }, urlData).then((response) => {
        axios
          .put(response.data.url, resource.file, {
            headers: {
              'Content-Type': resource.file.type !== '' ? resource.file.type : 'application/octet-stream',
              'Cache-Control': 'public, max-age=172800'
            }
          })
          .then((data) => {
            let url = data.config.url.substr(0, data.config.url.indexOf('?'));
            resource.file.result = url;
            url = url.replace(getS3Bucket[resource.widgetType], '');
            // // var normalisedurl = getNormalisedUrl(resource, url);

            // MONKEY PATCHING UNTIL FIREBASE INTEGRATED FOR 3D MODEL UPLOAD
            if (widgetsFirebaseListener.indexOf(resource.widgetType) === -1) {
              addWidget(url, resource.widgetType);
              resolve(resource);

            } else {
              const normalisedurl = getNormalisedUrl(resource, url);
              const ref = firebase.database().ref(normalisedurl);
              ref.set({
                "index": "CREATING"
              });
              ref.on('value', (snapshot) => {
                if ((snapshot.val() === "CREATED") || (snapshot.val().index === "CREATED")) {
                  addWidget(url, resource.widgetType);
                  resolve(resource);
                  ref.off();
                }
              });
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  });
  // })
  // .catch((error) => {
  //   deferred.reject(error);
  // });
  // return deferred.promise;
}



function productUploadResToS3(resource) {
  //   const deferred = $q.defer();
  const widgetsFirebaseListener = ['video360', 'image360']
  // MONKEY PATCH TILL SERVER HAS METADATA FOR ASSETS STORED IN PROJECTS
  //
  //
  const filename = getFileName(resource)+ guid() + '.' + getFileExtension(resource.file);
  const urlData = {
    "projectid": factory.project._id,
    "restype": getResType[resource.widgetType],
    "widgettype": resource.widgetType,
    "filename": filename
  }

  return new Promise((resolve, reject) => {
    getUserToken().then((token) => {
      getAWSSignedUrl({
        "token": token
      }, urlData).then((response) => {
        axios
          .put(response.data.url, resource.file, {
            headers: {
              'Content-Type': resource.file.type !== '' ? resource.file.type : 'application/octet-stream',
              'Cache-Control': 'public, max-age=172800'
            }
          })
          .then((data) => {
            console.log('data returned from aws',data)
            const url = data.config.url.substr(0, data.config.url.indexOf('?'));
            resolve(url)
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  });
  // })
  // .catch((error) => {
  //   deferred.reject(error);
  // });
  // return deferred.promise;
}

function getAWSSignedUrl(obj, urlData) {
  return new Promise((resolve, reject) => {
    axios
      .post(config.serverUrl + `upload/getSignedUrl`, urlData, {
        headers: {
          'x-access-token': obj.token
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}


export {
  uploadFiles,
  getFileExtension
}
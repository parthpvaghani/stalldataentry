/* eslint-disable import/no-mutable-exports */
/* eslint-disable arrow-body-style */
import mrc from './melzo-rest-client';
import {
  translatePptvrToMelzo
} from '../utils/pptvr-to-melzo-translator-creator';
import {
  translatePptvrToMelzoForViewer
} from '../utils/pptvr-to-melzo-translator';
import {
  factory
} from '../../creator/factoryjs/create-factory';

let globalJSON = {};

function getProjectDetails(projectId, uid) {
  return mrc
    .get('aepc_projects/private/' + uid + '/' + projectId, {
      headers: {
        'x-access-token': 'null'
      },
      baseURL: "https://aepc.ap-south-1.elasticbeanstalk.com/"
    })
    .then(res => {
      factory.project = res.data;
      const projectJSON = translatePptvrToMelzo(res.data);
      return projectJSON;
    })
    .catch(err => Promise.reject(err));
}
function getViewerProjectDetails(projectId) {
  return mrc
    .get('aepc_projects/' + projectId, {
      headers: {
        'x-access-token': 'null'
      },
      baseURL: "https://aepc.ap-south-1.elasticbeanstalk.com/"
    })
    .then(res => {
      factory.project = res.data;
      const projectJSON = translatePptvrToMelzoForViewer(res.data);
      return projectJSON;
    })
    .catch(err => Promise.reject(err));
}

function getpptVRProjectDetails(projectId) {
  return mrc
    .get('aepc_projects/' + projectId, {
      headers: {
        'x-access-token': 'null'
      },
      baseURL: 'https://aepc.ap-south-1.elasticbeanstalk.com/'
    })
    .then(res => {
      globalJSON = res.data;
      return res.data;
    })
    .catch(err => Promise.reject(err));
}

function postUsageDetails(uid, dataUsage) {
  return mrc
    .post('usage/', {
      'uid': uid,
      'usage': dataUsage
    }, {
      headers: {
        'x-access-token': 'null'
      },
      baseURL: 'https://aepc.ap-south-1.elasticbeanstalk.com/'
    })
    .then(res => {
      return res.data;
    })
    .catch(err => Promise.reject(err));
}

function getUserRoleandSubscription(uid) {
  return mrc
    .get('aepc_projects/' + uid+'/subscriptiontype', {
      headers: {
        'x-access-token': 'null'
      },
      baseURL: 'https://aepc.ap-south-1.elasticbeanstalk.com/'
    })
    .then(res => {
      return res.data;
    })
    .catch(err => Promise.reject(err));
}
export {
  getProjectDetails,
  postUsageDetails,
  getpptVRProjectDetails,
  getUserRoleandSubscription,
  globalJSON,
  getViewerProjectDetails
};

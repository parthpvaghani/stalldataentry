// CLQ - currently Loading Queue

import TinyQueue from 'tinyqueue';

// why ? -->
const PRIORITY_TYPES = {
  LOW_QUAL_BG: 'low_qual_bg',
  HIGH_QUAL_BG: 'high_qual_bg',
  IMAGE_2D: 'image_2d',
  CONNECTED_SCENE: 'connected_scene_low_quality'
};

const PRIORITY_CONFIG = {
  low_qual_bg: {
    priority_order: 1,
    max_connections: -1
  },
  high_qual_bg: {
    priority_order: 2,
    max_connections: 3
  },
  image_2d: {
    priority_order: 3,
    max_connections: 2
  },
  video_2d: {
    priority_order: 4,
    max_connections: -1
  },
  video_360: {
    priority_order: 5,
    max_connections: -1
  },
  connected_scene_low_quality: {
    priority_order: 6,
    max_connection: -1
  }
};

const LOW_PRIORITY_MAX_CONNECTIONS = 3;
const PRELOAD_QUEUE_MAX_CONNECTIONS = 12;
let sceneEl;
const currentlyLoadingQueue = [];

// //////////// PRIVATE //////////////

let onHoldQueue;
let preloadQueue;
let setUpComplete = false;

/**
 * [loadFileFromNetwork description]
 * @param  {[type]} item              [description]
 * @return {[type]}                   [description]
 */
function loadFileFromNetwork(item) {
  currentlyLoadingQueue.push(item);

  preloadQueue.loadFile({ id: item.id, src: item.src });
}

/**
 * [setUp description]
 */
function setUp() {
  onHoldQueue = new TinyQueue(
    [],
    (a, b) => PRIORITY_CONFIG[a.type].priority_order - PRIORITY_CONFIG[b.type].priority_order
  );

  preloadQueue = new createjs.LoadQueue(true, '', 'Anonymous');

  preloadQueue.addEventListener('fileload', fileDownloadComplete);

  preloadQueue.setMaxConnections(PRELOAD_QUEUE_MAX_CONNECTIONS);

  setUpComplete = true;
}

function getNumOfAssetsInCLQ(start, end) {
  return currentlyLoadingQueue.filter(clqEl => {
    const order = getPriorityOrderFromFileType(clqEl.type);
    return order >= start && order <= end;
  }).length;
}

/**
 * [_loadFile description]
 * @return {[type]} [description]
 */
function _loadFile() {
  const topPriorityItem = onHoldQueue.peek(); // read item with highest priority from the queue

  if (!topPriorityItem) {
    // emit event for empty queue
    // what if event is emitted when we reset and then,  a remaining item is completing download
    // doesn't make sense to emit event then
    sceneEl.emit('content-loaded');
    return;
  }

  const topPriorityItemOrder = getPriorityOrderFromFileType(topPriorityItem.type);

  const itemPriorityIsLow = topPriorityItemOrder > 2;
  const isCurrentlyLoadingQueueEmpty = currentlyLoadingQueue.length === 0;

  const addToLowPri = itemPriorityIsLow && getNumOfAssetsInCLQ(3, 5) < LOW_PRIORITY_MAX_CONNECTIONS;
  const addToHighPri =
    !itemPriorityIsLow && getNumOfAssetsInCLQ(1, 2) < PRELOAD_QUEUE_MAX_CONNECTIONS - LOW_PRIORITY_MAX_CONNECTIONS;

  const addDirectlyToCLQ = addToLowPri || addToHighPri;


  if (isCurrentlyLoadingQueueEmpty || addDirectlyToCLQ) {
    onHoldQueue.pop();
    window.onHoldQueue = onHoldQueue;
    loadFileFromNetwork(topPriorityItem, itemPriorityIsLow);
    // return;
  }
}

/**
 * [getPriorityOrderFromFileType description]
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
function getPriorityOrderFromFileType(type) {
  return PRIORITY_CONFIG[type].priority_order;
}

/**
 * [fileDownloadComplete description]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function fileDownloadComplete(e) {
  const downloadedFileIndex = currentlyLoadingQueue.findIndex(clqEl => clqEl.id === e.item.id);

  const { parentid, type } = currentlyLoadingQueue[downloadedFileIndex];

  currentlyLoadingQueue.splice(downloadedFileIndex, 1);

  const eventDetails = {
    result: e.result,
    item: e.item,
    type
  };

  _loadFile();
  dispatchFileDownloadEvent(parentid, e.type, eventDetails);
}

/**
 * [dispatchFileDownloadEvent description]
 * @return {[type]} [description]
 */
function dispatchFileDownloadEvent(id, type, detail) {
  const e = new CustomEvent(type, {
    detail
  });

  const targetEl = document.getElementById(id);

  // this case will occur when the target element download already started
  // and then scene change or any such event is triggered which causes the
  // preloadQueue to close. (In the future, will have cancel API)
  if (!targetEl) {
    // console.warn('Element does not exist');
    return;
  }

  targetEl.dispatchEvent(e);
}

function tryToLoadFromCache(item) {
  const cachedResult = preloadQueue.getResult(item.src);
  const cachedItem = preloadQueue.getItem(item.src);

  if (!cachedResult) return false;

  const eventDetails = {
    result: cachedResult,
    item: cachedItem,
    type: item.type
  };

  const EVENT_TYPE = 'fileload';

  dispatchFileDownloadEvent(item.parentid, EVENT_TYPE, eventDetails);
  return true;
}

// //////////// PUBLIC ///////////////

/**
 * public - request the download manager to fetch a file to queue
 *
 * If the requested file already exists, then return it using preload's getResult method
 *
 * @return {[type]} [description]
 */
function loadFile(item) {
  if (!setUpComplete) setUp();
  sceneEl = document.getElementById('scene');

  if (tryToLoadFromCache(item)) return;

  onHoldQueue.push(item);

  _loadFile();
}

/**
 * public - request the download manager to fetch a file from queue
 * @return {[type]} [description]
 */
function remove(id) {
  const attrName = 'id'; // because to remove, we match the
  // attrname in the objects in queue to the attrvalue
  onHoldQueue.remove(attrName, id);
}

/**
 * public - reset the current loading queue by removing files which are waiting
 * @return {[type]} [description]
 */
function reset() {
  if (!onHoldQueue) return; // monkey patch ??

  onHoldQueue.empty();
}

function tearDown() {
  onHoldQueue = [];

  preloadQueue = null;

  preloadQueue.removeEventListener('fileload', fileDownloadComplete);

  setUpComplete = false;
}

export default {
  loadFile,
  remove,
  reset,
  tearDown,
  PRIORITY_TYPES
};

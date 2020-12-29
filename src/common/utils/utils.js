Math.clip = (number, min, max) => Math.max(min, Math.min(number, max)); // https://stackoverflow.com/a/11409978

function parseMelzoUrl(url) {
    const tempArr = url.split('/');
    const baseUrl = tempArr[0];
  
    const index = tempArr.indexOf('dekho');
    const projectId = tempArr[index + 1];
    const sceneIndex = index + 2 < tempArr.length ? tempArr[index + 2] : 0;
  
    return { projectId, sceneIndex, baseUrl };
  }
  
  export default parseMelzoUrl;
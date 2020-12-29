const defaultFontSize = {
  splash__projectname: {
    'max-width-480': 30,
    'max-width-768': 45,
    'max-width-1024': 30,
    'max-width-1280': 50
  },
  splash__desc: {
    'max-width-480': 18,
    'max-width-768': 25,
    'max-width-1024': 20,
    'max-width-1280': 25
  },
  aboutus__title: {
    'max-width-480': 30,
    'max-width-768': 45,
    'max-width-1024': 30,
    'max-width-1280': 50
  },
  aboutus__brief: {
    'max-width-480': 18,
    'max-width-768': 25,
    'max-width-1024': 20,
    'max-width-1280': 25
  }
};

function getWidthCategory(windowWidth) {
  if (windowWidth <= 480) {
    return 'max-width-480';
  }
  if (windowWidth <= 768) {
    return 'max-width-768';
  }
  if (windowWidth <= 1024) {
    return 'max-width-1024';
  }

  return 'max-width-1280';
}

function getDefaultFontSize(elmClassType) {
  const windowWidth = window.innerWidth || document.body.clientWidth;
  const widthCategory = getWidthCategory(windowWidth);
  return defaultFontSize[elmClassType][widthCategory];
}

function resizeToFit(parentEl, elmClassName, defaultSize) {
  const outerDiv = parentEl.querySelector('.' + elmClassName + '-container');
  const textDiv = parentEl.querySelector('.' + elmClassName);

  const elmCurrentFontSize = window
    .getComputedStyle(textDiv, null)
    .getPropertyValue('font-size');
  const fontSize = defaultSize || elmCurrentFontSize;

  textDiv.style.fontSize = parseFloat(fontSize) - 2 + 'px';

  if (textDiv.offsetHeight > outerDiv.offsetHeight) {
    resizeToFit(parentEl, elmClassName, null);
  }
}

export { getDefaultFontSize, resizeToFit };

import BaseUrl from './base-urls';

const CUBEMAP_FACES = ['front', 'left', 'right', 'top', 'bottom', 'back'];

const IMAGE_FORMATS = ['jpg', 'jpeg', 'webp', 'png'];

const HW_CONSTRAINTS = [64, 128, 256, 512, 1024, 2048];

function foobar(d) {
  // let diff = 0;
  let min = 0;

  const tolerance = 1.3;

  HW_CONSTRAINTS.forEach(value => {
    if (tolerance * value < d) min = value;
  });

  return min;
}

const UrlBuilder = function UrlBuilder() {
  this.requiresCubemapFaceInfo = false;
  this.requiresSegmentInfo = false;
  this.requiresTransformation = false;

  const DEFAULT_COMPRESSION_QUALITY = 100;

  // defaults
  this.quality = DEFAULT_COMPRESSION_QUALITY;

  return this;
};

UrlBuilder.prototype.withImageFormat = function withImageFormat(imageFormat) {
  this.imageFormat = imageFormat;

  return this;
};

UrlBuilder.prototype.withQuality = function withQuality(quality) {
  this.quality = quality;

  return this;
};

UrlBuilder.prototype.withFileSrc = function withFileSrc(src) {
  this.src = src;

  return this;
};

UrlBuilder.prototype.makeSegments = function makeSegments() {
  this.requiresCubemapFaceInfo = true;
  this.requiresSegmentInfo = true;

  return this;
};

UrlBuilder.prototype.withSegmentPattern = function withSegmentPattern(
  segPattern
) {
  this.segPattern = segPattern;

  return this;
};

UrlBuilder.prototype.withSegmentId = function withSegmentId(segId) {
  this.segId = segId;

  return this;
};

UrlBuilder.prototype.withCubemapFace = function withCubemapFace(faceName) {
  this.faceName = faceName;

  return this;
};

UrlBuilder.prototype.withBaseUrl = function withBaseUrl(baseUrlType) {
  this.baseUrl = BaseUrl[baseUrlType];

  return this;
};

UrlBuilder.prototype.withHeight = function withHeight(height) {
  this.height = foobar(height);
};

UrlBuilder.prototype.withWidth = function withWidth(width) {
  this.width = foobar(width);
};

UrlBuilder.prototype.makeResponsive = function makeResponsive(info) {
  this.requireImageResizing = true;

  const fov = 80;
  // const DPR_MULTIPLIER = 0.75;
  const DPR_MULTIPLIER = 1;
  const { height, scale, position } = info;

  const scaledHeight = height * scale.x;

  const vFOV = THREE.Math.degToRad(fov); // convert vertical fov to radians

  const distanceFromCamera = Math.sqrt(
    position.x ** 2 + position.y ** 2 + position.z ** 2
  );
  const VPheight = 2 * Math.tan(vFOV / 2) * distanceFromCamera; // visible height

  const zz =
    window.innerWidth > window.innerHeight
      ? window.innerWidth
      : window.innerHeight;

  const imageHeight =
    window.devicePixelRatio * DPR_MULTIPLIER * (scaledHeight / VPheight) * zz;

  this.height = foobar(imageHeight);

  return this;
};

UrlBuilder.prototype.result = function result() {
  let finalSrc = '';

  if (!this.baseUrl) throw InvalidInputException('Baseurl');
  if (!this.withFileSrc) throw InvalidInputException('file Src');
  finalSrc += this.baseUrl;

  if (this.requiresTransformation) {
    const transform = this.generateTransform();
    finalSrc += transform;
  }

  if (this.imageFormat) {
    if (IMAGE_FORMATS.indexOf(this.imageFormat) < 0)
      throw InvalidInputException('image format');
    this.src = this.src.split('.')[0] + '.' + this.imageFormat;
  }

  finalSrc += this.src;

  return finalSrc;
};

UrlBuilder.prototype.generateTransform = function generateTransform() {
  const TRANSFORM_PREFIX = 'smis-transform/';
  let transform = '';

  transform += TRANSFORM_PREFIX;

  // check if all values are proper integer using isNaN
  // check if cubemap info is given if requireCubemap is true

  const transformParams = [];

  if (this.requiresCubemapFaceInfo) {
    if (CUBEMAP_FACES.indexOf(this.faceName) < 0)
      throw InvalidInputException('cubemap face name');
    transformParams.push(`cm_${this.faceName}`);
  }

  if (this.width) {
    transformParams.push(`w_${this.width}`);
  }

  if (this.height) {
    transformParams.push(`h_${this.height}`);
  }

  // if (this.quality) {
    // transformParams.push(`q_${this.quality}`);
    transformParams.push(`q_100`);
  // }

  if (this.requiresSegmentInfo) {
    transformParams.push(`segpat_${this.segPattern}`);
    transformParams.push(`segid_${this.segId}`);
  }

  transform += transformParams.join(',') + '/';

  return transform;
};

function InvalidInputException(value) {
  this.value = value;
  this.message = 'bad input';
  this.toString = () => this.value + this.message;
}

export default UrlBuilder;

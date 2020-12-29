/* eslint-disable  no-restricted-globals */
/* eslint-disable  react/prefer-stateless-function */

const PORTRAIT = "portrait";
const LANDSCAPE = "landscape";

function verifyScreenOrientation(orientation) {
  const VALID_ORIENTATIONS = [PORTRAIT, LANDSCAPE];

  if (VALID_ORIENTATIONS.indexOf(orientation) > -1) return true;

  throw Error("Invalid Device Orientation State");
}

function setDeviceOrientationDetails() {
  
  window.addEventListener("resize", () => {
    const resolution = window.innerWidth / window.innerHeight;

    let screenOrientation;

    if (screen.orientation) {
      [screenOrientation] = screen.orientation.type.split("-");

      verifyScreenOrientation(screenOrientation);
    } else {
      screenOrientation = resolution > 1 ? LANDSCAPE : PORTRAIT;
    }

    document
      .getElementById("app")
      .classList.remove(`${PORTRAIT}`, `${LANDSCAPE}`);
    document.getElementById("app").classList.add(`${screenOrientation}`);
    
  });
}

export default setDeviceOrientationDetails;

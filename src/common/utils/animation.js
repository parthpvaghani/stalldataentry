/**
 * presets: predefined aframe animation props list.
 */
const presets = {
  fadeIn: {
    property: 'opacity',
    to: 1,
    dur: 1000
  },
  fadeOut: {
    property: 'opacity',
    to: 0,
    dur: 1000
  },
  scaleUp: {
    property: 'scale',
    to: '4 4 4',
    dur: 1000
  },
  scaleDown: {
    property: 'scale',
    to: '1 1 1',
    dur: 1000
  }
};

/**
 * Link to Aframe animation component that we are using: `https://github.com/ngokevin/kframe/tree/master/components/animation/`. Be careful sometimes this is not up-to-date.
 * Supported props list: ['property', 'from', 'to', 'delay', 'dir', 'dur', 'easing', 'elasticity', 'loop', 'startEvents', 'pauseEvents', 'resumeEvents']
 */

function attachAframAnimationOnEl(el, animName, animProperties) {
  let name = animName;
  if (!name) {
    console.warn('Please provide the animation name, It might be used while removing the animation');
    // set animation's property as default animation name
    name = animProperties.property;
  }

  // Note: animation name must be in lowercase, Its a constraint from a-frame's animation component.
  el.setAttribute('animation__' + name.toLowerCase(), animProperties);
}

/**
 * JSON structure of melzoAnimation is mentioned in `sample-project.json`.
 *
 * Assumptions:
 *  1. One melzoAnimation can have multiple `presets`(pre-defined animation JSON) and multiple `customs`(user defined animation JSON).
 *  2. Each melzoAnimation will have only one `startEvent` and `pauseEvent`.
 *  3. esoIdList: list of id's of eso's which will trigger `startEvent` or `pauseEvent`.
 *
 */
function attachMelzoAnimationOnEl(el, melzoAnimProps = {}) {
  if (AFRAME.utils.isEmpty(melzoAnimProps)) {
    return;
  }

  const aframeAnims = [];

  // presets do not have `startEvents`, `pauseEvents`, `resumeEvents` properties. These properties are set before calling `attachAframAnimationOnEl`.
  melzoAnimProps.anims.presets.forEach(presetName => {
    aframeAnims.push(presets[presetName]);
  });
  // customAnim do not have `startEvents`, `pauseEvents`, `resumeEvents` properties. These properties are set before calling `attachAframAnimationOnEl`.
  Object.values(melzoAnimProps.anims.customs).forEach(customAnim => {
    aframeAnims.push(customAnim);
  });

  /**
   * @param  {JSON} animItem - animItem represents the animation JSON required to create and attach aframe's animation component.
   * `startEvents`, `pauseEvents`, `resumeEvents` properties are set from `melzoAnimProps`.
   */
  aframeAnims.forEach(animItem => {
    const aframeAnimProps = animItem;
    const aframeAnimName = melzoAnimProps.id + aframeAnimProps.property;
    aframeAnimProps.startEvents = melzoAnimProps.startEvents;
    aframeAnimProps.pauseEvents = melzoAnimProps.pauseEvents;
    aframeAnimProps.resumeEvents = melzoAnimProps.resumeEvents;

    attachAframAnimationOnEl(el, aframeAnimName, aframeAnimProps);
  });
}

export { attachMelzoAnimationOnEl, attachAframAnimationOnEl };

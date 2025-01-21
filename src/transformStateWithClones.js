'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const historyChanges = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    if (type === 'addProperties') {
      for (const key in extraData) {
        stateCopy[key] = extraData[key];
      }
    }

    if (type === 'removeProperties') {
      for (const key of keysToRemove) {
        delete stateCopy[key];
      }
    }

    if (type === 'clear') {
      for (const key in stateCopy) {
        delete stateCopy[key];
      }
    }

    historyChanges.push(Object.assign({}, stateCopy));
  }

  return historyChanges;
}

module.exports = transformStateWithClones;

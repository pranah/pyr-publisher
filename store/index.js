import _state from './state.js';
import _actions from './actions.js';
import _mutations from './mutations.js';

// This line is required to assign the Web3 and LibP2P instances
export const strict = false;

export const state = () => (_state)

export const mutations = _mutations

export const actions = _actions
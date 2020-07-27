import _state from './state.js';
import _actions from './actions.js';
import _mutations from './mutations.js';

export default {
    strict: false, // This line is required to assign the Web3 and LibP2P instances
    state: () => (_state),
    mutations: _mutations,
    actions: _actions
}
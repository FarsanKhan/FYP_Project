import {
  ADD_PEER_STREAM,
  REMOVE_PEER_STREAM,
  ADD_PEER_NAME,
  ADD_ALL_PEERS,
  UPDATE_PEER_STREAM,
} from "./peerActions";

export const peersReducer = (state, action) => {
  switch (action.type) {
    case ADD_PEER_STREAM:
      return {
        ...state,
        [action.payload.peerId]: {
          ...state[action.payload.peerId],
          stream: action.payload.stream,
        },
      };
    case ADD_PEER_NAME:
      return {
        ...state,
        [action.payload.peerId]: {
          ...state[action.payload.peerId],
          peerId: action.payload.peerId,
          ...action.payload.user,
        },
      };
    case UPDATE_PEER_STREAM:
      return {
        ...state,
        [action.payload.peerId]: {
          ...state[action.payload.peerId],
          peerId: action.payload.peerId,
          ...action.payload.settings,
        },
      };
    case REMOVE_PEER_STREAM:
      const tmp = { ...state };
      delete tmp[action.payload.peerId];
      return {
        ...tmp,
      };
    case ADD_ALL_PEERS:
      return { ...state, ...action.payload.peers };
    default:
      return { ...state };
  }
};

import Peer from "peerjs";
import { createContext, useState, useEffect, useReducer } from "react";
import { useStore } from "../../lib/store";
import { ws } from "../../lib/ws";
import { peersReducer } from "./utils/peerReducer";
import {
  addAllPeersAction,
  addPeerNameAction,
  addPeerStreamAction,
  removePeerStreamAction,
  updatePeerStreamAction,
} from "./utils/peerActions";
import toast from "react-hot-toast";

export const MeetingContext = createContext({
  participants: {},
  meetingId: "",
});

export const MeetingProvider = ({ children }) => {
  // const mount = useRef();
  const user = useStore((state) => state.user);
  const [me, setMe] = useState();
  const [stream, setStream] = useState(null);
  const [peers, dispatch] = useReducer(peersReducer, {});
  const [meetingId, setMeetingId] = useState("");
  const [streamSettings, setStreamSettings] = useState({
    mic: false,
    video: false,
  });

  const switchStream = (stream, type) => {
    Object.values(me?.connections).forEach((connection) => {
      const tracks = stream?.getTracks().find((track) => track.kind === type);
      connection[0].peerConnection
        .getSenders()
        .find((sender) => sender.track.kind === type)
        .replaceTrack(tracks)
        .catch((err) => console.error(err));
    });
  };

  const shareStream = () => {
    Object.keys(peers).forEach((peer) => {
      if (peer != user.id) {
        me.call(String(peer), stream, {
          metadata: {
            user: {
              userName: user.name,
              type: user.type,
              image: user.image,
            },
          },
        });
      }
    });
  };

  const getUsers = ({ participants }) => {
    dispatch(addAllPeersAction(participants));
  };

  const removePeer = (peerId) => {
    dispatch(removePeerStreamAction(peerId));
  };

  const onChangeStreamSettings = (newStreamSettings) => {
    setStreamSettings({ ...streamSettings, ...newStreamSettings });
  };

  const updateUserStream = ({ peerId, ...peerStreamSettings }) => {
    dispatch(updatePeerStreamAction(peerId, peerStreamSettings));
  };

  const requestMediaPermissions = async (init) => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(newStream);
      ws.emit("user-stream-update", {
        peerId: user.id,
        video: "on",
        mic: "on",
        meetingId,
      });
      onChangeStreamSettings({ mic: true, video: true });
    } catch (error) {
      if (!init)
        toast.error(
          "Could not access media devices. Please check your permissions and try again."
        );
    }
  };

  useEffect(() => {
    const peer = new Peer(String(user.id), {
      host: import.meta.env.VITE_API_PEER_HOST,
      port: 9000,
      path: "/",
      // debug: 3,
      //  config: {
      //       iceServers: [
      //         { urls: "stun:stun.l.google.com:19302" },
      //         {
      //           urls: "turn:0.peerjs.com:3478",
      //           username: "peerjs",
      //           credential: "peerjsp",
      //         },
      //       ],
      //       sdpSemantics: "unified-plan",
      //       iceTransportPolicy: "relay", // <- it means using only relay server (our free turn server in this case)
      //     },
    });

    peer.on("open", () => {
      setMe(peer);
    });

    requestMediaPermissions(true);

    ws.on("get-users", getUsers);
    ws.on("user-stream-update", updateUserStream);
    ws.on("user-disconnected", removePeer);

    return () => {
      ws.off("get-users");
      ws.off("user-stream-update");
      ws.off("user-disconnected");
      me?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!me) return;
    if (peers && me && stream) {
      shareStream();
    }
    ws.on("user-joined", ({ peerId, user: streamUser }) => {
      const call = me.call(String(peerId), stream, {
        metadata: {
          user: {
            userName: user.name,
            type: user.type,
            image: user.image,
          },
        },
      });
      if (call) {
        call.on("stream", (peerStream) => {
          dispatch(addPeerStreamAction(peerId, peerStream));
        });
      }
      dispatch(addPeerNameAction(peerId, streamUser));
    });

    me.on("call", (call) => {
      const { user: streamUser } = call.metadata;
      dispatch(addPeerNameAction(call.peer, streamUser));
      call.answer(stream);
      call.on("stream", (peerStream) => {
        dispatch(addPeerStreamAction(call.peer, peerStream));
      });
    });

    return () => {
      if (me) {
        ws.off("user-joined");
      }
    };
  }, [me, stream]);

  const onToggleMic = () => {
    if (streamSettings.mic) {
      stream.getAudioTracks().forEach((track) => {
        track.stop();
      });
      onChangeStreamSettings({ mic: !streamSettings.mic });
      ws.emit("user-stream-update", {
        peerId: user.id,
        mic: "off",
        meetingId,
      });
      switchStream(stream, "audio");
    } else {
      requestMediaPermissions();
    }
  };

  const onToggleVideo = () => {
    if (streamSettings.video) {
      stream.getVideoTracks().forEach((track) => {
        track.stop();
      });
      onChangeStreamSettings({ video: !streamSettings.video });
      ws.emit("user-stream-update", {
        peerId: user.id,
        video: "off",
        meetingId,
      });
      switchStream(stream, "video");
    } else {
      requestMediaPermissions();
    }
  };

  return (
    <MeetingContext.Provider
      value={{
        me,
        meetingId,
        setMeetingId,
        stream,
        streamSettings,
        participants: peers,
        onToggleMic,
        onToggleVideo,
      }}
    >
      {children}
    </MeetingContext.Provider>
  );
};

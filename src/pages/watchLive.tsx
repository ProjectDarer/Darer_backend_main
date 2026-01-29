import { useEffect, useRef } from "react";
import { Room, Track, RemoteTrackPublication, RemoteParticipant } from "livekit-client";

interface WatchLiveProps {
  streamId: string;
}

const WatchLive: React.FC<WatchLiveProps> = ({ streamId }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const joinViewer = async () => {
      const jwtToken = localStorage.getItem("token");
      if (!jwtToken) return;

      const res = await fetch(
        `http://localhost:8080/api/live/join/${streamId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        }
      );

      const { wsUrl, token } = await res.json();

      const room = new Room();

      await room.connect(wsUrl, token);

      // Subscribe to tracks
      room.on(
        "trackSubscribed",
        (
          track: Track,
          publication: RemoteTrackPublication,
          participant: RemoteParticipant
        ) => {
          if (track.kind === Track.Kind.Video && videoRef.current) {
            track.attach(videoRef.current);
          }
        }
      );
    };

    joinViewer();
  }, [streamId]);

  return (
    <div>
      <h2>🔴 Live Stream</h2>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "100%", backgroundColor: "black" }}
      />
    </div>
  );
};

export default WatchLive;

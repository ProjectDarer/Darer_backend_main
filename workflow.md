React (Web)
   |
   | REST + JWT
   |
Node.js + Express
   |
   | Live stream metadata
   |
MongoDB
   |
   | Token generation
   |
LiveKit Media Server (WebRTC)
   |
   | Video / Audio
   |
Viewers (Browser / Mobile)


[Streamer Browser] --(Go Live API)--> [Backend] 
                     returns --> LiveKit token + room
[Streamer Browser] --(Connect to LiveKit)--> [LiveKit Server] 
[Streamer Browser] --(Publish audio/video)--> LiveKit 
[Viewer Browser] --(Connect LiveKit with viewer token)--> LiveKit 
Viewer sees live stream in real-time



User clicks LIVE card
   ↓
onClick handler fires
   ↓
React Router navigates
   ↓
WatchLive component mounts
   ↓
useEffect() runs
   ↓
joinViewer() executes
   ↓
Live video plays



socket.io -------- for comment section where users connect each other in real world



---- regarding the comment section--------
<LiveKitRoom
  token={token}
  serverUrl={LIVEKIT_URL}
  roomName={live.roomName}
/>
/// add this inside the file, where you are rendering the live, in the user side
<LiveChat roomName={live.roomName} />

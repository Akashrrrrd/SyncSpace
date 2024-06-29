import React, { useState, useRef, useEffect } from 'react';
import './VideoConference.css';

const VideoConference = () => {
  const [inCall, setInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const [screenShared, setScreenShared] = useState(false);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStream = useRef(null);
  const peerConnection = useRef(null);
  const [participants, setParticipants] = useState(['You', 'John Doe', 'Tom Cruise',]); 

  useEffect(() => {
    return () => {
      if (localStream.current) {
        localStream.current.getTracks().forEach(track => track.stop());
      }
      if (peerConnection.current) {
        peerConnection.current.close();
      }
    };
  }, []);

  const handleStartCall = async () => {
    setInCall(true);

    try {
      localStream.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localVideoRef.current.srcObject = localStream.current;

      peerConnection.current = new RTCPeerConnection();

      localStream.current.getTracks().forEach(track => {
        peerConnection.current.addTrack(track, localStream.current);
      });

      peerConnection.current.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);

      setTimeout(async () => {
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
      }, 1000);

    } catch (error) {
      console.error('Error accessing media devices.', error);
    }
  };

  const handleEndCall = () => {
    setInCall(false);

    if (localStream.current) {
      localStream.current.getTracks().forEach(track => track.stop());
    }

    if (peerConnection.current) {
      peerConnection.current.close();
    }

    localVideoRef.current.srcObject = null;
    remoteVideoRef.current.srcObject = null;
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    localStream.current.getAudioTracks().forEach(track => (track.enabled = !isMuted));
  };

  const handleCamera = () => {
    setCameraOn(!cameraOn);
    localStream.current.getVideoTracks().forEach(track => (track.enabled = cameraOn));
  };

  const handleScreenShare = async () => {
    if (!screenShared) {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const screenTrack = stream.getVideoTracks()[0];
        localStream.current.getVideoTracks()[0].stop();
        localStream.current.removeTrack(localStream.current.getVideoTracks()[0]);
        localStream.current.addTrack(screenTrack);
        peerConnection.current.getSenders().find(sender => sender.track.kind === 'video').replaceTrack(screenTrack);
        setScreenShared(true);

        screenTrack.onended = () => {
          handleScreenShare(); 
        };
      } catch (error) {
        console.error('Error sharing screen.', error);
      }
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const cameraTrack = stream.getVideoTracks()[0];
        localStream.current.getVideoTracks()[0].stop();
        localStream.current.removeTrack(localStream.current.getVideoTracks()[0]);
        localStream.current.addTrack(cameraTrack);
        peerConnection.current.getSenders().find(sender => sender.track.kind === 'video').replaceTrack(cameraTrack);
        setScreenShared(false);
      } catch (error) {
        console.error('Error reverting to camera.', error);
      }
    }
  };

  return (
    <div className="video-conference">
      <div className="video-header">
        <h1>Video Conference</h1>
      </div>
      <div className="video-container">
        <video ref={localVideoRef} className="video" autoPlay muted></video>
        <video ref={remoteVideoRef} className="video" autoPlay></video>
      </div>
      <div className="controls">
        {inCall ? (
          <>
            <button onClick={handleMute} className="control-button">{isMuted ? 'Unmute' : 'Mute'}</button>
            <button onClick={handleCamera} className="control-button">{cameraOn ? 'Camera Off' : 'Camera On'}</button>
            <button onClick={handleScreenShare} className="control-button">{screenShared ? 'Stop Share' : 'Share Screen'}</button>
            <button onClick={handleEndCall} className="end-call-button">End Call</button>
          </>
        ) : (
          <button onClick={handleStartCall} className="start-call-button">Start Call</button>
        )}
      </div>
      <div className="participant-list">
        <h3>Participants</h3>
        <ul>
          {participants.map((participant, index) => (
            <li key={index}>{participant}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VideoConference;

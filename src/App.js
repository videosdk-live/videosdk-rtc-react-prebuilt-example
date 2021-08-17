import React, { useEffect } from "react";
import { VideoSDKMeeting } from "@videosdk.live/js-prebuilt";

export default function App() {
  useEffect(async () => {
    const token = await getToken();
    const meetingId = await getMeetingId(token);
    if (meetingId) {
      let name = "Demo User";
      const videoMeetingSpecs = {
        micEnabled: true,
        webcamEnabled: true,
        name,
        meetingId,
        redirectOnLeave: window.location.href,
        chatEnabled: true,
        screenShareEnabled: true,
        pollEnabled: true,
        whiteBoardEnabled: true,
        participantCanToggleSelfWebcam: true,
        participantCanToggleSelfMic: true,
        raiseHandEnabled: true,
        token: token,
        containerId: null,
        recordingEnabled: true,
        recordingWebhookUrl: "https://www.videosdk.live/callback",
        recordingEnabledByDefault: false,
        participantCanToggleRecording: true,
        brandingEnabled: true,
        brandLogoURL:
          "https://app.videosdk.live/_next/image?url=%2Fvideosdk_logo_circle.png&w=1920&q=75",
        brandName: "VIDEO SDK LIVE",
      };
      const videoMeeting = new VideoSDKMeeting();

      await videoMeeting.init(videoMeetingSpecs);
    }
  }, []);

  const getToken = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_VIDEOSDK_API_ENDPOINT}/get-token`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const { token } = await response.json();
      return token;
    } catch (e) {
      console.log(e);
    }
  };
  const getMeetingId = async (token) => {
    try {
      const VIDEOSDK_API_ENDPOINT = `${process.env.REACT_APP_VIDEOSDK_API_ENDPOINT}/create-meeting`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      };
      const response = await fetch(VIDEOSDK_API_ENDPOINT, options)
        .then(async (result) => {
          const { meetingId } = await result.json();
          return meetingId;
        })
        .catch((error) => console.log("error", error));
      return response;
    } catch (e) {
      console.log(e);
    }
  };
  return <div></div>;
}

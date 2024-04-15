import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const MeetingSetup = ({
  setisSetupComplete,
}: {
  setisSetupComplete: (value:boolean) => void;
}) => {
  const [micCamOn, setMicCamOn] = useState(true);
  const call = useCall();

  if (!call) {
    throw new Error("Stream call not identified");
  }

  useEffect(() => {
    if (micCamOn) {
      call?.camera.enable();
      call?.microphone.enable();
    } else {
      call?.camera.disable();
      call?.microphone.disable();
    }
  }, [micCamOn, call?.microphone, call?.camera]);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label
          htmlFor=""
          className="flex items-center justify-center gap-2 font-medium"
        >
          <input
            type="checkbox"
            checked={micCamOn}
            onChange={(e) => setMicCamOn(e.target.checked)}
          />
          {`Join with mic and camera ${micCamOn ? "off" : "on"} `}
        </label>
        <DeviceSettings />
      </div>
      <Button
        onClick={() => {
          call.join();
          setisSetupComplete(true);
        }}
        className="!rounded-md bg-green-500 px-4 py-2.5"
      >
        Join Meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;

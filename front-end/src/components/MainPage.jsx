import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openAnalysisPage } from "../store/switchPageSlice.js";
import { toggleTranscriptUploadModal } from "../store/mainPageSlice.js";
import BaseButton from "./BaseButton.jsx";
import TranscriptUploadModal from "./TranscriptUploadModal.jsx";

function MainPage() {
  const showTranscriptUploadModal = useSelector((state) => state.mainPage.showTranscriptUploadModal)
  const dispatch = useDispatch();

  return (
      <div className="MainPage bg-purple-300 flex" data-testid="main-page">
        <div className="flex gap-y-10 w-full flex-col">
          <div className="justify-center flex">
            <BaseButton
              click={() => dispatch(toggleTranscriptUploadModal())}
              text="Upload Transcript" />
          </div>
          <div className="justify-center flex">
            <TranscriptUploadModal show={showTranscriptUploadModal} />
          </div>
          <div className="justify-center flex">
            <BaseButton
              click={() => dispatch(openAnalysisPage())}
              text="View Analysis" />
          </div>
        </div>
      </div>
    );
}

export default MainPage;
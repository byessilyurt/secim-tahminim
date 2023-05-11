// ShareModal.js
import React from "react";
import Modal from "react-modal";
import { BsTwitter, BsInstagram, BsWhatsapp } from "react-icons/bs";

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const ShareModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Share Modal"
      className="m-4 border rounded p-5 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <div className="flex space-x-4">
        <button className="p-2 w-32 h-12 text-2xl flex items-center justify-center bg-blue-500 text-white rounded">
          <BsTwitter />
        </button>
        <button className="p-2 w-32 h-12 text-2xl flex items-center justify-center bg-purple-500 text-white rounded">
          <BsInstagram />
        </button>
        <button className="p-2 w-32 h-12 text-2xl flex items-center justify-center bg-green-500 text-white rounded">
          <BsWhatsapp />
        </button>
      </div>
    </Modal>
  );
};

export default ShareModal;

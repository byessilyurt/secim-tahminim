import React from "react";
import Modal from "react-modal";
import { BsTwitter, BsInstagram, BsWhatsapp } from "react-icons/bs";
import { toPng } from "html-to-image";
import ShareContent from "./ShareContent";

Modal.setAppElement("#root");

const ShareModal = ({
  isOpen,
  onRequestClose,
  candidatesData,
  countriesData,
}) => {
  const generateImage = (layout) => {
    const node = document.getElementById("share-content");
    node.style.display = "block";
    toPng(node)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "image.png";
        link.href = dataUrl;
        link.click();

        node.style.display = "none";
      })
      .catch((error) => {
        console.error("oops, something went wrong!", error);
        node.style.display = "none";
      });
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Share Modal"
      className="m-4 border rounded p-5 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <div className="flex space-x-4">
        <button
          className="p-2 w-32 h-12 text-2xl flex items-center justify-center bg-blue-500 text-white rounded"
          onClick={() => generateImage("horizontal")}
        >
          <BsTwitter />
        </button>
        <button
          className="p-2 w-32 h-12 text-2xl flex items-center justify-center bg-purple-500 text-white rounded"
          onClick={() => generateImage("vertical")}
        >
          <BsInstagram />
        </button>
        <button
          className="p-2 w-32 h-12 text-2xl flex items-center justify-center bg-green-500 text-white rounded"
          onClick={() => generateImage("vertical")}
        >
          <BsWhatsapp />
        </button>
      </div>
      <ShareContent
        id="share-content"
        layout="vertical"
        candidatesData={candidatesData}
        countriesData={countriesData}
        style={{ display: "none" }}
      />
    </Modal>
  );
};

export default ShareModal;

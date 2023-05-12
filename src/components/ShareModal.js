import React, { useContext } from "react";
import Modal from "react-modal";
import { BsTwitter, BsDownload } from "react-icons/bs";
import { toPng } from "html-to-image";
import { Canvg } from "canvg";
import ShareContent from "./ShareContent";
import { AppContext } from "../context";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");

const ShareModal = ({
  isOpen,
  onRequestClose,
  candidatesData,
  countriesData,
}) => {
  const { dispatch } = useContext(AppContext);

  const handleTwitterShare = () => {
    generateImage().then(() => {
      toast.info(
        "Twitter'a yönlendiriliyorsun. İndirilen resim dosyasını twitine eklemeyi unutma!",
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        }
      );
    });

    const text = encodeURIComponent("Benim seçim tahminim bu şekilde");
    const url = encodeURIComponent("http://secim-tahminim.firebaseapp.com"); // optional, URL to share
    const hashtags = encodeURIComponent("Seçim2023,14Mayıs "); // optional, comma separated list of hashtags without #
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${hashtags}`;
    setTimeout(() => {
      window.open(twitterUrl, "_blank");
    }, 5000);
  };

  const generateImage = async () => {
    return new Promise(async (resolve, reject) => {
      dispatch({ type: "SHOW_TOOLTIP", payload: false });

      const node = document.getElementById("share-content");
      node.style.display = "block";

      const images = Array.from(node.getElementsByTagName("img"));
      const svgs = Array.from(node.getElementsByTagName("svg"));

      // Convert SVGs to canvas
      for (let svg of svgs) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const v = await Canvg.from(ctx, svg.outerHTML);
        v.start();
        svg.parentNode.replaceChild(canvas, svg);
      }

      // Convert images to canvas
      images.forEach((img) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);
          img.parentNode.replaceChild(canvas, img);
        };
        // Force reload of image source to ensure onload event fires
        // eslint-disable-next-line
        img.src = img.src;
      });

      toPng(node)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "image.png";
          link.href = dataUrl;
          link.click();

          node.style.display = "none";
          dispatch({ type: "SHOW_TOOLTIP", payload: true });
          resolve();
        })
        .catch((error) => {
          console.error("oops, something went wrong!", error);
          node.style.display = "none";
          dispatch({ type: "SHOW_TOOLTIP", payload: true });
          reject(error);
        });
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
          onClick={() => handleTwitterShare()}
        >
          <BsTwitter />
        </button>
        <button
          className="p-2 w-32 h-12 text-2xl flex items-center justify-center bg-purple-500 text-white rounded"
          onClick={() => generateImage()}
        >
          <BsDownload />
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

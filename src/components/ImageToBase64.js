import React, { useEffect, useState } from "react";

export default function ImageToBase64({ imgSrc, alt, className }) {
  const [base64Src, setBase64Src] = useState(null);

  useEffect(() => {
    getBase64FromUrl(imgSrc)
      .then((base64Data) => setBase64Src(base64Data))
      .catch((err) => console.error(err));
  }, [imgSrc]);

  const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return await getBase64FromBlob(blob);
  };

  const getBase64FromBlob = async (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return <img src={base64Src} alt={alt} className={className} />;
}

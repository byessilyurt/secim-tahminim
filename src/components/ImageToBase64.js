import React, { useEffect, useState, useCallback } from "react";

export default function ImageToBase64({ imgSrc, alt, className }) {
  const [base64Src, setBase64Src] = useState(null);

  const getBase64FromBlob = useCallback(async (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }, []);

  const getBase64FromUrl = useCallback(
    async (url) => {
      const data = await fetch(url);
      const blob = await data.blob();
      return await getBase64FromBlob(blob);
    },
    [getBase64FromBlob]
  );

  useEffect(() => {
    getBase64FromUrl(imgSrc)
      .then((base64Data) => setBase64Src(base64Data))
      .catch((err) => console.error(err));
  }, [imgSrc, getBase64FromUrl]);

  return <img src={base64Src} alt={alt} className={className} />;
}

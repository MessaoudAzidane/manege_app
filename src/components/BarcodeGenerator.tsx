import React, { useEffect, useRef } from 'react';
import bwipjs from "bwip-js";

const BarcodeGenerator = ({ code = "", type = 'code128' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && code) {
      // @ts-ignore
      bwipjs.toCanvas(canvasRef.current, {
        bcid: type,
        text: code,
        scale: 3,
        height: 10,
        includetext: true,
        textxalign: 'center',
      });
    }
  }, [code, type]);

  return <canvas ref={canvasRef} />;
};

export default BarcodeGenerator;
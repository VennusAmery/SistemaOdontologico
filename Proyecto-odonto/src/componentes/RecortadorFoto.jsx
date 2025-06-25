// src/componentes/RecortadorFoto.jsx
import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './recortarHelper';
import { Slider, Button } from '@mui/material';
import './usuario.css';

const RecortadorFoto = ({ imagen, onCancel, onGuardar }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleGuardar = async () => {
    const croppedImage = await getCroppedImg(imagen, croppedAreaPixels);
    onGuardar(croppedImage);
  };

  return (
    <div className="recortador-contenedor">
      <div className="recortador-area">
        <Cropper
          image={imagen}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          showGrid={false}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>

      <div className="recortador-controles">
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          onChange={(e, z) => setZoom(z)}
        />

        <Button className="recortador-button" onClick={onCancel}>Cancelar</Button>
        <Button className="recortador-button" onClick={handleGuardar}>Guardar</Button>

      </div>
    </div>
  );
};

export default RecortadorFoto;

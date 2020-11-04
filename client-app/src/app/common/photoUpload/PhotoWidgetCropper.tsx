import React, { useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Button } from "semantic-ui-react";

interface IProps {
  setImage: (file: Blob) => void;
  imagePreview: string;
}
const PhotoWidgetCropper: React.FC<IProps> = ({
  imagePreview,
  setImage: setImg,
}) => {
  const [image, setImage] = useState(imagePreview);
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState<any>();
  const onChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      cropper &&
        cropper.current &&
        cropper.current.getCroppedCanvas().toBlob((blob: any) => {
          setImage(blob);
        }, "image/jpeg");
      // setImg(cropper.getCroppedCanvas().toBlob((blob: any) => blob));
    }
  };

  // const cropper = useRef(null);
  // const cropImage = () => {
  //   if (
  //     cropper
  //   ) {
  //     if(typeof cropper.getCroppedCanvas() === 'undefined')
  //     return;
  //   }
  //   cropper &&
  //     cropper.current &&
  //     cropper.current.getCroppedCanvas().toBlob((blob: any) => {
  //       setImage(blob);
  //     }, "image/jpeg");
  // };

  return (
    <div>
      <Cropper
        src={imagePreview}
        style={{ height: 200, width: "100%" }}
        // Cropper.js options
        initialAspectRatio={1}
        aspectRatio={1 / 1}
        viewMode={1}
        preview=".img-preview"
        guides={false}
        dragMode="move"
        scalable={true}
        cropBoxMovable={true}
        crop={getCropData}
        cropBoxResizable={true}
      />
    </div>
  );
};

export default PhotoWidgetCropper;

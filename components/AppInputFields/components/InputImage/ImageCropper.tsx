import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import ReactCrop, {
  Crop,
  PixelCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export type CropShape = "circular" | "rectangular" | "square" | "free";

interface ImageCropperProps {
  imageUrl: string;
  onCropComplete: (croppedImage: File) => void;
  onCancel: () => void;
  aspectRatio?: number;
  cropShape?: CropShape;
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
        height: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export function ImageCropper({
  imageUrl,
  onCropComplete,
  onCancel,
  aspectRatio = 1,
  cropShape = "rectangular",
}: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;

    // Determine aspect ratio based on crop shape
    let effectiveAspectRatio: number | undefined = aspectRatio;
    if (cropShape === "square") {
      effectiveAspectRatio = 1;
    } else if (cropShape === "free") {
      effectiveAspectRatio = undefined;
    }

    const initialCrop = effectiveAspectRatio
      ? centerAspectCrop(width, height, effectiveAspectRatio)
      : centerCrop(
          {
            unit: "%",
            width: 90,
            height: 60,
          },
          width,
          height
        );
    setCrop(initialCrop);

    // Set initial completed crop
    setCompletedCrop({
      unit: "px",
      x: (initialCrop.x / 100) * width,
      y: (initialCrop.y / 100) * height,
      width: (initialCrop.width / 100) * width,
      height: (initialCrop.height / 100) * height,
    });
  }

  const handleCropChange = (pixelCrop: PixelCrop, percentCrop: Crop) => {
    setCrop(percentCrop);
    setCompletedCrop(pixelCrop);
  };

  const handleCropComplete = () => {
    if (!imgRef.current || !completedCrop) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match crop size
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;

    // Calculate scaling factors
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

    // Draw the cropped image
    ctx.drawImage(
      imgRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    // Convert to file
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const file = new File([blob], "cropped-image.jpg", {
          type: "image/jpeg",
        });
        onCropComplete(file);
      },
      "image/jpeg",
      1
    );
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="relative bg-black/5 rounded-lg overflow-hidden">
        <ReactCrop
          crop={crop}
          onChange={(pixelCrop, percentCrop) =>
            handleCropChange(pixelCrop, percentCrop)
          }
          onComplete={(c) => setCompletedCrop(c)}
          aspect={
            cropShape === "free"
              ? undefined
              : cropShape === "square"
                ? 1
                : aspectRatio
          }
          className="max-h-[70vh]"
          circularCrop={cropShape === "circular"}
        >
          <Image
            ref={imgRef}
            src={imageUrl}
            onLoad={onImageLoad}
            className="max-w-full"
            alt="Crop me"
            style={{ maxHeight: "70vh", width: "auto" }}
            width={800}
            height={800}
            priority
            unoptimized
          />
        </ReactCrop>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          <XIcon className="mr-2 h-4 w-4" />
          Cancel
        </Button>
        <Button
          onClick={handleCropComplete}
          className="bg-primary hover:bg-primary/90"
        >
          Apply Crop
        </Button>
      </div>
    </div>
  );
}

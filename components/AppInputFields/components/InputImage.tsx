"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { CameraIcon, ImageIcon, UploadIcon } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { BaseInputProps } from "../InputField";
import { Camera } from "./InputImage/Camera";
import { ImageCropper } from "./InputImage/ImageCropper";

const isFile = (value: any): value is File => value instanceof File;

const ImageInput = <T extends FieldValues>({
  label,
  name,
  className,
  disabled,
  required = false,
  description,
}: Omit<BaseInputProps<T>, "form">) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"camera" | "gallery">("camera");
  const [cropImageUrl, setCropImageUrl] = useState<string | null>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const form = useFormContext<T>();

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setCropImageUrl(null);
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          stream.getTracks().forEach((track) => track.stop());
        })
        .catch(() => {});
    }
  };

  if (!form) {
    throw new Error("ImageInput must be used within a FormProvider");
  }

  const handleFileChange = useCallback(
    (file: File, field: ControllerRenderProps<T, any>) => {
      if (file) {
        field.onChange(file);
      }
    },
    []
  );

  const handleGalleryFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCropImageUrl(imageUrl);
    }
  };

  const handleCropComplete = (
    croppedFile: File,
    field: ControllerRenderProps<T, any>
  ) => {
    handleFileChange(croppedFile, field);
    setCropImageUrl(null);
    setIsDialogOpen(false);
  };

  const handleCropCancel = () => {
    setCropImageUrl(null);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <FormItem
          className={cn(
            "w-full max-w-[400px]",
            "group transition-all duration-300 ease-in-out",
            "flex flex-col items-center"
          )}
        >
          <FormLabel
            className={cn(
              "text-sm font-medium",
              "transition-colors duration-200",
              "group-hover:text-primary",
              required && "after:content-['*'] after:ml-0.5 after:text-red-500"
            )}
          >
            {label}
          </FormLabel>
          <FormControl>
            <>
              <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
                <DialogTrigger asChild>
                  <div
                    className={cn(
                      "flex px-2 border-2 border-dashed border-gray-200",
                      "bg-[#f8f8ff59] py-[6px] flex-col items-center",
                      "h-48 w-48 rounded-full justify-center",
                      "hover:border-primary hover:bg-primary/5",
                      "cursor-pointer transition-all duration-300",
                      "group/upload relative overflow-hidden",
                      className
                    )}
                    style={{
                      backgroundImage: field?.value
                        ? `linear-gradient(45deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(${
                            isFile(field?.value)
                              ? URL.createObjectURL(field?.value)
                              : field?.value
                          })`
                        : undefined,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover/upload:bg-black/20 transition-all duration-300" />
                    {field?.value ? (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/upload:opacity-100 transition-all duration-300">
                        <UploadIcon className="h-8 w-8 text-white drop-shadow-lg" />
                      </div>
                    ) : (
                      <>
                        <CameraIcon className="z-0 text-gray-700 h-8 w-8 group-hover/upload:scale-110 transition-transform duration-300" />
                        <p className="text-sm font-medium mt-2 group-hover/upload:text-primary transition-colors">
                          Click to Upload
                        </p>
                      </>
                    )}
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-center text-xl font-semibold">
                      Upload Photo
                    </DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col space-y-6">
                    {!cropImageUrl && (
                      <div className="flex p-1 gap-1 bg-muted rounded-lg">
                        <Button
                          variant={activeTab === "camera" ? "default" : "ghost"}
                          className={cn(
                            "w-full justify-center gap-2 rounded-md transition-all duration-300",
                            activeTab === "camera" && "shadow-sm"
                          )}
                          onClick={() => setActiveTab("camera")}
                        >
                          <CameraIcon className="h-4 w-4" />
                          Camera
                        </Button>
                        <Button
                          variant={
                            activeTab === "gallery" ? "default" : "ghost"
                          }
                          className={cn(
                            "w-full justify-center gap-2 rounded-md transition-all duration-300",
                            activeTab === "gallery" && "shadow-sm"
                          )}
                          onClick={() => {
                            setActiveTab("gallery");
                            hiddenInputRef.current?.click();
                          }}
                        >
                          <ImageIcon className="h-4 w-4" />
                          Gallery
                        </Button>
                      </div>
                    )}

                    <div className="min-h-[300px] flex items-center justify-center">
                      {cropImageUrl ? (
                        <ImageCropper
                          imageUrl={cropImageUrl}
                          onCropComplete={(file) =>
                            handleCropComplete(file, field)
                          }
                          onCancel={handleCropCancel}
                          aspectRatio={1}
                        />
                      ) : activeTab === "camera" ? (
                        <Camera
                          onCapture={(file: File) => {
                            const imageUrl = URL.createObjectURL(file);
                            setCropImageUrl(imageUrl);
                          }}
                        />
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() => hiddenInputRef.current?.click()}
                          className="w-full"
                        >
                          Select Image
                        </Button>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <input
                type="file"
                accept="image/png,image/gif,image/jpeg,image/webp"
                onChange={handleGalleryFileSelect}
                className="hidden"
                ref={hiddenInputRef}
              />
            </>
          </FormControl>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
          <p
            className={cn(
              "text-xs mt-2 animate-in fade-in-50",
              field?.value ? "text-muted-foreground" : "text-destructive"
            )}
          >
            Face should be clearly visible
          </p>
          <FormMessage className="text-xs font-medium text-destructive mt-1 animate-in fade-in-50" />
        </FormItem>
      )}
    />
  );
};

export default ImageInput as <T extends FieldValues>(
  props: Omit<BaseInputProps<T>, "form">
) => React.ReactNode;

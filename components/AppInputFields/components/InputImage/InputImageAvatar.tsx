"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Camera,
  CameraIcon,
  CameraOff,
  ImageIcon,
  Loader2,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  Square,
  Circle,
  RectangleHorizontal,
  Crop,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { BaseInputProps } from "../../InputField";
import { Camera as CameraComponent, CameraRef } from "./Camera";
import { ImageCropper, CropShape } from "./ImageCropper";

const isFile = (value: any): value is File => value instanceof File;

interface ImageInputProps<T extends FieldValues>
  extends Omit<BaseInputProps<T>, "form"> {
  cropShape?: CropShape;
  allowCropShapeSelection?: boolean;
}

const ImageInput = <T extends FieldValues>({
  label,
  name,
  className,
  disabled,
  required = false,
  description,
  cropShape = "rectangular",
  allowCropShapeSelection = true,
}: ImageInputProps<T>) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"camera" | "gallery">("camera");
  const [cropImageUrl, setCropImageUrl] = useState<string | null>(null);
  const [selectedCropShape, setSelectedCropShape] =
    useState<CropShape>(cropShape);
  const [isUploading, setIsUploading] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hasCheckedPermissions, setHasCheckedPermissions] = useState(false);
  const [cameraPermission, setCameraPermission] = useState<
    "prompt" | "granted" | "denied" | "unsupported"
  >("prompt");
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<CameraRef>(null);
  const form = useFormContext<T>();

  // Check camera permissions when dialog opens
  const checkCameraPermission = useCallback(async () => {
    if (!navigator.mediaDevices || !navigator.permissions) {
      setCameraPermission("unsupported");
      return;
    }

    try {
      const permissionStatus = await navigator.permissions.query({
        name: "camera" as PermissionName,
      });

      setCameraPermission(
        permissionStatus.state as "prompt" | "granted" | "denied"
      );

      // Listen for permission changes
      permissionStatus.addEventListener("change", () => {
        setCameraPermission(
          permissionStatus.state as "prompt" | "granted" | "denied"
        );
      });

      setHasCheckedPermissions(true);
    } catch (error) {
      console.error("Error checking camera permission:", error);
      setCameraPermission("unsupported");
    }
  }, []);

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (cropImageUrl) {
        URL.revokeObjectURL(cropImageUrl);
      }
    };
  }, [cropImageUrl]);

  const stopCameraStream = useCallback(() => {
    if (cameraRef.current) {
      cameraRef.current.stopCamera();
    }
  }, []);

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);

    if (open && !hasCheckedPermissions) {
      checkCameraPermission();
    }

    if (!open) {
      setCropImageUrl(null);
      stopCameraStream();
    }
  };

  if (!form) {
    throw new Error("ImageInput must be used within a FormProvider");
  }

  const handleFileChange = useCallback(
    async (file: File, field: ControllerRenderProps<T, any>) => {
      if (file) {
        setIsUploading(true);
        try {
          // Simulate file processing time
          await new Promise((resolve) => setTimeout(resolve, 500));
          field.onChange(file);
        } finally {
          setIsUploading(false);
        }
      }
    },
    []
  );

  const handleGalleryFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Stop camera when switching to gallery
      stopCameraStream();
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
    // Only restart camera if we're in camera tab
    if (activeTab === "camera") {
      // Camera will start automatically when component remounts
    }
  };

  const handleSwitchToGallery = () => {
    stopCameraStream();
    setActiveTab("gallery");
    setTimeout(() => {
      hiddenInputRef.current?.click();
    }, 100);
  };

  const renderPermissionRequest = () => (
    <div className="flex flex-col items-center justify-center space-y-4 p-6 text-center min-h-[300px] bg-muted/10 rounded-lg animate-in fade-in-50">
      <div
        className={cn(
          "p-4 rounded-full mb-2",
          cameraPermission === "denied" ? "bg-red-100" : "bg-primary/10"
        )}
      >
        {cameraPermission === "denied" ? (
          <ShieldAlert className="h-10 w-10 text-red-500" />
        ) : (
          <CameraIcon className="h-10 w-10 text-primary" />
        )}
      </div>

      <h3 className="text-lg font-medium">
        {cameraPermission === "denied"
          ? "Camera access blocked"
          : "Camera permission needed"}
      </h3>

      <p className="text-sm text-muted-foreground max-w-[300px]">
        {cameraPermission === "denied"
          ? "Please enable camera access in your browser settings to take a photo."
          : "We need your permission to access your camera for taking profile photos."}
      </p>

      {cameraPermission === "denied" ? (
        <div className="flex flex-col space-y-2 w-full max-w-[250px] mt-2">
          <Button
            onClick={() =>
              window.open(
                "https://support.google.com/chrome/answer/2693767",
                "_blank"
              )
            }
            variant="outline"
            className="w-full"
          >
            <Settings className="h-4 w-4 mr-2" />
            How to enable camera
          </Button>
          <Button
            onClick={() => {
              // Switch to gallery as fallback
              setActiveTab("gallery");
            }}
            variant="secondary"
            className="w-full"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Use gallery instead
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => {
            // This will trigger the browser's permission prompt
            navigator.mediaDevices
              .getUserMedia({ video: true })
              .then((stream) => {
                // Stop the stream immediately, we just needed the permission
                stream.getTracks().forEach((track) => track.stop());
                setCameraPermission("granted");
              })
              .catch(() => {
                setCameraPermission("denied");
              });
          }}
          className="mt-4"
          size="lg"
        >
          <ShieldCheck className="h-4 w-4 mr-2" />
          Allow Camera Access
        </Button>
      )}
    </div>
  );

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
            <div className="flex flex-col items-center relative">
              <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
                <DialogTrigger asChild>
                  <div
                    className={cn(
                      "flex px-2 border-2 border-dashed",
                      "py-[6px] flex-col items-center",
                      "h-48 w-48 rounded-full justify-center",
                      "cursor-pointer transition-all duration-300",
                      "group/upload relative overflow-hidden",
                      field?.value
                        ? "border-primary/40 shadow-md"
                        : "border-gray-200 hover:border-primary hover:shadow-md",
                      isHovering && "border-primary/60 shadow-lg",
                      disabled && "opacity-70 cursor-not-allowed",
                      className
                    )}
                    style={{
                      backgroundImage: field?.value
                        ? `linear-gradient(45deg, rgba(0,0,0,0.05), rgba(0,0,0,0.1)), url(${
                            isFile(field?.value)
                              ? URL.createObjectURL(field?.value)
                              : field?.value
                          })`
                        : undefined,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    aria-disabled={disabled}
                  >
                    <div
                      className={cn(
                        "absolute inset-0 transition-all duration-300",
                        field?.value
                          ? "bg-gradient-to-b from-black/0 to-black/20"
                          : "bg-[#f8f8ff59]",
                        "group-hover/upload:opacity-80"
                      )}
                    />

                    {isUploading ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
                        <Loader2 className="h-10 w-10 text-white animate-spin" />
                      </div>
                    ) : field?.value ? (
                      <>
                        <div className="absolute top-2 right-2 z-10">
                          <div className="bg-white/80 backdrop-blur-sm p-1 rounded-full">
                            <Sparkles className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover/upload:opacity-100 transition-all duration-300 z-10">
                          <UploadCloud className="h-8 w-8 text-white drop-shadow-lg mb-2" />
                          <p className="text-xs font-medium text-white drop-shadow-lg">
                            Change Photo
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full w-full z-10 transition-transform duration-300 group-hover/upload:scale-105">
                        <div className="bg-primary/10 p-3 rounded-full mb-3 group-hover/upload:bg-primary/20 transition-all duration-300">
                          <CameraIcon className="text-primary h-7 w-7" />
                        </div>
                        <p className="text-sm font-medium group-hover/upload:text-primary transition-colors">
                          Upload Photo
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Click to select
                        </p>
                      </div>
                    )}
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md max-w-[95vw] w-full h-auto max-h-[90vh] overflow-y-auto p-0">
                  <DialogHeader className="p-4 pb-0">
                    <DialogTitle className="text-center text-xl font-semibold">
                      Upload Photo
                    </DialogTitle>
                  </DialogHeader>
                  <div className="p-4 pt-2 flex flex-col space-y-4">
                    {!cropImageUrl && (
                      <div className="w-full">
                        <Tabs
                          defaultValue={activeTab}
                          onValueChange={(value) =>
                            setActiveTab(value as "camera" | "gallery")
                          }
                          className="w-full"
                        >
                          <TabsList className="grid w-full grid-cols-2 mb-4">
                            <TabsTrigger
                              value="camera"
                              className="flex items-center gap-2"
                            >
                              {cameraPermission === "denied" ? (
                                <CameraOff className="h-4 w-4" />
                              ) : (
                                <Camera className="h-4 w-4" />
                              )}
                              Camera
                            </TabsTrigger>
                            <TabsTrigger
                              value="gallery"
                              className="flex items-center gap-2"
                              onClick={handleSwitchToGallery}
                            >
                              <ImageIcon className="h-4 w-4" />
                              Gallery
                            </TabsTrigger>
                          </TabsList>

                          <div className="w-full rounded-lg overflow-hidden">
                            <TabsContent value="camera" className="m-0">
                              <div className="w-full flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 rounded-lg overflow-hidden border border-slate-200">
                                {cameraPermission === "prompt" ||
                                cameraPermission === "denied" ? (
                                  renderPermissionRequest()
                                ) : (
                                  <CameraComponent
                                    ref={cameraRef}
                                    onCapture={(file: File) => {
                                      // Create a URL for the cropper
                                      const imageUrl =
                                        URL.createObjectURL(file);
                                      setCropImageUrl(imageUrl);
                                    }}
                                  />
                                )}
                              </div>
                            </TabsContent>

                            <TabsContent value="gallery" className="m-0">
                              <div className="min-h-[280px] w-full flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 rounded-lg overflow-hidden border border-slate-200">
                                <div className="flex flex-col items-center justify-center p-6 text-center space-y-4 animate-in fade-in-50">
                                  <div className="bg-primary/10 p-4 rounded-full">
                                    <UploadCloud className="h-8 w-8 text-primary" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-700">
                                      Select an image from your device
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                      PNG, JPG, GIF or WEBP (max. 10MB)
                                    </p>
                                  </div>
                                  <Button
                                    variant="outline"
                                    onClick={() =>
                                      hiddenInputRef.current?.click()
                                    }
                                    className="mt-4 h-10 px-6 transition-all duration-300 hover:shadow-md hover:border-primary"
                                  >
                                    <ImageIcon className="h-4 w-4 mr-2" />
                                    Browse Files
                                  </Button>
                                </div>
                              </div>
                            </TabsContent>
                          </div>
                        </Tabs>
                      </div>
                    )}

                    {cropImageUrl && (
                      <div className="space-y-4">
                        {allowCropShapeSelection && (
                          <div className="flex flex-col space-y-3">
                            <h4 className="text-sm font-medium text-gray-700">
                              Choose crop shape:
                            </h4>
                            <div className="flex gap-2 justify-center">
                              <Button
                                type="button"
                                variant={
                                  selectedCropShape === "rectangular"
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() =>
                                  setSelectedCropShape("rectangular")
                                }
                                className="flex items-center gap-2"
                              >
                                <RectangleHorizontal className="h-4 w-4" />
                                Rectangle
                              </Button>
                              <Button
                                type="button"
                                variant={
                                  selectedCropShape === "square"
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() => setSelectedCropShape("square")}
                                className="flex items-center gap-2"
                              >
                                <Square className="h-4 w-4" />
                                Square
                              </Button>
                              <Button
                                type="button"
                                variant={
                                  selectedCropShape === "circular"
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() => setSelectedCropShape("circular")}
                                className="flex items-center gap-2"
                              >
                                <Circle className="h-4 w-4" />
                                Circle
                              </Button>
                              <Button
                                type="button"
                                variant={
                                  selectedCropShape === "free"
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() => setSelectedCropShape("free")}
                                className="flex items-center gap-2"
                              >
                                <Crop className="h-4 w-4" />
                                Free
                              </Button>
                            </div>
                          </div>
                        )}
                        <div className="min-h-[280px] w-full flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 rounded-lg overflow-hidden border border-slate-200">
                          <ImageCropper
                            imageUrl={cropImageUrl}
                            onCropComplete={(file) =>
                              handleCropComplete(file, field)
                            }
                            onCancel={handleCropCancel}
                            aspectRatio={
                              selectedCropShape === "square" ? 1 : undefined
                            }
                            cropShape={selectedCropShape}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {cameraPermission === "denied" && activeTab === "camera" && (
                    <DialogFooter className="p-4 pt-0">
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab("gallery")}
                        className="w-full"
                      >
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Switch to Gallery
                      </Button>
                    </DialogFooter>
                  )}
                </DialogContent>
              </Dialog>
              <input
                type="file"
                accept="image/png,image/gif,image/jpeg,image/webp"
                onChange={handleGalleryFileSelect}
                className="hidden"
                ref={hiddenInputRef}
              />
            </div>
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
  props: ImageInputProps<T>
) => React.ReactNode;

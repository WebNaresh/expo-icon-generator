import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  CameraIcon,
  FlipHorizontal,
  RefreshCwIcon,
  Settings,
  ShieldAlert,
  ShieldCheck,
  XIcon,
} from "lucide-react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface CameraProps {
  onCapture: (file: File) => void;
}

export interface CameraRef {
  stopCamera: () => void;
}

type PermissionState = "prompt" | "granted" | "denied" | "not-supported";
type CameraFacingMode = "user" | "environment";

export const Camera = forwardRef<CameraRef, CameraProps>(
  ({ onCapture }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cameraContainerRef = useRef<HTMLDivElement>(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [cameraError, setCameraError] = useState<string | null>(null);
    const [permissionState, setPermissionState] =
      useState<PermissionState>("prompt");
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const [facingMode, setFacingMode] = useState<CameraFacingMode>("user");
    const [hasFrontAndBackCamera, setHasFrontAndBackCamera] = useState(false);

    const cleanupCamera = useCallback(() => {
      if (!videoRef.current) return;

      try {
        const stream = videoRef.current.srcObject as MediaStream | null;
        if (stream) {
          stream.getTracks().forEach((track) => {
            track.stop();
            stream.removeTrack(track);
          });
        }
        videoRef.current.srcObject = null;
        setIsCameraActive(false);
      } catch (error) {
        console.error("Error cleaning up camera:", error);
      }
    }, []);

    // Check device capabilities
    const checkDeviceCapabilities = useCallback(async () => {
      try {
        if (
          !navigator.mediaDevices ||
          !navigator.mediaDevices.enumerateDevices
        ) {
          setHasFrontAndBackCamera(false);
          return;
        }

        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );

        // If we have more than one video device, assume we have both front and back cameras
        setHasFrontAndBackCamera(videoDevices.length > 1);
      } catch (error) {
        console.error("Error checking device capabilities:", error);
        setHasFrontAndBackCamera(false);
      }
    }, []);

    const startCamera = useCallback(async () => {
      try {
        cleanupCamera();
        setCameraError(null);

        // Determine ideal constraints based on container size
        const aspectRatio = 1; // Still keep square aspect ratio

        // Favor higher resolution on larger screens, but keep reasonable on mobile
        const idealWidth = Math.min(720, Math.max(280, containerSize.width));
        const idealHeight = Math.min(720, Math.max(280, containerSize.height));

        const constraints = {
          video: {
            width: { ideal: idealWidth },
            height: { ideal: idealHeight },
            facingMode: facingMode,
            aspectRatio: aspectRatio,
          },
        };

        const newStream = await navigator.mediaDevices.getUserMedia(
          constraints
        );

        if (!videoRef.current) return;

        videoRef.current.srcObject = newStream;
        videoRef.current.onloadedmetadata = () => {
          setIsCameraActive(true);
          setCameraError(null);
          // If we get here, permission was granted
          setPermissionState("granted");
        };

        newStream.getTracks().forEach((track) => {
          track.onended = () => {
            console.log("Track ended");
            cleanupCamera();
          };
        });

        // Check if device has multiple cameras
        await checkDeviceCapabilities();
      } catch (err: any) {
        console.error("Error accessing camera:", err);

        // Handle permission errors specifically
        if (
          err.name === "NotAllowedError" ||
          err.name === "PermissionDeniedError"
        ) {
          setPermissionState("denied");
          setCameraError(
            "Camera access was denied. Please allow camera access in your browser settings."
          );
        } else if (
          err.name === "NotFoundError" ||
          err.name === "OverconstrainedError"
        ) {
          setCameraError("No compatible camera was found on your device.");
        } else {
          setCameraError(
            "Unable to access the camera. Please check your device and try again."
          );
        }

        setIsCameraActive(false);
        cleanupCamera();
      }
    }, [cleanupCamera, containerSize, facingMode, checkDeviceCapabilities]);

    // Toggle between front and back camera
    const toggleCamera = useCallback(() => {
      const newMode = facingMode === "user" ? "environment" : "user";
      setFacingMode(newMode);
      // Restart camera with new facing mode
      if (isCameraActive) {
        cleanupCamera();
        setTimeout(() => startCamera(), 300);
      }
    }, [facingMode, isCameraActive, cleanupCamera, startCamera]);

    // Check if the browser supports the Permissions API
    const isPermissionsSupported =
      typeof navigator !== "undefined" && "permissions" in navigator;

    // Check camera permission status
    const checkPermission = useCallback(async () => {
      try {
        if (!isPermissionsSupported) {
          // Skip permission check on browsers that don't support it
          return;
        }

        const result = await navigator.permissions.query({
          name: "camera" as PermissionName,
        });

        if (result.state === "granted") {
          setPermissionState("granted");
        } else if (result.state === "denied") {
          setPermissionState("denied");
        } else {
          setPermissionState("prompt");
        }

        // Listen for permission changes
        result.addEventListener("change", () => {
          if (result.state === "granted") {
            setPermissionState("granted");
            startCamera();
          } else if (result.state === "denied") {
            setPermissionState("denied");
            cleanupCamera();
          }
        });
      } catch (error) {
        console.error("Error checking camera permission:", error);
        // Some browsers don't support the camera permission query
        // In this case, we'll just try to start the camera directly
        setPermissionState("not-supported");
      }
    }, [isPermissionsSupported, cleanupCamera, startCamera]);

    // Update container size on mount and window resize
    useEffect(() => {
      const updateContainerSize = () => {
        if (cameraContainerRef.current) {
          const { width, height } =
            cameraContainerRef.current.getBoundingClientRect();
          setContainerSize({ width, height });
        }
      };

      // Initial size update
      updateContainerSize();

      // Listen for resize events
      window.addEventListener("resize", updateContainerSize);

      return () => {
        window.removeEventListener("resize", updateContainerSize);
      };
    }, []);

    useImperativeHandle(ref, () => ({
      stopCamera: cleanupCamera,
    }));

    useEffect(() => {
      // First check permission status
      checkPermission();

      // If permissions API is not supported or permission is already granted, try to start the camera
      if (
        !isPermissionsSupported ||
        permissionState === "granted" ||
        permissionState === "not-supported"
      ) {
        startCamera();
      }

      return () => {
        cleanupCamera();
      };
    }, [
      startCamera,
      cleanupCamera,
      checkPermission,
      isPermissionsSupported,
      permissionState,
    ]);

    const takeSelfie = () => {
      if (!videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (!context) return;

      const size = Math.min(video.videoWidth, video.videoHeight);
      canvas.width = size;
      canvas.height = size;

      const sx = (video.videoWidth - size) / 2;
      const sy = (video.videoHeight - size) / 2;

      context.clearRect(0, 0, canvas.width, canvas.height);

      // First save the current state
      context.save();

      // Mirror the image for front camera selfies to appear natural
      // For back camera, don't mirror
      if (facingMode === "user") {
        context.scale(-1, 1);
        context.translate(-canvas.width, 0);
      }

      context.drawImage(
        video,
        sx,
        sy,
        size,
        size,
        0,
        0,
        canvas.width,
        canvas.height
      );

      // Restore the context to its original state
      context.restore();

      canvas.toBlob(
        (blob) => {
          if (!blob) return;

          // Create a file from the blob
          const file = new File([blob], "camera-capture.jpg", {
            type: "image/jpeg",
          });

          // Pass the file directly to the parent component
          onCapture(file);
          cleanupCamera();
        },
        "image/jpeg",
        1.0
      );
    };

    // Render permission request UI
    if (permissionState === "prompt" || permissionState === "denied") {
      return (
        <div className="flex flex-col items-center justify-center space-y-4 p-4 text-center animate-in fade-in-50 h-full w-full">
          <div
            className={cn(
              "p-4 rounded-full mb-2",
              permissionState === "denied" ? "bg-red-100" : "bg-primary/10"
            )}
          >
            {permissionState === "denied" ? (
              <ShieldAlert className="h-10 w-10 text-red-500" />
            ) : (
              <CameraIcon className="h-10 w-10 text-primary" />
            )}
          </div>

          <h3 className="text-lg font-medium">
            {permissionState === "denied"
              ? "Camera access denied"
              : "Camera permission required"}
          </h3>

          <p className="text-sm text-muted-foreground max-w-[300px]">
            {permissionState === "denied"
              ? "You'll need to allow camera access in your browser settings to use this feature."
              : "We need permission to access your camera to take a photo."}
          </p>

          {permissionState === "denied" ? (
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
                  // Try requesting again - might work if user changed permissions in another tab
                  startCamera();
                }}
                className="w-full"
              >
                <RefreshCwIcon className="h-4 w-4 mr-2" />
                Try again
              </Button>
            </div>
          ) : (
            <Button onClick={startCamera} className="mt-2" size="lg">
              <ShieldCheck className="h-4 w-4 mr-2" />
              Grant Camera Access
            </Button>
          )}
        </div>
      );
    }

    if (cameraError) {
      return (
        <Alert variant="destructive" className="animate-in fade-in-50">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Camera Error</AlertTitle>
          <AlertDescription>{cameraError}</AlertDescription>
          <Button
            onClick={startCamera}
            variant="outline"
            className="mt-4 w-full"
          >
            <RefreshCwIcon className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </Alert>
      );
    }

    return (
      <div className="space-y-4 w-full h-full" ref={cameraContainerRef}>
        <div className="relative rounded-xl overflow-hidden bg-gradient-to-b from-gray-900/10 to-gray-900/20 aspect-square w-full max-w-full border border-muted/30 shadow-sm">
          {!isCameraActive && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                size="lg"
                className="rounded-full w-28 h-28 animate-in zoom-in-50 z-10 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary/90 to-primary"
                onClick={startCamera}
              >
                <CameraIcon className="h-10 w-10" />
              </Button>
            </div>
          )}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={cn(
              "w-full h-full object-cover transition-all duration-300",
              // Only mirror for front camera
              facingMode === "user" && "transform scale-x-[-1]",
              !isCameraActive && "opacity-0"
            )}
          />
          {isCameraActive && (
            <>
              {/* Top controls */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between">
                {/* Restart button in top-left corner */}
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full w-10 h-10 bg-black/30 hover:bg-black/40 backdrop-blur-md text-white border border-white/20 shadow-md z-10 transition-transform hover:scale-105"
                  onClick={startCamera}
                  title="Restart Camera"
                >
                  <RefreshCwIcon className="h-5 w-5" />
                </Button>

                {/* Switch camera button in middle */}
                {hasFrontAndBackCamera && (
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full w-10 h-10 bg-black/30 hover:bg-black/40 backdrop-blur-md text-white border border-white/20 shadow-md z-10 transition-transform hover:scale-105"
                    onClick={toggleCamera}
                    title={`Switch to ${
                      facingMode === "user" ? "back" : "front"
                    } camera`}
                  >
                    <FlipHorizontal className="h-5 w-5" />
                  </Button>
                )}

                {/* Close button in top-right corner */}
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full w-10 h-10 bg-black/30 hover:bg-black/40 backdrop-blur-md text-white border border-white/20 shadow-md z-10 transition-transform hover:scale-105"
                  onClick={cleanupCamera}
                  title="Stop Camera"
                >
                  <XIcon className="h-5 w-5" />
                </Button>
              </div>

              {/* Capture button at bottom */}
              <div className="absolute bottom-6 inset-x-0 flex items-center justify-center">
                <div className="p-1 bg-black/20 backdrop-blur-sm rounded-full">
                  <Button
                    size="icon"
                    className="rounded-full w-16 h-16 bg-white hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-white"
                    onClick={takeSelfie}
                    title="Take Photo"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white border-4 border-primary"></div>
                    </div>
                  </Button>
                </div>
              </div>

              {/* Current mode indicator */}
              <div className="absolute bottom-24 inset-x-0 flex justify-center">
                <div className="bg-black/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium border border-white/10">
                  {facingMode === "user" ? "Front Camera" : "Back Camera"}
                </div>
              </div>
            </>
          )}
        </div>
        <canvas
          ref={canvasRef}
          style={{ display: "none" }}
          width={720}
          height={720}
        />
      </div>
    );
  }
);

Camera.displayName = "Camera";

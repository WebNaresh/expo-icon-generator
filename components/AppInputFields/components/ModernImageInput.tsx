import { cn } from "@/lib/utils";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";

interface ModernImageInputProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  description?: string;
  required?: boolean;
  className?: string;
}

const ModernImageInput = <T extends FieldValues>({
  name,
  label,
  description,
  required = false,
  className,
}: ModernImageInputProps<T>) => {
  const form = useFormContext<T>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  if (!form)
    throw new Error("ModernImageInput must be used within a FormProvider");

  // Show default image if present
  useEffect(() => {
    const value = form.getValues(name);
    if (typeof value === "string" && value) {
      setImagePreview(value);
    } else if ((value as any) instanceof File) {
      setImagePreview(URL.createObjectURL(value as File));
    } else {
      setImagePreview(null);
    }
    // Listen for changes to the field value
    const subscription = form.watch(() => {
      const v = form.getValues(name);
      if (typeof v === "string" && v) {
        setImagePreview(v);
      } else if ((v as any) instanceof File) {
        setImagePreview(URL.createObjectURL(v as File));
      } else {
        setImagePreview(null);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, name]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue(name, file as any);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Handle drag and drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file?.type.startsWith("image/")) {
        form.setValue(name, file as any);
        setImagePreview(URL.createObjectURL(file));
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    if (e.clipboardData.files && e.clipboardData.files.length > 0) {
      const file = e.clipboardData.files[0];
      if (file?.type.startsWith("image/")) {
        form.setValue(name, file as any);
        setImagePreview(URL.createObjectURL(file));
      }
    }
  };

  // Remove/clear image
  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    form.setValue(name, null as any);
  };

  return (
    <div
      className={cn(
        "w-full max-w-xs md:max-w-md md:w-96 flex flex-col items-center mb-2",
        className
      )}
    >
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2 w-full text-left">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div
        className={cn(
          "w-full flex flex-col items-center border-2 border-dashed border-gray-200 rounded-2xl p-6 bg-gradient-to-br from-white/80 via-background/90 to-primary/5  transition cursor-pointer relative group overflow-hidden",
          isDragActive && "border-primary bg-primary/10 backdrop-blur-lg"
        )}
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onPaste={handlePaste}
        tabIndex={0}
        role="button"
        aria-label={label || "Upload image"}
      >
        {imagePreview ? (
          <div className="relative w-36 h-36 mb-2 flex items-center justify-center">
            <Image
              width={144}
              height={144}
              src={
                typeof imagePreview === "string" &&
                !imagePreview.startsWith("blob:")
                  ? `${imagePreview}?t=${Date.now()}`
                  : imagePreview
              }
              alt="Preview"
              className="w-36 h-36 object-cover rounded-xl shadow-lg border-4 border-white ring-2 ring-primary/30 transition-all duration-300"
              style={{ filter: "drop-shadow(0 2px 8px rgba(31,38,135,0.10))" }}
            />
            <button
              type="button"
              aria-label="Remove image"
              className="absolute top-2 right-2 bg-white/90 hover:bg-red-500 hover:text-white text-gray-700 rounded-full p-2 shadow-lg border border-gray-200 hover:border-red-500 transition z-10 group/remove"
              onClick={handleRemoveImage}
              tabIndex={0}
              title="Remove image"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-36 w-36 bg-white/90 rounded-xl mb-4 border border-gray-100 shadow-md">
            <ImagePlus className="w-12 h-12 text-primary/70 mb-2" />
            <span className="text-base font-medium text-center text-muted-foreground">
              Drag & Drop or Click
            </span>
          </div>
        )}
        <button
          type="button"
          tabIndex={-1}
          className="mt-2 px-6 py-2.5 rounded-xl bg-primary text-white font-bold shadow-md hover:bg-primary/90 transition-all duration-200 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 group/upload-btn"
          style={{ minWidth: 180 }}
          title={imagePreview ? "Change Image" : "Click to Upload"}
        >
          {imagePreview ? "Change Image" : "Click to Upload"}
        </button>
        {description && (
          <p className="text-xs text-muted-foreground mt-4 text-center">
            {description}
          </p>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        {isDragActive && (
          <div className="absolute inset-0 bg-primary/10 border-2 border-primary rounded-2xl pointer-events-none animate-pulse z-20" />
        )}
      </div>
    </div>
  );
};

export default ModernImageInput;

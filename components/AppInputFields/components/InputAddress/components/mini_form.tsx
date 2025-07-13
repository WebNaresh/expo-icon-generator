import { InputFieldProps } from "@/components/AppInputFields/InputField";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { loadGoogleMapsApi } from "@/lib/google-maps";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import PlacesAutocomplete, {
  geocodeByPlaceId,
  Suggestion,
} from "react-places-autocomplete";
import Select from "react-select";

type Props = {
  field: ControllerRenderProps<FieldValues, string>;
  inputProps: InputFieldProps;
};
interface PlaceOption {
  description: string;
  placeId: string;
}

const AddressInput = ({ field, inputProps }: Props) => {
  const { label, placeholder, className, required = false } = inputProps;
  const [apiLoaded, setApiLoaded] = useState(false);

  // Load Google Maps API on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if API is already loaded
      if (window.google && window.google.maps) {
        setApiLoaded(true);
        return;
      }

      // Load API
      loadGoogleMapsApi()
        .then(() => setApiLoaded(true))
        .catch((error) =>
          console.error("Error loading Google Maps API:", error)
        );
    }
  }, []);

  const customStyles = {
    menu: (provided: any) => ({
      ...provided,
      zIndex: 9999,
      position: "absolute",
      backgroundColor: "var(--background)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius)",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "var(--primary)"
        : state.isFocused
          ? "var(--accent)"
          : "transparent",
      color: state.isSelected
        ? "var(--primary-foreground)"
        : "var(--foreground)",
      cursor: "pointer",
    }),
    control: (provided: any) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "1px solid var(--input)",
      borderRadius: "var(--radius)",
      minHeight: "44px",
      paddingLeft: "0.5rem",
      display: "flex",
      alignItems: "center",
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      paddingLeft: "0",
    }),
  };

  const handleSelect = async (
    option: PlaceOption,
    onChange: (value: any) => void
  ) => {
    if (!option?.placeId) {
      if (option?.placeId === "") {
      } else {
        onChange({
          address: undefined,
          position: {
            lat: 0,
            lng: 0,
          },
        });
      }
    } else {
      const response = await geocodeByPlaceId(option.placeId);

      onChange({
        address: response[0]?.formatted_address,
        position: response[0]?.geometry?.location?.toJSON(),
      });
    }
  };

  const [state, setState] = useState<Suggestion[]>([
    field?.value?.address && {
      id: "initial-id",
      active: false,
      index: 0,
      formattedSuggestion: field?.value?.address ?? "",
      description: field?.value?.address ?? "",
      placeId: "",
      matchedSubstrings: [], // Provide appropriate default value
      terms: [], // Provide appropriate default value
      types: [], // Provide appropriate default value
      // other properties with default values...
    },
  ]);
  const [value, setValue] = useState<string>("");
  const handleFieldChange1 = field.onChange;
  const handleFieldChange = useCallback(
    (newValue: any) => {
      handleFieldChange1(newValue);

      // react-hooks/exhaustive-deps
    },
    [handleFieldChange1] // Only recreate if 'field' changes
  );

  useEffect(() => {
    if (state.length === 0) {
      handleFieldChange({
        address: undefined,
        position: {
          lat: 0,
          lng: 0,
        },
      });
    } else if (state[0]) {
      handleSelect(state[0], handleFieldChange);
    }
  }, [state, handleFieldChange]);

  // Don't render Places Autocomplete until API is loaded
  if (!apiLoaded) {
    return (
      <FormItem
        className={cn(
          "w-full max-w-[400px]",
          "group transition-all duration-300 ease-in-out",
          className
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
          <div className="relative w-full">
            <div className="absolute top-3 left-3 z-10 search-icon">
              <MapPin className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
            </div>
            <div className="h-11 w-full border border-input rounded-md bg-transparent relative flex items-center pl-10">
              <span className="text-sm text-muted-foreground">
                Loading maps...
              </span>
            </div>
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }

  return (
    <FormItem
      className={cn(
        "w-full max-w-[400px]",
        "group transition-all duration-300 ease-in-out",
        className
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
        <div className="relative w-full">
          <div className="absolute top-3 left-3 z-10 search-icon">
            <MapPin className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
          </div>
          <PlacesAutocomplete
            value={value}
            onChange={(value) => {
              setValue(value);
            }}
          >
            {({ getInputProps, suggestions, loading }) => {
              return (
                <div className="relative flex items-center">
                  <Select
                    menuPlacement="auto"
                    styles={{
                      ...customStyles,
                      control: (base) => ({
                        ...base,
                        backgroundColor: "transparent",
                        border: "1px solid var(--input)",
                        borderRadius: "var(--radius)",
                        minHeight: "44px",
                        paddingLeft: "2.5rem",
                      }),
                      valueContainer: (provided) => ({
                        ...provided,
                        paddingLeft: "0",
                      }),
                    }}
                    isLoading={loading}
                    placeholder={placeholder}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    value={state[0]}
                    escapeClearsValue={false}
                    options={suggestions}
                    getOptionLabel={(option: Suggestion) => option.description}
                    getOptionValue={(option: Suggestion) => option.placeId}
                    onInputChange={(value: string) => {
                      getInputProps().onChange({
                        target: { value },
                      });
                    }}
                    filterOption={() => true}
                    onChange={(value: any) => {
                      if (value) {
                        setState([value]);
                      } else {
                        setState([]);
                      }
                    }}
                    isClearable={true}
                    isSearchable={true}
                    className="w-full"
                  />
                </div>
              ) as any;
            }}
          </PlacesAutocomplete>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default React.memo(AddressInput);

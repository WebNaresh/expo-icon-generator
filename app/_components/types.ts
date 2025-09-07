// Shared interface for generated icons
export interface GeneratedIcon {
    name: string;
    size: string;
    url: string;
    blob?: Blob; // Optional since API doesn't return it to reduce response size
}

// Interface for icon data used in API
export interface GeneratedIconData {
    name: string;
    size: string;
    url: string;
    buffer: Buffer;
}

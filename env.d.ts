declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;

    NEXTAUTH_SECRET: string;

    NEXTAUTH_URL: string;

    AUTH_GOOGLE_ID: string;


    AUTH_GOOGLE_SECRET: string;

    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: string;

    NODE_ENV: 'development' | 'production' | 'test';

    PORT?: string;

    VERCEL_URL?: string;

    VERCEL_ENV?: 'development' | 'preview' | 'production';

    VERCEL_GIT_COMMIT_REF?: string;
  }
}

declare global {
  interface Window {

    google?: typeof google;
  }
}


export { };

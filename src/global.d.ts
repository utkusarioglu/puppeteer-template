declare global {
  namespace NodeJS {
    /**
     * Custom environment variables used by the app
     */
    interface ProcessEnv {
      USERNAME: string;
      PASSWORD: string;
    }
  }
}

export {};

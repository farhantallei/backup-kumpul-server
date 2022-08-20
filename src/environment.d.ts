declare global {
  namespace NodeJS {
    interface ProcessEnv {
      npm_package_version: string;
    }
  }
}

export {};

export {};

declare global {
  interface Window {
    MSStream: string;
    popoProtocol: {
      postMessage: (message: string) => void;
      resolve: (result: any) => void;
      reject: (result: any) => void;
    };
  }
}

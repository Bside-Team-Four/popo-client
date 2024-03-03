export default class PoPoNativeBridge {
  private popoProtocol = typeof window === 'undefined' ? {
    postMessage: () => {},
    resolve: () => {},
    reject: () => {},
  } : window.popoProtocol;

  private call({ action }:{ action: string }) {
    this.popoProtocol.postMessage(JSON.stringify({ action }));
  }

  private withResultCall<T>({ action }: { action: string; }): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.popoProtocol.resolve = (result: T) => {
        resolve(result);
      };
      this.popoProtocol.reject = (result: Error) => {
        reject(result);
      };
      this.call({ action });
    });
  }

  async getFcmToken() {
    return (
      this.withResultCall<string | undefined>({
        action: 'getPushToken',
      }));
  }
}

export const nativeBridge = new PoPoNativeBridge();

if (typeof window !== 'undefined') {
  (window ?? {}).popoProtocol = window.popoProtocol ?? { postMessage: () => {} };
}

export default class PoPoNativeBridge {
  private popoProtocol = window.popoProtocol;

  private call({ action, data }:{ action: string, data: any }) {
    this.popoProtocol.postMessage(JSON.stringify({ action, data }));
  }

  private withResultCall<T>({ action, data }: { action: string; data?: any }): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.popoProtocol.resolve = (result: T) => {
        resolve(result);
      };
      this.popoProtocol.reject = (result: any) => {
        reject(result);
      };
      this.call({ action, data });
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

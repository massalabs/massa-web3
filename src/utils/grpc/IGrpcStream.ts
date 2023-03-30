export default interface IGrpcStream {
  cancel: () => Promise<void>;
  getPeer: () => string;
  on: (eventName: string, ...args: any) => void;
  off: (eventName: string) => void;
};;;;;;;;;;

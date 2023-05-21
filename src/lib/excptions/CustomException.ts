class CustomException extends Error {
  declare code: 'NETWORK_ERROR';

  constructor(message: string) {
    super(message);
    this.name = 'CustomException';
    this.code = 'NETWORK_ERROR';
  }
}

export default CustomException;

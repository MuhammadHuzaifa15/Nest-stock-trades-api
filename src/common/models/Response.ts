class Response {
  status: number;
  data: any;
  message?: string;
  errors?: any;

  constructor(status: number, data?: any) {
    this.init();
    this.status = status;
    this.data = data || {};
  }

  init() {
    this.status = 200;
    this.data = {};
    this.message = '';
    this.errors = [];
    return this;
  }

  setStatus(status: number) {
    this.status = status;
    return this;
  }

  setMsg(message: string) {
    this.message = message;
    return this;
  }

  setData(data: any) {
    this.data = data;
    return this;
  }

  setError(label: string, message: string) {
    this.errors.push({ label, message });
    return this;
  }

  getBody() {
    return {
      message: this.message,
      status: this.status,
      errors: this.errors,
      data: this.data,
    };
  }

  getData() {
    return this.data;
  }
}

export default Response;

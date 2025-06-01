export class ApiSuccess {
  success: boolean;
  message: string;
  data?: any;
  statusCode: number;

  constructor(message: string, data?: any, statusCode: number = 200) {
    this.success = true;
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
  }

  send(res: any): void {
    res.status(this.statusCode).json({
      success: this.success,
      message: this.message,
      data: this.data
    });
  }
} 
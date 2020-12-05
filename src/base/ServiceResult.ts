export class ServiceResult<T> {
  private success: boolean;
  private message: string;
  private result: T;

  constructor(success: boolean, message?: string, result?: T) {
    this.success = success;
    this.message = message;
    this.result = result;
  }

  public isSuccess(): boolean {
    return this.success;
  }

  public setSuccess(success: boolean): void {
    this.success = success;
  }

  public getMessage() {
    return this.message;
  }

  public setMessage(message: string): void {
    this.message = message;
  }

  public getResult(): T {
    return this.result;
  }

  public setResult(result: T): void {
    this.result = result;
  }

  public static suc(): ServiceResult<never> {
    return new ServiceResult(true);
  }

  public static of<U>(result: U): ServiceResult<U> {
    return new ServiceResult<U>(true, null, result);
  }

  public static message(message: string): ServiceResult<never> {
    return new ServiceResult<never>(false, message);
  }
}

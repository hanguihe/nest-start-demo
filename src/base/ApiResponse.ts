enum StatusCode {
  SUCCESS,
  FAILED,
  ERROR,
}

export class ApiResponse {
  private code: StatusCode;
  private msg: string;
  private data: any;

  constructor(code: StatusCode) {
    this.code = code;
  }

  public static warn(msg: string) {
    const res = new ApiResponse(StatusCode.FAILED);
    res.msg = msg;

    return res;
  }

  public static success(data?: any) {
    const res = new ApiResponse(StatusCode.SUCCESS);

    if (data) {
      res.data = data;
    }
    return res;
  }
}

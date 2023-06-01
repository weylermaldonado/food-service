import {
  BadRequestException,
  InternalServerErrorException,
  MethodNotAllowedException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from "@/shared/errors";

export class BaseResponse {
  constructor(
    private success: boolean,
    private statusCode: number,
    private data: any,
    private pagination?: object,
    private requestId?: string
  ) {}

  static fromException(err: any) {
    return new BaseResponse(false, err.statusCode, { message: err.message });
  }
  static ok(data: any): BaseResponse {
    return new BaseResponse(true, 200, data);
  }
  static noContent(data?: any): BaseResponse {
    return new BaseResponse(true, 204, data);
  }

  static created(data: any): BaseResponse {
    return new BaseResponse(true, 201, data);
  }

  static unprocessableEntity(
    data: any,
    requestId?: string
  ): UnprocessableEntityException {
    return new UnprocessableEntityException("Unprocessable Entity", data);
  }

  static badRequest(data: any, requestId?: string): BadRequestException {
    return new BadRequestException("BadRequest", data);
  }

  static unauthorized(data: string, requestId?: string): UnauthorizedException {
    return new UnauthorizedException(data);
  }

  static methodNotAllowed(
    data: string,
    requestId?: string
  ): MethodNotAllowedException {
    return new MethodNotAllowedException(data);
  }
  static recordNotFound(data: string, requestId?: string): NotFoundException {
    return new NotFoundException(data);
  }

  static internalServerError(
    data?: string,
    requestId?: string
  ): InternalServerErrorException {
    return new InternalServerErrorException(data);
  }

  getSuccess(): boolean {
    return this.success;
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  getData(): any {
    return this.data;
  }

  toPrimitive() {
    return {
      success: this.success,
      statusCode: this.statusCode,
      data: this.data,
      requestId: this.requestId,
    };
  }

  setRequestId(id: string): void {
    this.requestId = id;
  }

  setPagination(totalRecords: number, pageNum?: string, pageSize?: string) {
    const page = Number(pageNum) || 1;
    const size = Number(pageSize) || 5;
    this.pagination = {
      page_number: page,
      page_size: size,
      page_total: Math.ceil(totalRecords / size),
      total_records: totalRecords,
    };
  }
}

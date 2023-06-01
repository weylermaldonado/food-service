import { ProductDTO } from "@/dto/product.dto";
import {
  Controller,
  IProductService,
  Service,
} from "@/infrastructure/interfaces";
import { BaseResponse } from "@/infrastructure/response/base.response";
import { TYPES } from "@/infrastructure/types";
import {
  CreateProductRequest,
  FilterProductRequest,
  UpdateProductRequest,
} from "@/infrastructure/validators/product.validator";
import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { provide } from "inversify-binding-decorators";

@provide(TYPES.Controller)
export class ProductController implements Controller {
  constructor(
    @inject(TYPES.ProductService)
    private readonly productService: IProductService
  ) {}
  async get(req: Request, res: Response, next: NextFunction): Promise<any> {
    return res.send({ message: "Hello" });
  }
  async getAll(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      // Validate request
      const { query } = req;
      const isValidRequest = FilterProductRequest.validate(query);
      if (!isValidRequest.success) {
        return next(BaseResponse.unprocessableEntity(isValidRequest.details));
      }

      // Mapping filters
      const filter: any = query.filter ?? "";
      const [prop, value] = filter.split(":");
      const sort: any = query.sortBy ?? null;
      const countFilter = prop && value ? { [prop]: value } : {};

      // Calling the service
      const menu = await this.productService.getAll(
        prop,
        value,
        Number(query.pageSize),
        Number(query.pageNum),
        sort
      );

      const totalProducts = await this.productService.countWithFilter(
        countFilter
      );

      // Making the response
      const products = menu.map((product: any) => ProductDTO.from(product));
      const response = BaseResponse.ok(products);
      response.setPagination(
        totalProducts,
        query.pageNum?.toString(),
        query.pageSize?.toString()
      );

      return res.send(response);
    } catch (error: any) {
      next(BaseResponse.internalServerError(error.message));
    }
  }
  async update(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      // Validate request
      const { body, params } = req;
      const isValidRequest = UpdateProductRequest.validate(body);
      if (!isValidRequest.success) {
        return next(BaseResponse.unprocessableEntity(isValidRequest.details));
      }
      if (body.additional) {
        return next(
          BaseResponse.unprocessableEntity(
            "Product additional are not allowed to modify"
          )
        );
      }

      // DTO Mapping
      const productDTO = ProductDTO.from(body);
      const product = await this.productService.update(
        params.productId,
        productDTO.pruneFields()
      );

      return res.send(BaseResponse.ok(ProductDTO.from(product)));
    } catch (error: any) {
      next(BaseResponse.internalServerError(error.message));
    }
  }
  async delete(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      // Validate request
      const { productId } = req.params;
      if (!productId) {
        return next(BaseResponse.unprocessableEntity("Missing product ID"));
      }

      await this.productService.delete(productId);

      return res.send(
        BaseResponse.noContent(`Product ${productId} deleted successfully.`)
      );
    } catch (error: any) {
      next(BaseResponse.internalServerError(error.message));
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      // Validate request
      const { body } = req;
      const isValidRequest = CreateProductRequest.validate(body);
      if (!isValidRequest.success) {
        return next(BaseResponse.unprocessableEntity(isValidRequest.details));
      }

      // DTO Mapping
      const productDTO = ProductDTO.from(body);
      productDTO.generateID();
      // Save user
      await this.productService.create(productDTO.toPrimitive());

      return res.send(BaseResponse.created({ message: "Product created" }));
    } catch (error: any) {
      next(BaseResponse.internalServerError(error.message));
    }
  }
}

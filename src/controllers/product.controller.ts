import { AdditionalDTO, ProductDTO } from "@/dto/product.dto";
import {
  Controller,
  CustomLogger,
  IProductService,
} from "@/infrastructure/interfaces";
import { BaseResponse } from "@/infrastructure/response/base.response";
import { TYPES } from "@/infrastructure/types";
import {
  CreateProductAdditionalRequest,
  CreateProductRequest,
  FilterProductRequest,
  UpdateProductAdditionalRequest,
  UpdateProductRequest,
} from "@/infrastructure/validators/product.validator";
import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { provide } from "inversify-binding-decorators";

@provide(TYPES.Controller)
export class ProductController implements Controller {
  constructor(
    @inject(TYPES.ProductService)
    private readonly productService: IProductService,
    @inject(TYPES.Logger) private readonly logger: CustomLogger
  ) {}
  async get(req: Request, res: Response, next: NextFunction): Promise<any> {
    return res.send({ message: "Hello" });
  }
  async getAll(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      // Validate request
      const { query } = req;
      this.logger.trace(
        `[${
          ProductController.name
        } - Get menu] Incoming payload -> ${JSON.stringify(query)}`
      );
      const isValidRequest = FilterProductRequest.validate(query);
      if (!isValidRequest.success) {
        return next(BaseResponse.unprocessableEntity(isValidRequest.details));
      }

      // Mapping filters
      const filter: any = query.filter ?? "";
      const [prop, value] = filter.split(":");
      const sort: any = query.sortBy ?? null;
      const countFilter = prop && value ? { [prop]: value } : {};
      this.logger.trace(`Filters applied -> ${JSON.stringify(countFilter)}`);
      this.logger.trace(`Sort applied -> ${sort}`);
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
      this.logger.error(
        `[${ProductController.name}] Error -> ${JSON.stringify(error)}`
      );
      next(BaseResponse.internalServerError(error.message));
    }
  }
  async update(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      // Validate request
      const { body, params } = req;
      this.logger.trace(
        `[${
          ProductController.name
        } - Update product] Incoming payload -> ${JSON.stringify(body)}`
      );
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
      this.logger.error(
        `[${ProductController.name}] Error -> ${JSON.stringify(error)}`
      );
      next(BaseResponse.internalServerError(error.message));
    }
  }
  async delete(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      // Validate request
      const { productId } = req.params;
      this.logger.trace(
        `[${ProductController.name} - Delete product] Incoming payload -> ${productId}`
      );
      if (!productId) {
        return next(BaseResponse.unprocessableEntity("Missing product ID"));
      }

      await this.productService.delete(productId);

      return res.send(
        BaseResponse.noContent(`Product ${productId} deleted successfully.`)
      );
    } catch (error: any) {
      this.logger.error(
        `[${ProductController.name}] Error -> ${JSON.stringify(error)}`
      );
      next(BaseResponse.internalServerError(error.message));
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      // Validate request
      const { body } = req;
      this.logger.trace(
        `[${
          ProductController.name
        } - Create Product] Incoming payload -> ${JSON.stringify(body)}`
      );
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
      this.logger.error(
        `[${ProductController.name}] Error -> ${JSON.stringify(error)}`
      );
      next(BaseResponse.internalServerError(error.message));
    }
  }

  // Product additional

  async addProductAdditional(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // Validate request
      const { body, params } = req;
      this.logger.trace(
        `[${
          ProductController.name
        } - Add additional product] Incoming payload -> ${JSON.stringify(body)}`
      );
      const isValidRequest = CreateProductAdditionalRequest.validate(body);
      if (!isValidRequest.success) {
        return next(BaseResponse.unprocessableEntity(isValidRequest.details));
      }

      // DTO Mapping
      const additionalDTO = AdditionalDTO.from(body);
      additionalDTO.generateID();

      // Save user
      await this.productService.addProductAdditional(
        params.productId,
        additionalDTO.pruneFields()
      );

      return res.send(
        BaseResponse.created({ message: "Product additional created" })
      );
    } catch (error: any) {
      this.logger.error(
        `[${ProductController.name}] Error -> ${JSON.stringify(error)}`
      );
      next(BaseResponse.internalServerError(error.message));
    }
  }

  async updateProductAdditional(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // Validate request
      const { body, params } = req;
      this.logger.trace(
        `[${
          ProductController.name
        } - Update additional product] Incoming payload -> ${JSON.stringify(
          body
        )}`
      );
      const isValidRequest = UpdateProductAdditionalRequest.validate(body);
      if (!isValidRequest.success) {
        return next(BaseResponse.unprocessableEntity(isValidRequest.details));
      }

      // Save additional
      let result = await this.productService.updateProductAdditional(
        params.productId,
        params.additionalId,
        body
      );

      if (!result) {
        return next(
          BaseResponse.recordNotFound(
            `Additional ${params.additionalId} not found`
          )
        );
      }
      result = result.additional.filter(
        (additional: any) => additional.uuid === params.additionalId
      );

      const additional = AdditionalDTO.from(result[0]);

      return res.send(BaseResponse.ok(additional.toPrimitive()));
    } catch (error: any) {
      this.logger.error(
        `[${ProductController.name}] Error -> ${JSON.stringify(error)}`
      );
      next(BaseResponse.internalServerError(error.message));
    }
  }

  async deleteProductAdditional(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // Validate request
      const { params } = req;
      this.logger.trace(
        `[${
          ProductController.name
        } - Delete additional product] Incoming payload -> ${JSON.stringify(
          params
        )}`
      );
      if (!params.productId || !params.additionalId) {
        return next(BaseResponse.unprocessableEntity("Missing IDs to delete"));
      }

      // Save user
      await this.productService.deleteProductAdditional(
        params.productId,
        params.additionalId
      );

      return res.send(
        BaseResponse.noContent({ message: "Product additional deleted" })
      );
    } catch (error: any) {
      this.logger.error(
        `[${ProductController.name}] Error -> ${JSON.stringify(error)}`
      );
      next(BaseResponse.internalServerError(error.message));
    }
  }
}

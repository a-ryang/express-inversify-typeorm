import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";

const getErrors = (errors: ValidationError[]) => {
  const errorMessageArray: string[] = [];
  errors.forEach((errors) => {
    errorMessageArray.push(...(Object as any).values(errors.constraints));
  });
  return errorMessageArray;
};

export function validateBody(dtoClass: any) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const dto = plainToInstance(dtoClass, req.body);
    try {
      await validateOrReject(dto as any);
      req.body = dto;
      return next();
    } catch (error: any) {
      const errors = getErrors(error);
      return res.status(400).json({ message: errors });
    }
  };
}

export function validateParam(dtoClass: any) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const dto = plainToInstance(dtoClass, req.params);
    try {
      await validateOrReject(dto as any);
      req.params = dto as any;
      return next();
    } catch (error: any) {
      const errors = getErrors(error);
      return res.status(400).json({ message: errors });
    }
  };
}

export function validateQuery(dtoClass: any) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const dto = plainToInstance(dtoClass, req.query);
    try {
      await validateOrReject(dto as any);
      req.query = dto as any;
      return next();
    } catch (error: any) {
      const errors = getErrors(error);
      return res.status(400).json({ message: errors });
    }
  };
}

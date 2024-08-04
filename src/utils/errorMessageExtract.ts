import { BadRequestException, ValidationError } from '@nestjs/common';

export const errorMessageExtract = (errors: ValidationError[]) => {
  const result = errors.map(
    (error) => error.constraints[Object.keys(error.constraints)[0]],
  );
  return new BadRequestException(result[0]);
};

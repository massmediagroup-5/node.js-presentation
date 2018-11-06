import { HttpError } from 'routing-controllers';
import { ValidationError as ValidationErrorsClass } from 'class-validator';

export class ValidationError extends HttpError {
    public errors:  ValidationErrorsClass[];

    constructor(errors: ValidationErrorsClass[]) {
        super(400, 'Validation error');
        this.errors = errors;
    }
}

import { HttpError } from 'routing-controllers';

export class ResourceNotFoundError extends HttpError {
    constructor() {
        super(404, 'Resource not found!');
    }
}

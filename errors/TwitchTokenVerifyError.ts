import { HttpError } from 'routing-controllers';

export class TwitchTokenVerifyError extends HttpError {
    constructor() {
        super(400, 'Failed to verify twitch token!');
    }
}

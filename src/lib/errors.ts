/**
 * Custom Error Classes for structured error handling
 */

export class ApiError extends Error {
    constructor(
        public message: string,
        public statusCode: number = 400,
        public details?: Record<string, any>,
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

export class ValidationError extends ApiError {
    constructor(message: string, details?: Record<string, any>) {
        super(message, 400, details);
        this.name = 'ValidationError';
    }
}

export class AuthenticationError extends ApiError {
    constructor(message: string = 'Authentication failed') {
        super(message, 401);
        this.name = 'AuthenticationError';
    }
}

export class AuthorizationError extends ApiError {
    constructor(message: string = 'Not authorized') {
        super(message, 403);
        this.name = 'AuthorizationError';
    }
}

export class NotFoundError extends ApiError {
    constructor(message: string = 'Resource not found') {
        super(message, 404);
        this.name = 'NotFoundError';
    }
}

export class ConflictError extends ApiError {
    constructor(message: string = 'Resource conflict') {
        super(message, 409);
        this.name = 'ConflictError';
    }
}

export class InternalServerError extends ApiError {
    constructor(
        message: string = 'Internal server error',
        details?: Record<string, any>,
    ) {
        super(message, 500, details);
        this.name = 'InternalServerError';
    }
}

/**
 * Safe error logger
 * Logs errors safely without exposing sensitive info
 */
export function logError(error: unknown, context: string): void {
    const timestamp = new Date().toISOString();

    if (error instanceof Error) {
        console.error(`[${timestamp}] ${context}:`, {
            name: error.name,
            message: error.message,
            stack:
                process.env.NODE_ENV === 'development'
                    ? error.stack
                    : undefined,
        });
    } else {
        console.error(`[${timestamp}] ${context}:`, error);
    }
}

/**
 * Get safe error message for client response
 * Prevents exposing internal implementation details
 */
export function getSafeErrorMessage(error: unknown): string {
    if (error instanceof ApiError) {
        return error.message;
    }

    if (error instanceof Error) {
        // In production, return generic message for unexpected errors
        if (process.env.NODE_ENV === 'production') {
            return 'An unexpected error occurred';
        }
        return error.message;
    }

    return 'An unexpected error occurred';
}

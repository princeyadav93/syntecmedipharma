import { NextResponse } from 'next/server';

/**
 * Standardized API Response Type
 * Ensures consistent response structure across all API routes
 */
export interface ApiResponse<T = null> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

/**
 * Success Response Builder
 * @param data - Response data
 * @param message - Optional success message
 * @param statusCode - HTTP status code (default 200)
 */
export function successResponse<T>(
    data: T,
    message: string = 'Request successful',
    statusCode: number = 200,
): NextResponse<ApiResponse<T>> {
    return NextResponse.json(
        {
            success: true,
            data,
            message,
        },
        { status: statusCode },
    );
}

/**
 * Error Response Builder
 * @param error - Error message
 * @param statusCode - HTTP status code (default 400)
 */
export function errorResponse(
    error: string,
    statusCode: number = 400,
): NextResponse<ApiResponse> {
    return NextResponse.json(
        {
            success: false,
            error,
        },
        { status: statusCode },
    );
}

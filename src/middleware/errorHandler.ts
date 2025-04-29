/**
 * Error Handling Middleware
 * 
 * This middleware provides centralized error handling for the application.
 */

import { Request, Response, NextFunction } from 'express';

// Interface for custom API errors
export interface ApiError extends Error {
  statusCode?: number;
  details?: any;
}

/**
 * Error handler middleware
 * 
 * Catches errors thrown in route handlers and returns appropriate responses
 */
export function errorHandler(
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('Error occurred:', err);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    error: true,
    message,
    details: err.details || undefined,
    path: req.path
  });
}

/**
 * Not found middleware
 * 
 * Handles requests to non-existent routes
 */
export function notFoundHandler(
  req: Request,
  res: Response
) {
  res.status(404).json({
    error: true,
    message: 'Route not found',
    path: req.path
  });
}

/**
 * Request logger middleware
 * 
 * Logs information about incoming requests
 */
export function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`
    );
  });
  
  next();
}

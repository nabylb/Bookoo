import { Request, Response, NextFunction } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

export class AppError extends Error {
	constructor(
		public statusCode: number,
		message: string
	) {
		super(message);
		this.name = "AppError";
	}
}

export function errorHandler(
	err: Error,
	_req: Request,
	res: Response,
	_next: NextFunction
) {
	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			message: err.message,
		});
	}

	if (err instanceof ZodError) {
		return res.status(400).json({
			message: "Validation error",
			errors: err.format(),
		});
	}

	if (err instanceof PrismaClientKnownRequestError) {
		if (err.code === "P2002") {
			return res.status(409).json({
				message: "A resource with this unique constraint already exists",
			});
		}
	}

	console.error(err);

	return res.status(500).json({
		message: "Internal server error",
	});
}

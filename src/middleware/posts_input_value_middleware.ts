import { Request, Response, NextFunction } from "express"
import {body, validationResult} from 'express-validator'


export const postTitleValidation = body('title').isString().isLength({min: 1, max: 30}).withMessage('Title should be length from 1 to 30 symbols')

export const shortDescriptionTitleValidation = body('shortDescription').isString().isLength({min: 1, max: 100}).withMessage('Short Description should be length from 1 to 100 symbols')

export const content = body('content').isLength({min: 1, max: 1000}).isString().withMessage('content should be length from 1 to 100 symbols')

export const blogId = body('blogId').isString()

export const inputValueMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req)
	if(!errors.isEmpty()) {
		res.status(400).json({errors: errors.array()})
	} else {
		next()
	}
}
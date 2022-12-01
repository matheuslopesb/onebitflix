import { Request, Response } from "express";
import { courseService } from "../services/courseService";

export const coursesController = {
    // GET /courses/featured
    async featured(req: Request, res: Response) {
        try {
            const featuredCourses = await courseService.getRandomFeaturedCourses();
            return res.json(featuredCourses); 
        } catch (error) {
            if(error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    }, 

    // GET /courses/newest
    async newest(req: Request, res: Response) {
        try {
            const newestCourses = await courseService.getTenTopNewest();
            return res.json(newestCourses);
        } catch (error) {
            if(error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    }, 

    // GET /courses/search
    async search(req: Request, res: Response) {
        const { name } = req.query;
        try {
            if (typeof name !== 'string') throw new Error('name param must to be of type string')
            const courses = await courseService.findByName(name);
            return res.json(courses);
        } catch (error) {
            if(error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    }, 

    // GET /courses/:id
    async show(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const course = await courseService.findByIdWithEpisodes(id); 
            res.json(course); 
        } catch (error) {
            if(error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    }
} 

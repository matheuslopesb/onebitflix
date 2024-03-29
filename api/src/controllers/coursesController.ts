import { AuthenticatedRequest } from './../middlewares/auth';
import { Request, Response } from "express";
import { getPaginationParams } from "../helpers/getPaginationParams";
import { courseService } from "../services/courseService";
import { likeService } from '../services/likeService';
import { favoriteService } from '../services/favoriteService';

export const coursesController = {
    // GET /courses/featured
    featured: async (req: Request, res: Response) => {
        try {
            const featuredCourses = await courseService.getRandomFeaturedCourses();
            return res.status(200).json(featuredCourses); 
        } catch (error) {
            if(error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    }, 

    // GET /courses/newest
    newest: async (req: Request, res: Response) => {
        try {
            const newestCourses = await courseService.getTenTopNewest();
            return res.status(200).json(newestCourses);
        } catch (error) {
            if(error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    }, 

    // GET /courses/popular
    popular: async (req: Request, res: Response) => {
        try {
            const topTen = await courseService.getTopTenByLikes();
            return res.status(200).json(topTen);
        } catch (error) {
            if(error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    }, 

    // GET /courses/search
    search: async (req: Request, res: Response) => {
        const { name } = req.query;
        const [page, perPage] = getPaginationParams(req.query); 
        try {
            if (typeof name !== 'string') throw new Error('name param must to be of type string')
            const courses = await courseService.findByName(name, page, perPage);
            return res.status(200).json(courses);
        } catch (error) {
            if(error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    }, 

    // GET /courses/:id
    show: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!.id;
        const { id: courseId } = req.params;

        try {
            const course = await courseService.findByIdWithEpisodes(courseId); 

            if (!course) {
                return res.status(404).json({ message: 'Curso não encontrado' }); 
            }

            const liked = await likeService.isLiked(userId, Number(courseId))
            const favorited = await favoriteService.isFavorited(userId, Number(courseId))
            return res.status(200).json({ ...course.get(), favorited, liked })
        } catch (error) {
            if(error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    }
} 

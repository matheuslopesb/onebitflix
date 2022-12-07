import { Op } from "sequelize";
import { Course } from "../models";

export const courseService = {
    async findByIdWithEpisodes(id: string) {
        const courseWithEpisodes = await Course.findByPk(id, {
            attributes: [
                'id', 
                'name', 
                'synopsis', 
                ['thumbnail_url', 'thumbnailUrl']
            ], 
            include: {
                association: 'episodes',  
                attributes: [
                    'id', 
                    'name', 
                    'synopsis', 
                    'order', 
                    ['video_url', 'videoUrl'], 
                    ['seconds_long', 'secondsLong']
                ], 
                order: [['order', 'ASC']], 
                separate: true
            }
        }); 
        
        return courseWithEpisodes;
    }, 

    async getRandomFeaturedCourses() {
        const featuredCourses = await Course.findAll({
            attributes: [
                'id', 
                'name', 
                'synopsis', 
                ['thumbnail_url', 'thumbnailUrl']
            ], 
            where: {
                featured: true
            }
        })

        const randomFeaturedCourses = featuredCourses.sort(() => 0.5 - Math.random())

        return randomFeaturedCourses.slice(0, 3)
    }, 

    async getTenTopNewest() {
        const courses = await Course.findAll({
            limit: 10, 
            order: [['created_at', 'DESC']], 

        })

        return courses;
    }, 

    async findByName(name: string, page: number, perPage: number) {
        const offset = (page - 1) * perPage
        const { count, rows } = await Course.findAndCountAll({
            attributes: [
                'id', 
                'name', 
                'synopsis', 
                ['thumbnail_url', 'thumbnailUrl']
            ], 
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }, 
            limit: perPage,
            offset
        })

        return {
            courses: rows, 
            page, 
            perPage, 
            total: count
        };
    }
}
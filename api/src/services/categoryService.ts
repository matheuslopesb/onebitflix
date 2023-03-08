import { Category } from "../models";

export const categoryService= {
    async findAllPaginated(page: number, perPage: number) {
        const offset: number = (page - 1) * perPage;

        const { rows, count } = await Category.findAndCountAll({
            attributes: ['id', 'name', 'position'], 
            order: [['position', 'ASC']], 
            limit: perPage, 
            offset
        })

        return {
            categories: rows, 
            page, 
            perPage, 
            total: count
        }
    }, 
    async findByIdWithCourses(id: string) {
        const categoryWithCourses = await Category.findByPk(id, {
            attributes: ['id', 'name', 'position'], 
            include: {
                association: 'courses',  
                attributes: [
                    'id', 
                    'name', 
                    'synopsis', 
                    ['thumbnail_url', 'thumbnailUrl']
                ]
            }
        }); 
        
        return categoryWithCourses;
    }
}
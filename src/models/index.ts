import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";
import { User } from "./User";

// Relation Category - Course
Category.hasMany(Course, { as: "courses" })
Course.belongsTo(Category)

// Relation Course - Episode
Course.hasMany(Episode)
Episode.belongsTo(Course)

export {
    Category, 
    Course, 
    Episode, 
    User
}
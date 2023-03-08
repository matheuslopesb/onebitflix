import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database";

export interface Course {
    id: number, 
    name: string, 
    synopsis: string, 
    thumbnailUrl: string, 
    featured: boolean, 
    categoryId: number
}

export interface CourseCreationAttributes extends Optional<Course, 'id' | 'thumbnailUrl' | 'featured'> {  }

export interface CourseInstance extends Model<Course, CourseCreationAttributes>, Course { }

export const Course = sequelize.define<CourseInstance, Course>('Course', {
    id: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
        autoIncrement: true, 
        primaryKey: true
    }, 
    name: {
        type: DataTypes.STRING, 
        allowNull: false
    }, 
    synopsis: {
        type: DataTypes.TEXT, 
        allowNull: false
    }, 
    thumbnailUrl: {
        type: DataTypes.STRING
    }, 
    featured: {
        type: DataTypes.BOOLEAN, 
        defaultValue: false
    }, 
    categoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: 'categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    }
})
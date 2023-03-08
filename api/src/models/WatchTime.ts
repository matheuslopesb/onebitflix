import { DataTypes, Model } from "sequelize"
import { sequelize } from "../database"

export interface WatchTimeAttributes {
    seconds: number
    userId: number
    episodeId: number
}

export interface WatchTimeInstance extends Model<WatchTimeAttributes>, WatchTimeAttributes {  }

export const WatchTime = sequelize.define<WatchTimeInstance, WatchTimeAttributes>('WatchTime', {
    seconds: {
        allowNull: false, 
        type: DataTypes.INTEGER
    }, 
    userId: {
        allowNull: false, 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        references: {
            model: 'users', 
            key: 'id'
        }
    }, 
    episodeId: {
        allowNull: false, 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        references: {
            model: 'episodes', 
            key: 'id'
        }
    }
})
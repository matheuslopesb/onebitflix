import { ResourceWithOptions } from "adminjs";
import { Category, Course, Episode, User } from "../../models";
import { categoryResourceOptions } from "./category";
import { courseResourceFeatures, courseResourceOptions } from "./course";
import { episodeResourceFeatures, episodeResourceOptions } from "./episode";
import { userResourceOptions } from "./user";

export const adminJsResources: ResourceWithOptions[] = [
    {
        resource: Category, 
        options: categoryResourceOptions, 
        features: courseResourceFeatures
    }, 
    {
        resource: Course, 
        options: courseResourceOptions
    }, 
    {
        resource: Episode, 
        options: episodeResourceOptions, 
        features: episodeResourceFeatures
    }, 
    {
        resource: User, 
        options: userResourceOptions
    }
]

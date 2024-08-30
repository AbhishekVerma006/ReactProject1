import { Client,Databases,ID,Query,Storage } from "appwrite";
import {conf} from "../conf/conf.js"

export class configService{

    client = new Client;
    database;
    bucket

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrL)
            .setProject(conf.appwriteProjectId) ;
        
        this.database= new Databases(this.client)
        this.bucket = new Storage(thiis.client)
    }

    async createPost({title,slug, content, featuredImage,status, userId}){
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error)
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updateost :: error", error)
        }
    }

    async deletePost(slug){
        try {
            await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )

            return true
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }


    async getPosts(queries = [Query.equal("status",active)]){
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }


    // async upload service

    async uploadFile(file)
    {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId)
    {
        try {
                await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )

            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId)
    {
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId,
            )
        
    }

}

const ob = new configService();

export default ob;
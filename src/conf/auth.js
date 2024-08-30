import {conf} from '../conf/conf.js'

import { Client,Account,ID } from 'appwrite'

export class Authservice{
    client = new Client;
    account ;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrL)
            .setProject(conf.appwriteProjectId) ;

        this.account = new Account(this.client)
    }

    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name);

            if(userAccount){
                // call another method
            }
            else{
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
            const userLogin = await this.account.createEmailPasswordSession(email,password);
            return userLogin;
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console;log("Appwrite service ::getCurrentUser::error",error);
        }

        return null;
    }

    async logout(){
       try {
        return await this.account.deleteSessions();
       } catch (error) {
        console;log("Appwrite service ::getCurrentUser::error",error);
       }
    }
}




const Authservice = new Authservice();
export default Authservice;
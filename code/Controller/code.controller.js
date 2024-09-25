import {z} from "zod";
import { Code } from "../Model/code.model.js";
import {Response} from "../../util/export.js";


export class CodeController{

    // create question
    static async createQuestion(req,res){
        try {
            const {question,answer,language,image,diffcuilt,score,author,companyname,rule,info} = await req.body;
            const codeQuestioSchema = z.object({
                    question:z.string().min(200).max(400),
                    answer:z.string().min(100).max(200),
                    language:z.string().min(1).max(15),
                    image:z.string().min(40).max(100),
                    diffcuilt:z.string().min(10).max(20),
                    score:z.number(),
                    author:z.string().min(10).max(20),
                    companyname:z.string().min(10).max(20),
                    rule:z.string().min(10).max(20),
                    info:z.string().min(10).max(20),
            });

            const validSchema = codeQuestioSchema.safeParse({
                question,answer,language,image,diffcuilt,score,author,companyname,rule,info
            });

            if(validSchema.success == false){
                res.json(Response("Invalid schema",404))
                return
            }

            const createQues = await Code.create({
                question,answer,language,image,diffcuilt,score,author,companyname,rule,info

            });

            if(!createQues){
                res.json(Response("Server Error not able to create question",404))
                return
            }

            res.json(Response("Question created",200))
            return
        } catch (error) {
            res.json(Response("Error",500))
            return
        }
    }

    // update question
    static async updateQuestion(req,res){
        try {
            const {id,question,answer,language,image,diffcuilt,score,author,companyname,rule,info} = await req.body;
            const codeQuestioSchema = z.object({
                    question:z.string().min(200).max(400),
                    answer:z.string().min(100).max(200),
                    language:z.string().min(1).max(15),
                    image:z.string().min(40).max(100),
                    diffcuilt:z.string().min(10).max(20),
                    score:z.number(),
                    author:z.string().min(10).max(20),
                    companyname:z.string().min(10).max(20),
                    rule:z.string().min(10).max(20),
                    info:z.string().min(10).max(20),
            });

            const validSchema = codeQuestioSchema.safeParse({
                question,answer,language,image,diffcuilt,score,author,companyname,rule,info
            });

            if(validSchema.success == false){
                res.json(Response("Invalid schema",404))
                return
            }
            const updatedInfo = await Code.findOneAndUpdate({_id:id},{question,answer,language,image,diffcuilt,score,author,companyname,rule,info});
            if(!updatedInfo){
                res.json(Response("Not able to update question",404))
                return
            }

            res.json(Response("Question updated",200))
            return

        } catch (error) {
            res.json(Response("Error",500))
            return
        }
    }


    // delete question
    static async deleteQuestion(req,res){
        try {
            const id =  req.params.id;
            const deleteQues =  await Code.deleteOne({
                _id:id
            });
            res.json(Response("Delete the Question",301))
            return
        } catch (error) {
            res.json(Response("Error",500,error))
            return
        }
    }


    // get questions
    static async getQuestions(_req,res){
        try {
            const ques =  await Code.find({});
            if(!ques){
                res.json(Response("No question",404))
            }
            res.json(Response("Get all the question",200,ques))
            return
        } catch (error) {
            res.json(Response("Error",500,error))
            return
        }
    }


    
    //get topic wise questions
    static async getTopicWiseQuestions(req,res){
        try {
            const topic = await req.params.topic;
            const findQues =  await Code.find({
                language:topic
            });

            if(!findQues){
                res.json(Response("Question not found",404))
                return
            }
            res.json(Response("Founded",200,findQues));
            return
        } catch (error) {
            res.json(Response("Error",500,error))
            return
        }
    }

}
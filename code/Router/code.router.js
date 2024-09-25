import { Router } from "express";
import { CodeController } from "../Controller/code.controller.js";


export const codeRouter = Router();



codeRouter.get("/getallquestions",CodeController.getQuestions);
codeRouter.post("/gettopicwise/:topic",CodeController.getTopicWiseQuestions);
codeRouter.post("/createquestion",CodeController.createQuestion);
codeRouter.put("/updatequestion",CodeController.updateQuestion);
codeRouter.delete("/deletequestion/:id",CodeController.deleteQuestion);
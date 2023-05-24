const model = require("../models/Temperature");

class TemperatureController {
     async getTemperature(req, res) {
        try {
            const body = req.body;
            if (!body) {
                throw new Error("Body does not exist")
            }
            const date = body.date;
            if (!date) {
                throw new Error("Date does not exist");
            }
            const record = await model.find({recordDate: date}).exec();
            if (!record) {
                throw new Error("Record does not exist");
            }
            res.json(record);
        } catch (e) {
            res.status(400).send(e);
        }
    }
    async getTemperatureByDay(req, res){
         try {
             const body = req.body;
             if(!body){
                 throw new Error("Invalid body")
             }
             const date = new Date(body.date);
             const records = await model.find();
             let recordPerDay = [];
             for(let r of records){
                 let temp = new Date(r.recordDate);
                 if(temp.getDay() === date.getDay() && temp.getMonth()===date.getMonth() && temp.getFullYear() === date.getFullYear()){
                     recordPerDay.push(r);
                 }
             }
             if(!recordPerDay.length){
                 throw new Error("NO record");
             }
             res.json(recordPerDay);
         }catch (e) {
             res.status(400).send(e);
         }

    }
    async getDateList(req, res){
         let records = await model.find();
         let out = [];
         for(let r of records){
             out.push(r.recordDate);
         }
         res.send(out);
    }
    async postNewRecord(req,res){
         try{
             const body = req.body;
             if(!body){
                 throw new Error("inavild Body");
             }
             if(!body.idStation && !body.temperature && !body.temperature[0]?.time && !body.temperature[0]?.value){
                throw new Error("Inaviuld Body")
             }
             const result = new model(body);
             res.json(body);
         }catch (e) {
            res.status(400).send(e);
         }

    }

}
module.exports = TemperatureController;
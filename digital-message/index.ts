import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { postWhatsApp } from "./WhatsApp";
import { postLine } from "./Line";
import { MessageBirdResponse } from "./MessageBirdResponse";
import { extractData } from "./DataExtractor";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    
    // const data = extractData(req.body);
    // context.log(req.body);
    // context.res = {body: req.body};
    // context.res = {body: req.body};

    let mbResponse: MessageBirdResponse;
    if (req.body.channel == "WhatsApp"){
    // if (req.body.channel == "WhatsApp"){
      mbResponse = await postWhatsApp(req.body.message, req.body.key);
    }
    else if (req.body.channel == "LINE"){
      mbResponse = await postLine(req.body.message, req.body.key);
    }
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: (JSON.stringify({
          "code": 200,
          "system_message": mbResponse["status"]
        }))
    };
};


export default httpTrigger;

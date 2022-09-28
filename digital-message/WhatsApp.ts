import fetch from 'node-fetch';
import { MessageBirdResponse } from "./MessageBirdResponse";

async function postWhatsApp(message, key): Promise<MessageBirdResponse> {
    try {
      const response = await fetch('https://conversations.messagebird.com/v1/send',
      {
        method: 'POST',
        body: JSON.stringify({
          to: '+6598162868',
          type: 'hsm',
          from: '0d80abd0-6ab4-4b51-b91c-a034d7c62669',
          content:{
            hsm: {
              namespace: "320b2259_c43d_4d2b_966e_628d091cd90b",
              templateName: "thanking",
              language: {
              policy: "deterministic",
              code: "en"
              },
            params: [
              {default: message}
            ]
            }
          }
        }),
        headers:{
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `AccessKey ${key}`,
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
  
      const result = await response.json();
      return result as MessageBirdResponse;

    } catch (err) {
      console.log(err);
    }
  }

  export { postWhatsApp };
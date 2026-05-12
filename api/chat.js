export default async function handler(req,res){

    try{

        const MODELS = [

        "openai/gpt-4o-mini",

        "deepseek/deepseek-chat",

        "meta-llama/llama-3.1-8b-instruct"

        ];

        const randomModel =
        MODELS[Math.floor(
        Math.random()*MODELS.length
        )];

        const response =
        await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
            method:"POST",

            headers:{
                "Authorization":
                "Bearer " +
                process.env.OPENROUTER_API_KEY,

                "Content-Type":
                "application/json"
            },

            body:JSON.stringify({

                model: randomModel,

                messages:req.body.messages

            })

        });

        const data =
        await response.json();

        res.status(200).json({

            result:data

        });

    }catch(err){

        res.status(500).json({
            error:err.message
        });

    }

}

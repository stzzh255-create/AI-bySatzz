export default async function handler(req,res){

    try{

        const MODELS = [

        "openai/gpt-4o-mini",

        "openai/gpt-3.5-turbo",

        "mistralai/mistral-7b-instruct",

        "meta-llama/llama-3.1-8b-instruct",

        "meta-llama/llama-3.1-70b-instruct",

        "google/gemini-flash-1.5",

        "anthropic/claude-3-haiku",

        "qwen/qwen-2.5-72b-instruct",

        "nousresearch/hermes-3-llama-3.1-8b",

        "deepseek/deepseek-chat",

        "deepseek/deepseek-r1",
    
        "Grok 4.1-mini",

        "gemini3.1-mini"
            
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

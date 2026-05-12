export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {

        const models = [
            "openai/gpt-4o-mini",
            "meta-llama/llama-3.1-8b-instruct",
            "anthropic/claude-3-haiku"
        ];

        const randomModel =
            models[Math.floor(Math.random() * models.length)];

        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",

                headers: {
                    "Authorization":
                        "Bearer " +
                        process.env.OPENROUTER_API_KEY,

                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    model: randomModel,
                    messages: req.body.messages
                })

            }
        );

        const data = await response.json();

        res.status(200).json(data);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

}

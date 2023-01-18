import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST') {
      res.status(404).json({
        error: `No such route found for ${req.method} request`,
        status: 404,
      });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    const prompt: string | undefined = body?.prompt;

    if (!prompt) {
      res.status(400).json({
        error: `prompt: value must be a string`,
        status: 400,
      });
    }

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${prompt}`,
      temperature: 0.6, // Higher values means the model will take more risks
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).json({
      response_data: {
        bot: response.data.choices[0]?.text,
      },
      success: true,
      status: 200,
    });
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
      status: 500,
    });
  }
};

export default handler;

import OpenAI from "openai";
import { ENV_VARS } from "./envVars.js";

export const openai = new OpenAI({
    apiKey: ENV_VARS.OPENAI_API_KEY,
});

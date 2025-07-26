import { Groq } from "groq-sdk";
import { ENV_VARS } from "./envVars.js";

export const groq = new Groq({
    apikey: ENV_VARS.GROQ_API_KEY,
});

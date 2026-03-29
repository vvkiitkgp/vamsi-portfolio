import { OpenRouter } from '@openrouter/sdk';

// CRA-friendly: only REACT_APP_ keys are exposed to the client bundle.
const apiKey = process.env.REACT_APP_OPENAI_KEY;

export const openai = apiKey
  ? new OpenRouter({
      apiKey,
    })
  : null;

if (!apiKey) {
  // eslint-disable-next-line no-console
  console.warn(
    'OpenAI key missing. Set REACT_APP_OPENAI_KEY in your .env (then restart dev server).'
  );
}

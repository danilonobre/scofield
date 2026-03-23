<!-- mentor:file
The AI integration architecture. Defines which models are used, how AI calls are made, and the rules governing AI usage. Security is the primary concern here — API keys must never reach the client. Only include this file if the product has AI features.
priority: high
-->

# AI Architecture

<!-- Only include this file if the product has AI features -->

## Model

<!-- mentor
Which AI model(s) the product uses and for what purpose. If multiple models are used (e.g. one for generation, one for classification), each should be listed with its role. Model choice affects cost, latency, and capability — document the reasoning.

quality signals:
- Model name is exact (not "Claude" but "claude-sonnet-4-6" or similar)
- The purpose of each model is stated
- If the model version matters, it is pinned
- Reasoning for model choice is noted (cost, capability, latency)
-->

## Integration

<!-- mentor
How AI calls are made in the product. The architecture of the integration determines security posture. API calls from the browser are a security violation — keys must be server-side. Document the exact integration pattern: edge function, serverless function, proxy, etc.

quality signals:
- The integration pathway is described end-to-end (browser → edge function → API)
- It is explicit that API keys never touch the client
- Streaming behavior is described if applicable
- Response handling is described (how is the AI response processed before returning to the client?)
-->

## Rules

<!-- mentor
AI-specific constraints that govern all AI usage in the product. Security rules are non-negotiable. Cost management rules prevent runaway API spend. Quality rules ensure the AI output meets the product's standards.

quality signals:
- API key security is stated as an absolute rule
- Any cost controls are documented (max tokens, model selection criteria)
- Retry and fallback behavior is described
- Any content moderation or output filtering requirements are stated
- Project-specific AI rules are added beyond the default security requirement

extensions:
- docguard: architecture validator checks that layer boundaries defined
  here are respected in actual imports and module structure.
-->

- API key must never be exposed to the client.

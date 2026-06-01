// Client-side registry for the Text & AI tools. These post to the ai-process
// edge function (task + text + options) which calls the AI provider server-side.

export type AiControl = "none" | "language" | "style" | "format";

export type AiTextDef = {
  task: string;
  control: AiControl;
  inputLabel: string;
  inputPlaceholder: string;
  outputLabel: string;
  cta: string;
};

export const REPHRASE_STYLES = [
  "Formal", "Casual", "Academic", "Creative", "Simple (for a child)", "Professional", "Legal", "Marketing",
] as const;

export const SUMMARY_FORMATS = [
  { id: "sentence", label: "One sentence" },
  { id: "bullets", label: "Key points" },
  { id: "detailed", label: "Detailed" },
] as const;

export const AI_TEXT_TOOLS: Record<string, AiTextDef> = {
  "translate-text": {
    task: "translate", control: "language",
    inputLabel: "Text to translate", inputPlaceholder: "Type or paste the text you want to translate…",
    outputLabel: "Translation", cta: "Translate",
  },
  "rephrase-text": {
    task: "rephrase", control: "style",
    inputLabel: "Text to rewrite", inputPlaceholder: "Paste the text you want to rephrase…",
    outputLabel: "Rewritten text", cta: "Rephrase",
  },
  "summarize-text": {
    task: "summarize", control: "format",
    inputLabel: "Text to summarise", inputPlaceholder: "Paste an article, transcript or document…",
    outputLabel: "Summary", cta: "Summarise",
  },
  "fix-grammar": {
    task: "grammar", control: "none",
    inputLabel: "Your text", inputPlaceholder: "Paste text to fix spelling and grammar…",
    outputLabel: "Corrected text", cta: "Fix grammar",
  },
  "simplify-text": {
    task: "simplify", control: "none",
    inputLabel: "Complex text", inputPlaceholder: "Paste text you want made simpler…",
    outputLabel: "Simplified text", cta: "Simplify",
  },
  "professional-email": {
    task: "email-pro", control: "none",
    inputLabel: "Your rough draft / notes", inputPlaceholder: "e.g. tell client the invoice is late, need payment this week, be polite",
    outputLabel: "Professional email", cta: "Write email",
  },
  "product-description": {
    task: "product-description", control: "none",
    inputLabel: "Product details", inputPlaceholder: "e.g. stainless steel water bottle, 750ml, keeps drinks cold 24h, leakproof",
    outputLabel: "Product description", cta: "Generate description",
  },
  "hashtag-generator": {
    task: "hashtags", control: "none",
    inputLabel: "Your topic or caption", inputPlaceholder: "e.g. morning coffee routine in a cozy Paris cafe",
    outputLabel: "Hashtags", cta: "Generate hashtags",
  },
  "sentiment-analysis": {
    task: "sentiment", control: "none",
    inputLabel: "Text to analyse", inputPlaceholder: "Paste a review, comment or message…",
    outputLabel: "Sentiment", cta: "Analyse",
  },
  "keyword-extractor": {
    task: "keywords", control: "none",
    inputLabel: "Your text", inputPlaceholder: "Paste an article or document…",
    outputLabel: "Keywords", cta: "Extract keywords",
  },
  "detect-language": {
    task: "detect-language", control: "none",
    inputLabel: "Text", inputPlaceholder: "Paste text in any language…",
    outputLabel: "Detected language", cta: "Detect language",
  },
  "synonyms-finder": {
    task: "synonyms", control: "none",
    inputLabel: "Word or phrase", inputPlaceholder: "e.g. happy · heureux · feliz · 幸せ",
    outputLabel: "Synonyms", cta: "Find synonyms",
  },
  "conjugation": {
    task: "conjugate", control: "none",
    inputLabel: "Verb", inputPlaceholder: "e.g. to run · courir · correr · essen",
    outputLabel: "Conjugation", cta: "Conjugate",
  },
  "context-examples": {
    task: "context-examples", control: "language",
    inputLabel: "Word or phrase", inputPlaceholder: "e.g. break the ice · faire la grasse matinée · echar de menos",
    outputLabel: "Example sentences in context", cta: "Find examples",
  },
};

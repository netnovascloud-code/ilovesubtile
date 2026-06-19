import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

// Unit/integration tests run in Node. Edge Functions are Deno, so their pure,
// environment-agnostic logic (HMAC signature, SHA-256 key hashing, credit/quota
// math, plan caps) is extracted into shared modules that BOTH the Deno function
// and these Node tests import — so we exercise the real code, not a copy.
export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
  resolve: {
    alias: { "@": fileURLToPath(new URL(".", import.meta.url)) },
  },
});

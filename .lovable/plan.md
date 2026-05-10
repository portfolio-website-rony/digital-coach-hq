## Goal

Vercel-এ deploy করলে যেন `/` সহ সব route কাজ করে — এখন 404 NOT_FOUND আসছে কারণ project Cloudflare Workers-এর জন্য build হচ্ছে, Vercel-এর জন্য না।

## Why this happens

- `wrangler.jsonc` + `vite.config.ts` → Cloudflare Workers target এ build হচ্ছে
- Build output `.output/` folder-এ Worker bundle তৈরি করছে, Vercel যা পড়তে পারে না
- Vercel তখন কোনো `index.html` বা serverless function না পেয়ে 404 দেয়

## Changes

### 1. TanStack Start-কে Vercel target এ build করানো

`vite.config.ts`-এ TanStack Start plugin-এর `target` option `"vercel"` করা হবে। এতে build output Vercel-এর expected structure-এ (`.vercel/output/`) তৈরি হবে — static assets + serverless function (SSR-এর জন্য) সহ।

```ts
// vite.config.ts
export default defineConfig({
  tanstackStart: {
    target: "vercel",
    server: { entry: "server" },
  },
});
```

### 2. SSR error wrapper Vercel-এ-ও কাজ করবে

`src/server.ts` (lazy import + error normalizer) Vercel serverless function-এও same way কাজ করে — Web standard `Request`/`Response` use করে। কোনো change লাগবে না।

### 3. Vercel-এ Environment Variables set করতে হবে

Vercel dashboard → Project Settings → Environment Variables-এ এই গুলো add করতে হবে (Lovable Cloud connection-এর জন্য):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

মান গুলো এই project-এর `.env` ফাইলে আছে — সেগুলো copy করে Vercel-এ paste করতে হবে। (এই step আপনাকে Vercel dashboard-এ manually করতে হবে, code change না।)

### 4. Vercel build settings

Vercel auto-detect করবে Vite, কিন্তু confirm করতে হবে:
- **Framework Preset**: Vite (or Other)
- **Build Command**: `npm run build` (default)
- **Output Directory**: ফাঁকা রাখুন (TanStack Vercel preset নিজে handle করে)
- **Install Command**: `npm install` (default)

## Out of scope

- Cloudflare Workers deployment বাদ যাবে না — `wrangler.jsonc` থাকবে। শুধু Vercel target যোগ হবে। চাইলে দুই জায়গায়ই deploy করা যাবে।
- Custom domain Vercel-এ আলাদা ভাবে connect করতে হবে।

## After implementation

1. Lovable-এ change merge হলে GitHub-এ push হবে
2. Vercel auto-rebuild করবে নতুন target দিয়ে
3. Env vars add করা থাকলে site live হবে — `/`, `/about`, `/admin/login` সব route SSR সহ কাজ করবে

## Verification

- Vercel build log-এ `.vercel/output/` generate হওয়া দেখা যাবে
- Live URL-এ `/` open করলে homepage render হবে
- Hard refresh করে `/admin/login`-এ গেলেও 404 আসবে না

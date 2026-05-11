## সমস্যাটা কী

Vercel error বলছে: `No Output Directory named "output" found`। কিন্তু project-এর `vercel.json`-এ এখন `outputDirectory` দেওয়া আছে `.vercel/output`। তাই deploy-তে এখনও `output` খোঁজা মানে Vercel সম্ভবত repo config না নিয়ে পুরোনো Project Settings override, cached config, বা ভুল framework/output setting ব্যবহার করছে।

## Fix plan

1. **Build output generation verify করব**
   - লোকালি build চালিয়ে দেখব TanStack/Vite আসলে `.vercel/output` বানাচ্ছে কি না।
   - যদি না বানায়, `vite.config.ts`/build script ঠিক করব যাতে Vercel Build Output API folder তৈরি হয়।

2. **Vercel config harden করব**
   - `vercel.json`-এ correct output directory থাকবে: `.vercel/output`।
   - দরকার হলে Vercel framework/build preset conflict এড়াতে config আরও explicit করব।

3. **Root cause document করব**
   - deploy error কেন এসেছে সেটা পরিষ্কার করে জানাব: Vercel `output` folder খুঁজছিল, কিন্তু এই TanStack Start Vercel target-এর expected folder `.vercel/output`।
   - যদি লোকাল build ঠিক থাকে, তাহলে Vercel dashboard/project setting-এ Output Directory override `output` থেকে `.vercel/output` করতে হবে বা override blank করতে হবে—এটা final note-এ বলব।

4. **Validation**
   - build শেষে `.vercel/output` আছে কিনা এবং `output` dependency নেই কিনা verify করব।
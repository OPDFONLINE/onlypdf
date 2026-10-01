# প্যাচ ১: সিকিউরিটি হেডার + pdf.js ওয়ার্কার সেলফ-হোস্ট

ফাইলগুলো একই পাথে ওভাররাইট করে ডিপ্লয় করুন, তারপর `npm install` চালান (বা Vercel-এ নতুন ডিপ্লয় দিন)।
নতুন প্যাকেজ বা Supabase মাইগ্রেশন লাগবে না।

## কী বদলেছে
1. **pdf.js ওয়ার্কার সেলফ-হোস্ট:** `unpkg.com`-এর বদলে `/pdf.worker.min.mjs` (নিজের ডোমেইন) থেকে লোড হয়।
   ফাইলটি `scripts/copy-pdf-worker.mjs` দিয়ে `node_modules/pdfjs-dist` থেকে `public/`-এ কপি হয়
   (`postinstall`, `predev`, `prebuild`), তাই সবসময় ইনস্টল-করা pdfjs-dist ভার্সনের সাথে মিলে যায়।
   `public/pdf.worker.min.mjs` গিটে কমিট করা হয় না (`.gitignore`-এ আছে)।
2. **সিকিউরিটি হেডার** (`next.config.mjs`): CSP, X-Content-Type-Options, X-Frame-Options,
   Referrer-Policy, Permissions-Policy, HSTS। `X-Powered-By` সরানো হয়েছে।
3. **`/admin` ও `/api/admin`:** `Cache-Control: no-store`।
4. **`package-lock.json` যোগ হয়েছে**, তাই প্রতিটি বিল্ডে একই ভার্সন ইনস্টল হবে।

## CSP: প্রথমে Report-Only
ডিফল্টে CSP পাঠানো হয় `Content-Security-Policy-Report-Only` হিসেবে। এতে কিছুই ব্লক হয় না, শুধু
ব্রাউজার কনসোলে লঙ্ঘন দেখায়। ধাপগুলো:
1. ডিপ্লয়ের পর প্রোডাকশনে (DevTools > Console খোলা রেখে) এগুলো চালান: হোম, Merge, Split, Compress,
   PDF to JPG/PNG, PDF to Word, Word to PDF, Insert PDF Pages, Watermark Remove, একটি ব্লগ আর্টিকেল,
   `/admin`। কনসোলে `Content Security Policy` / `Refused to` লাইন খুঁজুন।
2. AdSense চালু থাকলে বিজ্ঞাপন-সম্পর্কিত লঙ্ঘন আসতে পারে, সেই ডোমেইন `next.config.mjs`-এর `googleAds` তালিকায় যোগ করুন।
3. ১–২ দিন কোনো লঙ্ঘন না এলে Vercel > Settings > Environment Variables-এ `CSP_ENFORCE=true` দিয়ে রিডিপ্লয় করুন।

## ডিপ্লয়ের পর যাচাই
- `https://onlypdf.online/pdf.worker.min.mjs` খুললে জাভাস্ক্রিপ্ট কোড দেখাবে (404 নয়)।
- Network ট্যাবে `unpkg.com`-এ কোনো রিকোয়েস্ট থাকবে না।
- https://securityheaders.com-এ সাইট স্ক্যান করুন।

## রোলব্যাক
`next.config.mjs` আগের ভার্সনে ফেরালে হেডার চলে যাবে। ওয়ার্কার বদল আলাদা ও নিরাপদ।

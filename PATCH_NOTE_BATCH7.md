# প্যাচ ৩: ১২টি নতুন আর্টিকেল (ব্যাচ ৭) + নতুন আর্টিকেলে ইনকামিং লিংক

## আগে করে নিন
প্যাচ ২-এর SQL (`0012_blog_png_and_links_refresh.sql`) চালানো থাকতে হবে। এই প্যাচের `batch1..6-articles.ts` ফাইলগুলো প্যাচ ২-এর সংশোধনসহ **ক্রমবর্ধমান (cumulative)** ভার্সন।

## ধাপ (ক্রম মেনে চলুন)
1. **কোড ডিপ্লয়:** জিপের ফাইলগুলো ওভাররাইট করে ডিপ্লয় করুন। `app/api/admin/blog/illustrate/route.ts` এখন ব্যাচ ৭ চেনে।
2. **১২টি আর্টিকেল ড্রাফট হিসেবে তৈরি করুন।** `/admin`-এ লগইন করে একই ব্রাউজারে প্রতিটি লিংক একবার করে খুলুন (প্রতি রানে ১টি):
   - /api/admin/blog/illustrate?slug=insert-pages-into-pdf-complete-guide
   - /api/admin/blog/illustrate?slug=add-blank-page-to-pdf
   - /api/admin/blog/illustrate?slug=insert-pages-from-another-pdf-at-specific-position
   - /api/admin/blog/illustrate?slug=insert-vs-merge-pdf-which-tool
   - /api/admin/blog/illustrate?slug=replace-a-page-in-a-pdf
   - /api/admin/blog/illustrate?slug=convert-screenshots-png-to-pdf
   - /api/admin/blog/illustrate?slug=png-vs-jpg-to-pdf-which-to-use
   - /api/admin/blog/illustrate?slug=pdf-to-png-for-slides-docs-and-sharp-text
   - /api/admin/blog/illustrate?slug=is-it-ok-to-remove-a-pdf-watermark
   - /api/admin/blog/illustrate?slug=cover-vs-redact-pdf-hide-sensitive-information
   - /api/admin/blog/illustrate?slug=what-processed-in-your-browser-really-means
   - /api/admin/blog/illustrate?slug=password-protected-pdf-what-to-do-first
   ❌ **বিদ্যমান ৪৩টি আর্টিকেলের slug দিয়ে এই রুট চালাবেন না**, ওগুলো ওভাররাইট হবে।
3. **ড্রাফটগুলো পড়ে রিভিউ করে Publish করুন** (ছবি ও টেক্সট দেখে নিন)। Insert Pages ক্লাস্টার একসাথে প্রকাশ করলে ইন্টারনাল লিংক পূর্ণ থাকে।
4. **সবগুলো পাবলিশ হওয়ার পরে** Supabase SQL Editor-এ `supabase/migrations/0013_blog_links_to_batch7.sql` চালান।
   এটা বিদ্যমান ২০টি জায়গায় নতুন আর্টিকেলের "Related guide" লিংক বসায়।
   ⚠️ আগে চালালে পুরোনো আর্টিকেলে অপ্রকাশিত পেজের লিংক ৪০৪ দেবে।
   স্ক্রিপ্ট একাধিকবার চালালেও নিরাপদ (idempotent)। শেষের চেক-কোয়েরিতে সব `applied = true` থাকা উচিত।

## নতুন আর্টিকেলের ক্লাস্টার
- **insert-pages (নতুন ক্লাস্টার, ৫টি):** পিলার + add-blank-page + insert-pages-from-another-pdf + insert-vs-merge + replace-a-page
- **convert-to-pdf (+২):** convert-screenshots-png-to-pdf, png-vs-jpg-to-pdf-which-to-use
- **convert-from-pdf (+১):** pdf-to-png-for-slides-docs-and-sharp-text
- **watermark-cleanup (+১):** is-it-ok-to-remove-a-pdf-watermark
- **privacy (+৩):** cover-vs-redact, what-processed-in-your-browser, password-protected-pdf

## ডিপ্লয়ের পর যাচাই
- `/blog` ও `/sitemap.xml`-এ ১২টি নতুন URL দেখা যাচ্ছে কি না
- প্রতিটি নতুন আর্টিকেল খুলে ছবি, টেবিল (`insert-vs-merge`, `png-vs-jpg`) এবং নীল কলআউট ঠিকমতো রেন্ডার হচ্ছে কি না
- Google Search Console-এ নতুন URL-গুলো ইনডেক্সিংয়ের জন্য জমা দিন

## নোট
- নতুন আর্টিকেলগুলো ড্রাফটে তৈরি হয়, অটো-পাবলিশ হয় না।
- লেখাগুলোতে টুলের আসল আচরণ বর্ণিত আছে (যেমন PDF to PNG-এ ২× স্কেল, স্বচ্ছ ব্যাকগ্রাউন্ড; Insert-এ এক রানে এক পজিশন)। পরে টুল বদলালে আর্টিকেল হালনাগাদ করুন।
- `is-it-ok-to-remove-a-pdf-watermark` সাধারণ তথ্য, আইনি পরামর্শ নয় (আর্টিকেলেও তা লেখা আছে)।

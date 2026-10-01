# প্যাচ ২: ব্লগ কনটেন্ট রিফ্রেশ (PNG/JPG সংশোধন + ইন্টারনাল লিংক)

## ⚠️ সবচেয়ে গুরুত্বপূর্ণ: লাইভ আর্টিকেল DB-তে থাকে
শুধু কোড ডিপ্লয় করলে লাইভ আর্টিকেল বদলাবে না। লাইভ লেখা Supabase-এর `blog_posts` টেবিল থেকে আসে।
তাই দুটি কাজ করুন:
1. `lib/blog/batch1..6-articles.ts` ওভাররাইট করে ডিপ্লয় করুন (সোর্স-অফ-ট্রুথ আপডেট থাকবে)।
2. **Supabase > SQL Editor-এ `supabase/migrations/0012_blog_png_and_links_refresh.sql` পুরোটা চালান।**

❌ এই কাজের জন্য `/api/admin/blog/illustrate` রুট চালাবেন না। ওটা পুরো কনটেন্ট ওভাররাইট করে, ম্যানুয়াল এডিট হারাবে এবং নতুন করে ছবি খরচ করবে।

## SQL স্ক্রিপ্ট কীভাবে কাজ করে
- শুধু নির্দিষ্ট বাক্যগুলো `replace()` করে। ছবি ও আপনার ম্যানুয়াল এডিট অক্ষত থাকে।
- **একাধিকবার চালানো নিরাপদ।** নতুন টেক্সট আগে থেকে থাকলে কিছুই বদলায় না।
- শেষে একটি চেক-কোয়েরি আছে। সব সারিতে `applied = true` আসা উচিত।
  কোনো আর্টিকেলে `false` এলে বুঝবেন আপনি সেটি DB-তে হাতে এডিট করেছিলেন, ওই অংশ আলাদাভাবে বদলাতে হবে।
- যে আর্টিকেল DB-তে নেই বা unpublished, সেগুলো স্ক্রিপ্ট ছোঁয় না।
- বদলানো সারির `updated_at` হালনাগাদ হয়, তাই সাইটম্যাপের lastmod-ও আপডেট হবে।

## কী বদলেছে (৫৪টি সম্পাদনা, ২৪টি আর্টিকেল (৯টি ফরম্যাট-সংশোধন + ১৫টি শুধু লিংক))
**ক) টুল-তথ্য সংশোধন (৯টি আর্টিকেল):** JPG to PDF এখন শুধু JPG/JPEG নেয় এবং PDF to JPG শুধু JPG দেয়।
পুরোনো "JPG, JPEG ও PNG নেয়" ও "JPG বা PNG বেছে নিন" বাক্যগুলো ঠিক করে PNG to PDF ও PDF to PNG টুলে লিংক দেওয়া হয়েছে।
মিশ্র (JPG + PNG) ব্যাচের জন্য "দুটো আলাদা PDF বানিয়ে Merge করুন" নির্দেশনা যোগ হয়েছে।
- how-to-convert-word-jpg-images-to-pdf
- how-to-convert-pdf-to-word-or-images
- convert-pdf-to-jpg-pages
- pdf-to-png-or-jpg-which-format
- jpg-to-pdf-complete-guide
- pdf-vs-word-vs-jpg-choosing-the-right-file-format
- combine-word-images-and-pdfs-into-one-document-package
- use-pdf-tools-on-phone-complete-guide
- which-pdf-tool-do-i-need-cheat-sheet (সাথে নতুন ৩ টুলের সেকশন ও টেবিল-সারি যোগ; "twelve tools" → "fifteen")

**খ) নতুন টুলের কভারেজ:** Insert PDF Pages, PNG to PDF ও PDF to PNG এখন আর্টিকেল থেকে লিংকড।

**গ) ইন্টারনাল লিংক:** আগের ৭টি অরফান আর্টিকেল এবং ১টি-মাত্র-লিংকের ৬টি এখন প্রতিটিতে অন্তত ২টি ইনকামিং লিংক পায়
(নীল "Related guide" কলআউট হিসেবে, প্রাসঙ্গিক সেকশনের নিচে)।

## ডিপ্লয়ের পর যাচাই
- SQL চালিয়ে চেক-কোয়েরিতে সব `applied = true` দেখুন।
- `/blog/jpg-to-pdf-complete-guide` ও `/blog/pdf-to-png-or-jpg-which-format` খুলে নতুন লেখা ও লিংক দেখুন।
- `/blog/which-pdf-tool-do-i-need-cheat-sheet`-এ নতুন টেবিল-সারিগুলো দেখুন।

## মনে রাখুন (কনটেন্টের বাইরে)
- PDF to PNG টুল সাদা ব্যাকগ্রাউন্ড দেয় না। PDF পেজে ব্যাকগ্রাউন্ড আঁকা না থাকলে ওই অংশ স্বচ্ছ (transparent) থাকে।
  কিছু ভিউয়ারে (বিশেষ করে ডার্ক মোডে) সেটা কালো দেখাতে পারে। pdf-to-png-or-jpg আর্টিকেলে এটা লেখা হয়েছে;
  চাইলে টুলের FAQ-তেও যোগ করুন।
- `digital-paperwork-organization-system`-এর seo_description ১৬১ অক্ষর (১ বেশি)। আগে থেকেই ছিল, এই প্যাচে বদলাইনি।

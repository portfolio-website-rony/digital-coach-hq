import {
  Sparkles, Video, Layout, Globe, Package, Megaphone,
  MessageSquare, GraduationCap, Code2, Briefcase, Users, Rocket,
} from "lucide-react";

export const SERVICES = [
  { icon: Sparkles, title: "AI Content Creation", desc: "AI দিয়ে স্কেলেবল, হাই-কোয়ালিটি কন্টেন্ট তৈরি।" },
  { icon: Video, title: "AI Video Ads", desc: "Conversion-driven video ads scripted ও edited by AI।" },
  { icon: Layout, title: "Landing Page Design", desc: "High-converting glassmorphism landing pages।" },
  { icon: Globe, title: "Website Design", desc: "Modern, fast, mobile-first creator websites।" },
  { icon: Package, title: "Digital Product Strategy", desc: "Idea থেকে launch পর্যন্ত complete roadmap।" },
  { icon: Megaphone, title: "Facebook Ads Setup", desc: "Pixel + CAPI + creative system, full funnel।" },
  { icon: MessageSquare, title: "WhatsApp Automation", desc: "Auto-reply, lead capture, drip sequences।" },
  { icon: GraduationCap, title: "AI Coaching", desc: "1:1 mentorship for creators ও freelancers।" },
  { icon: Code2, title: "Vibe Coding Training", desc: "Lovable, Cursor, AI tools — শিখো ও বানাও।" },
] as const;

export const PROGRAMS = [
  {
    tag: "Free", title: "AI Free Class",
    desc: "শুরু করুন AI দিয়ে। 90 মিনিটের live workshop।",
    price: "Free", cta: "Join Free", href: "/free-class",
    icon: Rocket,
  },
  {
    tag: "Masterclass", title: "AI Creator Masterclass",
    desc: "Content, video, monetization — A to Z framework।",
    price: "৳ 1,499", cta: "Enroll Now", href: "/programs",
    icon: GraduationCap,
  },
  {
    tag: "Premium", title: "Vibe Coding Bootcamp",
    desc: "8 weeks live + projects। AI দিয়ে SaaS বানাও।",
    price: "৳ 9,999", cta: "Apply", href: "/programs",
    icon: Code2,
  },
  {
    tag: "Mentorship", title: "1:1 AI Business Mentorship",
    desc: "Personal roadmap, weekly calls, full access।",
    price: "৳ 24,999", cta: "Book Discovery", href: "/book",
    icon: Briefcase,
  },
] as const;

export const PORTFOLIO = [
  { tag: "Landing Page", title: "SaaS Launch Page", color: "from-purple-500/40 to-fuchsia-500/30" },
  { tag: "AI Video", title: "Product Demo Reel", color: "from-blue-500/40 to-cyan-500/30" },
  { tag: "Ad Creative", title: "Facebook Ad Set — 4.2x ROAS", color: "from-pink-500/40 to-orange-400/30" },
  { tag: "Website", title: "Coach Portfolio Site", color: "from-emerald-500/40 to-teal-400/30" },
  { tag: "Funnel", title: "Webinar Sales Funnel", color: "from-violet-500/40 to-indigo-500/30" },
  { tag: "Thumbnail", title: "YouTube Thumbnail Pack", color: "from-amber-500/40 to-rose-400/30" },
] as const;

export const TESTIMONIALS = [
  { name: "Tanvir Ahmed", role: "Freelancer", quote: "CoachRony-র AI workflow শিখে আমার content output 5x বেড়েছে। গেম চেঞ্জার!" },
  { name: "Nusrat Jahan", role: "Content Creator", quote: "Vibe coding bootcamp-এ join করে আমি নিজেই একটা SaaS launch করেছি।" },
  { name: "Rakib Hasan", role: "Business Owner", quote: "Facebook ads setup-এর পর আমার ROAS 1.8x থেকে 4.5x-এ গেছে।" },
  { name: "Sumaiya Akter", role: "Student", quote: "একদম zero থেকে শুরু করেছিলাম। এখন AI দিয়ে monthly income করছি।" },
] as const;

export const SKILLS = [
  "AI Content Creation", "AI Video Production", "Vibe Coding",
  "Landing Page Design", "Digital Product Creation", "Facebook Ads",
  "AI Automation", "Personal Branding",
] as const;

export const STATS = [
  { value: "10K+", label: "Students Trained" },
  { value: "500+", label: "Projects Delivered" },
  { value: "50+", label: "AI Tools Mastered" },
  { value: "5+", label: "Years Experience" },
] as const;

import { notFound } from 'next/navigation';
import * as fs from 'fs';
import * as path from 'path';
import Link from 'next/link';
import Image from 'next/image';

// Types
interface PageData {
  sourceUrl: string;
  path: string;
  slug: string;
  title: string;
  html: string;
  updatedAt: string;
}

interface PagesIndex {
  pages: { slug: string; title: string; path: string }[];
  lastSync: string;
}

// Get content directory path
const CONTENT_DIR = path.join(process.cwd(), 'content/lplpf');
const PAGES_DIR = path.join(CONTENT_DIR, 'pages');

// Sample content for when JSON files don't exist yet
const SAMPLE_CONTENT: Record<string, PageData> = {
  index: {
    sourceUrl: 'https://www.iplpf.org/',
    path: '/',
    slug: 'index',
    title: 'IPLPF - International Peace Loving People Foundation',
    html: `
      <div class="space-y-12">
        <section class="text-center py-12">
          <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Building Peace Through <span class="text-orange-600">Understanding</span>
          </h1>
          <p class="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            The International Peace Loving People Foundation (IPLPF) is dedicated to promoting peace,
            international cooperation, and sustainable development through education, research, and advocacy.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="/lplpf/about-us/" class="inline-block bg-orange-600 hover:bg-orange-700 text-white rounded-xl px-6 py-3 font-semibold transition-colors">
              Learn More
            </a>
            <a href="/donate" class="inline-block bg-white border-2 border-orange-600 text-orange-600 hover:bg-orange-50 rounded-xl px-6 py-3 font-semibold transition-colors">
              Support Our Mission
            </a>
          </div>
        </section>

        <section class="grid md:grid-cols-3 gap-8">
          <div class="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200">
            <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-slate-900 mb-2">Peace Education</h3>
            <p class="text-slate-600">Developing and promoting peace education programs worldwide to foster understanding and harmony.</p>
          </div>

          <div class="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200">
            <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-slate-900 mb-2">UN Activities Support</h3>
            <p class="text-slate-600">Working with UN agencies to support international peace-building initiatives and sustainable development goals.</p>
          </div>

          <div class="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200">
            <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-slate-900 mb-2">Research & Advocacy</h3>
            <p class="text-slate-600">Conducting research on peace-building and providing policy recommendations to governments and organizations.</p>
          </div>
        </section>

        <section class="bg-orange-50 rounded-3xl p-8 md:p-12">
          <div class="max-w-3xl mx-auto text-center">
            <h2 class="text-3xl font-bold text-slate-900 mb-4">Our Impact</h2>
            <p class="text-slate-600 mb-8">
              For over 30 years, we have been working to build a more peaceful world through education,
              research, and international cooperation.
            </p>
            <div class="grid grid-cols-3 gap-8">
              <div>
                <p class="text-3xl font-bold text-orange-600">30+</p>
                <p class="text-sm text-slate-600">Years of Service</p>
              </div>
              <div>
                <p class="text-3xl font-bold text-orange-600">5</p>
                <p class="text-sm text-slate-600">Countries</p>
              </div>
              <div>
                <p class="text-3xl font-bold text-orange-600">10,000+</p>
                <p class="text-sm text-slate-600">Supporters</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    `,
    updatedAt: new Date().toISOString(),
  },
  'about-us': {
    sourceUrl: 'https://www.iplpf.org/about-us/',
    path: '/about-us/',
    slug: 'about-us',
    title: 'About Us - IPLPF',
    html: `
      <div class="space-y-8">
        <section>
          <h1 class="text-4xl font-bold text-slate-900 mb-6">About IPLPF</h1>
          <p class="text-lg text-slate-600 leading-relaxed mb-6">
            The International Peace Loving People Foundation (IPLPF) is an international non-governmental organization
            dedicated to promoting peace, international cooperation, and sustainable development. Founded in 1988 in
            New York, we have been working for over three decades to build a more peaceful and harmonious world.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
          <p class="text-slate-600 leading-relaxed mb-4">
            Our mission is to increase the number of peace-loving people worldwide through education, research,
            and international cooperation. We believe that lasting peace can only be achieved when people from
            all backgrounds come together with a shared commitment to understanding and harmony.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-slate-900 mb-4">Our History</h2>
          <div class="space-y-6">
            <div class="flex gap-4">
              <div class="w-24 flex-shrink-0">
                <span class="text-orange-600 font-semibold">1988</span>
              </div>
              <div>
                <h3 class="font-semibold text-slate-900">Founded in New York</h3>
                <p class="text-slate-600">IPLPF was established as an international peace organization.</p>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="w-24 flex-shrink-0">
                <span class="text-orange-600 font-semibold">1996</span>
              </div>
              <div>
                <h3 class="font-semibold text-slate-900">UN ECOSOC Consultative Status</h3>
                <p class="text-slate-600">Granted General Consultative Status with the United Nations Economic and Social Council.</p>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="w-24 flex-shrink-0">
                <span class="text-orange-600 font-semibold">2020</span>
              </div>
              <div>
                <h3 class="font-semibold text-slate-900">Japan Incorporation</h3>
                <p class="text-slate-600">Established legal entity in Japan to expand activities in Asia.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-slate-900 mb-4">Our Values</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-white rounded-xl p-6 ring-1 ring-slate-200">
              <h3 class="font-semibold text-orange-600 mb-2">Peace</h3>
              <p class="text-slate-600">Promoting peaceful resolution of conflicts and building a culture of peace.</p>
            </div>
            <div class="bg-white rounded-xl p-6 ring-1 ring-slate-200">
              <h3 class="font-semibold text-orange-600 mb-2">Education</h3>
              <p class="text-slate-600">Empowering people through knowledge and understanding.</p>
            </div>
            <div class="bg-white rounded-xl p-6 ring-1 ring-slate-200">
              <h3 class="font-semibold text-orange-600 mb-2">Cooperation</h3>
              <p class="text-slate-600">Building bridges between nations and cultures through collaboration.</p>
            </div>
            <div class="bg-white rounded-xl p-6 ring-1 ring-slate-200">
              <h3 class="font-semibold text-orange-600 mb-2">Sustainability</h3>
              <p class="text-slate-600">Working towards sustainable development for future generations.</p>
            </div>
          </div>
        </section>
      </div>
    `,
    updatedAt: new Date().toISOString(),
  },
  'what-we-do': {
    sourceUrl: 'https://www.iplpf.org/what-we-do/',
    path: '/what-we-do/',
    slug: 'what-we-do',
    title: 'What We Do - IPLPF',
    html: `
      <div class="space-y-12">
        <section>
          <h1 class="text-4xl font-bold text-slate-900 mb-6">What We Do</h1>
          <p class="text-lg text-slate-600 leading-relaxed">
            IPLPF works across four main areas to promote peace and sustainable development worldwide.
            Our activities are guided by our commitment to increasing the number of peace-loving people
            and building a more harmonious world.
          </p>
        </section>

        <section class="grid md:grid-cols-2 gap-8">
          <div class="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-slate-200">
            <div class="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
              <span class="text-2xl">🕊️</span>
            </div>
            <h2 class="text-xl font-bold text-slate-900 mb-3">Peace Promotion</h2>
            <p class="text-slate-600 leading-relaxed">
              We develop and implement peace education programs, organize peace seminars and workshops,
              and promote dialogue between different communities and nations. Our goal is to foster a
              culture of peace and non-violence.
            </p>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-slate-200">
            <div class="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
              <span class="text-2xl">🌍</span>
            </div>
            <h2 class="text-xl font-bold text-slate-900 mb-3">UN Activities Support</h2>
            <p class="text-slate-600 leading-relaxed">
              As an NGO with General Consultative Status at the UN ECOSOC, we actively participate
              in UN conferences and support international peace-building initiatives. We work to
              advance the Sustainable Development Goals (SDGs).
            </p>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-slate-200">
            <div class="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
              <span class="text-2xl">📊</span>
            </div>
            <h2 class="text-xl font-bold text-slate-900 mb-3">Research & Policy</h2>
            <p class="text-slate-600 leading-relaxed">
              We conduct research on peace-building, conflict resolution, and sustainable development.
              Based on our findings, we provide policy recommendations to governments, international
              organizations, and civil society.
            </p>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-slate-200">
            <div class="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
              <span class="text-2xl">🤝</span>
            </div>
            <h2 class="text-xl font-bold text-slate-900 mb-3">Humanitarian Support</h2>
            <p class="text-slate-600 leading-relaxed">
              We provide educational support, school meal programs, and scholarships in developing
              countries. Our support activities help communities build resilience and work towards
              sustainable development.
            </p>
          </div>
        </section>
      </div>
    `,
    updatedAt: new Date().toISOString(),
  },
  'projects': {
    sourceUrl: 'https://www.iplpf.org/projects/',
    path: '/projects/',
    slug: 'projects',
    title: 'Projects - IPLPF',
    html: `
      <div class="space-y-12">
        <section>
          <h1 class="text-4xl font-bold text-slate-900 mb-6">Our Projects</h1>
          <p class="text-lg text-slate-600 leading-relaxed">
            We implement projects in multiple countries across Asia, focusing on education,
            humanitarian support, and community development.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-slate-900 mb-6">Regional Activities</h2>
          <div class="grid md:grid-cols-3 gap-6">
            <div class="bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-slate-200">
              <div class="aspect-video bg-orange-100 flex items-center justify-center">
                <span class="text-4xl">🇰🇭</span>
              </div>
              <div class="p-6">
                <h3 class="text-lg font-bold text-slate-900 mb-2">Cambodia</h3>
                <p class="text-slate-600 text-sm">
                  School meal programs, educational support, and community development initiatives
                  supporting children and families in rural areas.
                </p>
              </div>
            </div>

            <div class="bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-slate-200">
              <div class="aspect-video bg-orange-100 flex items-center justify-center">
                <span class="text-4xl">🇵🇭</span>
              </div>
              <div class="p-6">
                <h3 class="text-lg font-bold text-slate-900 mb-2">Philippines</h3>
                <p class="text-slate-600 text-sm">
                  Educational scholarships and support programs helping underprivileged children
                  access quality education.
                </p>
              </div>
            </div>

            <div class="bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-slate-200">
              <div class="aspect-video bg-orange-100 flex items-center justify-center">
                <span class="text-4xl">🇲🇲</span>
              </div>
              <div class="p-6">
                <h3 class="text-lg font-bold text-slate-900 mb-2">Myanmar</h3>
                <p class="text-slate-600 text-sm">
                  Humanitarian aid and educational support for communities affected by conflict
                  and economic hardship.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    `,
    updatedAt: new Date().toISOString(),
  },
  'blog-list': {
    sourceUrl: 'https://www.iplpf.org/blog-list/',
    path: '/blog-list/',
    slug: 'blog-list',
    title: 'News - IPLPF',
    html: `
      <div class="space-y-8">
        <section>
          <h1 class="text-4xl font-bold text-slate-900 mb-6">News & Updates</h1>
          <p class="text-lg text-slate-600">
            Stay updated with our latest activities, events, and announcements.
          </p>
        </section>

        <section class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article class="bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-slate-200">
            <div class="aspect-video bg-slate-100"></div>
            <div class="p-6">
              <time class="text-sm text-orange-600">January 2026</time>
              <h3 class="text-lg font-semibold text-slate-900 mt-2 mb-2">
                Annual Peace Conference 2026
              </h3>
              <p class="text-slate-600 text-sm">
                Join us for our annual conference on peace-building and sustainable development.
              </p>
            </div>
          </article>

          <article class="bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-slate-200">
            <div class="aspect-video bg-slate-100"></div>
            <div class="p-6">
              <time class="text-sm text-orange-600">December 2025</time>
              <h3 class="text-lg font-semibold text-slate-900 mt-2 mb-2">
                Cambodia School Support Update
              </h3>
              <p class="text-slate-600 text-sm">
                Report on our school meal program and educational initiatives in Cambodia.
              </p>
            </div>
          </article>

          <article class="bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-slate-200">
            <div class="aspect-video bg-slate-100"></div>
            <div class="p-6">
              <time class="text-sm text-orange-600">November 2025</time>
              <h3 class="text-lg font-semibold text-slate-900 mt-2 mb-2">
                UN Partnership Announcement
              </h3>
              <p class="text-slate-600 text-sm">
                New collaboration with UN agencies to expand peace education programs.
              </p>
            </div>
          </article>
        </section>
      </div>
    `,
    updatedAt: new Date().toISOString(),
  },
  'contact': {
    sourceUrl: 'https://www.iplpf.org/contact/',
    path: '/contact/',
    slug: 'contact',
    title: 'Contact - IPLPF',
    html: `
      <div class="space-y-8">
        <section>
          <h1 class="text-4xl font-bold text-slate-900 mb-6">Contact Us</h1>
          <p class="text-lg text-slate-600">
            Get in touch with us. We'd love to hear from you.
          </p>
        </section>

        <section class="grid md:grid-cols-2 gap-12">
          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-4">Contact Information</h2>
            <div class="space-y-4">
              <div>
                <h3 class="font-semibold text-slate-900">Email</h3>
                <p class="text-slate-600">info@iplpf.org</p>
              </div>
              <div>
                <h3 class="font-semibold text-slate-900">Office</h3>
                <p class="text-slate-600">
                  International Peace Loving People Foundation<br />
                  Tokyo, Japan
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-4">Send a Message</h2>
            <form class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input type="text" class="w-full rounded-xl border border-slate-300 px-4 py-2 focus:border-orange-500 focus:ring-orange-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" class="w-full rounded-xl border border-slate-300 px-4 py-2 focus:border-orange-500 focus:ring-orange-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea rows={4} class="w-full rounded-xl border border-slate-300 px-4 py-2 focus:border-orange-500 focus:ring-orange-500"></textarea>
              </div>
              <button type="submit" class="bg-orange-600 hover:bg-orange-700 text-white rounded-xl h-11 px-6 font-semibold transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </section>
      </div>
    `,
    updatedAt: new Date().toISOString(),
  },
  'supporter': {
    sourceUrl: 'https://www.iplpf.org/supporter/',
    path: '/supporter/',
    slug: 'supporter',
    title: 'Become a Supporter - IPLPF',
    html: `
      <div class="space-y-8">
        <section>
          <h1 class="text-4xl font-bold text-slate-900 mb-6">Become a Supporter</h1>
          <p class="text-lg text-slate-600 leading-relaxed">
            Your support helps us continue our mission of building peace through education,
            research, and international cooperation. Join our community of peace-loving people.
          </p>
        </section>

        <section class="grid md:grid-cols-2 gap-8">
          <div class="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-slate-200">
            <h2 class="text-xl font-bold text-slate-900 mb-4">One-time Donation</h2>
            <p class="text-slate-600 mb-6">
              Make a single contribution to support our activities and programs.
            </p>
            <a href="/lplpf/one-time-donation/" class="inline-block bg-orange-600 hover:bg-orange-700 text-white rounded-xl px-6 py-3 font-semibold transition-colors">
              Donate Now
            </a>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-slate-200">
            <h2 class="text-xl font-bold text-slate-900 mb-4">Monthly Supporter</h2>
            <p class="text-slate-600 mb-6">
              Become a monthly supporter and help us plan for long-term impact.
            </p>
            <a href="/lplpf/monthly-donation/" class="inline-block bg-orange-600 hover:bg-orange-700 text-white rounded-xl px-6 py-3 font-semibold transition-colors">
              Start Monthly Support
            </a>
          </div>
        </section>
      </div>
    `,
    updatedAt: new Date().toISOString(),
  },
  'publication': {
    sourceUrl: 'https://www.iplpf.org/publication/',
    path: '/publication/',
    slug: 'publication',
    title: 'Publications - IPLPF',
    html: `
      <div class="space-y-8">
        <section>
          <h1 class="text-4xl font-bold text-slate-900 mb-6">Publications</h1>
          <p class="text-lg text-slate-600">
            Our research papers, reports, and educational materials on peace-building and sustainable development.
          </p>
        </section>

        <section>
          <div class="space-y-6">
            <article class="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200">
              <h3 class="text-lg font-semibold text-slate-900 mb-2">Annual Report 2025</h3>
              <p class="text-slate-600 text-sm mb-4">
                Comprehensive overview of our activities, achievements, and financial report for 2025.
              </p>
              <span class="text-orange-600 text-sm font-medium">PDF Document</span>
            </article>

            <article class="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200">
              <h3 class="text-lg font-semibold text-slate-900 mb-2">Peace Education Handbook</h3>
              <p class="text-slate-600 text-sm mb-4">
                A guide for educators on implementing peace education programs in schools.
              </p>
              <span class="text-orange-600 text-sm font-medium">PDF Document</span>
            </article>

            <article class="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200">
              <h3 class="text-lg font-semibold text-slate-900 mb-2">SDG Progress Report</h3>
              <p class="text-slate-600 text-sm mb-4">
                Our contribution to the United Nations Sustainable Development Goals.
              </p>
              <span class="text-orange-600 text-sm font-medium">PDF Document</span>
            </article>
          </div>
        </section>
      </div>
    `,
    updatedAt: new Date().toISOString(),
  },
  'one-time-donation': {
    sourceUrl: 'https://www.iplpf.org/one-time-donation/',
    path: '/one-time-donation/',
    slug: 'one-time-donation',
    title: 'One-time Donation - IPLPF',
    html: `
      <div class="space-y-8 max-w-2xl mx-auto">
        <section class="text-center">
          <h1 class="text-4xl font-bold text-slate-900 mb-6">Make a Donation</h1>
          <p class="text-lg text-slate-600">
            Your contribution helps us continue our mission of building peace worldwide.
          </p>
        </section>

        <section class="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-slate-200">
          <div class="text-center mb-8">
            <p class="text-slate-600 mb-4">Select an amount or enter a custom amount</p>
            <div class="grid grid-cols-3 gap-4 mb-4">
              <button class="border-2 border-orange-600 text-orange-600 rounded-xl py-3 font-semibold hover:bg-orange-50">
                ¥1,000
              </button>
              <button class="border-2 border-orange-600 text-orange-600 rounded-xl py-3 font-semibold hover:bg-orange-50">
                ¥3,000
              </button>
              <button class="border-2 border-orange-600 text-orange-600 rounded-xl py-3 font-semibold hover:bg-orange-50">
                ¥5,000
              </button>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <button class="border-2 border-orange-600 text-orange-600 rounded-xl py-3 font-semibold hover:bg-orange-50">
                ¥10,000
              </button>
              <button class="border-2 border-orange-600 text-orange-600 rounded-xl py-3 font-semibold hover:bg-orange-50">
                ¥30,000
              </button>
              <button class="border-2 border-orange-600 text-orange-600 rounded-xl py-3 font-semibold hover:bg-orange-50">
                ¥50,000
              </button>
            </div>
          </div>
          <a href="/donate" class="block w-full bg-orange-600 hover:bg-orange-700 text-white text-center rounded-xl py-4 font-semibold transition-colors">
            Proceed to Checkout
          </a>
        </section>
      </div>
    `,
    updatedAt: new Date().toISOString(),
  },
  'monthly-donation': {
    sourceUrl: 'https://www.iplpf.org/monthly-donation/',
    path: '/monthly-donation/',
    slug: 'monthly-donation',
    title: 'Monthly Donation - IPLPF',
    html: `
      <div class="space-y-8 max-w-2xl mx-auto">
        <section class="text-center">
          <h1 class="text-4xl font-bold text-slate-900 mb-6">Become a Monthly Supporter</h1>
          <p class="text-lg text-slate-600">
            Regular contributions help us plan for long-term impact and sustainable programs.
          </p>
        </section>

        <section class="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-slate-200">
          <div class="text-center mb-8">
            <p class="text-slate-600 mb-4">Select a monthly amount</p>
            <div class="grid grid-cols-3 gap-4 mb-4">
              <button class="border-2 border-orange-600 text-orange-600 rounded-xl py-3 font-semibold hover:bg-orange-50">
                ¥500/月
              </button>
              <button class="border-2 border-orange-600 text-orange-600 rounded-xl py-3 font-semibold hover:bg-orange-50">
                ¥1,000/月
              </button>
              <button class="border-2 border-orange-600 text-orange-600 rounded-xl py-3 font-semibold hover:bg-orange-50">
                ¥3,000/月
              </button>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <button class="border-2 border-orange-600 text-orange-600 rounded-xl py-3 font-semibold hover:bg-orange-50">
                ¥5,000/月
              </button>
              <button class="border-2 border-orange-600 text-orange-600 rounded-xl py-3 font-semibold hover:bg-orange-50">
                ¥10,000/月
              </button>
              <button class="border-2 border-orange-600 text-orange-600 rounded-xl py-3 font-semibold hover:bg-orange-50">
                Other
              </button>
            </div>
          </div>
          <a href="/donate" class="block w-full bg-orange-600 hover:bg-orange-700 text-white text-center rounded-xl py-4 font-semibold transition-colors">
            Start Monthly Support
          </a>
        </section>
      </div>
    `,
    updatedAt: new Date().toISOString(),
  },
};

// Helper function to get page data
function getPageData(slug: string): PageData | null {
  // First, try to read from JSON file
  try {
    const filePath = path.join(PAGES_DIR, `${slug}.json`);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    }
  } catch {
    // File doesn't exist or is invalid
  }

  // Fall back to sample content
  return SAMPLE_CONTENT[slug] || null;
}

// Generate static params for known pages
export function generateStaticParams() {
  const slugs = Object.keys(SAMPLE_CONTENT);

  // Add pages from JSON files if they exist
  try {
    if (fs.existsSync(PAGES_DIR)) {
      const files = fs.readdirSync(PAGES_DIR);
      files.forEach(file => {
        if (file.endsWith('.json')) {
          const slug = file.replace('.json', '');
          if (!slugs.includes(slug)) {
            slugs.push(slug);
          }
        }
      });
    }
  } catch {
    // Directory doesn't exist
  }

  return [
    { slug: undefined }, // Root path /lplpf/
    ...slugs.map(slug => ({ slug: [slug] })),
  ];
}

// Page component
export default async function LplpfPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug: slugArray } = await params;
  const slug = slugArray?.join('__') || 'index';

  const pageData = getPageData(slug);

  if (!pageData) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Page Banner */}
      {slug !== 'index' && (
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            {/* Breadcrumb */}
            <nav className="mb-4">
              <ol className="flex items-center gap-2 text-sm text-white/80">
                <li>
                  <Link href="/lplpf/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li className="text-white font-medium">{pageData.title.replace(' - IPLPF', '')}</li>
              </ol>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {pageData.title.replace(' - IPLPF', '')}
            </h1>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <article
          className="prose prose-slate max-w-none prose-headings:tracking-tight prose-headings:font-semibold prose-a:text-orange-700 prose-a:underline-offset-4 hover:prose-a:text-orange-800 prose-img:rounded-2xl prose-img:shadow-lg"
          dangerouslySetInnerHTML={{ __html: pageData.html }}
        />
      </div>
    </div>
  );
}

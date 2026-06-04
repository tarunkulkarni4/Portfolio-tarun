export const personalInfo = {
  name: "Tarun Kulakarni",
  tagline: "Building scalable, user-centric web applications from Bengaluru.",
  bio: "I'm a AspiringFull-Stack Developer based in Bengaluru, India, currently pursuing my MCA at Cambridge Institute of Technology. I specialize in React, Node.js, and modern web technologies — turning complex problems into clean, performant digital solutions. Passionate about AI-integrated applications and open-source contribution.",
  roles: ["Full-Stack Developer", "React Developer", "Open Source Builder"],
  location: "Bengaluru, India",
  email: "tarunkulkarni4@gmail.com",
  phone: "+91 9632915734",
  resumeLink: "/resume.pdf",
};

export const skills = [
  { name: "React.js", icon: "devicon-react-original" },
  { name: "Next.js", icon: "devicon-nextjs-plain" },
  { name: "JavaScript", icon: "devicon-javascript-plain" },
  { name: "Node.js", icon: "devicon-nodejs-plain" },
  { name: "Express.js", icon: "devicon-express-original" },
  { name: "Tailwind CSS", icon: "devicon-tailwindcss-original" },
  { name: "Python", icon: "devicon-python-plain" },
  { name: "Java", icon: "devicon-java-plain" },
  { name: "C", icon: "devicon-c-plain" },
  { name: "HTML5", icon: "devicon-html5-plain" },
  { name: "CSS3", icon: "devicon-css3-plain" },
  { name: "MongoDB", icon: "devicon-mongodb-plain" },
  { name: "MySQL", icon: "devicon-mysql-plain" },
  { name: "Git", icon: "devicon-git-plain" },
  { name: "GitHub", icon: "devicon-github-original" },
  { name: "Linux", icon: "devicon-linux-plain" },
  { name: "Jenkins", icon: "devicon-jenkins-plain" },
  { name: "Google Cloud", icon: "devicon-googlecloud-plain" },
  { name: "VS Code", icon: "devicon-vscode-plain" },
];

export const projects = [
  {
    title: "AI Powered Google Form Builder",
    description:
      "Generates forms using AI from natural language prompts. Creates context-aware questions automatically — no manual form building required.",
    tags: ["React", "Next.js", "Tailwind CSS", "AI"],
    github: "https://github.com/tarunkulkarni4/FullStack-AI-Google-Form_Builder",
    live: "https://github.com/tarunkulkarni4/FullStack-AI-Google-Form_Builder",
    problem: "Creating custom forms and surveys is a time-consuming chore. Users often struggle to write clear questions, structure them logically, determine correct answer formats, and configure valid validation rules manually.",
    proposed: "An intelligent React/Next.js dashboard that integrates with LLM APIs to generate dynamic, validated form questionnaires instantly from simple text descriptions. Users can edit, preview, and deploy forms in one click.",
    screenshots: ["/form-builder.png"]
  },
  {
    title: "AI Job Application Automator",
    description:
      "Automates job applications by extracting job details via OCR, generating tailored cover emails via Grok AI, and auto-drafting them using the Gmail API.",
    tags: ["React", "Node.js", "Express", "Tailwind CSS", "AI"],
    github: "https://github.com/tarunkulkarni4/auto-email",
    live: "https://auto-email-ebon.vercel.app/",
    problem: "Job hunters waste hours writing tailored cover letters and emails for hundreds of job openings, leading to fatigue and slow application cycles.",
    proposed: "A full-stack workflow automation tool that uses OCR to scan job posting details, utilizes Grok AI (via APIs) to draft custom-tailored cover emails, and hooks into Google OAuth/Gmail API to automatically save them as drafts.",
    screenshots: ["https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop"]
  },
  {
    title: "Negotiation E-Commerce Platform",
    description:
      "Real-time price negotiation platform between buyer and seller with Socket.io, authentication, and integrated payment system.",
    tags: ["React", "Node.js", "MongoDB", "Socket.io", "Express"],
    github: "https://github.com/tarunkulkarni4/Full-Stack-Ecommerce-Bargain-Negotiation",
    live: "https://github.com/tarunkulkarni4/Full-Stack-Ecommerce-Bargain-Negotiation",
    problem: "Online shopping lacks the interactive bargain and negotiation dynamics found in physical stores, making purchasing feel rigid and strictly algorithmic.",
    proposed: "A collaborative e-commerce platform using Socket.io for real-time web socket communication, allowing users to enter live negotiations with a smart pricing engine and pay via Stripe once a deal is struck.",
    screenshots: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop"]
  },
  {
    title: "Panchayat Management System",
    description:
      "Village administration system that manages residents, government schemes, and complaints with a full-stack dashboard.",
    tags: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/tarunkulkarni4/Panchayat-",
    live: "https://github.com/tarunkulkarni4/Panchayat-",
    problem: "Village administrative bodies (Panchayats) rely heavily on offline documentation and spreadsheets. This leads to information asymmetry, lack of transparency in local government funds, and unresolved citizen complaints.",
    proposed: "A digital portal that allows residents to log in, discover available welfare schemes, track village budget allocations, file complaints, and receive real-time resolution updates from district officials.",
    screenshots: ["https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=800&auto=format&fit=crop"]
  },
  {
    title: "Scheduler — Meeting Platform",
    description:
      "Meeting scheduling platform with Google Calendar integration, time-zone sync, and smart conflict resolution powered by Clerk auth.",
    tags: ["Next.js", "Prisma", "Clerk", "Neon DB", "Tailwind CSS"],
    github: "https://github.com/tarunkulkarni4/Scheduler",
    live: "https://scheduler-pret.vercel.app/",
    problem: "Endless back-and-forth emails to negotiate meeting times across different time zones often result in scheduling conflicts, missed calls, and double-bookings.",
    proposed: "A beautiful Calendly clone built using Next.js 14 and Prisma. It integrates with Google Calendar API and Clerk Authentication to provide users with persistent scheduling links and instant timezone synchronization.",
    screenshots: ["https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800&auto=format&fit=crop"]
  },
  {
    title: "Prescripto — Doctor Appointment",
    description:
      "Full-stack doctor appointment booking system with real-time availability, JWT auth, and a clean patient-facing dashboard.",
    tags: ["React", "Node.js", "MongoDB", "Express", "JWT"],
    github: "https://github.com/tarunkulkarni4/Prescripto-front-end",
    live: "https://prescripto-front-end-ulur.vercel.app/",
    problem: "Patients struggle to view doctors' available slots in real-time, resulting in long phone queues and tedious manual scheduling for clinical staff.",
    proposed: "An end-to-end healthcare booking portal with separate patient, doctor, and admin modules. Patient profiles can search doctors by specialty, check availability calendars, book appointments instantly, and pay securely.",
    screenshots: ["https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop"]
  },
  {
    title: "Job Tab Auto Reloader",
    description:
      "Auto-refreshes job listing tabs at set intervals, keeping sessions active and alerting when new listings appear.",
    tags: ["JavaScript", "HTML", "CSS"],
    github: "https://github.com/tarunkulkarni4/LinkedIn-refresh-job-extension",
    problem: "Job-seeking platforms expire browser sessions quickly, or fail to load real-time listing updates without manual page refreshes, causing applicants to miss early openings.",
    proposed: "A lightweight Chrome extension built in vanilla JavaScript that injects clean intervals to refresh active boards, plays custom audio alerts upon new posts, and maintains session states in background workers.",
    screenshots: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"]
  },
  {
    title: "Apply-Mate Chrome Extension",
    description:
      "Chrome extension to store job application data and auto-fill forms — making job hunting faster and more organized.",
    tags: ["JavaScript", "Chrome APIs", "HTML", "CSS"],
    github: "https://github.com/tarunkulkarni4/applymate-chrome-extension",
    problem: "Job application forms across different portals ask for the exact same contact, educational, and social link details. Repeated copy-pasting is slow and prone to errors.",
    proposed: "A browser-integrated utility using Chrome Storage APIs and DOM content script injections. It securely caches your professional bio and instantly auto-fills matching inputs on standard job applicant pages.",
    screenshots: ["https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=800&auto=format&fit=crop"]
  },
  {
    title: "TalentFlow AI — HR Screening Dashboard",
    description:
      "AI-powered recruitment platform with automated screening phone interviews via Bolna AI, Groq (Llama-3) resume parsing, and smart call scheduling.",
    tags: ["Next.js", "Node.js", "Bolna AI", "Tailwind CSS", "MongoDB"],
    github: "https://github.com/tarunkulkarni4/hr-screening-web-app",
    live: "https://github.com/tarunkulkarni4/hr-screening-web-app",
    problem: "Recruiters waste hundreds of hours conducting repetitive 10-minute introductory phone screening calls for hundreds of candidate applications.",
    proposed: "A cutting-edge SaaS platform that automates initial HR screens. It orchestrates real-time conversational phone calls via Bolna AI, parses and grades resume content using Llama-3 (Groq API), and aggregates ratings in a clean Next.js CRM.",
    screenshots: ["https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=800&auto=format&fit=crop"]
  },
];

export const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    college: "Cambridge Institute of Technology, Bengaluru",
    year: "2023 — 2025",
    cgpa: "8.69 / 10",
    focus: "Data Structures, Web Technologies",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    college: "KLE's GH BCA College, Haveri",
    year: "2020 — 2023",
    cgpa: "74%",
    focus: "Core CS, Programming Fundamentals",
  },
];

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/tarunkulkarni4",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/tarun-kulakarni-35b475254/",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    url: "https://x.com/TARUNKULKARNI5",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/Tarun_kulakarni/",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.512 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z" />
      </svg>
    ),
  },
];

export const navLinks = [
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

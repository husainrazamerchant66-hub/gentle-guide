import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { listProjects, sendMessage } from "@/lib/site.functions";
import { previewImage } from "@/lib/preview";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Atom,
  Braces,
  Check,
  CheckCircle2,
  Code2,
  Database,
  FileCode2,
  Globe2,
  Layers3,
  LayoutTemplate,
  Mail,
  Menu,
  MonitorSmartphone,
  Palette,
  Rocket,
  Send,
  Sparkles,
  Terminal,
  Wind,
  X,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  loader: () => listProjects(),
  head: () => ({
    meta: [
      { title: "Husainraza Merchant | Freelance Web Developer" },
      { name: "description", content: "Fast, modern websites, landing pages and web apps by Husainraza Merchant." },
      { property: "og:title", content: "Husainraza Merchant | Freelance Web Developer" },
      { property: "og:description", content: "Explore web development services, skills and projects by Husainraza Merchant." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navigation_items = [
  { label: "Home", href: "#home" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
];

const skill_items = [
  {
    name: "React",
    description: "Interactive interfaces",
    icon: Atom,
    color: "text-[#61DAFB]",
    background: "bg-[#61DAFB]/10",
  },
  {
    name: "Tailwind CSS",
    description: "Modern styling",
    icon: Wind,
    color: "text-[#38BDF8]",
    background: "bg-[#38BDF8]/10",
  },
  {
    name: "JavaScript",
    description: "Dynamic experiences",
    icon: Braces,
    color: "text-[#FACC15]",
    background: "bg-[#FACC15]/10",
  },
  {
    name: "HTML",
    description: "Semantic structure",
    icon: FileCode2,
    color: "text-[#FB923C]",
    background: "bg-[#FB923C]/10",
  },
  {
    name: "CSS",
    description: "Responsive layouts",
    icon: Palette,
    color: "text-[#A78BFA]",
    background: "bg-[#A78BFA]/10",
  },
  {
    name: "Supabase",
    description: "Backend & databases",
    icon: Database,
    color: "text-[#34D399]",
    background: "bg-[#34D399]/10",
  },
];

const service_items = [
  {
    number: "01",
    title: "Landing Pages & Sites",
    description:
      "Creating clean, beautiful websites for businesses that make a strong first impression and turn visitors into customers.",
    icon: LayoutTemplate,
  },
  {
    number: "02",
    title: "Mobile-Friendly Design",
    description:
      "Making sure your website looks and works perfectly on phones, tablets, and laptops, no matter the screen size.",
    icon: MonitorSmartphone,
  },
  {
    number: "03",
    title: "Web Apps & Databases",
    description:
      "Building interactive applications and connecting them to secure databases so users can log in and save their data.",
    icon: Database,
  },
];

const project_items = [
  {
    title: "E-commerce Website",
    category: "ONLINE STORE",
    description:
      "A modern shopping experience with clean product layouts and an intuitive interface.",
    stack: ["React", "Tailwind CSS", "JavaScript"],
    gradient: "from-[#262047] via-[#1B2445] to-[#101827]",
    accent: "bg-violet-400",
  },
  {
    title: "Business Landing Page",
    category: "BUSINESS WEBSITE",
    description:
      "A professional landing page designed to present services and encourage inquiries.",
    stack: ["HTML", "CSS", "JavaScript"],
    gradient: "from-[#15384B] via-[#17304B] to-[#111827]",
    accent: "bg-cyan-400",
  },
  {
    title: "Web Application Dashboard",
    category: "WEB APPLICATION",
    description:
      "A clean, functional dashboard concept for organizing information and managing workflows.",
    stack: ["React", "Tailwind CSS", "Supabase"],
    gradient: "from-[#30204A] via-[#202044] to-[#111827]",
    accent: "bg-fuchsia-400",
  },
];

const process_items = [
  {
    number: "01",
    title: "Let's Talk",
    description:
      "We discuss your idea, goals, and exactly what you need. I'll help turn your vision into a clear plan.",
    icon: Globe2,
  },
  {
    number: "02",
    title: "Build Fast",
    description:
      "High-speed development and live prototyping bring your project to life with modern tools.",
    icon: Zap,
  },
  {
    number: "03",
    title: "Test & Launch",
    description:
      "I test everything, fix bugs, polish the details, and get your website ready to go live.",
    icon: Rocket,
  },
];

const gradients = [
  "from-[#262047] via-[#1B2445] to-[#101827]",
  "from-[#15384B] via-[#17304B] to-[#111827]",
  "from-[#30204A] via-[#202044] to-[#111827]",
];
const accents = ["bg-violet-400", "bg-cyan-400", "bg-fuchsia-400"];

function Index() {
  const projects = Route.useLoaderData();
  const send = useServerFn(sendMessage);
  const [menu_open, set_menu_open] = useState(false);
  const [form_status, set_form_status] = useState<
    "idle" | "saved" | "error"
  >("idle");

  function handle_submit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const form_element = event.currentTarget;
    const form_data = new FormData(form_element);

    const contact_entry = {
      name: String(form_data.get("name") ?? "").trim(),
      email: String(form_data.get("email") ?? "").trim(),
      project_type: String(form_data.get("project_type") ?? "").trim(),
      message: String(form_data.get("message") ?? "").trim(),
    };

    if (
      !contact_entry.name ||
      !contact_entry.email ||
      !contact_entry.project_type ||
      !contact_entry.message
    ) {
      set_form_status("error");
      return;
    }

    send({ data: contact_entry })
      .then((res) => {
        if (res.ok) {
          set_form_status("saved");
          form_element.reset();
        } else set_form_status("error");
      })
      .catch(() => set_form_status("error"));
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#09090E] font-sans text-[#F5F5FA] selection:bg-violet-500/40">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#09090E]/90 backdrop-blur-xl">
        <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <a
            href="#home"
            className="group flex items-center gap-3"
            aria-label="Husainraza Merchant - Home"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#38BDF8] text-lg font-black text-white shadow-lg shadow-violet-500/10">
              H.
            </div>
            <div className="leading-tight">
              <span className="block text-sm font-bold tracking-tight text-white">
                Husainraza
              </span>
              <span className="block text-[10px] font-medium uppercase tracking-[0.22em] text-[#88889E]">
                Web Developer
              </span>
            </div>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {navigation_items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[#A3A3B5] transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-5 py-2.5 text-sm font-semibold text-[#C4B5FD] transition-all hover:border-violet-400/60 hover:bg-violet-500/20 sm:inline-flex"
          >
            Let's Talk
            <ArrowUpRight className="h-4 w-4" />
          </a>

          <button
            type="button"
            onClick={() => set_menu_open(!menu_open)}
            aria-label={menu_open ? "Close menu" : "Open menu"}
            aria-expanded={menu_open}
            aria-controls="mobile-navigation"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white lg:hidden"
          >
            {menu_open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {menu_open && (
          <div
            id="mobile-navigation"
            className="border-t border-white/10 bg-[#101019] px-5 py-5 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {navigation_items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => set_menu_open(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-[#C4C4D0] transition-colors hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => set_menu_open(false)}
                className="mt-3 flex items-center justify-between rounded-lg bg-violet-600 px-4 py-3 text-sm font-semibold text-white"
              >
                Contact Me
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero */}
        <section
          id="home"
          className="relative scroll-mt-24 overflow-hidden"
        >
          <div className="pointer-events-none absolute -right-44 top-0 h-[650px] w-[650px] rounded-full bg-violet-700/[0.13] blur-[130px]" />
          <div className="pointer-events-none absolute -left-56 top-52 h-[500px] w-[500px] rounded-full bg-blue-600/[0.08] blur-[120px]" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-24 sm:px-8 md:pt-32 lg:min-h-[730px] lg:grid-cols-[1.13fr_0.87fr] lg:gap-12 lg:px-12 lg:pb-32 lg:pt-24">
            <div className="max-w-3xl">
              <div className="mb-9 inline-flex items-center gap-2.5 rounded-full border border-violet-500/25 bg-violet-500/[0.08] px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-[#A78BFA] shadow-[0_0_12px_#A78BFA]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#C4B5FD]">
                  Freelance Web Developer
                </span>
              </div>

              <h1 className="max-w-[740px] text-[clamp(2.8rem,5.5vw,5.25rem)] font-extrabold leading-[1.09] tracking-[-0.055em] text-white">
                Fast, Modern Websites{" "}
                <span className="bg-gradient-to-r from-[#A78BFA] via-[#8B9CFF] to-[#53D5FF] bg-clip-text text-transparent">
                  Built for the Future
                </span>
              </h1>

              <p className="mt-8 max-w-xl text-base leading-[1.9] text-[#A0A0B5] sm:text-lg">
                Hi, I'm{" "}
                <span className="font-semibold text-[#EAEAF2]">
                  Husainraza Merchant.
                </span>{" "}
                I design and build high-performance web applications and
                landing pages using the latest development tools.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#projects"
                  className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#8257F5] to-[#6758EC] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(124,58,237,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(124,58,237,0.4)]"
                >
                  See My Work
                  <ArrowUpRight
                    size={18}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>

                <a
                  href="#contact"
                  className="inline-flex min-h-13 items-center justify-center gap-3 rounded-xl border border-white/[0.16] bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-[#F2F2FA] transition-all hover:border-violet-400/40 hover:bg-white/[0.08]"
                >
                  Contact Me
                  <ArrowRight size={18} />
                </a>
              </div>

              <div className="mt-14 flex flex-wrap items-center gap-6 border-t border-white/[0.08] pt-8 text-xs font-medium text-[#89899F] sm:gap-9">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#A78BFA]" />
                  Modern Technology
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#A78BFA]" />
                  Responsive Design
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#A78BFA]" />
                  Performance Focused
                </span>
              </div>
            </div>

            {/* Developer visual */}
            <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
              <div className="pointer-events-none absolute inset-10 rounded-full bg-gradient-to-br from-violet-600/20 to-cyan-500/10 blur-[80px]" />

              <div className="relative rotate-0 rounded-[26px] border border-white/[0.12] bg-[#141520] p-2.5 shadow-[0_35px_100px_rgba(0,0,0,0.5)] sm:p-3 lg:rotate-[2deg]">
                <div className="overflow-hidden rounded-[19px] border border-white/[0.07] bg-[#0C0D15]">
                  <div className="flex h-12 items-center justify-between border-b border-white/[0.08] bg-[#171824] px-4">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#FB7185]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#FBBF24]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#34D399]" />
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-[#8989A2]">
                      <Code2 size={13} />
                      portfolio.tsx
                    </div>
                    <div className="w-12" />
                  </div>

                  <div className="relative overflow-hidden px-6 pb-8 pt-11 sm:px-9 sm:pt-14">
                    <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-[#6D4AF5]/20 blur-[70px]" />
                    <div className="relative">
                      <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-500/15 text-[#B9A3FF] shadow-[0_0_40px_rgba(139,92,246,0.15)]">
                        <Terminal size={28} strokeWidth={1.8} />
                      </div>

                      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#A78BFA]">
                        Digital Craftsmanship
                      </p>
                      <h2 className="max-w-xs text-3xl font-bold leading-tight tracking-tight text-white sm:text-[35px]">
                        Ideas into
                        <br />
                        <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
                          reality.
                        </span>
                      </h2>
                      <p className="mt-4 max-w-[260px] text-sm leading-7 text-[#9999B0]">
                        Clean code. Beautiful design. Experiences that work.
                      </p>

                      <div className="mt-9 space-y-3">
                        {[
                          "Beautiful interfaces",
                          "Modern web technology",
                          "Optimized performance",
                        ].map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-3 rounded-lg border border-white/[0.07] bg-white/[0.035] px-3.5 py-3"
                          >
                            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-400/10 text-emerald-400">
                              <Check size={14} />
                            </span>
                            <span className="text-xs font-medium text-[#D5D5E2]">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/[0.07] bg-[#11131D] px-5 py-4">
                    <div className="flex items-center gap-2 font-mono text-[11px] text-[#9292AC]">
                      <span className="text-[#34D399]">$</span>
                      build something amazing
                    </div>
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#34D399]" />
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-xl border border-white/[0.12] bg-[#1B1C2B] px-4 py-3 shadow-2xl sm:-left-8">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
                  <Zap size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Fast & Modern</p>
                  <p className="text-[10px] text-[#9090A8]">
                    Built with purpose
                  </p>
                </div>
              </div>

              <div className="absolute -right-2 -top-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/30 bg-[#242039] text-[#C4B5FD] shadow-xl sm:-right-6">
                <Sparkles size={23} />
              </div>
            </div>
          </div>

          <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#65657C] lg:flex">
            Scroll to explore
            <ArrowDown size={13} />
          </div>
        </section>

        {/* Skills */}
        <section
          id="skills"
          className="scroll-mt-24 border-t border-white/[0.06] bg-[#0D0E16] py-24 sm:py-28"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="mb-12 max-w-2xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#A78BFA]">
                01 / My Toolkit
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                My <span className="text-[#A78BFA]">Skills</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-[#9999B0]">
                I use modern development tools and setups to build powerful
                applications much faster than traditional coding, without
                compromising on quality or design.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
              {skill_items.map((skill) => {
                const SkillIcon = skill.icon;

                return (
                  <div
                    key={skill.name}
                    className="group rounded-2xl border border-white/[0.08] bg-[#151621] px-4 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-[#1A1A2A]"
                  >
                    <div
                      className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${skill.background} ${skill.color}`}
                    >
                      <SkillIcon size={27} strokeWidth={1.7} />
                    </div>
                    <h3 className="text-sm font-bold text-white">
                      {skill.name}
                    </h3>
                    <p className="mt-2 text-[11px] leading-5 text-[#8989A1]">
                      {skill.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex items-center gap-3 rounded-xl border border-violet-500/15 bg-violet-500/[0.05] px-5 py-4">
              <Zap
                size={19}
                className="shrink-0 text-[#A78BFA]"
              />
              <p className="text-sm leading-6 text-[#ADADC1]">
                <span className="font-semibold text-[#D8CFFF]">
                  Modern tools, faster delivery.
                </span>{" "}
                The right technology helps turn your ideas into working
                products efficiently.
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section
          id="services"
          className="scroll-mt-24 py-24 sm:py-28"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="mb-12">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#A78BFA]">
                02 / What I Offer
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                What I <span className="text-[#A78BFA]">Do</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-[#9999B0]">
                From a simple landing page to a complete web application, I
                build digital experiences tailored to your needs.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {service_items.map((service) => {
                const ServiceIcon = service.icon;

                return (
                  <article
                    key={service.number}
                    className="group relative overflow-hidden rounded-[22px] border border-white/[0.09] bg-[#14151F] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30 sm:p-8"
                  >
                    <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-violet-600/[0.07] blur-[65px] transition-colors group-hover:bg-violet-600/[0.15]" />

                    <div className="relative">
                      <div className="mb-9 flex items-start justify-between">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-[#B6A1FF]">
                          <ServiceIcon size={26} strokeWidth={1.7} />
                        </div>
                        <span className="font-mono text-xs text-[#65657D]">
                          {service.number}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold tracking-tight text-white">
                        {service.title}
                      </h3>
                      <p className="mt-4 min-h-[100px] text-sm leading-7 text-[#9999B0]">
                        {service.description}
                      </p>

                      <div className="mt-6 border-t border-white/[0.08] pt-5">
                        <a
                          href="#contact"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[#BAA6FF] transition-colors hover:text-white"
                        >
                          Let's discuss
                          <ArrowUpRight size={16} />
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section
          id="projects"
          className="scroll-mt-24 border-y border-white/[0.06] bg-[#0D0E16] py-24 sm:py-28"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#A78BFA]">
                  03 / Portfolio
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  My <span className="text-[#A78BFA]">Projects</span>
                </h2>
                <p className="mt-5 max-w-xl text-base leading-8 text-[#9999B0]">
                  A look at the kinds of digital products and experiences I
                  build. Project previews are placeholders for actual work.
                </p>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#B9A7FF] transition-colors hover:text-white"
              >
                Have a project in mind?
                <ArrowUpRight size={17} />
              </a>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project, index) => (
                <article
                  key={project.id}
                  className="group overflow-hidden rounded-[22px] border border-white/[0.09] bg-[#171822] transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/25"
                >
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`relative block h-60 overflow-hidden bg-gradient-to-br ${gradients[index % gradients.length]}`}
                  >
                    <img
                      src={previewImage(project.url)}
                      alt={`${project.title} preview`}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <span className="absolute bottom-3 right-3 rounded-full border border-white/15 bg-[#0B0C15]/70 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest text-white/70 backdrop-blur">
                      Visit
                    </span>
                  </a>


                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <span className={`h-1.5 w-1.5 rounded-full ${project.accent}`} />
                      <span className="text-[10px] font-semibold tracking-[0.18em] text-[#9E9EB5]">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold tracking-tight text-white">
                      {project.title}
                    </h3>
                    <p className="mt-3 min-h-[72px] text-sm leading-6 text-[#9999AE]">
                      {project.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.stack.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-md border border-white/[0.09] bg-white/[0.04] px-2.5 py-1.5 text-[11px] font-medium text-[#BCBCCC]"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section
          id="process"
          className="scroll-mt-24 py-24 sm:py-28"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#A78BFA]">
                04 / The Process
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                How It <span className="text-[#A78BFA]">Works</span>
              </h2>
              <p className="mt-5 text-base leading-8 text-[#9999B0]">
                A simple, transparent process that takes your idea from the
                first conversation to a finished product.
              </p>
            </div>

            <div className="relative grid gap-8 md:grid-cols-3 md:gap-6">
              <div className="absolute left-[16.66%] right-[16.66%] top-7 hidden h-px bg-gradient-to-r from-violet-500/20 via-violet-500/60 to-cyan-400/20 md:block" />

              {process_items.map((step) => {
                const StepIcon = step.icon;

                return (
                  <div
                    key={step.number}
                    className="relative text-center"
                  >
                    <div className="relative z-10 mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/35 bg-[#1D1933] text-[#BAA6FF] shadow-[0_0_30px_rgba(139,92,246,0.1)]">
                      <StepIcon size={25} strokeWidth={1.8} />
                    </div>

                    <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#8B78DC]">
                      STEP {step.number}
                    </span>
                    <h3 className="mt-3 text-xl font-bold text-white">
                      {step.title}
                    </h3>
                    <p className="mx-auto mt-4 max-w-[290px] text-sm leading-7 text-[#9999B0]">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="scroll-mt-24 border-t border-white/[0.06] bg-[#0D0E16] py-24 sm:py-28"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#A78BFA]">
                  05 / Get in Touch
                </p>

                <h2 className="text-4xl font-bold leading-[1.15] tracking-tight text-white sm:text-5xl">
                  Let's Build
                  <br />
                  <span className="bg-gradient-to-r from-[#A78BFA] to-[#53D5FF] bg-clip-text text-transparent">
                    Something Great.
                  </span>
                </h2>

                <p className="mt-7 max-w-md text-base leading-8 text-[#A2A2B7]">
                  Have an idea for a website or web application? Tell me
                  about your project and let's explore how to bring it to
                  life.
                </p>

                <div className="mt-10 space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#1A1B29] text-[#BBA7FF]">
                      <Mail size={21} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Project Inquiries
                      </p>
                      <p className="mt-1 text-xs text-[#9292A7]">
                        Share what you have in mind
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#1A1B29] text-[#BBA7FF]">
                      <Code2 size={21} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Freelance Web Development
                      </p>
                      <p className="mt-1 text-xs text-[#9292A7]">
                        Websites, landing pages & web apps
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 rounded-2xl border border-violet-500/15 bg-gradient-to-br from-violet-500/[0.09] to-transparent p-6">
                  <Sparkles size={23} className="text-[#BBA7FF]" />
                  <p className="mt-4 text-lg font-semibold text-white">
                    Your idea deserves a great website.
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[#A0A0B4]">
                    Whether you're starting from scratch or improving an
                    existing product, let's create something that stands
                    out.
                  </p>
                </div>
              </div>

              <div className="rounded-[24px] border border-white/[0.1] bg-[#171822] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.15)] sm:p-9">
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15 text-[#BBA7FF]">
                    <Send size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Send a Message
                    </h3>
                    <p className="mt-1 text-xs text-[#9696AC]">
                      Tell me a little about your project.
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={handle_submit}
                  onChange={() => {
                    if (form_status !== "idle") set_form_status("idle");
                  }}
                  className="space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact_name"
                        className="mb-2 block text-sm font-medium text-[#D4D4E2]"
                      >
                        Name <span className="text-[#B9A5FF]">*</span>
                      </label>
                      <input
                        id="contact_name"
                        name="name"
                        type="text"
                        required
                        maxLength={120}
                        autoComplete="name"
                        placeholder="Your full name"
                        className="w-full rounded-xl border border-white/[0.1] bg-[#10111B] px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-[#696980] focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/10"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact_email"
                        className="mb-2 block text-sm font-medium text-[#D4D4E2]"
                      >
                        Email <span className="text-[#B9A5FF]">*</span>
                      </label>
                      <input
                        id="contact_email"
                        name="email"
                        type="email"
                        required
                        maxLength={254}
                        autoComplete="email"
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-white/[0.1] bg-[#10111B] px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-[#696980] focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact_project"
                      className="mb-2 block text-sm font-medium text-[#D4D4E2]"
                    >
                      Project Type <span className="text-[#B9A5FF]">*</span>
                    </label>
                    <select
                      id="contact_project"
                      name="project_type"
                      required
                      defaultValue=""
                      className="w-full cursor-pointer rounded-xl border border-white/[0.1] bg-[#10111B] px-4 py-3.5 text-sm text-white outline-none transition-colors focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/10"
                    >
                      <option value="" disabled>
                        Select your project type
                      </option>
                      <option value="Landing Page">
                        Landing Page
                      </option>
                      <option value="Business Website">
                        Business Website
                      </option>
                      <option value="Web Application">
                        Web Application
                      </option>
                      <option value="E-commerce Website">
                        E-commerce Website
                      </option>
                      <option value="Other">
                        Something Else
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact_message"
                      className="mb-2 block text-sm font-medium text-[#D4D4E2]"
                    >
                      Message <span className="text-[#B9A5FF]">*</span>
                    </label>
                    <textarea
                      id="contact_message"
                      name="message"
                      required
                      rows={5}
                      maxLength={5000}
                      placeholder="Tell me about your project, goals, and what you're looking to build..."
                      className="w-full resize-y rounded-xl border border-white/[0.1] bg-[#10111B] px-4 py-3.5 text-sm leading-7 text-white outline-none transition-colors placeholder:text-[#696980] focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/10"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#8257F5] to-[#6758EC] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-violet-600/15 transition-all hover:from-[#946CFF] hover:to-[#7970FF] hover:shadow-violet-600/30"
                  >
                    Send Message
                    <ArrowUpRight
                      size={18}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>

                  {form_status === "saved" && (
                    <div
                      role="status"
                      className="flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.07] p-4 text-sm leading-6 text-emerald-300"
                    >
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0"
                      />
                      Your message was saved in this browser. Online
                      delivery is not connected yet.
                    </div>
                  )}

                  {form_status === "error" && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-500/20 bg-red-500/[0.07] p-4 text-sm text-red-300"
                    >
                      Your message could not be saved. Please check your
                      details and try again.
                    </div>
                  )}

                  <p className="text-center text-[11px] leading-5 text-[#74748C]">
                    This demo stores submissions locally until a contact
                    backend is connected.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.07] bg-[#09090E]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 text-sm font-black text-white">
                H.
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  Husainraza Merchant
                </p>
                <p className="mt-1 text-[11px] text-[#77778F]">
                  Freelance Web Developer
                </p>
              </div>
            </div>

            <p className="text-xs text-[#77778F]">
              © {new Date().getFullYear()} Husainraza Merchant. All rights
              reserved.
            </p>

            <a
              href="#home"
              className="inline-flex items-center gap-2 text-xs font-medium text-[#AFAFC2] transition-colors hover:text-white"
            >
              Back to top
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

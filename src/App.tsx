import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, BriefcaseBusiness, Check,
  Code2, Database, Download, ExternalLink, Github, Globe2, Layers3, Linkedin,
  Mail, Menu, Moon, Phone, Send, ShieldCheck, Sparkles, Sun, Workflow, X, Wrench,
} from 'lucide-react';

// Update the editable profile values here. Add your resume PDF to /public and set its filename below.
const profile = {
  name: 'Anto Jemin',
  role: 'MES & .NET Software Engineer',
  email: 'jeminanto1602@gmail.com',
  phone: '+91 8098304897',
  linkedin: 'https://www.linkedin.com/in/anto-jemin-238283227/',
  github: 'https://github.com/AntoJemin',
  resume: '/Anto-Jemin-Resume.pdf', // Add your PDF to the public folder
  availability: 'Open to MES & .NET opportunities',
};

const nav = ['About', 'Skills', 'Experience', 'Projects', 'Contact'];
const skillGroups = [
  { icon: Code2, title: 'Programming Languages', skills: ['C#', 'SQL', 'JavaScript', 'C', 'C++'] },
  { icon: Layers3, title: '.NET Ecosystem', skills: ['.NET', 'ASP.NET MVC', 'ASP.NET Web API', 'REST API', 'WPF', 'XAML', 'MVVM', 'MVC', 'LINQ', 'Dapper', 'NHibernate'] },
  { icon: Workflow, title: 'MES Applications', skills: ['MES Client Application', 'MES Measurement Application', 'MES Toolbox Application', 'MES Web Management Application', 'Workflow Management', 'Shop-floor Operations', 'Web API Customization'] },
  { icon: Database, title: 'PLM Systems', skills: ['Siemens Teamcenter', 'PTC Windchill', 'BMIDE', 'BOM Management', 'T4S', 'Dispatcher', 'Engineering Data Management'] },
  { icon: Wrench, title: 'Tools & Delivery', skills: ['MS SQL Server', 'Visual Studio', 'Git / GitHub', 'ServiceNow', 'Postman', 'RoundhousE', 'Agile Scrum', 'SDLC'] },
];
const projects = [
  { n: '01', type: 'MES · WEB MANAGEMENT', title: 'MES Web Management Application', desc: 'Web-based administration capabilities supporting configuration and management of MES operations, including role-based access and integration with client applications.', tags: ['C#', '.NET', 'ASP.NET MVC', 'Web API', 'SQL Server'], icon: Globe2, color: 'blue' },
  { n: '02', type: 'MES · CLIENT APPLICATION', title: 'MES Client Application', desc: 'Development and enhancement of a WPF-based MES client supporting shop-floor workflows, operational features and integration with backend services.', tags: ['C#', '.NET', 'WPF', 'MVVM', 'REST API'], icon: Code2, color: 'violet' },
  { n: '03', type: 'MES · MEASUREMENT & TOOLBOX', title: 'MES Measurement & Toolbox Applications', desc: 'Enhancements to measurement workflows and supporting toolbox functionality, including drawing selection, measurement process improvements and production-facing utilities.', tags: ['PCS', 'C#', '.NET', 'WPF', 'SQL Server'], icon: Workflow, color: 'cyan' },
  { n: '04', type: 'PLM · PRODUCT ENGINEERING', title: 'Teamcenter PLM & Web API Customization', desc: 'PLM-related development and integration work supporting enterprise engineering data management and manufacturing-related information exchange. Project details are kept high-level.', tags: ['Teamcenter PLM', 'BMIDE', 'BOM', 'REST API', 'Integration'], icon: Layers3, color: 'pink' },
];
const expertise = [
  { icon: Workflow, title: 'MES application development', desc: 'Developing and enhancing MES web management, client, measurement and toolbox applications for manufacturing operations.', tags: ['MES Web Management', 'MES Client', 'Measurement', 'Toolbox'] },
  { icon: Code2, title: '.NET application development', desc: 'Building desktop applications, web modules and backend services using C# and the .NET ecosystem.', tags: ['C#', 'WPF / MVVM', 'ASP.NET MVC', 'Web API'] },
  { icon: Layers3, title: 'PLM systems & integration', desc: 'Supporting product lifecycle platforms and engineering data processes across enterprise environments.', tags: ['Teamcenter', 'Windchill', 'BMIDE', 'BOM'] },
  { icon: Database, title: 'Database & API development', desc: 'Developing REST integrations and SQL solutions, with attention to data quality, query performance and application reliability.', tags: ['SQL Server', 'REST API', 'Dapper', 'NHibernate'] },
];

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

export default function App() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const [showTop, setShowTop] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [formError, setFormError] = useState('');
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 550);
      const current = nav.map((id) => ({ id, el: document.getElementById(id.toLowerCase()) })).filter(x => x.el && x.el!.getBoundingClientRect().top <= 150).pop();
      if (current) setActive(current.id);
    };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => { document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); };
  const submitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSent(false);
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      setFormError('Please complete all fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setFormError('Please enter a valid email address.');
      return;
    }
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      setFormError('The contact form is not connected yet. Please email jeminanto1602@gmail.com directly, or configure EmailJS.');
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            to_email: profile.email,
            from_name: form.name,
            from_email: form.email,
            subject: form.subject,
            message: form.message,
            reply_to: form.email,
          },
        }),
      });
      if (!response.ok) throw new Error('Email service could not send the message.');
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setFormError('Message could not be sent. Please try again or email jeminanto1602@gmail.com directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return <div className={dark ? 'site dark' : 'site light'}>
    <div className="ambient ambient-one"/><div className="ambient ambient-two"/>
    <header className="topbar"><a className="brand" href="#home" onClick={(e) => { e.preventDefault(); go('home'); }}><span className="brand-mark">AJ<span>.</span></span><span className="brand-label">ANTO JEMIN</span></a>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>{nav.map(item => <button key={item} className={active === item ? 'nav-link active' : 'nav-link'} onClick={() => go(item)}>{item}</button>)}</nav>
      <div className="nav-actions"><button className="icon-button theme-button" aria-label="Toggle color theme" onClick={() => setDark(!dark)}>{dark ? <Sun size={17}/> : <Moon size={17}/>}</button><button className="nav-cta" onClick={() => go('contact')}>Let's talk <ArrowUpRight size={15}/></button><button className="icon-button menu-button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button></div>
    </header>

    <main>
      <section className="hero" id="home"><div className="hero-grid"/><div className="hero-content">
        <Reveal><div className="availability"><span className="pulse"/>{profile.availability}</div></Reveal>
        <Reveal delay={0.08}><h1 className="hero-name">ANTO JEMIN</h1></Reveal>
        <Reveal delay={0.16}><div className="hero-specialty">Manufacturing Software Developer | MES | PLM | C# | .NET | WPF | MVVM | SQL | Industry 4.0</div><div className="hero-buttons"><a className="button primary" href={profile.resume} download><Download size={17}/> Download resume</a><button className="button secondary" onClick={() => go('projects')}>Explore projects <ArrowDownRight size={17}/></button></div><div className="social-row"><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17}/></a><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17}/></a><span className="social-divider"/><span className="social-note">Based in Bengaluru, India</span></div></Reveal>
      </div>
      <Reveal className="hero-visual" delay={0.22}><div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="visual-core"><div className="core-glow"/><Code2 size={58} strokeWidth={1.15}/><span>BUILD · INTEGRATE · IMPROVE</span></div>
        <div className="float-card float-code"><span className="tiny-dot"/><span>TECHNOLOGIES</span><strong>C#, .NET, ASP.NET Core, WPF, Web API, REST API, SQL Server, JavaScript, Git and Visual Studio</strong></div>
        <div className="float-card float-data"><Database size={16}/><span>FUNCTIONAL EXPERTISE</span><strong>MES Development, Teamcenter PLM, BMIDE, T4S, Dispatcher, BOM Management, OOP, Design Patterns, MVVM, MVC and Workflow Automation</strong></div>
        <div className="float-card float-mes"><Workflow size={16}/><span>INDUSTRY EXPERTISE</span><strong>Healthcare, Aerospace, Automotive and Manufacturing</strong></div>
        <div className="visual-caption">FROM ENGINEERING IDEAS TO PRODUCTION-READY SYSTEMS</div></Reveal>
      <button className="scroll-cue" onClick={() => go('about')}><span>SCROLL TO EXPLORE</span><ArrowDown size={15}/></button></section>

      <section className="section about-section" id="about"><div className="section-index">01 / ABOUT</div><div className="about-layout"><Reveal><SectionHeading eyebrow="ABOUT ME" title={<>Bridging software<br/>and <span className="gradient-text">manufacturing.</span></>}/></Reveal><Reveal delay={0.1}><div className="about-copy professional-summary">
          <p className="lead">I’m an MES and .NET Software Engineer with <strong>4.8+ years of experience</strong> building and supporting enterprise applications.</p>
          <p>My experience spans C#/.NET development, manufacturing applications, REST API customization, SQL Server and PLM systems, including Siemens Teamcenter.</p>
          <div className="summary-points">
            <div className="summary-point"><ArrowRight size={16}/><span>Developing MES web, client, measurement and toolbox applications.</span></div>
            <div className="summary-point"><ArrowRight size={16}/><span>Building .NET applications, WPF interfaces and Web API integrations.</span></div>
            <div className="summary-point"><ArrowRight size={16}/><span>Working with Teamcenter PLM and enterprise engineering data.</span></div>
          </div>
        </div></Reveal></div>
        <div className="stats-grid"><div className="stat"><strong>4.8<span>+</span></strong><span>Years of experience</span><small>Professional experience</small></div><div className="stat"><strong>05<span>+</span></strong><span>Technology domains</span><small>Across software & engineering</small></div><div className="stat"><strong>MES<span>/</span>PLM</strong><span>Enterprise domains</span><small>Manufacturing & product lifecycle</small></div><div className="stat"><strong>C#</strong><span>Core engineering stack</span><small>Desktop, services & APIs</small></div></div>
      </section>

      <section className="section skills-section" id="skills"><div className="section-index">02 / TOOLKIT</div><Reveal><SectionHeading eyebrow="TECHNICAL SKILLS" title={<>The tools behind<br/><span className="gradient-text">the work.</span></>} text="A focused toolkit grouped by programming, .NET development, MES applications and PLM platforms."/></Reveal><div className="skills-grid">{skillGroups.map((group, i) => <Reveal key={group.title} delay={i * 0.06}><article className="skill-card"><div className="card-top"><span className="skill-icon"><group.icon size={19}/></span><span className="card-count">0{i + 1}</span></div><h3>{group.title}</h3><div className="tag-list">{group.skills.map(skill => <span className="tag" key={skill}>{skill}</span>)}</div></article></Reveal>)}</div></section>

      <section className="section experience-section" id="experience"><div className="section-index">03 / EXPERIENCE</div><Reveal><SectionHeading eyebrow="PROFESSIONAL JOURNEY" title={<>Building systems.<br/><span className="gradient-text">Solving problems.</span></>} text="Experience across enterprise software delivery, manufacturing applications and product lifecycle platforms."/></Reveal><div className="timeline">
        <Reveal>
          <article className="timeline-item">
            <div className="timeline-marker"><BriefcaseBusiness size={17}/></div>
            <div className="timeline-content">
              <div className="timeline-meta"><span className="eyebrow">CURRENT ROLE</span><span className="role-date">JAN 2025 – PRESENT</span></div>
              <h3>Consultant – MES Software Development (.NET Developer) & PLM</h3>
              <h4>Hitachi Digital Services</h4>
              <div className="experience-summary">
                <strong>Project summary – MES Application Development</strong>
                <p>Designed and developed modules for workflow management, maintenance scheduling, shop-floor operations and document handling. Enhanced user experience through dynamic UI features, document colour configuration and automatic selection options. Integrated backend APIs with WPF client applications and configured web-based administration modules for role-based access.</p>
              </div>
              <strong className="activity-heading">Key activities</strong>
              <ul className="check-list">
                <li><ArrowRight/>Developed and enhanced MES Web Management, MES Client, MES Measurement and MES Toolbox applications using C# and .NET.</li>
                <li><ArrowRight/>Collaborated with business stakeholders to understand requirements and translate them into technical solutions.</li>
                <li><ArrowRight/>Implemented enhancements for production workflows, scheduling, document management, shop-floor integrations and system automation.</li>
                <li><ArrowRight/>Customized and integrated Web APIs, and optimized SQL queries and backend services for enterprise integrations.</li>
                <li><ArrowRight/>Improved database performance through SQL query tuning and efficient data handling.</li>
                <li><ArrowRight/>Worked with PLM systems including Siemens Teamcenter and PTC Windchill, supporting engineering data management and manufacturing-related integration requirements.</li>
                <li><ArrowRight/>Performed troubleshooting, root cause analysis, defect resolution and L2/L3 application support for MES and PLM systems.</li>
                <li><ArrowRight/>Applied object-oriented programming principles and software design best practices.</li>
                <li><ArrowRight/>Participated in Agile Scrum ceremonies, including sprint planning, daily stand-ups, reviews and retrospectives.</li>
                <li><ArrowRight/>Executed manual testing against defined test cases and prepared CSV-related documentation to support end users.</li>
              </ul>
              <div className="tag-list"><span className="tag">C#</span><span className="tag">.NET</span><span className="tag">WPF / MVVM</span><span className="tag">ASP.NET MVC</span><span className="tag">Web API</span><span className="tag">MS SQL</span><span className="tag">Teamcenter PLM</span><span className="tag">MES / PCS</span><span className="tag">Visual Studio</span></div>
            </div>
          </article>
        </Reveal>
        <Reveal delay={0.1}>
          <article className="timeline-item">
            <div className="timeline-marker muted"><Layers3 size={17}/></div>
            <div className="timeline-content">
              <div className="timeline-meta"><span className="eyebrow">PREVIOUS EXPERIENCE</span><span className="role-date">JAN 2023 – 2025</span></div>
              <h3>Application Engineer</h3>
              <h4>LEADEC INDIA Pvt. Ltd. · TAMCOE – Technology supported by GE Aerospace</h4>
              <p>Developed and supported quality application workflows for additive manufacturing, post-processing and inspection in an aerospace manufacturing environment.</p>
              <ul className="check-list">
                <li><ArrowRight/>Developed quality application workflows for additive manufacturing, post-processing and inspection using C# and .NET.</li>
                <li><ArrowRight/>Built and customized modules for work-order tracking, process validation and quality checks using ASP.NET MVC and MS SQL.</li>
                <li><ArrowRight/>Designed and optimized backend APIs and database queries to ensure efficient data flow across application layers.</li>
                <li><ArrowRight/>Collaborated with cross-functional teams to translate business requirements into scalable .NET solutions.</li>
                <li><ArrowRight/>Automated workflow processes to improve traceability and reduce manual effort.</li>
              </ul>
              <div className="tag-list"><span className="tag">B2B</span><span className="tag">MES</span><span className="tag">PLM</span><span className="tag">C#</span><span className="tag">.NET</span><span className="tag">ASP.NET MVC</span><span className="tag">Web API</span><span className="tag">MS SQL Server</span></div>
            </div>
          </article>
        </Reveal>
        <Reveal delay={0.2}>
          <article className="timeline-item">
            <div className="timeline-marker muted"><Workflow size={17}/></div>
            <div className="timeline-content">
              <div className="timeline-meta"><span className="eyebrow">EARLIER EXPERIENCE</span><span className="role-date">JAN 2022 – JAN 2023</span></div>
              <h3>Engineer</h3>
              <h4>Shri Mayuram Industries</h4>
              <p>Supported production planning, execution and monitoring activities in a manufacturing environment.</p>
              <ul className="check-list">
                <li><ArrowRight/>Supported production planning, execution and monitoring activities.</li>
                <li><ArrowRight/>Maintained production data, OEE tracking and execution metrics to support shop-floor performance.</li>
                <li><ArrowRight/>Coordinated manufacturing issue resolution and corrective actions.</li>
              </ul>
            </div>
          </article>
        </Reveal>
      </div></section>

      <section className="section projects-section" id="projects"><div className="section-index">04 / SELECTED WORK</div><Reveal><div className="projects-heading"><SectionHeading eyebrow="FEATURED PROJECTS" title={<>Applied engineering.<br/><span className="gradient-text">Tangible outcomes.</span></>} text="A selection of application and platform work across manufacturing, enterprise software and personal product development."/><span className="project-count">04 <small>PROJECTS</small></span></div></Reveal><div className="projects-grid">{projects.map((project, i) => <Reveal key={project.n} delay={i * 0.07}><article className={`project-card ${project.color}`}><div className="project-art"><div className="art-grid"/><div className="art-icon"><project.icon size={42} strokeWidth={1.2}/></div><span className="project-number">{project.n}</span><span className="art-label">{project.type}</span><div className="art-lines"><i/><i/><i/></div></div><div className="project-info"><div className="project-meta"><span>CASE STUDY</span><ArrowUpRight size={16}/></div><h3>{project.title}</h3><p>{project.desc}</p><div className="tag-list">{project.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div><span className="project-footnote">OVERVIEW · CONFIDENTIAL DETAILS OMITTED</span></div></article></Reveal>)}</div><p className="confidential-note"><ShieldCheck size={15}/> Project descriptions are intentionally high-level to respect client and employer confidentiality.</p></section>

      <section className="section expertise-section"><div className="section-index">05 / WHAT I DO</div><Reveal><SectionHeading eyebrow="PROFESSIONAL EXPERTISE" title={<>Where I create<br/><span className="gradient-text">the most value.</span></>}/></Reveal><div className="expertise-grid">{expertise.map((item, i) => <Reveal key={item.title} delay={i * 0.06}><article className="expertise-card"><span className="expertise-icon"><item.icon size={21}/></span><span className="expertise-num">0{i + 1}</span><h3>{item.title}</h3><p>{item.desc}</p><div className="tag-list">{item.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div></article></Reveal>)}</div></section>

      <section className="section education-section"><div className="section-index">06 / CONTINUOUS LEARNING</div><div className="education-layout"><Reveal><SectionHeading eyebrow="EDUCATION & DEVELOPMENT" title={<>Always learning.<br/><span className="gradient-text">Always improving.</span></>} text="A space for academic qualifications, certifications and professional development."/></Reveal><Reveal delay={0.1}><div className="education-placeholder learning-cards">
            <div className="edu-row"><span className="edu-icon"><Globe2 size={19}/></span><div><strong>MBA – Technology Management</strong><p>Alagappa University · Pursuing</p></div><span className="edit-label">EDUCATION</span></div>
            <div className="edu-row"><span className="edu-icon"><Globe2 size={19}/></span><div><strong>B.E. – Mechanical Engineering</strong><p>DMI College of Engineering, Chennai · Anna University · 2018–2022 · CGPA 7.60</p></div><span className="edit-label">EDUCATION</span></div>
            <div className="edu-row"><span className="edu-icon"><ShieldCheck size={19}/></span><div><strong>Technical Certifications</strong><p>C, C++, C#/.NET and SQL · Generative AI and other technical programs</p></div><span className="edit-label">CERTIFICATIONS</span></div>
            <div className="edu-row"><span className="edu-icon"><ShieldCheck size={19}/></span><div><strong>Professional Qualifications</strong><p>Internal Auditor – ISO 9001:2015 · EHS Safety Training – GE</p></div><span className="edit-label">QUALIFICATIONS</span></div>
            <div className="edu-row"><span className="edu-icon"><Sparkles size={19}/></span><div><strong>Workshops & Continuous Learning</strong><p>Microsoft Excel using AI · Ongoing technical learning</p></div><span className="edit-label">WORKSHOPS</span></div>
          </div></Reveal></div></section>

      <section className="contact-section" id="contact"><div className="contact-glow"/><div className="section-index">07 / GET IN TOUCH</div><div className="contact-layout"><Reveal><div className="contact-intro"><span className="eyebrow">HAVE AN INTERESTING PROJECT OR OPPORTUNITY?</span><h2>Let's build<br/><span className="gradient-text">what's next.</span></h2><p>Let's connect and build something impactful together. I'm always glad to discuss engineering challenges, software opportunities and ideas worth building.</p><div className="contact-links"><a href={`tel:+918098304897`}><span className="contact-link-icon"><Phone size={17}/></span><span><small>PHONE</small><strong>{profile.phone}</strong></span><ArrowUpRight size={16}/></a><a href={`mailto:${profile.email}`}><span className="contact-link-icon"><Mail size={17}/></span><span><small>EMAIL</small><strong>{profile.email}</strong></span><ArrowUpRight size={16}/></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><span className="contact-link-icon"><Linkedin size={17}/></span><span><small>LINKEDIN</small><strong>Connect professionally</strong></span><ArrowUpRight size={16}/></a><a href={profile.github} target="_blank" rel="noreferrer"><span className="contact-link-icon"><Github size={17}/></span><span><small>GITHUB</small><strong>Explore code & projects</strong></span><ArrowUpRight size={16}/></a></div></div></Reveal>
        <Reveal delay={0.1}><form className="contact-form" onSubmit={submitContact} noValidate><div className="form-heading"><h3>Send a message</h3><span>I'll get back to you</span></div><div className="form-row"><label>Your name<input value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="Jane Smith" autoComplete="name"/></label><label>Email address<input value={form.email} onChange={e => setForm({...form, email:e.target.value})} placeholder="jane@company.com" type="email" autoComplete="email"/></label></div><label>Subject<input value={form.subject} onChange={e => setForm({...form, subject:e.target.value})} placeholder="What would you like to discuss?"/></label><label>Message<textarea value={form.message} onChange={e => setForm({...form, message:e.target.value})} placeholder="Tell me a little about your project or opportunity..." rows={5}/></label>{formError && <p className="form-error">{formError}</p>}{sent && <p className="form-success">Your message has been sent successfully. Thank you for reaching out!</p>}<button className="button primary send-button" type="submit" disabled={submitting}>{submitting ? "Sending..." : "Send message"} <Send size={16}/></button><p className="form-privacy">Messages are delivered to {profile.email} through the configured email service.</p></form></Reveal></div></section>
    </main>
    <footer className="footer"><a className="brand" href="#home" onClick={e => {e.preventDefault();go('home')}}><span className="brand-mark">AJ<span>.</span></span><span className="brand-label">ANTO JEMIN</span></a><span>Designed to communicate engineering that makes a difference.</span><span className="footer-copy">© {new Date().getFullYear()} Anto Jemin</span><button className="back-top" onClick={() => go('home')} aria-label="Back to top"><ArrowUpRight size={17}/></button></footer>
    {showTop && <button className="floating-top" onClick={() => go('home')} aria-label="Back to top"><ArrowUpRight size={18}/></button>}
  </div>;
}

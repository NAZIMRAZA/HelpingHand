/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import axios from 'axios';
import { 
  Wand2, 
  Layout, 
  Users, 
  MessageSquare, 
  Settings, 
  Home, 
  ShieldCheck, 
  Mail, 
  ArrowRight,
  Download,
  Eye,
  Menu,
  X,
  CreditCard,
  ShoppingBag,
  ExternalLink,
  Code
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Section = 'home' | 'about' | 'service' | 'contact' | 'auth' | 'admin' | 'builder-result';
type TemplateType = 'business' | 'minimalist' | 'crypto' | 'ecommerce' | 'chat';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [prompt, setPrompt] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('business');
  const [isBuilding, setIsBuilding] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);

  const templates: { id: TemplateType; title: string; description: string; icon: any }[] = [
    { 
      id: 'business', 
      title: 'Business', 
      description: 'Professional & corporate design for established brands.', 
      icon: Layout 
    },
    { 
      id: 'minimalist', 
      title: 'Minimalist', 
      description: 'Clean, simple, and elegant. Perfect for resumes & portfolios.', 
      icon: Wand2 
    },
    { 
      id: 'crypto', 
      title: 'Crypto', 
      description: 'Web3 focused with live calculators and AML policies.', 
      icon: CreditCard 
    },
    { 
      id: 'ecommerce', 
      title: 'E-commerce', 
      description: 'Amazon/Flipkart style store with separate vendor admin.', 
      icon: ShoppingBag 
    },
    { 
      id: 'chat', 
      title: 'Chat App', 
      description: 'Instagram-like UI with real-time Groq AI messaging.', 
      icon: MessageSquare 
    },
  ];

  const handleBuild = async () => {
    if (!prompt) return;
    setIsBuilding(true);
    
    try {
      const response = await axios.post("/api/generate", { 
        prompt, 
        template: selectedTemplate 
      });
      setGeneratedCode(response.data.content);
      setActiveSection('builder-result');
    } catch (error) {
      console.error("Build failed:", error);
      alert("Failed to build website. Check server logs.");
    } finally {
      setIsBuilding(false);
    }
  };

  const NavItem = ({ section, label, icon: Icon }: { section: Section; label: string; icon: any }) => (
    <button 
      onClick={() => { setActiveSection(section); setIsMenuOpen(false); }}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
        activeSection === section 
          ? 'bg-black text-white' 
          : 'hover:bg-gray-100 text-gray-600'
      }`}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-bottom border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setActiveSection('home')}
          >
            <div className="bg-black p-2 rounded-lg text-white">
              <Wand2 size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Nazcom <span className="text-gray-400 font-light">by Nazcorp</span></h1>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <NavItem section="home" label="Home" icon={Home} />
            <NavItem section="about" label="About" icon={Users} />
            <NavItem section="service" label="Service" icon={Layout} />
            <NavItem section="contact" label="Contact" icon={Mail} />
            <div className="h-4 w-[1px] bg-gray-200 mx-2" />
            <NavItem section="auth" label="Sign In" icon={ShieldCheck} />
            <button 
              onClick={() => setActiveSection('admin')}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-400"
              title="Admin Panel"
            >
              <Settings size={20} />
            </button>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-4 space-y-2"
            >
              <NavItem section="home" label="Home" icon={Home} />
              <NavItem section="about" label="About" icon={Users} />
              <NavItem section="service" label="Service" icon={Layout} />
              <NavItem section="contact" label="Contact" icon={Mail} />
              <NavItem section="auth" label="Sign In" icon={ShieldCheck} />
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {/* HOME SECTION */}
          {activeSection === 'home' && (
            <motion.section 
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="space-y-6">
                <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold tracking-wide uppercase">
                  Powered by AI
                </div>
                <h2 className="text-6xl font-extrabold leading-tight tracking-tighter">
                  Craft Your Vision <br />
                  <span className="text-gray-400 font-normal">Into Reality.</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                  Nazcraft leverages the power of Groq's Llama models to build fully functional, 
                  responsive websites in seconds. Tell us what you want, and watch the magic happen.
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setActiveSection('service')}
                    className="px-8 py-4 bg-black text-white rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform"
                  >
                    Start Crafting <ArrowRight size={20} />
                  </button>
                  <button 
                    onClick={() => setActiveSection('about')}
                    className="px-8 py-4 border-2 border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-colors"
                  >
                    Our Trust
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-[3rem] blur-2xl opacity-50" />
                <div className="relative bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden aspect-video flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl mx-auto flex items-center justify-center text-slate-400">
                      <Layout size={32} />
                    </div>
                    <p className="text-sm font-mono text-gray-400">PREVIEW_WINDOW_V1</p>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* ABOUT SECTION */}
          {activeSection === 'about' && (
            <motion.section 
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto space-y-8"
            >
              <h2 className="text-4xl font-bold">About Nazcorp</h2>
              <p className="text-lg text-gray-600">
                At Nazcorp, we believe in the democratization of the web. Our mission is to provide 
                expert-level web development tools to everyone, regardless of their technical 
                background.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-2xl border border-gray-100">
                  <h3 className="font-bold mb-2">Our Trust</h3>
                  <p className="text-gray-500 text-sm">Security and reliability are our core pillars. Your data belongs to you.</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-gray-100">
                  <h3 className="font-bold mb-2">Innovation</h3>
                  <p className="text-gray-500 text-sm">We use cutting-edge LLMs to ensure your code is modern, fast, and SEO-friendly.</p>
                </div>
              </div>
            </motion.section>
          )}

          {/* SERVICE / BUILDER SECTION */}
          {activeSection === 'service' && (
            <motion.section 
              key="service"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold tracking-tight">AI Web Crafter (Nazcom)</h2>
                <p className="text-gray-500 max-w-xl mx-auto">
                  Describe your dream project and select a design path. 
                  Our engine will handle the code.
                </p>
              </div>

              <div className="max-w-4xl mx-auto space-y-8">
                {/* Prompt Input */}
                <div className="space-y-4">
                  <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Write Your Prompt</label>
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g. Build a luxury real estate landing page with a featured property section and an agent contact form..."
                    className="w-full h-40 p-6 bg-white rounded-[2rem] border-2 border-gray-100 focus:border-black outline-none transition-all text-lg shadow-sm"
                  />
                </div>

                {/* Template Selection */}
                <div className="space-y-4">
                  <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Select Template Path</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
                    {templates.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setSelectedTemplate(t.id)}
                        className={`p-6 rounded-[2rem] border-2 transition-all text-left flex flex-col gap-4 ${
                          selectedTemplate === t.id 
                            ? 'bg-black text-white border-black shadow-lg scale-105' 
                            : 'bg-white border-gray-100 hover:border-gray-300'
                        }`}
                      >
                        <t.icon size={24} className={selectedTemplate === t.id ? 'text-blue-400' : 'text-gray-400'} />
                        <div>
                          <p className="font-bold text-sm uppercase leading-none">{t.title}</p>
                          <p className={`text-[10px] mt-1 leading-tight ${selectedTemplate === t.id ? 'text-gray-400' : 'text-gray-400'}`}>
                            {t.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Build Button */}
                <div className="flex justify-center pt-8">
                  <button 
                    disabled={!prompt || isBuilding}
                    onClick={handleBuild}
                    className="group relative px-12 py-5 bg-black text-white rounded-full font-bold overflow-hidden disabled:opacity-50 disabled:scale-100 hover:scale-105 transition-all"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      {isBuilding ? (
                        <>
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                          >
                            <Settings size={20} />
                          </motion.div>
                          Crafting Web Magic...
                        </>
                      ) : (
                        <>
                          <Wand2 size={22} className="group-hover:rotate-12 transition-transform" />
                          Launch Builder
                        </>
                      )}
                    </span>
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </button>
                </div>
              </div>
            </motion.section>
          )}

          {/* BUILDER RESULT PAGE */}
          {activeSection === 'builder-result' && (
            <motion.section 
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500 w-3 h-3 rounded-full animate-pulse" />
                  <span className="font-bold text-xs uppercase tracking-widest">Build Success</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-bold">
                    <Eye size={16} /> View External
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-bold">
                    <Download size={16} /> Download Source
                  </button>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden h-[600px] flex flex-col">
                  <div className="bg-gray-900 p-3 flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                  <iframe 
                    title="preview"
                    className="w-full flex-grow border-none"
                    srcDoc={generatedCode || ''}
                  />
                </div>
                <div className="bg-gray-900 rounded-3xl p-6 text-slate-300 font-mono text-sm overflow-auto h-[600px]">
                  <div className="flex justify-between mb-4 border-b border-gray-800 pb-2">
                    <span className="text-gray-500">source_code_v1.html</span>
                    <Code size={16} className="text-gray-500" />
                  </div>
                  <pre className="whitespace-pre-wrap">{generatedCode}</pre>
                </div>
              </div>

              <div className="flex justify-center">
                <button 
                  onClick={() => setActiveSection('service')}
                  className="px-6 py-2 text-gray-500 hover:text-black font-bold uppercase tracking-widest flex items-center gap-2"
                >
                  <ArrowRight size={16} className="rotate-180" /> Start Over
                </button>
              </div>
            </motion.section>
          )}

          {/* AUTH SECTION */}
          {activeSection === 'auth' && (
            <motion.section 
              key="auth"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-md mx-auto"
            >
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-2xl space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold">Join Nazcraft</h2>
                  <p className="text-gray-400 text-sm">Create an account to save your generated sites</p>
                </div>
                
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-400 pl-1">Full Name</label>
                    <input type="text" className="w-full p-3 rounded-xl bg-slate-50 border border-gray-200" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-400 pl-1">Email Address</label>
                    <input type="email" className="w-full p-3 rounded-xl bg-slate-50 border border-gray-200" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-400 pl-1">Phone Number</label>
                    <input type="tel" className="w-full p-3 rounded-xl bg-slate-50 border border-gray-200" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-400 pl-1">Password</label>
                    <input type="password" className="w-full p-3 rounded-xl bg-slate-50 border border-gray-200" placeholder="••••••••" />
                  </div>
                  <button className="w-full py-4 bg-black text-white rounded-xl font-bold hover:scale-[1.02] transition-transform">
                    Create Account
                  </button>
                </form>
              </div>
            </motion.section>
          )}

          {/* ADMIN SECTION */}
          {activeSection === 'admin' && (
            <motion.section 
              key="admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Admin Panel</h2>
                <div className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-red-100">
                  Restricted Access
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold uppercase text-gray-400">User</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase text-gray-400">Email</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase text-gray-400">Status</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[1, 2, 3].map((i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold">U{i}</div>
                            <span className="font-bold">Test User {i}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-500 font-mono text-xs">user${i}@nazcom.com</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-green-50 text-green-600 rounded-md text-[10px] font-bold uppercase">Verified</span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-blue-600 hover:underline text-xs font-bold">Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.section>
          )}

          {/* CONTACT SECTION */}
          {activeSection === 'contact' && (
            <motion.section 
              key="contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-xl mx-auto text-center space-y-8"
            >
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Mail size={32} />
              </div>
              <h2 className="text-4xl font-bold">Get In Touch</h2>
              <p className="text-gray-600">
                Have a question about Nazcraft or our templates? Our team is available 24/7.
              </p>
              <div className="space-y-4">
                <div className="p-6 bg-white rounded-2xl border border-gray-100 flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-xs font-bold text-gray-400 uppercase">Email Us</p>
                    <p className="font-bold">support@nazcom.com</p>
                  </div>
                  <ExternalLink size={20} className="text-gray-300" />
                </div>
                <div className="p-6 bg-white rounded-2xl border border-gray-100 flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-xs font-bold text-gray-400 uppercase">Twitter</p>
                    <p className="font-bold">@nazcraft_dev</p>
                  </div>
                  <ExternalLink size={20} className="text-gray-300" />
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50 grayscale">
            <Wand2 size={18} />
            <h1 className="text-sm font-bold tracking-tight">Nazcom by Nazcorp</h1>
          </div>
          <div className="flex gap-8 text-sm text-gray-400 font-medium">
            <button onClick={() => setActiveSection('home')}>Home</button>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <button onClick={() => setActiveSection('admin')}>Admin</button>
          </div>
          <p className="text-xs text-gray-300">© 2026 Nazcorp International. All AI rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}


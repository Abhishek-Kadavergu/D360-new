import { motion, useInView } from "framer-motion";
import { useRef, useState, FormEvent } from "react";
import piazzaLogo from "@/assets/piazza-logo-bg.png";
import pcgLogo from "@/assets/pcg-logo1.avif";

const ContactSection = () => {
  const ref = useRef<HTMLFormElement>(null);
  const inView = useInView(ref, { amount: 0.15, once: true });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-body text-base text-black placeholder:text-slate-400 focus:border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get form data using the ref
    const form = ref.current;
    if (!form) return;

    const formData = new FormData(form);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      message: formData.get('message') as string,
      capabilities: formData.getAll('capabilities') as string[]
    };

    console.log('Form data submitted:', data); // Debug log

    // Simulate API call (replace with actual submission logic)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Show success message
    setShowSuccess(true);
    setIsSubmitting(false);

    // Clear form fields to null
    form.reset();
    
    // Also manually clear to ensure empty strings
    setTimeout(() => {
      const nameInput = form.querySelector('input[name="name"]') as HTMLInputElement;
      const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement;
      const companyInput = form.querySelector('input[name="company"]') as HTMLInputElement;
      const messageInput = form.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
      
      if (nameInput) nameInput.value = '';
      if (emailInput) emailInput.value = '';
      if (companyInput) companyInput.value = '';
      if (messageInput) messageInput.value = '';
      
      // Uncheck all checkboxes
      form.querySelectorAll('input[name="capabilities"]').forEach(checkbox => {
        (checkbox as HTMLInputElement).checked = false;
      });
      
      console.log('Form cleared'); // Debug log
    }, 100);

    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <section
      className="relative pt-24 md:pt-32 pb-6 px-6 md:px-10"
      id="contact"
    >
      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <p className="font-mono text-[10px] md:text-xs tracking-[0.4em] text-cyan-700 mb-3 uppercase">
            D360 AI
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700 mb-4">
            Contact Us
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            Tell us about your challenge. We'll respond with architecture,
            timeline, and a clear path to D360 AI deployment.
          </p>
        </motion.div>

        <motion.form
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          onSubmit={handleSubmit}
          className="relative rounded-2xl border border-slate-200 bg-white p-6 md:p-10 shadow-lg shadow-slate-200/60 ring-1 ring-cyan-500/5 text-black text-lg md:text-xl"
        >
          <div
            className="absolute inset-0 rounded-2xl opacity-[0.35] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />

          <div className="relative space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="font-bold text-base text-gray-700 tracking-widest block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className="font-bold text-base text-gray-700 tracking-widest block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-base text-gray-700 tracking-widest block mb-2">
                Company
              </label>
              <input
                type="text"
                name="company"
                placeholder="Company name"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="font-bold text-base text-gray-700 tracking-widest block mb-2">
                What do you need D360 AI to do?
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder="Describe your document volumes, voice processing needs, automation goals, and what success looks like."
                className={`${inputClass} resize-none`}
                required
              />
            </div>

            <div>
              <label className="font-bold text-base text-gray-700 tracking-widest block mb-3">
                D360 AI capabilities needed
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  "Document Intelligence",
                  "Voice",
                  "Agents",
                  "Workflow Designer",
                  "Custom Model",
                  "Full Platform",
                ].map((cap) => (
                  <label key={cap} className="cursor-pointer">
                    <input type="checkbox" name="capabilities" value={cap} className="sr-only peer" />
                    <span className="font-mono text-xs tracking-widest text-gray-700 border border-slate-300 bg-slate-50 rounded-full px-3 py-1.5 inline-block peer-checked:border-cyan-600 peer-checked:bg-cyan-50 peer-checked:text-cyan-900 peer-focus-visible:ring-2 peer-focus-visible:ring-cyan-500/30 hover:border-cyan-400 transition-all duration-300">
                      {cap.toUpperCase()}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative inline-flex overflow-hidden rounded-full border border-cyan-600 bg-gradient-to-r from-cyan-600 to-cyan-700 px-10 py-4 text-sm font-semibold tracking-[0.2em] text-white shadow-lg shadow-cyan-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-600/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                <span className="relative z-10">
                  {isSubmitting ? 'SUBMITTING...' : 'REQUEST ACCESS'}
                </span>
              </button>
            </div>

            {/* Success Message */}
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-800"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900">Thank you for your request!</h4>
                    <p className="text-sm text-green-700 mt-1">
                      We've received your information and will get back to you within 24 hours with next steps.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.form>
      </div>

      <footer className="relative z-10 max-w-6xl mx-auto mt-24 md:mt-32 mb-0 pt-12 border-t border-slate-200">
        <div className="flex flex-col md:flex-row md:flex-wrap justify-between items-start gap-8 md:gap-10">
          <div className="flex items-center gap-4">
            <img
              src={pcgLogo}
              alt="Piazza Consulting Group"
              className="h-10 rounded-lg"
            />
            {/* <div>
              <div className="font-heading text-sm text-slate-900">Piazza</div>
              <div className="font-mono text-[9px] tracking-widest text-slate-500">
                Consulting Group
              </div>
            </div> */}
          </div>
          <div className="flex flex-wrap gap-6 md:gap-8">
            {["products", "services", "team", "contact"].map((s) => (
              <a
                key={s}
                href={`#${s}`}
                className="font-sans text-base tracking-widest text-gray-900 hover:text-cyan-700 transition-colors"
              >
                {s.toUpperCase()}
              </a>
            ))}
          </div>
          <div className="font-sans font-semibold text-gray-800 text-[10px] tracking-[0.10em] uppercase mb-1">
            © {new Date().getFullYear()} Piazza Consulting Group
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
          <div className="md:flex-1">
            <div className="font-[Poppins] underline text-[18px] tracking-[0.15em] text-green-800 uppercase mb-3">
              Contact Us
            </div>

            <div className="space-y-4 font-mono text-[10px] text-slate-600 leading-relaxed">
              <div>
                <div className="font-sans font-semibold text-gray-800 text-[10px] tracking-[0.10em] uppercase mb-1">
                  United States
                </div>
                <div className="font-sans font-semibold text-gray-800 text-[10px] tracking-[0.10em] uppercase mb-1">115 W. Century Road, Suite 130 Paramus, NJ 07652</div>
              </div>

              <div className="font-sans font-semibold text-gray-800 text-[10px] tracking-[0.10em] uppercase mb-1">
                <div className="text-gray-800 text-[10px] tracking-[0.16em] uppercase mb-1">
                  India
                </div >
                <div >WAVEROCK</div>
                <div>Level-3 of Tower 2.1</div>
                <div>M/s. TSI Business Parks (Hyderabad) Pvt. Ltd</div>
                <div>Nanakramguda Village</div>
                <div>Serilingampally Mandal</div>
                <div>Ranga Reddy District</div>
                <div>Telangana - 500032</div>
              </div>
            </div>
          </div>

          <div className="md:w-[320px] md:pl-4 md:border-l md:border-slate-200/80 md:-translate-x-3 lg:-translate-x-5">
            <div className="font-[Poppins] underline text-[18px] tracking-[0.15em] text-green-800 uppercase mb-3">
              Visit Us
            </div>

            <div className="font-sans font-semibold text-gray-800 text-[10px] tracking-[0.10em] uppercase mb-1">
              <a
                href="mailto:info@pcongrp.com"
                className="block text-black hover:text-slate-700 transition-colors"
              >
                info@pcongrp.com
              </a>
              <a
                href="tel:8773171680"
                className="block text-black hover:text-slate-700 transition-colors"
              >
                877-317-1680
              </a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default ContactSection;

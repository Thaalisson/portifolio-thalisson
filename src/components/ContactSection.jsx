import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-24 px-6 bg-background text-foreground transition-colors duration-500"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold tracking-tight">Let's get in touch</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Whether it's a new project, a freelance opportunity, or just to say hi, I'm
            always open to meaningful connections.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4">
              <Mail className="text-green-500" />
              <span className="text-base">thalisson@example.com</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="text-green-500" />
              <span className="text-base">+1 (647) 123-4567</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="text-green-500" />
              <span className="text-base">Toronto, Ontario, Canada</span>
            </div>
          </motion.div>

          <motion.form
            className="bg-card/50 backdrop-blur border border-border rounded-xl p-6 space-y-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message sent!");
            }}
          >
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-background border border-border px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full bg-background border border-border px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <textarea
              placeholder="Your Message"
              className="w-full bg-background border border-border px-4 py-3 rounded-lg text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full text-sm font-semibold hover:bg-green-600 transition"
            >
              <Send size={16} />
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

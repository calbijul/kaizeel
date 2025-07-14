// src/components/ContactForm.tsx
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import FluidButton from './FluidButton';

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus('sending');
    emailjs
      .sendForm(
       'service_calbijul',    
        'template_y3b1gla',  
        formRef.current,
        'nq2V6w-zQ8GBphDGy'      // your Public Key
      )
      .then(() => {
        setStatus('success');
        formRef.current?.reset();
        setTimeout(() => setStatus('idle'), 5000); // hide after 5s
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error.text || 'Something went wrong.');
        setStatus('error');
        setTimeout(() => setStatus('idle'), 7000);
      });
  };

  return (
    <div className="space-y-4">
      {/* Status banners */}
      {status === 'success' && (
        <div className="p-4 bg-green-600 text-white rounded-lg">
          🎉 Your message was sent successfully!
        </div>
      )}
      {status === 'error' && (
        <div className="p-4 bg-red-600 text-white rounded-lg">
          ❌ Failed to send message: {errorMessage}
        </div>
      )}

      <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
        <input
          type="text"
          name="user_name"
          placeholder="Your Name"
          required
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400"
        />
        <input
          type="email"
          name="user_email"
          placeholder="Your Email"
          required
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          required
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 h-32"
        />
        <FluidButton
          className="w-full px-6 py-3 rounded-lg"
          onClick={() => {}}
        >
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </FluidButton>
      </form>
    </div>
  );
};

export default ContactForm;

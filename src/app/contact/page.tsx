'use client';

import React, { FormEvent, useState } from 'react';
import { Meteors } from '../components/ui/meteors';

function Page() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
    console.log('Submitted:', { email, message });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900 relative">
      <div className="relative w-full h-full max-w-none flex items-center justify-center">
        <div className="w-full h-full shadow-xl bg-gray-900 border border-gray-800 px-6 py-8 overflow-hidden rounded-2xl flex flex-col justify-center items-center relative z-10">
          <h1 className="font-bold mt-10 text-3xl md:text-4xl lg:text-5xl text-white mb-4 relative z-50">
            Contact Us
          </h1>
          <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm md:text-base text-center">
            We&apos;re here to help with any questions about our courses,
            programs, or events. Reach out and let us know how we can assist you
            in your musical journey.
          </p>
          <form onSubmit={handleSubmit} className="w-full max-w-sm relative z-50">
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full p-4 bg-neutral-950 placeholder:text-neutral-700"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message"
                className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full p-4 bg-neutral-950 placeholder:text-neutral-700"
                rows={5}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="px-6 py-2 rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                type="submit"
              >
                {isSubmitted ? 'Submitted' : 'Submit'}
              </button>
            </div>
          </form>

          <Meteors number={30} />
        </div>
      </div>
    </div>
  );
}

export default Page;

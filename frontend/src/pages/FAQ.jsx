import React, { useState } from 'react';

const FAQ = () => {
  const [openItem, setOpenItem] = useState(0);

  const faqs = [
    {
      question: "How do I book a gas cylinder?",
      answer: "Login to your account, select your preferred payment method, enter your delivery address, and click 'Book Now'. Your booking will be processed and you'll receive a confirmation."
    },
    {
      question: "What payment options are available?",
      answer: "We accept multiple payment methods: Cash on delivery, UPI transfers, and Paytm QR code payments. Choose the option that's most convenient for you."
    },
    {
      question: "How long does delivery take?",
      answer: "Delivery typically happens within 24 hours after booking approval. We'll notify you about the delivery status through your dashboard."
    },
    {
      question: "Can I track my booking status?",
      answer: "Yes! You can track your booking status in real-time through your dashboard. The status will show as 'Pending', 'Approved', or 'Delivered'."
    },
    {
      question: "What if I'm not home during delivery?",
      answer: "Please ensure someone is available at the delivery address during the scheduled time. If no one is available, we'll attempt delivery again the next day."
    },
    {
      question: "Is there a minimum order requirement?",
      answer: "No, you can book a single gas cylinder at a time. There's no minimum order requirement for our services."
    },
    {
      question: "What should I do if I have a complaint?",
      answer: "You can contact our customer support through the Contact Us page or call us directly. We're committed to resolving any issues promptly."
    },
    {
      question: "Can I cancel my booking?",
      answer: "Bookings can be cancelled within 2 hours of placement. After that, please contact our support team for assistance."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h1>
          <p className="text-gray-600 mt-1">Find answers to common questions about our services</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setOpenItem(openItem === index ? -1 : index)}
                >
                  <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                      openItem === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openItem === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-8 card text-center">
          <h3 className="card-title">Still Have Questions?</h3>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="btn-primary"
            >
              Contact Support
            </a>
            <a 
              href="tel:+917814272742" 
              className="btn-outline"
            >
              Call Us: +91 7814272742
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
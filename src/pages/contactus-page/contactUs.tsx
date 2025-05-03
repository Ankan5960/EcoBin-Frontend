import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Mail, Phone, MapPin, Send } from "lucide-react"; // Example using lucide-react
import { DEFAULT_ITEM_PROPERTIES } from "@/configurations/default-item-properties";

type FormInputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const ContactUs: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const [submitMessage, setSubmitMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage("");
    console.log("Form Data Submitted:", data);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // --- Example API call (replace with your actual fetch/axios call) ---
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
      // const result = await response.json();
      // console.log('API Response:', result);
      // --- End of Example API call ---

      // On successful submission
      setSubmitStatus("success");
      setSubmitMessage(
        "Thank you for your message! We will get back to you soon."
      );
      reset(); // Clear the form fields
    } catch (error) {
      console.error("Submission Error:", error);
      setSubmitStatus("error");
      setSubmitMessage(
        "Sorry, there was an error sending your message. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 p-6 md:p-10 bg-gradient-to-br from-green-50 via-white to-emerald-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h1
            className={`${DEFAULT_ITEM_PROPERTIES.heading.heading2} mb-2 text-green-700`}
          >
            Get In Touch
          </h1>
          <p className="text-lg text-gray-600">
            We'd love to hear from you! Reach out with any questions or
            inquiries.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Contact Information Section */}
          <div className="space-y-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2
              className={`${DEFAULT_ITEM_PROPERTIES.heading.heading3} mb-4 border-b pb-2 border-gray-200`}
            >
              Contact Information
            </h2>
            <p className="text-gray-600">
              Fill up the form and our team will get back to you within 24
              hours.
            </p>
            {/* Phone */}
            <div className="flex items-center space-x-3 text-gray-700">
              <Phone className="w-5 h-5 text-green-600 flex-shrink-0" />
              <a
                href="tel:+911234567890"
                className="hover:text-green-700 transition duration-150 ease-in-out"
              >
                +91 123 456 7890 {/* Replace with actual phone */}
              </a>
            </div>
            {/* Email */}
            <div className="flex items-center space-x-3 text-gray-700">
              <Mail className="w-5 h-5 text-green-600 flex-shrink-0" />
              <a
                href="mailto:info@ecobin.com"
                className="hover:text-green-700 transition duration-150 ease-in-out"
              >
                info@ecobin.com {/* Replace with actual email */}
              </a>
            </div>
            {/* Address */}
            <div className="flex items-start space-x-3 text-gray-700">
              <MapPin className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <span>
                123 Green Avenue, Eco City, <br />
                Environment State, India 110001
              </span>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-700 mb-3">
                Find Us Here
              </h3>
              {/* Replace with an actual map embed (e.g., Google Maps iframe) or a static image */}
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-md overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5661.026367503827!2d88.47311216565487!3d22.579637531094555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02753218640eb5%3A0x6ac9709df3ff6bf!2sNKDA%20Administrative%20Building!5e1!3m2!1sen!2sin!4v1746184763093!5m2!1sen!2sin"
                  width="600"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2
              className={`${DEFAULT_ITEM_PROPERTIES.heading.heading3} mb-6 border-b pb-2 border-gray-200`}
            >
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "Full name is required" })}
                  className={`w-full p-2.5 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={`w-full p-2.5 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  {...register("subject", { required: "Subject is required" })}
                  className={`w-full p-2.5 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out ${
                    errors.subject ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Regarding..."
                />
                {errors.subject && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  {...register("message", { required: "Message is required" })}
                  className={`w-full p-2.5 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Your message here..."
                />
                {errors.message && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submission Feedback */}
              {submitMessage && (
                <div
                  className={`p-3 rounded-md text-sm ${
                    submitStatus === "success"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {submitMessage}
                </div>
              )}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center px-6 py-2.5 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send className="ml-2 -mr-1 h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

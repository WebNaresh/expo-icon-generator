const faqs = [
  {
    question: "What formats does the generator support?",
    answer:
      "Upload PNG, JPG, JPEG, or SVG images up to 10MB. The generator outputs optimized PNG icons for all platforms.",
  },
  {
    question: "What icons are generated?",
    answer:
      "You get icon.png (1024x1024), adaptive-icon.png, favicon.png, splash-icon.png, react-logo variants (1x/2x/3x), and an optional splash.png.",
  },
  {
    question: "Do I need to resize my image first?",
    answer:
      "No. Upload any size image and the generator handles all resizing with Sharp for optimal quality at every dimension.",
  },
  {
    question: "Is this free to use?",
    answer:
      "Yes, completely free and open source. No limits, no watermarks, no account required.",
  },
];

export default function SEOContentSection() {
  return (
    <section className="mx-auto max-w-3xl py-16">
      <h2 className="mb-8 text-center text-2xl font-semibold text-white">
        FAQ
      </h2>
      <div className="space-y-6">
        {faqs.map((faq) => (
          <div
            key={faq.question}
            className="rounded-xl border border-gray-800 bg-gray-900 p-5"
          >
            <h3 className="mb-2 text-sm font-semibold text-white">
              {faq.question}
            </h3>
            <p className="text-sm leading-relaxed text-gray-500">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

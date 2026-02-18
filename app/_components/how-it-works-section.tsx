export default function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      title: "Upload or create",
      description:
        "Drop your logo or create a text-based icon. PNG, JPG, and SVG supported.",
    },
    {
      number: "2",
      title: "Customize",
      description:
        "Pick background colors, enable splash screen, and preview your icon.",
    },
    {
      number: "3",
      title: "Download",
      description:
        "Get all icons as a ZIP with app.json config, ready for your Expo project.",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl py-16">
      <h2 className="mb-10 text-center text-2xl font-semibold text-white">
        How it works
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((step) => (
          <div key={step.number} className="text-center">
            <div className="mx-auto mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-semibold text-gray-900">
              {step.number}
            </div>
            <h3 className="mb-2 text-sm font-semibold text-white">
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed text-gray-500">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

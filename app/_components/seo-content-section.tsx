export default function SEOContentSection() {
  return (
    <section className="mx-auto mt-16 mb-12 max-w-6xl rounded-2xl bg-white p-8 shadow-lg">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Expo Icon Generator Features */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Why Choose Our Expo Icon Generator?
          </h2>
          <div className="space-y-3 text-gray-700">
            <p className="font-medium">
              🚀 <strong>Expo Assets Generator</strong> - Complete solution for
              all your expo app icon needs
            </p>
            <p>
              📱 <strong>React Native Icon Generator</strong> - Perfect for
              React Native developers
            </p>
            <p>
              🎯 <strong>Adaptive Icon Generator</strong> - Creates Android
              adaptive icons automatically
            </p>
            <p>
              ⚡ <strong>Expo Icon Builder</strong> - Fast and efficient icon
              generation
            </p>
            <p>
              🎨 <strong>Multiple Formats</strong> - Supports PNG, JPG, SVG
              input files
            </p>
          </div>
        </div>

        {/* Platform Support */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-900">Platform Support</h3>
          <div className="space-y-3 text-gray-700">
            <p>
              🍎 <strong>iOS App Icons</strong> - All required iOS icon sizes
            </p>
            <p>
              🤖 <strong>Android Adaptive Icons</strong> - Foreground and
              background layers
            </p>
            <p>
              🌐 <strong>Web App Icons</strong> - PWA and favicon generation
            </p>
            <p>
              📏 <strong>All Expo Icon Sizes</strong> - From 16x16 to 1024x1024
            </p>
            <p>
              🏪 <strong>App Store Ready</strong> - Meet all submission
              requirements
            </p>
          </div>
        </div>

        {/* Use Cases */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-900">Perfect For</h3>
          <div className="space-y-3 text-gray-700">
            <p>
              👨‍💻 <strong>React Native Developers</strong> - Streamline your
              workflow
            </p>
            <p>
              🚀 <strong>Expo Projects</strong> - Built specifically for Expo
              apps
            </p>
            <p>
              📱 <strong>Mobile App Development</strong> - Cross-platform icon
              generation
            </p>
            <p>
              🎯 <strong>Indie Developers</strong> - Free and easy to use
            </p>
            <p>
              🏢 <strong>Development Teams</strong> - Consistent icon generation
            </p>
          </div>
        </div>
      </div>

      {/* Keywords section for SEO */}
      <div className="mt-12 border-t border-gray-200 pt-8">
        <h3 className="mb-4 text-xl font-bold text-gray-900">
          Popular Searches
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            "expo assets generator",
            "expo icon generator",
            "expo app icon generator",
            "react native icon generator",
            "expo adaptive icon generator",
            "expo icons generator",
            "expo app icon",
            "expo android icon",
            "expo ios icon",
            "adaptive icon generator",
            "react native app icon generator",
            "expo icon builder",
            "expo favicon",
            "app store icons generator",
            "android adaptive icon generator",
            "react native icons expo",
            "expo app icons",
            "generate app icons",
            "expo icon size",
            "expo android app icon",
          ].map((keyword) => (
            <span
              key={keyword}
              className="rounded-full bg-sky-100 px-3 py-1 text-sm text-sky-800"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* FAQ section for keywords */}
      <div className="mt-12 border-t border-gray-200 pt-8">
        <h3 className="mb-6 text-xl font-bold text-gray-900">
          Frequently Asked Questions
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 font-semibold text-gray-900">
                What is an Expo Assets Generator?
              </h4>
              <p className="text-sm text-gray-700">
                An <strong>expo assets generator</strong> is a tool that
                automatically creates all the required icons and assets for your
                Expo React Native app, including iOS app icons, Android adaptive
                icons, and web favicons.
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-gray-900">
                How does the React Native Icon Generator work?
              </h4>
              <p className="text-sm text-gray-700">
                Our <strong>react native icon generator</strong> takes your
                source image and automatically generates all the required{" "}
                <strong>expo app icon</strong> sizes and formats for iOS,
                Android, and web platforms.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 font-semibold text-gray-900">
                What are Android Adaptive Icons?
              </h4>
              <p className="text-sm text-gray-700">
                <strong>Android adaptive icons</strong> are icons that can
                display a variety of shapes across different device models. Our{" "}
                <strong>adaptive icon generator</strong> creates both foreground
                and background layers automatically.
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-gray-900">
                Is this Expo Icon Generator free?
              </h4>
              <p className="text-sm text-gray-700">
                Yes! Our <strong>expo icon generator</strong> is completely free
                and open source. Generate unlimited <strong>expo icons</strong>{" "}
                without any restrictions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

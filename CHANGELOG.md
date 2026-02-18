# [1.1.0](https://github.com/WebNaresh/expo-icon-generator/compare/v1.0.0...v1.1.0) (2026-02-18)


### Bug Fixes

* filter bot contributors and update sitemap config ([0a1a0e0](https://github.com/WebNaresh/expo-icon-generator/commit/0a1a0e05fe10ab25ae8fa508941b24f65244992a))


### Features

* add splash screen, text logo, and app.json features ([aa56838](https://github.com/WebNaresh/expo-icon-generator/commit/aa56838b60f306aa0aa3a7165a7c8b56b0001c91))

# 1.0.0 (2026-02-17)


### Bug Fixes

* add "use client" directive to ThanksGiftPage for proper client-side rendering ([6cda888](https://github.com/WebNaresh/expo-icon-generator/commit/6cda88889d9b1286e5eccbdc57d8b891c58a27d7))
* **api:** use blob for zip response to fix type error ([4311c18](https://github.com/WebNaresh/expo-icon-generator/commit/4311c185b652177e56b2c05be21287b42a57ef61))
* **file-upload:** remove unused eslint-disable directive ([1b028f2](https://github.com/WebNaresh/expo-icon-generator/commit/1b028f26343214dec9a644362a211f8acaa57df1))
* improve icon generation process with enhanced error handling and padding for splash icon ([ae3e804](https://github.com/WebNaresh/expo-icon-generator/commit/ae3e8042f646fa7c4b19a22da4d23b38a13cab1a))
* improve pixel sampling for color analysis accuracy and clean up whitespace ([04f024b](https://github.com/WebNaresh/expo-icon-generator/commit/04f024bb16017021a0fbafa49dcd1c9658511129))
* **lint:** correct placement of eslint suppression comment ([e9a1a73](https://github.com/WebNaresh/expo-icon-generator/commit/e9a1a737dbf2155ba8263ae38bdfe9e2129993b0))
* remove unused tw-animate-css import from globals.css ([1746e13](https://github.com/WebNaresh/expo-icon-generator/commit/1746e13ec99c14bf5e4fb78614fced3588ed1eb8))
* replace img with Image component for better optimization and add width/height attributes ([de99651](https://github.com/WebNaresh/expo-icon-generator/commit/de996516b3eba6a22a4aa3b50dba0780e152bdde))
* **thanks-page:** escape special characters in text ([c49ebd5](https://github.com/WebNaresh/expo-icon-generator/commit/c49ebd54b59e32f9b642d31b51e1d620e6aeaaf1))
* **types:** cast cached data to correct interface ([dd75be2](https://github.com/WebNaresh/expo-icon-generator/commit/dd75be262e51b1c33564fb13c3b9b78b8c5a00c7))
* **types:** remove unused ts-expect-error directive ([dd18679](https://github.com/WebNaresh/expo-icon-generator/commit/dd186793a22bf6b8762372b2dd8e633516afc3da))
* **types:** replace any with generated icon type ([71cdb4c](https://github.com/WebNaresh/expo-icon-generator/commit/71cdb4c5a52a07597536287c2012a1b561706dca))
* **types:** replace any with unknown and generic types ([35fb625](https://github.com/WebNaresh/expo-icon-generator/commit/35fb62531fb4765da5f512447eba30582b97daf8))
* **types:** resolve implicit any and fix deprecated utility class ([195ab58](https://github.com/WebNaresh/expo-icon-generator/commit/195ab589c2f625111da7f696045d6e2fff6e1c43))
* **ui:** use correct tailwind opacity modifier ([9bcb0d8](https://github.com/WebNaresh/expo-icon-generator/commit/9bcb0d86becd9c2229ff817f2834ad68d16c2150))
* update base URL in sitemap for Expo assets generator ([188810c](https://github.com/WebNaresh/expo-icon-generator/commit/188810c4c88bfff7f93a92e521f7623039dc51d4))
* update icon.png description and adjust preview display with background color ([0ebab20](https://github.com/WebNaresh/expo-icon-generator/commit/0ebab206ff7e97979a0ddd1e797f72c66f18aa87))
* update metadata URLs for the Expo assets generator ([83aa835](https://github.com/WebNaresh/expo-icon-generator/commit/83aa835ffb69de25124c228b9141f4e923147e6f))
* update middleware to rewrite requests for PWA manifest compatibility ([7885f40](https://github.com/WebNaresh/expo-icon-generator/commit/7885f406aa14713ad825988cac5759f4de0c7e37))
* update scope URL in PWA manifest for Expo assets generator ([312f738](https://github.com/WebNaresh/expo-icon-generator/commit/312f738592eef64565398d1dfa47e7dc76d2d419))
* update sitemap URLs to include trailing slashes and use a fixed lastModified date for consistency ([95216b3](https://github.com/WebNaresh/expo-icon-generator/commit/95216b3be709060327f04fefbe0e84f44f44d947))
* update text formatting for the Generate Icons instruction in HomePage ([9d8c62e](https://github.com/WebNaresh/expo-icon-generator/commit/9d8c62e9412a39b7b379b610e6c077522586b6c3))


### Features

* add clipboard paste functionality for image uploads with error handling ([a9c1081](https://github.com/WebNaresh/expo-icon-generator/commit/a9c1081982b6d568c6a1b8f44ec852d5505fba4e))
* add contributors page with detailed contributor information and social links ([#1](https://github.com/WebNaresh/expo-icon-generator/issues/1)) ([d2fea47](https://github.com/WebNaresh/expo-icon-generator/commit/d2fea47a02d63814cf5304c5a043473bf25696e5))
* add Cross Promotion Banner component and integrate into HomePage ([9862b96](https://github.com/WebNaresh/expo-icon-generator/commit/9862b96ac9351672637795967d906c227d1fc857))
* add extensive logging for icon generation and display components to aid debugging ([2297fe1](https://github.com/WebNaresh/expo-icon-generator/commit/2297fe14ba2b53eb7b00334a95d0a9317e9f7cf4))
* add Google AdSense script to layout and include Copilot instructions for AI coding agents ([af65cf0](https://github.com/WebNaresh/expo-icon-generator/commit/af65cf00f362ac86d9369f0c07d77bda82363746))
* Add main components for Expo Icon Generator including Hero, Features, How It Works, and Technical Specifications sections ([b98b1a5](https://github.com/WebNaresh/expo-icon-generator/commit/b98b1a5ab31c8b20394eb15e457cf3d83d82fc29))
* add middleware for PWA manifest compatibility with redirect from manifest.json to manifest.webmanifest ([943e1bb](https://github.com/WebNaresh/expo-icon-generator/commit/943e1bbc5600db6e6e88139271640973a492194a))
* add StructuredData and SEOContentSection components for improved SEO and structured data handling ([e1259c2](https://github.com/WebNaresh/expo-icon-generator/commit/e1259c22494d3ab92d327337dd8949e5137e5efb))
* **client:** implement client-side icon zipping with jszip ([2c64cfc](https://github.com/WebNaresh/expo-icon-generator/commit/2c64cfc273f6ff93615975787a8d94d5be77c818))
* **data:** add centralized blog posts data with missing content ([180b013](https://github.com/WebNaresh/expo-icon-generator/commit/180b0132f7cc3d57cd9c3f32d2a09ba5cb37aae8))
* **data:** add centralized tutorials data with missing content ([e650b2e](https://github.com/WebNaresh/expo-icon-generator/commit/e650b2e140045eec05e56998df9353fc58cf71b2))
* enhance color analysis by improving edge color sampling and dominant color extraction ([e2ca7a9](https://github.com/WebNaresh/expo-icon-generator/commit/e2ca7a9169157a19cc3228dbc457a3fc95f67ad4))
* implement feedback submission with react-query in FeedbackModal and add Providers component for query context ([94c075d](https://github.com/WebNaresh/expo-icon-generator/commit/94c075d33a13571dc787a955f9ff9ad53f348f49))
* implement file upload area component with drag-and-drop, image preview, and eyedropper color selection. ([05a42cd](https://github.com/WebNaresh/expo-icon-generator/commit/05a42cd566b1fa0cbcdf0e62cd7448ad6d84271f))
* prioritize dominant color for background suggestion and improve edge color handling ([6a09d08](https://github.com/WebNaresh/expo-icon-generator/commit/6a09d087d83cc222e5c9125893218ae607926002))
* replace img with Image component from Next.js for optimized image handling and remove unused functions ([5d79a39](https://github.com/WebNaresh/expo-icon-generator/commit/5d79a3969b3a395ae25fe0d0a486c1b66de02116))

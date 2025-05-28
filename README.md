# ⚡️🧠 Aurable

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Now-brightgreen)](https://aurable.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repo-blue)](https://github.com/aurable/aurable)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<p align="center">
  <img src="https://aurable.vercel.app/logo.png" alt="Aurable Logo" width="100" />
</p>

Welcome to **Aurable**! 🚀

**Aurable** is a **micro SaaS** application designed to make web apps using prompts, powered by Gemini AI. It's a **no-code** platform that allows you to create, edit, and deploy your apps with just a few clicks.


## 💖 Support & Donations

If you find Aurable helpful and would like to support its development, you can make a donation:

- **PayPal**: [MyPaypal](https://www.paypal.com/paypalme/JayanthGajula)

Your support is greatly appreciated and helps us continue to improve and maintain the project.

## 🎥 Video Tutorial

Watch the **[Video Tutorial](https://www.youtube.com/)** to learn how to use Aurable effectively.

## ✨ Features That Empower You

- **🤖 AI-Powered Code Generation**: Harness the power of Google's Gemini AI to convert your ideas into functional code. Simply describe what you want, and watch as Aurable generates code snippets or even entire project structures for you.

- **💬 Intelligent AI Chat Assistant**: Engage in conversation with the AI to get coding advice, explanations, or help with debugging.

- **🖥 Interactive Workspace**: Work within a user-friendly environment where you can edit code, converse with the AI, and visualize your projects instantly.

- **💻 Live Code Preview**: Utilize Sandpack to get a real-time, interactive code editing and preview environment that updates as you type.

- **💰 Flexible Pricing**: Aurable offers plans tailored to your needs, including a free tier for casual users and premium plans for power users, ensuring everyone can benefit from its features.

- **🔒 Secure Authentication**: Secure and straightforward login experience with Google OAuth, keeping your projects safe and accessible only to you.

- **💳 Seamless Payments**: Upgrade your plan effortlessly with our integrated PayPal payment system, handling all transactions securely.

- **💾 Persistent Storage**: Your work is important. With Convex, your projects are saved and accessible across all your sessions, from any device.

- **🎨 Customizable Themes and Settings**: Personalize your workspace with customizable themes and settings to suit your coding style.

- **🌐 Cross-Platform Accessibility**: Access Aurable from any device with a web browser. It's cloud-based, so there's nothing to install.

## 🌐 Live Demo

Ready to experience Aurable in action? Check out our live demo:

👉 **[Live Demo](https://aurable.vercel.app/)**


## 🛠 Technologies Powering Aurable

Aurable is built with a modern stack designed for performance, scalability, and an excellent developer experience:

- **[Next.js](https://nextjs.org/)**: For building server-side rendered, SEO-friendly, and highly performant React applications.

- **[React](https://reactjs.org/)**: The core of our UI, providing a declarative and component-based approach to building interfaces.

- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework that allows for rapid and custom UI development without leaving your HTML.

- **[Convex](https://www.convex.dev/)**: Our backend platform of choice for seamless data storage, real-time updates, and serverless functions.

- **[Google Generative AI](https://ai.google/)**: Brings advanced AI capabilities, including natural language processing and code generation, to your fingertips.

- **[Sandpack](https://sandpack.codesandbox.io/)**: Enables live, interactive code editing and preview capabilities.

- **[PayPal API](https://developer.paypal.com/docs/api/overview/)**: For secure and straightforward payment processing, making plan upgrades a breeze.

- **[Lucide React](https://lucide.dev/docs/lucide-react)**: A library of beautiful, open-source icons to enhance the visual appeal of your projects.

## 🚀 Getting Started: Your Journey with Aurable

Embarking on your Aurable journey is easy. Follow these steps to get started:

### 1. **Clone the Repository**

```bash
git clone 
cd Aurable
```

### 2. **Install Dependencies**

You can use npm, yarn, pnpm, or bun to install the required packages:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. **Set Up Environment Variables**

Create a `.env` file at the root of the project and populate it with your API keys and configuration details. Refer to `.env.example` for the structure.

```ini
NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID=<your_google_auth_client_id>
CONVEX_DEPLOYMENT=<your_convex_deployment>
NEXT_PUBLIC_CONVEX_URL=<your_convex_url>
NEXT_PUBLIC_GEMINI_API_KEY=<your_gemini_api_key>
NEXT_PUBLIC_PAYPAL_CLIENT_ID=<your_paypal_client_id>
```

**Note**: You'll need to obtain API keys from the respective services.

### 4. **Launch the Development Server**

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open `http://localhost:3000` in your browser to experience Aurable locally.

### 5. **Build for Production**

To build the application for production:

```bash
npm run build
```

## 📂 Project Structure: A Deep Dive

Understanding the project structure helps with contributions and customizations:

```
aurable/
├── app/                      # Main application logic
│   ├── (main)/               # Main app routes and layouts
│   │   ├── pricing/          # Pricing page
│   │   └── workspace/        # Workspace page for projects
│   ├── api/                  # API routes
│   │   ├── ai-chat/          # AI chat API endpoint
│   │   └── gen-ai-code/      # Code generation API endpoint
│   ├── ConvexClientProvider.jsx # Convex provider setup
│   ├── globals.css           # Global styles
│   ├── layout.js             # Root layout
│   ├── page.js               # Home page
│   └── provider.jsx          # Global state providers
├── components/               # Reusable UI components
│   ├── custom/               # Custom application-specific components
│   └── ui/                   # Shadcn UI components
├── configs/                  # Configuration for AI models and other settings
├── context/                  # React context for global state
├── convex/                   # Convex backend functions
│   ├── schema.js             # Database schema
│   ├── users.js              # User-related database operations
│   ├── workspace.js          # Workspace-related database operations
│   └── _generated/           # Auto-generated Convex files
├── data/                     # Static data (prompts, lookups, colors)
├── hooks/                    # Custom React hooks
├── lib/                      # Utility functions
├── public/                   # Public assets (images, icons)
├── .env.example              # Example environment variables
├── components.json           # Shadcn UI components configuration
├── jsconfig.json             # JavaScript configuration
├── next.config.mjs           # Next.js configuration
├── package.json              # Project dependencies and scripts
├── postcss.config.mjs        # PostCSS configuration
└── tailwind.config.mjs       # Tailwind CSS configuration
```

## 🤝 Contributing: Join the Aurable Community

Contributions are what make the open-source community such a fantastic place to learn, inspire, and create. We warmly welcome contributions of all sizes, from bug fixes to major features.

### How to Contribute

1. **Fork the Repository**: Click on the 'Fork' button on the top right to create a copy of the repository on your account.

2. **Create a Feature Branch**: Create a branch for your feature or bug fix.

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Develop Your Feature**: Implement your feature or fix, adhering to the project's coding standards.

4. **Commit Your Changes**: Make your changes and commit them with clear, descriptive messages.

   ```bash
   git commit -am 'Add new feature: your feature name'
   ```

5. **Push to Your Branch**: Push your changes to your fork.

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**: Go to the original repository and create a new pull request from your feature branch.

7. **Await Review**: A project maintainer will review your changes. Be prepared to make adjustments as needed.


## 📝 License

Aurable is proudly open-source, licensed under the [MIT License](LICENSE). This permissive license allows you to use, modify, and distribute the code, ensuring that Aurable remains a community-driven project.

## 🙏 Acknowledgements

- **Inspirations**: Our heartfelt thanks to the incredible Aurable and Lovable projects, which served as significant inspiration for Aurable.

- **Amazing Technologies and Tools**: Gratitude to Next.js, Convex, Google Generative AI, Sandpack, Tailwind CSS, and all the other technologies that make this project possible.

- **The Open Source Community**: A big thank you to the broader open-source community for your contributions, support, and spirit of collaboration.

## 📞 Contact & Support

Encounter an issue? Have a suggestion? Or just want to chat about the project? Feel free to reach out:

- **Email**: [Email](mailto:ej.developer.d@gmail.com)
- **GitHub Issues**: For bug reports and feature requests, please open an issue on our [GitHub repository](https://github.com/jayanth920/Aurable/issues).

## 🌟 Star the Project

If you find Aurable useful, please consider giving it a star on GitHub! ⭐ It helps others find the project and motivates us to keep improving.

---

Crafted with ❤️ by Jay. Let's revolutionize coding together with Aurable! 🎉
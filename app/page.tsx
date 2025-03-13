"use client";
import Authentication from "./_components/Authentication";
import { Button } from "@/components/ui/button";
import { useAuth } from "./auth-context";

export default function Home() {
  const { user } = useAuth();
  return (
    <>
      <section className="relative overflow-hidden w-full">
        <div className="px-8 py-24 mx-auto md:px-12 lg:px-24 max-w-7xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div>
              <p className="text-sm leading-normal font-bold uppercase bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI-Powered Development
              </p>
              <h1 className="text-3xl leading-tight tracking-tight lg:text-4xl mt-4 font-semibold text-base-900">
                Transform Wireframes Into Production-Ready Code
              </h1>
              <p className="text-base leading-normal mt-4 text-base-500 font-medium">
                Ai pixel Code uses AI to instantly convert your design mockups
                into clean, responsive code.
              </p>
              <div className="flex flex-wrap items-center gap-2 mx-auto mt-8">
                <div className="gap-3 flex justify-center">
                  {user?.email ? (
                    <a
                      className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium  focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-4 dark:focus:ring-offset-gray-800"
                      href="/dashboard"
                    >
                      Get Started
                      <svg
                        className="flex-shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </a>
                  ) : (
                    <Authentication>
                      <Button className="bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 text-white py-3 px-6">
                        Start Creating For Free
                      </Button>
                    </Authentication>
                  )}
                </div>
                <a
                  className="inline-flex justify-center items-center gap-x-2 text-center border border-gray-200 text-gray-700 hover:text-gray-900 hover:border-gray-300 text-sm font-medium transition-colors py-3 px-4 dark:border-gray-700 dark:text-gray-300 dark:hover:text-white dark:hover:border-gray-600"
                  href="https://github.com/Ekpo-Emmanuel/wireframe-to-code"
                  target="_blank"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.581 9.5 21.278 9.5 21.017C9.5 20.756 9.5 20.178 9.5 19.391C6.73 19.939 6.14 18.047 6.14 18.047C5.68 17.017 5.03 16.725 5.03 16.725C4.12 16.093 5.1 16.104 5.1 16.104C6.1 16.178 6.63 17.139 6.63 17.139C7.5 18.601 8.97 18.097 9.54 17.847C9.63 17.293 9.89 16.9 10.17 16.703C8.02 16.506 5.77 15.705 5.77 11.977C5.77 10.951 6.17 10.126 6.65 9.501C6.55 9.251 6.2 8.251 6.75 6.751C6.75 6.751 7.56 6.501 9.5 7.834C10.29 7.626 11.15 7.522 12 7.518C12.85 7.522 13.71 7.626 14.5 7.834C16.44 6.501 17.25 6.751 17.25 6.751C17.8 8.251 17.45 9.251 17.35 9.501C17.83 10.126 18.23 10.951 18.23 11.977C18.23 15.715 15.97 16.506 13.82 16.703C14.17 16.951 14.5 17.447 14.5 18.184C14.5 19.184 14.5 20.656 14.5 21.017C14.5 21.278 14.66 21.581 15.16 21.489C19.135 20.166 22 16.418 22 12C22 6.477 17.523 2 12 2Z"
                      fill="currentColor"
                    />
                  </svg>
                  Fork on GitHub
                </a>
              </div>
            </div>
            <div className="lg:col-span-2">
              <img
                className="object-cover h-full border shadow-lg  border-base-200"
                src="/Wireframetocode.png"
                alt="Wireframe To Code Conversion Example"
              />
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-24 mb-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-semibold text-base-900">
                How It Works
              </h2>
              <p className="mt-3 text-base-500 max-w-2xl mx-auto">
                Transform your design process with our powerful AI-driven
                solution
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Feature 1 */}
              <div className="bg-white dark:bg-gray-800 p-6  shadow-md border border-gray-100 dark:border-gray-700 transition-all hover:shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600  flex items-center justify-center mb-4">
                  <span className="text-white font-bold">01</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Upload Your Wireframe
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Simply upload your design mockup or wireframe image. We
                  support various formats including PNG, JPG, and SVG.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white dark:bg-gray-800 p-6  shadow-md border border-gray-100 dark:border-gray-700 transition-all hover:shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600  flex items-center justify-center mb-4">
                  <span className="text-white font-bold">02</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  AI Analyzes Your Design
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our advanced AI engine analyzes your design, identifying UI
                  components, layout structure, and styling details.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white dark:bg-gray-800 p-6  shadow-md border border-gray-100 dark:border-gray-700 transition-all hover:shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600  flex items-center justify-center mb-4">
                  <span className="text-white font-bold">03</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Get Production-Ready Code
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Receive clean, responsive code that accurately reflects your
                  design. Copy, download, or view the live preview instantly.
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial/Stats Section */}
          <div className="mt-20 bg-gray-50 dark:bg-gray-800/50 p-8 ">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <span className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400">
                  95%
                </span>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Time saved compared to manual coding
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <span className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400">
                  100+
                </span>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  UI components recognized
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <span className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400">
                  24/7
                </span>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Available whenever inspiration strikes
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <h2 className="text-2xl lg:text-3xl font-semibold text-base-900">
              Ready to transform your workflow?
            </h2>
            <p className="mt-3 text-base-500 max-w-2xl mx-auto mb-8">
              Join thousands of developers and designers who are already saving
              time with Ai pixel Code
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {user?.email ? (
                <a
                  className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium  focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-6 dark:focus:ring-offset-gray-800"
                  href="/dashboard"
                >
                  Go to Dashboard
                  <svg
                    className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </a>
              ) : (
                <Authentication>
                  <Button className="bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 text-white py-3 px-6">
                    Start Creating For Free
                  </Button>
                </Authentication>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

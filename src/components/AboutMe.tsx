import React from "react";

type AboutMeProps = {
  onScrollUp: () => void;
  onScrollHome: () => void;
};

const AboutMe: React.FC<AboutMeProps> = ({ onScrollUp, onScrollHome }) => {
  return (
    <div className="relative h-screen bg-black overflow-hidden z-[1]">
      <div className="relative z-10 h-screen flex flex-col">
        {/* Top section - Title and Email */}
        <div
          className="flex flex-col md:flex-row justify-start md:justify-between pt-10 lg:gap-4"
          style={{ marginLeft: 20, marginRight: 20 }}
        >
          <div className="flex items-baseline text-white">
            <h1
              className="font-afacad font-bold leading-none tracking-tight select-none"
              style={{ fontSize: "clamp(72px, 11vw, 160px)" }}
            >
              ABOUT ME
            </h1>
          </div>

          <div className="mt-4">
            <div className="inline-flex items-center">
              <img
                src="/images/email.svg"
                alt="Email"
                className="w-9 h-9 mr-1"
              />
              <span className="font-afacad text-white text-lg lg:text-xl">
                udwasanamuthumaliperera@gmail.com
              </span>
            </div>
          </div>
        </div>

        {/* Divider — full width, no margin */}
        <div className="h-px w-full bg-white/10 shrink-0 mt-6" />

        {/* Bottom section */}
        <div
          className="font-afacad mb-16 mt-6"
          style={{ marginLeft: 20, marginRight: 20 }}
        >
          <div className="flex flex-col gap-6">
            <p className="text-white/90 text-xl md:text-2xl">
              UI designer at <strong>Newnop</strong> — I turn ideas into
              interfaces that feel right. My work lives at the intersection of{" "}
              <strong>UI/UX</strong>, <strong>branding</strong>, and{" "}
              <strong>graphic design</strong>. <br />
              Currently obsessing over vector illustration.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Education */}
              <div className="flex flex-col gap-2 items-start bg-white/5 p-4 backdrop-blur-lg">
                <h2 className="text-3xl sm:text-4xl font-semibold leading-tight mb-2 text-white">
                  EDUCATION
                </h2>
                <div className="space-y-1 text-lg md:text-xl">
                  <p className="text-white">
                    • BSC.HONS SOFTWARE ENGINEERING •
                  </p>
                  <p className="text-white">✰ 2nd Class Upper Division</p>
                  <p className="text-white">
                    NSBM Green University (2021-2025)
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-col gap-2 items-start bg-white/5 p-4 backdrop-blur-lg">
                <h2 className="text-3xl sm:text-4xl font-semibold leading-tight mb-2 text-white">
                  TAGS
                </h2>
                <p className="text-white text-lg md:text-xl">
                  ✦ UI Designer ✦ UX Strategy ✦ Branding Design ✦ Digital
                  Experiences ✦ PixelPlay Founder
                </p>
              </div>

              {/* Category */}
              <div className="flex flex-col gap-2 items-start bg-white/5 p-4 backdrop-blur-lg">
                <h2 className="text-3xl sm:text-4xl font-semibold leading-tight mb-2 text-white">
                  CATEGORY
                </h2>
                <p className="text-white text-lg md:text-xl">
                  ✧ UI/UX Design ✧ GRAPHIC Design
                </p>
              </div>

              {/* Experience */}
              <div className="flex flex-col gap-2 items-start bg-white/5 p-4 backdrop-blur-lg">
                <h2 className="text-3xl sm:text-4xl font-semibold leading-tight mb-2 text-white">
                  EXPERIENCE
                </h2>
                <p className="text-white text-lg md:text-xl">✯ 2+ Years</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div
          className="fixed bottom-0 left-0 right-0 z-20 flex justify-end items-end mx-5"
          style={{ marginBottom: "55px" }}
        >
          <div className="flex gap-6">
            <button
              type="button"
              onClick={onScrollUp}
              aria-label="Back to work process"
              className="text-white text-4xl transition-transform hover:translate-y-1 focus:translate-y-1 outline-none"
            >
              <img
                src="/images/arrow-up.png"
                alt="Up"
                className="w-12 h-12 cursor-pointer select-none"
                draggable={false}
              />
            </button>
            <button
              type="button"
              onClick={onScrollHome}
              aria-label="Go to home"
              className="text-white text-4xl transition-transform hover:translate-y-1 focus:translate-y-1 outline-none"
            >
              <img
                src="/images/home.png"
                alt="Home"
                className="w-12 h-12 cursor-pointer select-none"
                draggable={false}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;

import React from "react";

type AboutMeProps = {
  onScrollUp: () => void;
  onScrollHome: () => void;
};

const AboutMe: React.FC<AboutMeProps> = ({ onScrollUp, onScrollHome }) => {
  return (
    <div className="relative h-screen bg-black overflow-hidden z-[1]">
      {/* Grid overlay - 5 columns, 4 rows with 20px margin */}
      <div className="absolute inset-0" style={{ margin: "20px" }}>
        {/* Vertical lines - 6 lines for 5 columns */}
        <div
          className="absolute w-px h-full bg-white opacity-10"
          style={{ left: "0px" }}
        ></div>
        <div
          className="absolute w-px h-full bg-white opacity-10"
          style={{ left: "20%" }}
        ></div>
        <div
          className="absolute w-px h-full bg-white opacity-10"
          style={{ left: "40%" }}
        ></div>
        <div
          className="absolute w-px h-full bg-white opacity-10"
          style={{ left: "60%" }}
        ></div>
        <div
          className="absolute w-px h-full bg-white opacity-10"
          style={{ left: "80%" }}
        ></div>
        <div
          className="absolute w-px h-full bg-white opacity-10"
          style={{ right: "0px" }}
        ></div>

        {/* Horizontal lines - 5 lines for 4 rows */}
        <div
          className="absolute h-px w-full bg-white opacity-10"
          style={{ top: "0px" }}
        ></div>
        <div
          className="absolute h-px w-full bg-white opacity-10"
          style={{ top: "25%" }}
        ></div>
        <div
          className="absolute h-px w-full bg-white opacity-10"
          style={{ top: "50%" }}
        ></div>
        <div
          className="absolute h-px w-full bg-white opacity-10"
          style={{ top: "75%" }}
        ></div>
        <div
          className="absolute h-px w-full bg-white opacity-10"
          style={{ bottom: "0px" }}
        ></div>
      </div>

      {/* Transparent box overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.07)",
        }}
      />

      {/* Grid box fills */}
      <div className="absolute inset-0  " style={{ margin: "20px" }}>
        {/* Image fills entire 2nd and 3rd rows */}
        <div
          className="absolute rounded-xl overflow-hidden hidden lg:block "
          style={{
            left: "10%", // Start of 1st column
            top: "20%", // Start of 2nd row
            width: "60%", // Full width (all columns)
            height: "55%", // Height of 2nd and 3rd rows
          }}
        >
          <img
            src="/images/img.gif"
            alt="About Me"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* Grid box fills */}
      <div className="absolute inset-0  " style={{ margin: "20px" }}>
        {/* Image fills entire 2nd and 3rd rows */}
        <div
          className="absolute rounded-xl overflow-hidden lg:hidden "
          style={{
            left: "0%", // Start of 1st column
            top: "25%", // Start of 2nd row
            width: "100%", // Full width (all columns)
            height: "35%", // Height of 2nd and 3rd rows
          }}
        >
          <img
            src="/images/img.gif"
            alt="About Me"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Main content container with 20px margin */}
      <div
        className="relative z-10 h-screen flex flex-col"
        style={{ margin: "20px" }}
      >
        {/* Top section - Title and Email */}
        <div className="flex-1 flex flex-col lg:flex-row justify-start pt-10 lg:gap-4">
          <div className="flex items-start justify-between">
            {/* Left side - Title */}
            <div className="flex items-baseline">
              <h1 className="font-afacad text-6xl sm:text-7xl lg:text-8xl font-bold text-white leading-none">
                ABOUT
              </h1>
              <h1 className="font-charmonman text-6xl sm:text-7xl lg:text-8xl font-bold text-white leading-none ml-4">
                ME
              </h1>
            </div>
          </div>

          {/* Email section */}
          <div className="mt-4 ">
            <div className="inline-flex items-center ">
              <img
                src="/images/email.svg"
                alt="Email"
                className="w-9 h-9  mr-1"
              />
              <span className="font-afacad text-white text-lg">
                udwasanamuthumaliperera@gmail.com
              </span>
            </div>
            <a
              href="https://www.behance.net/wasanamuthumali"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center ml-6 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <img
                src="/images/behanceIcon.svg"
                alt="behance"
                className="w-9 h-9 mr-1"
              />
              <span className="font-afacad text-white text-lg">
                wasanamuthumali
              </span>
            </a>
            <a
              href="https://dribbble.com/MuthuPerera"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center ml-6 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <img
                src="/images/dribbleIcon.svg"
                alt="behance"
                className="w-9 h-9 mr-1"
              />
              <span className="font-afacad text-white text-lg">
                MuthuPerera
              </span>
            </a>
          </div>
        </div>

        {/* Bottom section - Professional details */}
        <div className="pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* About */}
            <div className="space-y-2 flex gap-2 items-center">
              <div className="bg-neutral-800 rounded-full h-fit px-4 py-2 inline-block">
                <span className="font-afacad text-white text-md  font-semibold">
                  ABOUT
                </span>
              </div>
              <p className="font-agdasima text-white text-2xl lg:text-3xl">
                WASANA MUTHUMALI PERERA, FREELANCE PRODUCT DESIGNER
              </p>
            </div>

            {/* Education */}
            <div className="space-y-2 flex gap-2 items-center">
              <div className="bg-neutral-800 rounded-full px-4 py-2 inline-block">
                <span className="font-afacad text-white text-md font-semibold">
                  EDUCATION
                </span>
              </div>
              <p className="font-agdasima text-white text-2xl">
                BSC.HONS SOFTWARE ENGINEERING (NSBM GREEN UNIVERSITY)
              </p>
            </div>

            {/* Category */}
            <div className="space-y-2 flex gap-2 items-center">
              <div className="bg-neutral-800 rounded-full px-4 py-2 inline-block">
                <span className="font-afacad text-white text-md font-semibold">
                  CATEGORY
                </span>
              </div>
              <p className="font-agdasima text-white text-2xl">UI/UX DESIGN</p>
            </div>

            {/* Experience */}
            <div className="space-y-2 flex gap-2 items-center">
              <div className="bg-neutral-800 rounded-full px-4 py-2 inline-block">
                <span className="font-afacad text-white text-md font-semibold">
                  EXPERIENCE
                </span>
              </div>
              <p className="font-agdasima text-white text-2xl">1+ YEARS</p>
            </div>

            {/* Tags */}
            <div className="space-y-2  flex gap-2 items-center">
              <div className="bg-neutral-800 rounded-full px-4 py-2 inline-block">
                <span className="font-afacad text-white text-md font-semibold">
                  TAGS
                </span>
              </div>
              <p className="font-agdasima text-white text-2xl">
                CREATIVE, RESPONSIVE DESIGNS, PROTOTYPES
              </p>
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

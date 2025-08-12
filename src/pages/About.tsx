// src/pages/About.tsx
import React from 'react';
import GradientCluster from '../sections/GradientCluster';
import References from '../sections/References';
import ColorBurstText from '../sections/ColorBurstText';

const About = () => {
  return (
    <section className="py-8 px-4 max-w-4xl mx-auto font-space-grotesk text-gray-900 leading-relaxed md:py-16 md:px-8">
      <div>
        {/* Aboot Title */}
        <img
          src="/images/pages-aboot.svg"
          alt="Profile Decorative"
          className="w-full h-full object-cover -mb-3"
        />

        {/* Glassy Card */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden backdrop-blur-[.3em] bg-white/10">
          {/* Inner Shadows */}
          <div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              boxShadow: `
                inset -3px -3px 9.1px 1px rgba(255, 255, 255, 0.22),
                inset 0px 2px 5.5px 0px rgba(255, 255, 255, 0.08),
                inset 0px -2px 13.7px rgba(23, 13, 69, 0.54)
              `,
            }}
          ></div>

          {/* Noise Overlay */}
          <div className="absolute inset-0 rounded-xl pointer-events-none opacity-[0.06] mix-blend-overlay bg-noise"></div>

          {/* Foreground Image */}
          <div className="relative z-10 w-auto h-full flex flex-col justify-start">
            <img
              src="/images/JAFull.jpg"
              alt="Jordan's professional headshot"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Quote Overlay */}
          {/* Mobile version (stacked, left half, safe face area) */}
          <div className="absolute inset-y-0 left-0 z-20 w-1/2 px-4 sm:hidden flex flex-col justify-center">
            {/* Line 1 */}
            <div className="mb-3">
              <p className="text-left font-semibold leading-snug text-[clamp(1rem,2.8vw,1.75rem)]">
                <span className="block bg-gradient-to-r from-white to-cyan-500 bg-clip-text text-transparent">
                  Old enough to know
                </span>
              </p>
              <span className="inline-flex mt-1 bg-cyan-400 text-black px-2 py-0.5 rounded text-[clamp(0.9rem,2.6vw,1.125rem)]">
                better
              </span>
            </div>

            {/* Line 2 */}
            <div>
              <p className="text-left font-semibold leading-snug text-[clamp(1rem,2.8vw,1.75rem)]">
                <span className="block bg-gradient-to-r from-white to-cyan-500 bg-clip-text text-transparent">
                  Still young enough to
                </span>
              </p>
              <span className="inline-flex mt-1 bg-cyan-400 text-black px-2 py-0.5 rounded text-[clamp(0.9rem,2.6vw,1.125rem)]">
                go for it
              </span>
            </div>
          </div>

          {/* Desktop version (original styling) */}
          <div className="hidden sm:block absolute bottom-6 md:bottom-10 left-4 z-20 text-right">
            <p className="text-lg md:text-2xl font-semibold leading-tight mb-5">
              <span className="bg-gradient-to-r from-white to-cyan-500 bg-clip-text text-transparent">
                Old enough to know{" "}
              </span>
              <span className="bg-cyan-400 text-black px-1 rounded">
                better
              </span>
            </p>

            <p className="text-lg md:text-2xl font-semibold leading-tight">
              <span className="bg-gradient-to-r from-white to-cyan-500 bg-clip-text text-transparent">
                Still young enough to{" "}
              </span>
              <span className="bg-cyan-400 text-black px-1 rounded">
                go for it
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Statement Area */}
      <div className="relative sm:min-h-[180px] sm:pb-24 md:pb-28 lg:pb-32">
        <GradientCluster />

        {/* Mobile version (centered, in-flow, full width, with bottom margin) */}
        <p className="sm:hidden w-full mt-8 mb-8 px-4 text-center font-regular text-[clamp(1rem,2.8vw,1.25rem)] font-stretch-condensed leading-snug">
          I’ve made enough mistakes to{" "}
          <span className="font-bold italic text-[clamp(1.25rem,3vw,1.5rem)]">
            learn
          </span>{" "}
          <br />
          from them — and enough{" "}
          <span className="font-bold italic text-[clamp(1.25rem,3vw,1.5rem)]">
            progress
          </span>{" "}
          <br />
          to keep growing <br />
          and no, I’m not talking about the game: <br />
          "grow a garden"
        </p>

        {/* Desktop/tablet version (absolute; no margins—use top/left) */}
        <p className="hidden sm:block absolute top-12 sm:left-[25%] md:left-0 p-2 text-left font-regular text-2xl font-stretch-condensed leading-snug mb-30">
          I’ve made enough mistakes to{" "}
          <span className="text-bold italic text-3xl">learn</span> <br />
          from them — and enough{" "}
          <span className="text-bold italic text-3xl">progress</span> <br />
          <span className="block text-right text-light italic text-3xl">
            to keep growing
          </span>
          and no, I’m not talking about the game: <br />
          "grow a garden"
        </p>
      </div>

      <div>
        <p className="mt-12 sm:mt-24 px-4 text-center sm:text-left sm:ml-[30%] font-light text-[clamp(1rem,2.8vw,1.25rem)] sm:text-2xl leading-relaxed">
          The issue with talking about your self is, its all bias.
          <br />
          But I will say something about myself, my family is truly everything.
          Being a single dad to two beautiful kids for almost 10 years has not
          only shaped my character, but has defined my work ethic, built
          endurance, and defined the meaning of responsibility.
        </p>
      </div>

      <div className="mt-12 z-100 px-4 py-20 max-w-4xl mx-auto">
        <p className="text-center font-light text-2xl font-stretch-condensed">
          <span className="italic font-semibold text-3xl">Trajectory - </span>
          BCIT New <br /> Media & Web Dev{" "}
          <span className="italic font-semibold text-3xl font-stretch-condensed">
            Graduate <br />{" "}
          </span>
          <span className="italic font-semibold text-xl">spring 2026 </span>
          focusing on <br />
          <span className="italic font-semibold text-2xl font-stretch-condensed">
            User Experience,
            <br />
            Motion Graphics,
            <br />
          </span>
          &{" "}
          <span className="italic font-semibold text-2xl font-stretch-condensed">
            Development <br />
          </span>
          with sprinkles of
          <span className="italic font-semibold text-2xl font-stretch-condensed">
            {" "}
            Storytelling, <br />
            Animation
          </span>{" "}
          & <br />
          <span className="italic font-semibold text-2xl font-stretch-condensed">
            Audio / Video Editing
          </span>
        </p>
      </div>

      {/* Intro Paragraphs */}
      <ColorBurstText />
      <div className="mb-8 md:mb-12">
        <p className="text-lg md:text-xl mb-6">
          I’ve made enough mistakes to learn from them — and enough progress to
          keep growing.
        </p>
        <p className="text-lg md:text-xl mb-6">
          The issue with talking about yourself is, it’s all bias.
        </p>
        <p className="text-lg md:text-xl mb-8">
          But I will say something about me: my family is everything. Being a
          single dad to two beautiful kids for almost 10 years has not only
          shaped my character, but defined my work ethic, built endurance, and
          clarified the meaning of responsibility.
        </p>
      </div>

      <References />

      {/* Technical Skills */}
      <div className="mb-12 md:mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 pb-2 border-b border-gray-300">
          Technical Skills
        </h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 list-none p-0">
          <li className="bg-gray-100 py-3 px-4 rounded-md text-center font-medium text-sm md:text-base shadow-sm">
            React
          </li>
          <li className="bg-gradient-to-r from-white from-25% to-cyan-500 to-75% py-3 px-4 rounded-md text-center font-medium text-sm md:text-base shadow-sm">
            Vite
          </li>
          <li className="bg-gray-100 py-3 px-4 rounded-md text-center font-medium text-sm md:text-base shadow-sm">
            After Effects
          </li>
          <li className="bg-gray-100 py-3 px-4 rounded-md text-center font-medium text-sm md:text-base shadow-sm">
            Premiere
          </li>
          <li className="bg-gray-100 py-3 px-4 rounded-md text-center font-medium text-sm md:text-base shadow-sm">
            Audition
          </li>
          <li className="bg-gray-100 py-3 px-4 rounded-md text-center font-medium text-sm md:text-base shadow-sm">
            Illustrator
          </li>
          <li className="bg-gray-100 py-3 px-4 rounded-md text-center font-medium text-sm md:text-base shadow-sm">
            Photoshop
          </li>
          <li className="bg-gray-100 py-3 px-4 rounded-md text-center font-medium text-sm md:text-base shadow-sm">
            Figma
          </li>
          <li className="bg-gray-100 py-3 px-4 rounded-md text-center font-medium text-sm md:text-base shadow-sm">
            Blender
          </li>
          <li className="bg-gray-100 py-3 px-4 rounded-md text-center font-medium text-sm md:text-base shadow-sm">
            AutoCAD
          </li>
        </ul>
      </div>

      {/* Closing Statement */}
      <div>
        <p className="text-lg md:text-xl">
          If any of this speaks to you, then maybe the connection’s already
          started. I’m focused on the work, and open to wherever it leads
        </p>
      </div>
    </section>
  );
};

export default About;

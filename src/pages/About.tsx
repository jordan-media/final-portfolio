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
            Development,
            <br />
          </span>
          &{" "}
          <span className="italic font-semibold text-2xl font-stretch-condensed">
            Storytelling <br />
          </span>
          with sprinkles of
          <span className="italic font-semibold text-2xl font-stretch-condensed">
            {" "}
            Motion Graphics, <br />
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
<div className="mb-12 md:mb-16 relative">
  {/* Title behind the glass */}
  <h2 className="absolute top-1/2 transform -translate-y-1/2 left-1/2 transform -translate-x-1/2 z-0 text-8xl sm:text-9xl lg:text-8xl font-bold bg-gradient-to-r from-cyan-500 to-green-800 bg-clip-text text-transparent text-center opacity-80 tracking-widest">
    Technical Skills
  </h2>
  
  {/* Skills Grid Container with Glassmorphism */}
  <div 
    className="relative rounded-2xl overflow-hidden backdrop-blur-sm bg-white/10 p-6 md:p-8 z-10"
    style={{
      boxShadow: "inset -3px -3px 9.1px 1px rgba(255,255,255,0.22), inset 0px 2px 5.5px 0px rgba(255,255,255,0.08), inset 0px -2px 13.7px rgba(6,78,59,0.3)"
    }}
  >
    {/* Background gradient overlay */}
    <div 
      className="absolute inset-0 opacity-20 pointer-events-none"
      style={{
        background: "linear-gradient(135deg, rgba(6,182,212,0.1) 0%, rgba(34,197,94,0.1) 50%, rgba(6,78,59,0.1) 100%)"
      }}
    />
    
    {/* Skills Grid */}
    <ul className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 list-none p-0">
      {[
        'React', 'Vite', 'After Effects', 'Premiere', 'Audition', 
        'Illustrator', 'Photoshop', 'Figma', 'Blender', 'AutoCAD'
      ].map((skill, index) => (
        <li 
          key={skill}
          className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg"
          style={{
            background: `linear-gradient(135deg, 
              rgba(255,255,255,0.2) 0%, 
              rgba(6,182,212,0.1) ${30 + (index * 7) % 40}%, 
              rgba(34,197,94,0.1) ${60 + (index * 11) % 30}%, 
              rgba(255,255,255,0.1) 100%)`,
            backdropFilter: "blur(8px)",
            boxShadow: "inset -1px -1px 3px rgba(255,255,255,0.3), inset 1px 1px 3px rgba(6,78,59,0.2)"
          }}
        >
          {/* Hover gradient overlay */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
            style={{
              background: "linear-gradient(135deg, rgba(6,182,212,0.3) 0%, rgba(34,197,94,0.3) 100%)"
            }}
          />
          
          {/* Skill text */}
          <span className="relative z-10 block py-3 px-4 text-center font-medium text-sm md:text-base text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
            {skill}
          </span>
          
          {/* Subtle border highlight */}
          <div 
            className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              boxShadow: "inset 0 0 0 1px rgba(6,182,212,0.4)"
            }}
          />
        </li>
      ))}
    </ul>

    
    {/* Floating accent elements */}
    <div className="absolute top-4 right-4 w-16 h-16 rounded-full opacity-20 pointer-events-none bg-gradient-to-br from-cyan-400 to-green-500 blur-xl" />
    <div className="absolute bottom-6 left-6 w-12 h-12 rounded-full opacity-15 pointer-events-none bg-gradient-to-tr from-green-400 to-cyan-500 blur-lg" />
  </div>
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

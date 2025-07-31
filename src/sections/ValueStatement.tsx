// src/components/ValueStatement.tsx
import React, { useState } from 'react';

// No CSS import needed now

// Define a type for the content of valueStatements
type ValueContent = (string | React.ReactElement)[];

// Type the entire valueStatements object
interface ValueStatements {
  default: ValueContent;
  hiringManager: ValueContent;
  startupFounder: ValueContent;
  developer: ValueContent;
  creativeDirector: ValueContent;
}

const valueStatements: ValueStatements = {
  default: [
    "The tech industry moves fast — and a lot of people rush in.",
    "I took a different path. I’ve worked real jobs in real environments, where the stakes weren’t hypothetical and the deadlines weren’t flexible.",
    "From construction sites to creative studios, I’ve lived through multiple industries and absorbed how people actually work.",
    "That hands-on experience gave me a broader lens — not just on what users need, but how teams succeed when things get tough.",
    "I’m new to development, but not new to pressure, ownership, or figuring things out when it counts. That’s the perspective I bring to the work."
  ],
  hiringManager: [
    "You're building a team — and that means finding people who take ownership, not just orders.",
    "I’ve spent years in environments where leadership and accountability weren’t optional.",
    "Deadlines, pressure, problem-solving — I’ve lived all of it, and I know how to show up when it matters.",
    "Now I’m applying that mindset to design and development. What I don’t know yet, I learn fast — and I own it all the way through."
  ],
  startupFounder: [
    "Startups move fast. You need people who can pivot, learn, and wear a dozen hats without losing focus.",
    "That’s how I’ve worked my whole life — stepping into new roles, figuring things out, and building forward.",
    "From trade work to UX thinking, I’ve carried the same instinct: understand the problem, take initiative, and make it better."
  ],
  developer: [
    // Preformatted code block with Tailwind-friendly syntax highlighting classes
    <pre className="code-block font-mono text-gray-900 text-sm md:text-base p-6 overflow-x-auto leading-relaxed whitespace-pre-wrap break-words rounded-lg bg-gray-50 shadow-inner">
      <code>
        <span className="text-[#7a7a7a] italic">// Tech moves fast — most people just .join() and hope for the best</span>{'\n'}
        <span className="text-[#0b61a4]">const</span> industry = <span className="text-[#007245]">"tech"</span>;{'\n'}
        <span className="text-[#0b61a4]">const</span> newHires = Array(<span className="text-[#007245]">100</span>).fill({`{`} path: <span className="text-[#007245]">"typical"</span>, stressTested: <span className="text-[#0b61a4]">false</span> {`}`});{'\n\n'}
        <span className="text-[#0b61a4]">const</span> me = {'{'}{'\n'}
        &nbsp;&nbsp;path: <span className="text-[#007245]">"nonTraditional"</span>,{'\n'}
        &nbsp;&nbsp;industries: [<span className="text-[#007245]">"construction"</span>, <span className="text-[#007245]">"creative"</span>],{'\n'}
        &nbsp;&nbsp;pressureTested: <span className="text-[#0b61a4]">true</span>,{'\n'}
        &nbsp;&nbsp;deadlines: <span className="text-[#007245]">"nonFlexible"</span>,{'\n'}
        &nbsp;&nbsp;users: <span className="text-[#007245]">"realPeople"</span>,{'\n'}
        &nbsp;&nbsp;understands: [<span className="text-[#007245]">"ownership"</span>, <span className="text-[#007245]">"adaptability"</span>, <span className="text-[#007245]">"urgency"</span>]{'\n'}
        {'}'};{'\n\n'}
        <span className="text-[#7a7a7a] italic">// Real jobs &gt; hypothetical projects</span>{'\n'}
        <span className="text-[#0b61a4]">if</span> (me.pressureTested && me.deadlines === <span className="text-[#007245]">"nonFlexible"</span>) {'{'}{'\n'}
        &nbsp;&nbsp;me.resilience = <span className="text-[#007245]">"earned"</span>;{'\n'}
        {'}'}{'\n\n'}
        <span className="text-[#0b61a4]">const</span> perspective = perspectiveFromExperience(me.industries);{'\n\n'}
        <span className="text-[#7a7a7a] italic">// I might be new to dev, but not to figuring things out when it matters</span>{'\n'}
        <span className="text-[#0b61a4]">const</span> yearsOfCoding = <span className="text-[#007245]">1</span>;{'\n'}
        <span className="text-[#0b61a4]">const</span> yearsOfProblemSolving = <span className="text-[#007245]">10</span>;{'\n\n'}
        <span className="text-[#0b61a4]">const</span> impactReady = yearsOfCoding &lt; <span className="text-[#007245]">2</span> && yearsOfProblemSolving &gt;= <span className="text-[#007245]">10</span>;{'\n\n'}
        <span className="text-[#7a7a7a] italic">// If the environment is chaotic, I don’t crash — I compile</span>{'\n'}
        <span className="text-[#0b61a4]">const</span> thrivesUnderPressure = impactReady && me.pressureTested;{'\n\n'}
        <span className="text-[#7a7a7a] italic">// Team value? If I reduce friction, return true</span>{'\n'}
        <span className="text-[#0b61a4]">function</span> addsValue(team) {'{'}{'\n'}
        &nbsp;&nbsp;<span className="text-[#0b61a4]">const</span> listens = <span className="text-[#0b61a4]">true</span>;{'\n'}
        &nbsp;&nbsp;<span className="text-[#0b61a4]">const</span> takesOwnership = <span className="text-[#0b61a4]">true</span>;{'\n'}
        &nbsp;&nbsp;<span className="text-[#0b61a4]">const</span> learnsFast = <span className="text-[#0b61a4]">true</span>;{'\n\n'}
        &nbsp;&nbsp;<span className="text-[#0b61a4]">return</span> listens && takesOwnership && learnsFast;{'\n'}
        {'}'}{'\n\n'}
        <span className="text-[#7a7a7a] italic">// Summary</span>{'\n'}
        <span className="text-[#0b61a4]">if</span> (thrivesUnderPressure && addsValue(<span className="text-[#007245]">"yours"</span>)) {'{'}{'\n'}
        &nbsp;&nbsp;console.log(<span className="text-[#007245]">"I'm ready. Let's ship something great."</span>);{'\n'}
        {'}'}
      </code>
    </pre>
  ],
  creativeDirector: [
    "Design is only as good as the understanding behind it.",
    "I’ve spent years seeing how people actually interact with tools, environments, and each other.",
    "That experience shaped how I build — with empathy, clarity, and attention to the stuff most people miss."
  ]
};

function ValueStatement()  { // Type the component
  const [selected, setSelected] = useState<keyof ValueStatements>('default'); // Type selected state
  const [hasInteracted, setHasInteracted] = useState<boolean>(false); // Type hasInteracted state

  const handleSelect = (key: keyof ValueStatements) => { // Type key parameter
    setSelected(key);
    setHasInteracted(true);
  };

  const isFocused = selected !== 'default' || hasInteracted;

  return (
    // Replaced .value-section classes with Tailwind utilities
    // 'w-full py-24' for padding (approx. 6vh)
    // 'bg-white' for background (approx. var(--primary-color))
    // 'text-left font-space-grotesk'
    <section className="w-full py-24 bg-white text-left font-space-grotesk">

      {/* Replaced .identity-button-row classes with Tailwind utilities */}
      {/* 'relative z-20 flex flex-wrap justify-center gap-4' */}
      <div className="relative z-20 flex flex-wrap justify-center gap-4">
        {/* Replaced .value-buttons classes with Tailwind utilities */}
        {/* 'flex flex-wrap justify-center gap-4 mb-10 relative z-20' */}
        {/* Consolidating button row and buttons styling as they were very similar */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {/* General button styling (simplified from original CSS) */}
          {/* 'px-6 py-3 text-sm sm:text-base md:text-lg font-medium rounded-[20px]' */}
          {/* 'border-2 border-gray-800 text-gray-800 bg-transparent' (approx. var(--secondary-color) / #36454f) */}
          {/* 'hover:bg-gray-800 hover:text-white active:bg-gray-900 active:text-white' */}
          {/* 'transition-all duration-300 select-none cursor-pointer' */}
          {/* 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50' */}
          <button
            onClick={() => handleSelect('hiringManager')}
            className="px-6 py-3 text-sm sm:text-base md:text-lg font-medium rounded-[20px]
                       border-2 border-gray-800 text-gray-800 bg-transparent
                       hover:bg-gray-800 hover:text-white active:bg-gray-900 active:text-white
                       transition-all duration-300 select-none cursor-pointer
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Hiring Manager
          </button>
          <button
            onClick={() => handleSelect('startupFounder')}
            className="px-6 py-3 text-sm sm:text-base md:text-lg font-medium rounded-[20px]
                       border-2 border-gray-800 text-gray-800 bg-transparent
                       hover:bg-gray-800 hover:text-white active:bg-gray-900 active:text-white
                       transition-all duration-300 select-none cursor-pointer
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Startup Founder
          </button>
          {/* .default-button with slightly larger padding and font size */}
          <button
            onClick={() => handleSelect('default')}
            className="px-8 py-4 text-base sm:text-lg md:text-xl font-semibold rounded-[20px]
                       border-2 border-gray-800 text-gray-800 bg-transparent
                       hover:bg-gray-800 hover:text-white active:bg-gray-900 active:text-white
                       transition-all duration-300 select-none cursor-pointer
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Curious Visitor
          </button>
          <button
            onClick={() => handleSelect('developer')}
            className="px-6 py-3 text-sm sm:text-base md:text-lg font-medium rounded-[20px]
                       border-2 border-gray-800 text-gray-800 bg-transparent
                       hover:bg-gray-800 hover:text-white active:bg-gray-900 active:text-white
                       transition-all duration-300 select-none cursor-pointer
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Developer
          </button>
          <button
            onClick={() => handleSelect('creativeDirector')}
            className="px-6 py-3 text-sm sm:text-base md:text-lg font-medium rounded-[20px]
                       border-2 border-gray-800 text-gray-800 bg-transparent
                       hover:bg-gray-800 hover:text-white active:bg-gray-900 active:text-white
                       transition-all duration-300 select-none cursor-pointer
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Creative Director
          </button>
        </div>
      </div>
    
      {/* Replaced .value-content with Tailwind utilities */}
      {/* 'max-w-3xl mx-auto' for content width and centering */}
      {/* 'transition-all duration-400 ease-in-out' for filter/opacity transition */}
      {/* Conditional classes for blur/opacity: 'filter blur-sm opacity-60' or 'filter-none opacity-100' */}
      <div
        className={`max-w-3xl mx-auto transition-all duration-400 ease-in-out ${isFocused ? 'filter-none opacity-100' : 'filter blur-sm opacity-60'}`}
        onMouseEnter={() => setHasInteracted(true)}
      >
        {valueStatements[selected].map((line, index) => (
          // Replaced .value-text with Tailwind utilities
          // 'text-base sm:text-lg md:text-xl mb-5 text-gray-900 leading-relaxed'
          <p key={index} className="text-base sm:text-lg md:text-xl mb-5 text-gray-900 leading-relaxed">
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}

export default ValueStatement;
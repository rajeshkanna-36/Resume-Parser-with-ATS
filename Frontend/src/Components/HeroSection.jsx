import Button from "./Button";

function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* Left stripes */}
      <div className="absolute left-0 top-0 h-full w-12 border-r border-white/10 bg-[repeating-linear-gradient(-45deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_2px,transparent_2px,transparent_12px)]"></div>

      {/* Right stripes */}
      <div className="absolute right-0 top-0 h-full w-12 border-l border-white/10 bg-[repeating-linear-gradient(-45deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_2px,transparent_2px,transparent_12px)]"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">

        <div className="w-full border-y border-white/10 py-1">
          <h1 className="text-8xl font-medium leading-none tracking-tight">
            Know your ATS score
            <br />
            before recruiters do.
          </h1>
        </div>

        <div className="w-full border-b border-white/10 py-1">
          <p className="text-xl text-white/70">
            Upload your resume and get an instant ATS score,
            <br />
            keyword analysis, and personalized improvements.
          </p>
        </div>

        <div className="mt-10">
          <Button text = "GET START"
                  to={"/upload"}
                  />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
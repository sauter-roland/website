import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen items-center justify-center font-sans pl-8">
      <h1 className="text-3xl font-semibold leading-10 tracking-tight mb-4">
        Hi! I'm Roland Sauter.
      </h1>
      <p className="max-w-xl text-lg leading-8">
        I'm a software engineer, (data) scientist, and generally a nerd based in Oslo, Norway.
        This is my first attempt at a personal website, so expect it to evolve over time.

        These days I am a software engineer at Kongsberg Digital working on everything from optimizations
        that save customers millions of kroners, to work processes that improve maintenance and safety,
        to AI integrations that inform busy engineers.
      </p>
      <Image src="/profile.jpg" alt="Roland's Profile Picture" className="mt-6 rounded-lg" width={200} height={200} />

    </div>
  );
}
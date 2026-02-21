import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
        Hi! I'm Roland Sauter.
      </h1>
      <p className="max-w-lg text-lg leading-8 text-zinc-600 dark:text-zinc-400 mt-4">
        I'm a software engineer, (data) scientist, and generally a nerd based in Oslo, Norway.
        This is my first attempt at a personal website, so expect it to evolve over time.

        These days I am a software engineer at Kongsberg Digital working on everything from optimizations
        that save customers millions of kroners, to work processes that improve maintenance and safety,
        to AI integrations that inform busy engineers.
      </p>
      <Image src="/profile.jpg" alt="Roland's Profile Picture" className="mt-6 rounded-lg shadow-lg" width={200} height={200} />

    </div>
  );
}
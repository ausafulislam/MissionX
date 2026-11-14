export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="font-heading text-6xl font-bold tracking-tight sm:text-8xl">
        Mission<span className="text-accent">X</span>
      </h1>
      <p className="text-lg text-muted sm:text-xl">
        Design it. Launch it. Learn why.
      </p>
      <button
        type="button"
        className="mt-4 rounded-pill bg-accent px-8 py-3 font-medium text-bg transition-colors hover:bg-accent/90"
      >
        Start Designing
      </button>
    </main>
  );
}

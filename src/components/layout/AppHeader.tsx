export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-touch-target-min items-center gap-2 bg-surface px-container-margin">
      <img src="/pwa-192x192.png" alt="RE:VIVE 로고" className="h-8 w-8 rounded-lg object-cover" />
      <h1 className="text-headline-md font-extrabold text-primary">RE:VIVE</h1>
    </header>
  );
}

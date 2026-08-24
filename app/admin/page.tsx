export default function AdminPage() {
  return (
    <main className="min-h-screen p-4 sm:p-6">
      <section className="mx-auto max-w-3xl">
        <header className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Administración</p>
          <h1 className="text-2xl font-bold">Evidencias PoD</h1>
        </header>

        <article className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">GUIA-DEMO-001</p>
              <h2 className="font-bold">Juan Pérez</h2>
            </div>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">PENDING</span>
          </div>

          <p className="mt-5 text-sm text-gray-600">
            Cuando se complete la entrega aquí aparecerán el método de verificación, timestamp UTC, GPS, firma, payload y SHA-256.
          </p>
        </article>
      </section>
    </main>
  );
}

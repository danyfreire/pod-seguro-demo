export default async function DeliveryPage({ params }: { params: Promise<{ tracking: string }> }) {
  const { tracking } = await params;

  return (
    <main className="min-h-screen p-4 sm:p-6">
      <section className="mx-auto max-w-md rounded-2xl bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Entrega</p>
        <h1 className="mt-1 text-2xl font-bold">{tracking}</h1>

        <div className="mt-6 rounded-xl bg-gray-50 p-4">
          <p className="text-sm text-gray-500">Destinatario</p>
          <p className="font-semibold">Juan Pérez</p>
          <p className="mt-3 text-sm text-gray-500">Dirección</p>
          <p className="font-semibold">Av. República 123, Quito</p>
        </div>

        <div className="mt-6">
          <h2 className="font-semibold">Verificación del receptor</h2>
          <p className="mt-1 text-sm text-gray-600">El siguiente paso será generar y enviar un OTP de 6 dígitos al correo del destinatario.</p>
        </div>

        <button className="mt-6 w-full rounded-xl bg-black px-5 py-4 font-semibold text-white">
          Enviar OTP
        </button>
        <button className="mt-3 w-full rounded-xl border border-gray-300 px-5 py-4 font-semibold">
          Sin OTP / Contingencia
        </button>
      </section>
    </main>
  );
}

import Link from "next/link";

const delivery = {
  tracking: "GUIA-DEMO-001",
  recipient: "Juan Pérez",
  address: "Av. República 123, Quito",
  email: "demo@example.com",
  status: "PENDING",
};

export default function CourierPage() {
  return (
    <main className="min-h-screen p-4 sm:p-6">
      <section className="mx-auto max-w-md">
        <header className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Courier</p>
          <h1 className="text-2xl font-bold">Entregas pendientes</h1>
        </header>

        <article className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">Tracking</p>
              <h2 className="font-bold">{delivery.tracking}</h2>
            </div>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
              Pendiente
            </span>
          </div>

          <dl className="mt-5 space-y-3 text-sm">
            <div>
              <dt className="text-gray-500">Destinatario</dt>
              <dd className="font-medium">{delivery.recipient}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Dirección</dt>
              <dd className="font-medium">{delivery.address}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Canal OTP</dt>
              <dd className="font-medium">Correo electrónico</dd>
            </div>
          </dl>

          <Link
            href="/courier/GUIA-DEMO-001"
            className="mt-6 block rounded-xl bg-black px-5 py-4 text-center font-semibold text-white"
          >
            Iniciar entrega
          </Link>
        </article>
      </section>
    </main>
  );
}

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen p-6 flex items-center justify-center">
      <section className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">PoD Seguro</p>
        <h1 className="mt-2 text-3xl font-bold">Demo de entrega segura</h1>
        <p className="mt-4 text-gray-600">
          Prueba de concepto para registrar entregas mediante OTP, firma, geolocalización y evidencia estructurada, sin almacenar fotografías de documentos.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link className="rounded-xl bg-black px-5 py-4 text-center font-semibold text-white" href="/courier">
            Abrir vista Courier
          </Link>
          <Link className="rounded-xl border border-gray-300 px-5 py-4 text-center font-semibold" href="/admin">
            Abrir vista Admin
          </Link>
        </div>
      </section>
    </main>
  );
}

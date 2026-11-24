export default function Login() {
  return (
    <section className="mx-auto max-w-xl">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">Bienvenido a GolPark</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Ingresar</h1>
      <form
        onSubmit={(event) => event.preventDefault()}
        className="mt-7 grid gap-5 rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-lg shadow-emerald-950/5 sm:p-8"
      >
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Correo
          <input
            className="rounded-xl border border-slate-300 bg-stone-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
            type="email"
            name="correo"
            autoComplete="email"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Contraseña
          <input
            className="rounded-xl border border-slate-300 bg-stone-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
            type="password"
            name="contrasena"
            autoComplete="current-password"
          />
        </label>

        <button
          type="submit"
          className="rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white shadow-md shadow-emerald-900/15 transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-500/25"
        >
          Ingresar
        </button>
      </form>
    </section>
  );
}

function Login() {
  return (
    <section className="mx-auto max-w-sm">
      <h2 className="mb-4 text-2xl font-bold">Ingresar</h2>
      <form className="rounded-lg border border-slate-200 bg-white p-4">
        <label className="mb-4 block font-bold">
          Correo
          <input type="email" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 font-normal" />
        </label>
        <label className="mb-4 block font-bold">
          Contraseña
          <input type="password" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 font-normal" />
        </label>
        <button type="button" disabled className="w-full rounded-md bg-slate-400 py-2 font-bold text-white">
          Ingresar (Proximamente)
        </button>
      </form>
    </section>
  );
}

export default Login;
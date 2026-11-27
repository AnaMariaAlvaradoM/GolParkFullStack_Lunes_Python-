
function Login() {
  return (
    <section className="mx-auto max-w-md py-10">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-3xl font-extrabold text-green-900">
          Ingresar
        </h2>

        <form className="space-y-5">
          <label className="block font-semibold text-slate-700">
            Correo
            <input
              type="email"
              name="correo"
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              placeholder="ejemplo@correo.com"
            />
          </label>

          <label className="block font-semibold text-slate-700">
            Contraseña
            <input
              type="password"
              name="contrasena"
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              placeholder="Ingresa tu contraseña"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-lg bg-green-700 py-3 font-bold text-white transition-colors hover:bg-green-800"
          >
            Ingresar
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;

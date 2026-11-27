function Login() {
  return (
    <section className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 shadow-[0_24px_60px_rgba(0,0,0,0.35)] md:grid-cols-[1.05fr_0.95fr]">
      <div className="relative hidden min-h-[520px] overflow-hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=85"
          alt="Jugadores en una cancha de fútbol"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-black/20" />
        <div className="absolute bottom-8 left-8 right-8 max-w-md">
          <p className="font-[family-name:Oswald,sans-serif] text-xs uppercase tracking-[0.3em] text-amber-300">
            Túnel de vestuarios
          </p>
          <p className="mt-2 font-[family-name:Oswald,sans-serif] text-4xl uppercase leading-none text-white">
            Entra al club y reserva tu cancha.
          </p>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-md flex-col justify-center px-7 py-12 sm:px-10">
        <p className="font-[family-name:Oswald,sans-serif] text-xs uppercase tracking-[0.3em] text-amber-300">
          Acceso de jugador
        </p>
        <h2 className="mt-2 mb-7 font-[family-name:Oswald,sans-serif] text-5xl uppercase tracking-wide text-white">
          Ingresar
        </h2>

        <form className="space-y-5 rounded-3xl border border-white/10 bg-white p-6 text-emerald-950">
          <label className="block font-[family-name:Oswald,sans-serif] text-sm uppercase tracking-[0.16em]">
            Correo
            <input
              type="email"
              placeholder="nombre@correo.com"
              className="mt-2 w-full rounded-2xl border border-emerald-200 bg-emerald-50/70 px-4 py-3.5 font-[family-name:Barlow,sans-serif] font-normal normal-case tracking-normal outline-none placeholder:text-emerald-900/35 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
            />
          </label>
          <label className="block font-[family-name:Oswald,sans-serif] text-sm uppercase tracking-[0.16em]">
            Contraseña
            <input
              type="password"
              placeholder="••••••••"
              className="mt-2 w-full rounded-2xl border border-emerald-200 bg-emerald-50/70 px-4 py-3.5 font-[family-name:Barlow,sans-serif] font-normal normal-case tracking-normal outline-none placeholder:text-emerald-900/35 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
            />
          </label>
          <button type="button" disabled className="w-full cursor-not-allowed rounded-full bg-slate-200 py-3.5 font-[family-name:Oswald,sans-serif] text-lg uppercase tracking-wider text-slate-400">
            Ingresar
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;

function Login() {
  return (
    <section className="surface-card mx-auto grid max-w-4xl overflow-hidden md:grid-cols-2">
      <div className="relative hidden min-h-[440px] overflow-hidden bg-[#10251b] p-9 text-white md:flex md:flex-col md:justify-between">
        <div aria-hidden="true" className="absolute inset-0 bg-cover bg-center opacity-55" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1000&q=80')" }} />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0b1c13] via-[#10251b]/30 to-[#10251b]/35" />
        <span className="relative z-10 inline-flex size-12 items-center justify-center rounded-2xl bg-[#d9f99d] text-xl text-[#183b2a]">✦</span>
        <div className="relative z-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#d9f99d]">La cancha te llama</p>
          <p className="font-display text-3xl font-bold leading-tight">El fútbol se disfruta más cuando jugamos juntos.</p>
        </div>
      </div>
      <div className="p-7 sm:p-10">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#198650]">Bienvenido a GolPark</p>
        <h2 className="font-display mb-2 text-3xl font-bold tracking-tight text-[#183b2a]">Ingresar</h2>
        <p className="mb-7 text-sm leading-6 text-[#7b887e]">Accede a tu cuenta para tener tus partidos siempre a mano.</p>
        <form className="flex flex-col gap-5">
          <label className="flex flex-col gap-2 text-sm font-semibold text-[#34463a]">
            Correo
            <input type="email" className="field-control font-normal" placeholder="equipo@correo.com" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-[#34463a]">
            Contraseña
            <input type="password" className="field-control font-normal" placeholder="••••••••" />
          </label>
          <button type="button" disabled className="mt-1 cursor-not-allowed rounded-xl bg-[#e8ece8] p-3.5 font-bold text-[#7c8980]">
            Ingresar (llega en el Módulo 2)
          </button>
          <p className="text-center text-xs text-[#8a968d]">El inicio de sesión estará disponible próximamente.</p>
        </form>
      </div>
    </section>
  );
}

export default Login;
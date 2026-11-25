function Login() {
  return (
    <section className="mx-auto max-w-md rounded-xl bg-white p-5 shadow-md">
      <h2 className="mb-4 text-center text-2xl font-bold text-[#146c43]">Ingresar</h2>
      <form className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 font-semibold">
          Correo
          <input type="email" className="rounded-lg border border-[#c7cfcb] px-3 py-2 font-normal focus:border-[#2fb36d] focus:outline-none" />
        </label>
        <label className="flex flex-col gap-1 font-semibold">
          Contraseña
          <input type="password" className="rounded-lg border border-[#c7cfcb] px-3 py-2 font-normal focus:border-[#2fb36d] focus:outline-none" />
        </label>
        <button type="button" disabled className="cursor-not-allowed rounded-lg bg-[#c7cfcb] p-3 font-semibold text-[#5c6661]">
            Ingresar (llega en el Módulo 2)
        </button>
      </form>
    </section>
  );
}

export default Login;
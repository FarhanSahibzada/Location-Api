export default function About() {
  return (
    <section
      id="#about"
      className="relative h-[90vh] md:h-screen lg:bg-[url('/man1.png')] bg-cover bg-center bg-no-repeat my-10 bg-white/40"
    >
      <div className="absolute inset-0 bg-white/40  md:hidden z-0" />

      <div className="relative w-full flex flex-col items-center">
        <h1 className="
       text-4xl sm:text-6xl md:text-8xl  xl:text-9xl font-montserrat 
      font-semibold mix-blend-difference text-white p-4 text-center tracking-widest"
        >
          F.SAHIBZADA
        </h1>
        <p className="text-lg  text-black md:text-black  font-semibold md:-mt-2
        font-montserrat  text-center max-w-[500px]  
        ">
          Our mission is to make city coordinates accessible, accurate,
           and easy to integrate for developers around the world.
        </p>

        {/* two cards on long screens */}
        <div className="lg:block hidden">
          <div
            className="lg:absolute lg:right-10 xl:right-36 lg:top-60  xl:top-55 lg:text-black text-white  
          max-w-80   text-center mt-4 "
          >
            <h1 className="font-montserrat font-semibold text-2xl md:text-4xl lg:text-2xl tracking-wide mb-2">
              Empowering Location Data
            </h1>
            <p className="font-normal text-sm  text-neutral-600 leading-5">
              Farhan provides powerful and reliable location APIs that connect you to precise geographic data worldwide.
            </p>
          </div>

          <div
            className="md:absolute  lg:left-10 xl:left-36 lg:top-[500px] xl:top-96  lg:text-black text-white   
          max-w-80 text-center "
          >
            <h1 className="font-montserrat font-semibold text-2xl md:text-4xl lg:text-2xl tracking-wide mb-2">
              Simplifying Geolocation
            </h1>
            <p className="font-normal text-sm  text-neutral-600 leading-5">
              With easy-to-use endpoints and accurate data,
              Farhan helps developers build location-aware applications effortlessly.
            </p>
          </div>

        </div>

        {/* two cards  on short screens  */}
        <div className="lg:hidden flex flex-col items-center justify-center gap-8 px-4 mt-20">

          <div className="max-w-96 sm:max-w-[500px] text-center text-black p-4 sm:p-16  rounded-xl shadow-md">
            <h1 className="font-montserrat font-semibold sm:font-bold text-2xl sm:text-4xl tracking-wide mb-2">
              Empowering Location Data
            </h1>
            <p className="font-normal sm:font-semibold text-sm sm:text-lg text-neutral-700 leading-5">
              Farhan provides powerful and reliable location APIs that connect you to precise geographic data worldwide.
            </p>
          </div>

          <div className="max-w-96 sm:max-w-[500px] text-center text-black p-4 sm:p-16  rounded-xl shadow-md">
            <h1 className="font-montserrat font-semibold sm:font-bold text-2xl sm:text-4xl tracking-wide mb-2">
              Simplifying Geolocation
            </h1>
            <p className="font-normal sm:font-semibold text-sm sm:text-lg text-neutral-700 leading-5">
              With easy-to-use endpoints and accurate data,
              Farhan helps developers build location-aware applications effortlessly.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

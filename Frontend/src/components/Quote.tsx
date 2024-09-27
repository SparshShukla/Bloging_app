export const Quote = () => {
  return (
    <div className="max-h-80">
      <div className=" h-screen flex justify-center flex-col bg-emerald-800 ">
        <div className="flex justify-center">
          <div className="max-w-lg text-slate-200 antialiased">
            <div className="text-3xl font-bold text-pretty">
              “I think a lot of people believe they don’t have anything to write
              about or to add value on, but if you’re good at something and
              you’ve had success at something, just think more about that—and
              write everything out.”
            </div>
            <div className="italic mt-5 max-w-lg text-xl font-light font-semibold">
              Austin Belcak
              <div className="italic mt-1 max-w-lg text-xs font-light font-semibold">
                CEO | Cultivated Culture
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { billboard } from "@/types";

export default function Billboard({ data }: { data: billboard }) {
  return (
    <div className="py-4 sm:py-6 lg:py-8 rounded-xl overflow-hidden">
      <div
        className="rounded-xl overflow-hidden relative aspect-square md:aspect-[2.4/1] bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${data?.imageURL})`,
        }}
      >
        <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
          <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />

          <div className="relative font-bold text-3xl text-white max-w-xs sm:text-5xl lg:text-6xl sm:max-w-xl">
            {data?.label}
          </div>
          <div className="relative text-base text-slate-100">
            {data?.description}
          </div>
        </div>
      </div>
    </div>
  );
}

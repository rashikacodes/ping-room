"use client";

type Props = {
  text: string;
};

export default function SystemMessage({
  text,
}: Props) {
  return (
    <div className="my-6 flex items-center justify-center">

      <div className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs text-slate-400 backdrop-blur-xl">

        ✨ {text}

      </div>

    </div>
  );
}
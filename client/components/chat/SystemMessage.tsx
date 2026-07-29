type SystemMessageProps = {
  text: string;
};

export default function SystemMessage({
  text,
}: SystemMessageProps) {
  return (
    <div className="text-center text-slate-500 text-sm italic">
      {text}
    </div>
  );
}
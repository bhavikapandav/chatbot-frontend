export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#171717]">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-white/5 border-t-white animate-spin"></div>
        <div className="absolute w-6 h-6 rounded-full bg-white/10 animate-ping"></div>
      </div>
      <p className="mt-4 text-xs font-medium text-gray-400 tracking-widest uppercase select-none animate-pulse">
        Loading ChatBot...
      </p>
    </div>
  );
}

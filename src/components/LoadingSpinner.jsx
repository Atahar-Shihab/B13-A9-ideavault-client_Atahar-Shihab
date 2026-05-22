export default function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center py-24 gap-4">
      <div className="relative">
        <div className="w-14 h-14 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl">💡</span>
        </div>
      </div>
      <p className="text-sm text-base-content/40 font-medium">Loading...</p>
    </div>
  );
}

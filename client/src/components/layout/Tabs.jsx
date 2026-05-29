const Tabs = () => {
  return (
    <div className="flex gap-6 border-b border-slate-250/60 px-6 bg-white">
      <button className="py-4 border-b-2 border-indigo-600 text-indigo-600 font-semibold text-sm transition-all relative">
        Document Upload
        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-600 rounded-full" />
      </button>
    </div>
  );
};

export default Tabs;
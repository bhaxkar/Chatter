const MessageShimmer = () => {
  const skeletons = Array(4).fill(null);

  return (
    <div className="flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 p-4 space-y-6">
      {skeletons.map((_, idx) => (
        <div
          key={idx}
          className={`flex gap-4 ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}
        >
          {idx % 2 === 0 && (
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse flex-shrink-0" />
          )}
          <div className={`flex flex-col ${idx % 2 === 0 ? "items-start" : "items-end"} max-w-[70%]`}>
            <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse" />
            <div className="bg-gray-200 rounded-2xl p-4 animate-pulse">
              <div className="w-48 h-4 bg-gray-300 rounded mb-2" />
              <div className="w-32 h-4 bg-gray-300 rounded" />
            </div>
          </div>
          {idx % 2 !== 0 && (
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse flex-shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageShimmer;

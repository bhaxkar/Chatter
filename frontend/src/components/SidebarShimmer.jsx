import { IoMdContacts } from "react-icons/io";

const SidebarShimmer = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-gray-200 flex flex-col transition-all duration-200 bg-white">
      <div className="border-b border-gray-200 w-full p-5">
        <div className="flex items-center gap-2">
          <IoMdContacts className="w-6 h-6 text-blue-600" />
          <span className="font-medium hidden lg:block text-gray-800">Contacts</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-3 flex items-center gap-3">
            <div className="relative mx-auto lg:mx-0">
              <div className="bg-gray-200 animate-pulse w-12 h-12 rounded-full" />
            </div>

            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="bg-gray-200 animate-pulse h-4 w-32 mb-2 rounded" />
              <div className="bg-gray-200 animate-pulse h-3 w-16 rounded" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarShimmer;

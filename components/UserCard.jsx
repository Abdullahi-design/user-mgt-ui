export default function UserCard({ user, openDropdown, handleToggleDropdown, handleOpenUserModal }) {
  return (
    <div className="bg-white md:text-base text-sm shadow-md rounded-lg p-4 space-y-2 relative">
      <img
        src={user.photo || '/assets/images/avatars/user.png'}
        alt="Profile"
        className={`w-12 md:w-16 h-12 md:h-16 rounded-full border-2 border-${user.color}-500`}
      />
      <h3 className="text-left font-semibold mt-2">{user.name}</h3>
      <p className="text-left text-gray-600">{user.email}</p>
      <p className="text-left text-gray-500">{user.role}</p>
      <p className={`text-left text-xs ${user.status === 'Active' ? 'text-green-500 bg-green-100 w-fit  py-[0.15rem] px-3 rounded-lg' : 'text-red-500 bg-red-100 w-fit  py-[0.15rem] px-3 rounded-lg'}`}>
        {user.status}
      </p>
      
      <div className="relative inline-block text-left mt-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleToggleDropdown(user.id);
          }}
          className="bg-gray-200 text-gray-700 px-3 py-1 text-sm rounded focus:outline-none"
        >
          Action
        </button>
        
        {openDropdown === user.id && (
          <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded shadow-lg z-10">
            <button
              onClick={() => handleOpenUserModal(user, false)}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              👁 View
            </button>
            <button
              onClick={() => handleOpenUserModal(user, true)}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              ✎ Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
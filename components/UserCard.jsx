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
            // handleToggleDropdown(user.id);
            handleOpenUserModal(user, true)
          }}
          className="cursor-pointer bg-gray-200 text-gray-700 px-3 py-1 text-sm rounded focus:outline-none"
        >
          ✎ Edit
        </button>
      </div>
    </div>
  );
}
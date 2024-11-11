export default function InputField ({ label, name, type = "text" }) {
    return (
      <div className="relative mb-4">
        <label htmlFor={name} className="absolute left-3  pt-0.5 text-gray-500 transition-all duration-300  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-purple-700">
          {label}
        </label>
        <input type={type} required name={name} id={name} className="peer mt-1.5 w-full border border-gray-300 rounded-md pt-4 pb-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent disabled:bg-gray-300/40 disabled:cursor-not-allowed" />
      </div>
    );
}
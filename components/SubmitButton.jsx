import { useFormStatus } from "react-dom";
import { FiLoader } from "react-icons/fi";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      aria-disabled={pending} 
      className={`bg-purple-600 text-white px-4 py-2 rounded w-full ${pending ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {pending ? (
        <div className="flex justify-center space-x-2">
          <p>Submitting...</p>
          <FiLoader className="animate-spin mt-1 w-5 h-5" />
        </div>
      ) : (
        'Submit'
      )}
    </button>
  );
}
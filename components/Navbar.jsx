import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex w-full items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold text-purple-600">AlumUnite</h1>
          </Link>
          <div className='flex space-x-4 w-full justify-end'>
            <Link href="/" className="text-gray-600 hover:text-purple-600 font-medium">
              Home
            </Link>
            <Link href="/addUser" className="text-gray-600 hover:text-purple-600 font-medium">
              Add User
            </Link>
            <Link href="/manageUser" className="text-gray-600 hover:text-purple-600 font-medium">
            Manage Users
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
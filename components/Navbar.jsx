import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex w-full items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold text-purple-600">AlumUnite</h1>
          </Link>
        </div>
      </div>
    </nav>
  );
}
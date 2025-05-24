import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-black text-[#F8F6F0] font-mono">
      <h1 className="text-4xl mb-4">404</h1>
      <p className="mb-8">Page not found</p>
      <Link href="/">
        <a className="px-4 py-2 border border-[#F8F6F0] hover:bg-[#F8F6F0] hover:text-black transition-colors duration-300">
          Return Home
        </a>
      </Link>
    </div>
  );
}
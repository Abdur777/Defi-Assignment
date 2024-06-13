import Link from "next/link";


export default function Header() {
  return (
    <header className="h-24 flex justify-between items-center px-12">
      <div className="flex items-center gap-5">
        <Link href="/" className="text-white text-2xl no-underline">
          <div className="px-3 py-2 rounded-md font-medium transition duration-300 hover:bg-gray-700 cursor-pointer">
            Swap
          </div>
        </Link>
        <Link href="/charts" className="text-white text-2xl no-underline">
          <div className="px-3 py-2 rounded-md font-medium transition duration-300 hover:bg-gray-700 cursor-pointer">
            Charts
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-end gap-5">
        <div className="text-2xl flex items-center px-3 py-2 rounded-md">
          <img src='/eth.svg' alt="eth" className="w-10 h-10 pr-2" />
          Ethereum
        </div>
        <div className="px-5 py-2 rounded-full">
          <w3m-button />
        </div>
      </div>
    </header>
  );
}

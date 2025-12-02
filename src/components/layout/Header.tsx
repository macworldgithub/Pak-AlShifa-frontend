export default function Header() {
  return (
    <header className="fixed top-0 left-[260px] right-0 h-[70px] bg-white shadow-sm flex items-center justify-between px-6">
      <input
        type="text"
        placeholder="Search..."
        className="border rounded-lg px-4 py-2 w-64"
      />

      <div className="flex items-center gap-4">
        <button className="p-2 bg-gray-100 rounded-full">🔔</button>
        <div className="flex items-center gap-2">
          <img src="/user.png" alt="User" className="w-10 h-10 rounded-full" />
          <span>Danny Bates</span>
        </div>
      </div>
    </header>
  );
}

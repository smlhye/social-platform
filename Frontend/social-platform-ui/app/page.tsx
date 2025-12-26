export default function Home() {
  const users = ["Alice", "Bob", "Charlie"];

  return (
    <div className="flex flex-1 min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <aside className="hidden sm:flex flex-col w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
        <h2 className="text-xl font-semibold mb-6">Chats</h2>
        <ul className="flex flex-col gap-2 overflow-y-auto">
          {users.map((user) => (
            <li
              key={user}
              className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              {user}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col justify-between">
        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="flex flex-col gap-4 max-w-xl mx-auto">
            <div className="self-start bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg p-3 shadow-sm">
              Hello! Welcome to your chat app.
            </div>
            <div className="self-end bg-gray-200 dark:bg-blue-500 text-gray-900 dark:text-white rounded-lg p-3 shadow-sm">
              Hi there! Let's build something cool.
            </div>
          </div>
        </div>

        {/* Input box */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full rounded-full border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </main>
    </div>
  );
}
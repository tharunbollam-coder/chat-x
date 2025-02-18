import Link from "next/link"
const RegisterPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-blue-500">
    <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-white text-center">Sign Up for Chat</h2>
        <form className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-white">Full Name</label>
                <input type="text" id="name" placeholder="Enter your name" className="w-full p-3 mt-1 text-gray-800 bg-white bg-opacity-80 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                <input type="email" id="email" placeholder="Enter your email" className="w-full p-3 mt-1 text-gray-800 bg-white bg-opacity-80 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                <input type="password" id="password" placeholder="Enter your password" className="w-full p-3 mt-1 text-gray-800 bg-white bg-opacity-80 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <button type="submit" className="w-full px-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300">Sign Up</button>
            <p className="text-center text-white text-sm">Already have an account? <Link href="/auth/login" className="text-blue-300 hover:underline">Login</Link></p>
        </form>
    </div>
</div>
  )
}

export default RegisterPage
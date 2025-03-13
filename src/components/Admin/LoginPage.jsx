import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Loader2, Eye, EyeOff } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { updateAuthStatus } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login(email, password);
      const statusCode = response.data.statusCode;
      if (statusCode === 200) {
        updateAuthStatus(true);
        navigate("/admin");
      } else {
        toast.error(
          response.response?.data?.message || "Login failed. Please try again."
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "An error occurred during login."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-500 to-teal-800">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-xl w-96 sm:w-80 md:w-96 lg:w-96 xl:w-96"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin w-6 h-6 text-white" />
            ) : (
              "Sign in"
            )}
          </motion.button>
        </form>
        <div className="mt-4 text-center">
          <Link
            to="/forgot-password"
            className="text-sm text-teal-400 hover:text-teal-300"
          >
            Forgot your password?
          </Link>
        </div>
      </motion.div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate, Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { login } from "../../services/api";
// import { useAuth } from "../../context/AuthContext";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { updateAuthStatus } = useAuth();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await login(email, password);
//       const statusCode = response.data.statusCode;
//       if (statusCode === 200) {
//         updateAuthStatus(true);
//         navigate("/admin");
//       } else {
//         toast.error(
//           response.response?.data?.message || "Login failed. Please try again."
//         );
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(
//         error.response?.data?.message || "An error occurred during login."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900">
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-gray-800 p-8 rounded-lg shadow-2xl w-96"
//       >
//         <h2 className="text-3xl font-bold mb-6 text-center text-gray-200">
//           Login
//         </h2>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-300"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all"
//               required
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-300"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all"
//               required
//             />
//           </div>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             type="submit"
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-400 transition-all"
//             disabled={loading}
//           >
//             {loading ? "Signing in..." : "Sign in"}
//           </motion.button>
//         </form>
//         <div className="mt-4 text-center">
//           <Link
//             to="/forgot-password"
//             className="text-sm text-teal-400 hover:text-teal-300"
//           >
//             Forgot your password?
//           </Link>
//         </div>
//       </motion.div>
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="dark"
//       />
//     </div>
//   );
// }

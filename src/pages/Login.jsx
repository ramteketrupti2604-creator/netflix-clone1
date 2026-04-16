import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const login = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-black text-white">
      <button onClick={login} className="bg-red-600 px-6 py-3 rounded">
        Login with Google
      </button>
    </div>
  );
};

export default Login;
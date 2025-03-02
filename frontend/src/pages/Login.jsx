import React from "react";
import axios from "axios";
import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
    useUser,
} from "@clerk/clerk-react";

function Login() {
    const { user } = useUser();

    const sendUserDataToBackend = async () => {
        if (!user) return;

        console.log(user);
        localStorage.setItem("token", user.id);

        const userData = {
            clerkId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            imgUrl: user.profileImageUrl,
            email: user.primaryEmailAddress?.emailAddress ?? "",
        };

        console.log(userData);

        try {
            const response = await axios.post(
                "http://localhost:8080/user/signup",
                userData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("User stored in backend:", response.data);
        } catch (error) {
            console.error("Error sending user data:", error.response?.data || error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <header className="text-center">
                    <h1 className="text-2xl font-semibold text-gray-700">Welcome to Our App</h1>
                    <p className="text-gray-500 mt-2">Sign in to sync your data</p>
                </header>

                <div className="mt-6 flex flex-col items-center space-y-4">
                    <SignedOut>
                        <SignInButton className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition-all" />
                    </SignedOut>
                    
                    <SignedIn>
                        <div className="flex items-center space-x-3">
                            <UserButton />
                            <button
                                onClick={sendUserDataToBackend}
                                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md transition-all"
                            >
                                Sync with Backend
                            </button>
                        </div>
                    </SignedIn>
                </div>
            </div>
        </div>
    );
}

export default Login;

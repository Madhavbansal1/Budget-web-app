import React from "react";
import axios from "axios"; // ✅ Import axios
import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
    useUser,
} from "@clerk/clerk-react";

function Login() {
    const { user } = useUser(); // ✅ Extract user info

    const sendUserDataToBackend = async () => {
        if (!user) return;

        console.log(user);

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
                        "authorisation": user.id, // ✅ Use user.id instead of undefined clerkId
                    },
                }
            );

            console.log("User stored in backend:", response.data); // ✅ Use response.data instead of response.json()
        } catch (error) {
            console.error("Error sending user data:", error.response?.data || error.message);
        }
    };

    return (
        <>
            <header>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                    <button onClick={sendUserDataToBackend} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Sync with Backend
                    </button>
                </SignedIn>
            </header>
        </>
    );
}

export default Login;

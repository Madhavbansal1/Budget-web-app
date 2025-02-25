import React from "react";
import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
    useUser, // ✅ Import useUser
} from "@clerk/clerk-react";

function Login() {
    const { user } = useUser(); // ✅ Extract user info

    const sendUserDataToBackend = async () => {
        if (!user) return;

        console.log(user)

        const userData = {
            clerkId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            imgUrl: user.profileImageUrl,
            email: user.primaryEmailAddress?.emailAddress ?? "",
            // Clerk does not provide password directly for security reasons
            // password: user.password
        };
        console.log(userData)

        // try {
        //     const response = await fetch("http://localhost:5000/api/auth/clerk-login", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify(userData),
        //     });

        //     const data = await response.json();
        //     console.log("User stored in backend:", data);
        // } catch (error) {
        //     console.error("Error sending user data:", error);
        // }
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

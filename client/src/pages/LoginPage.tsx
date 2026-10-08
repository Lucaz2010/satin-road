import { useState } from "react";
import { useNavigate } from "react-router";
import { Api } from "../../Api.ts";

const api = new Api();

export default function LoginPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    

    async function handleLogin(event: React.FormEvent) {
        event.preventDefault();
        setError("");

        try {
            const response = await api.user.userLogin({
                username,
                password,
            });

            console.log("Logged in:", response.data);

            // Temporary: store the logged-in user.
            localStorage.setItem(
                "user",
                JSON.stringify(response.data)
            );

            navigate("/");
        } catch (error) {
            console.error(error);
            setError("Invalid username or password.");
        }
    }

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleLogin}>
                <div>
                    <label>
                        Username
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </label>
                </div>

                {error && <p>{error}</p>}

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}
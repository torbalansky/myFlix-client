import { useState } from "react";

export const SignupView = () => {
    // Define states for each form input
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default behavior of form submission

        // Build the data object from form inputs
        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        // Send a POST request to the server to create a new user
        fetch('https://torbalansk-myflix-app.herokuapp.com/users', {
            method: "POST",
            body:JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Signup successful");
                window.location.reload();
            } else {
                alert("Signup failed");
            }
        });
    };

    // Render the form with inputs and a submit button
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required // make the input required
                    minLength="5" // set a minimum length of 5 characters
                    pattern="^[A-Za-z0-9 .,'\\-!?%&]+$"
                    title="Username should contain more than 5 characters, may only contain letters, numbers and special characters: .,'-!?%&"
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                    minLength="8" 
                    pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                    title="Password should contain at least 8 characters, including at least one letter, one number and one special character: @$!%*#?&"
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
            </label>
            <label>
                Birthday:
                <input
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required 
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

import React, { useState } from 'react';
import axios from 'axios';

const CreateDefaultAdmin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleCreateAdmin = async () => {
        try {
            const res = await axios.post('/api/createDefaultAdmin', {
                username,
                password,
            });

            console.log(res.data); // log success message
        } catch (err) {
            console.error(err);
            setErrorMsg(err.response.data.msg); // set error message
        }
    };

    return (
        <div>
            <h2>Create Admin Account</h2>
            {errorMsg && <div style={{ color: 'red' }}>{errorMsg}</div>}
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleCreateAdmin}>Create Account</button>
        </div>
    );
};

export default CreateDefaultAdmin;

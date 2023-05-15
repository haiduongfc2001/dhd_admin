import React, {useState} from 'react';
import {MDBInput}
    from 'mdb-react-ui-kit';
import usePasswordToggle from "~/hooks/usePasswordToggle";

function SignIn() {
    const [password, setPassword] = useState('');
    const [PasswordInputType, ToggleIcon, toggleVisibility] = usePasswordToggle()

    return (
        <div>
            <MDBInput
                wrapperClass='mb-4 mx-5 w-100'
                labelClass='text-black'
                label='Password'
                id='formControlLg'
                type={PasswordInputType}
                size='lg'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            >
                                <span
                                    onClick={toggleVisibility}
                                >
                                    {ToggleIcon}
                                </span>
            </MDBInput>
        </div>
    );
}

export default SignIn;
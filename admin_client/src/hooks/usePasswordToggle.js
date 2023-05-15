import React, {useState} from 'react'
import {FaEye, FaEyeSlash} from "react-icons/fa";

const usePasswordToggle = () => {
    const [visible, setVisiblity] = useState(false);

    const Icon = visible ? <FaEyeSlash /> : <FaEye />
    const toggleVisibility = () => setVisiblity(visibility => !visibility);

    const InputType = visible ? 'text' : 'password';

    return [InputType, Icon, toggleVisibility];
}

export default usePasswordToggle;
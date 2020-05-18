import { FC } from 'react';

interface IProps {
    children: string;
    selected?: boolean;
    className?: string;
    [_: string]: any;
};

const CustomButton: FC<IProps> = ({ children, selected = false, className, ...otherProps }) => {
    return (
        <button
            className={`${selected ? "bg-green-700 " : "bg-green-500"} text-white px-4 py-1 rounded focus:outline-none shadow-lg ${className}`}
            {...otherProps}
        >
            {children}
        </button>
    );
};

export default CustomButton;
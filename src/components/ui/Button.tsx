type ButtonProps = {
  children: React.ReactNode;
  variant?: 'orange' | 'dark'; 
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  buttonStyle?: 'default' | 'icon';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export default function Button({
    children,
    variant = 'orange',
    disabled = false,
    size = 'md',
    buttonStyle = 'default', // "default" = text button, "icon" = square icon button. Ex: <Button buttonStyle="icon" />
    onClick,
    className = '',
}: ButtonProps) {

    const baseStyle = 'rounded-lg text-white cursor-pointer font-medium transition-colors duration-300';
    const colorStyles = {
        orange: 'bg-[var(--accent-color)] hover:bg-[var(--hover-accent-color)]',
        dark: 'bg-[#2C3545] hover:bg-[#7185A8]',
    };

    const textSizeStyles = {
        xs: 'w-fit px-5 py-1 text-xs',
        sm: 'w-fit px-5 py-1 text-sm',
        md: 'w-fit px-5 py-2 text-sm',
        lg: 'w-fit px-6 py-2 text-base',
        xl: 'w-fit px-7 py-3 text-base',
        "2xl": 'w-fit px-11 py-3 text-lg',
    };

    const iconSizeStyles = {
        xs: 'w-8 h-8 flex items-center justify-center',
        sm: 'w-9 h-9 flex items-center justify-center',
        md: 'w-10 h-10 flex items-center justify-center',
        lg: 'w-11 h-11 flex items-center justify-center',
        xl: 'w-12 h-12 flex items-center justify-center',
        "2xl": 'w-14 h-14 flex items-center justify-center',
    };

    return (
        <button
            className={`${baseStyle} ${className} ${colorStyles[variant]} ${buttonStyle === 'icon' ? iconSizeStyles[size] : textSizeStyles[size]}`}
            onClick={onClick}
            disabled={disabled}>
            {children}
        </button>
    );
}


// Examples:
// <Button variant="orange" size="md">Click Me</Button>
// <Button variant="dark" size="lg">Submit</Button>

//<Button className="flex items-center gap-3" variant="orange" size="md" buttonStyle="default">
//View Details
//<img src="/images/courses/arrow-right.svg" alt="" />
//</Button>
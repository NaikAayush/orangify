interface Props {
  onClick?: () => void;
  leftIcon?: string;
  rightIcon?: JSX.Element;
  text: string;
}

const Button: React.FC<Props> = ({ onClick, text, leftIcon, rightIcon }) => (
  <button
    onClick={onClick}
    type="button"
    className="p-10 inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-lg font-medium text-gray-700 shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
  >
    {leftIcon}
    <p className="font-inter font-semibold text-Base/100">{text}</p>
    {rightIcon}
  </button>
);

export default Button;

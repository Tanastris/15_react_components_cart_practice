export default function IconButton({
  onClick = () => {},
  children,
  outline,
  type = 'button',
  className = '',
  icon = '',
}) {
  return (
    <button
      onClick={onClick}
      className={`${
        outline ? 'bg-white text-indigo-500' : 'bg-indigo-500 text-white'
      } ${className} px-6 py-2 text-sm uppercase border font-semibold border-indigo-500 rounded-md`}
      type={type}>
      {children}
      <icon />
    </button>
  );
}

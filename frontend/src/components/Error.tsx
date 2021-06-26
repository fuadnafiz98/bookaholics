interface Props {
  message: string | null;
}
const Error: React.FC<Props> = ({ message }) => {
  return (
    <div className="flex items-center justify-center w-full h-12 bg-red-100">
      <div className="font-medium text-red-500 truncate">{message}</div>
    </div>
  );
};

export default Error;

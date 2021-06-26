interface Props {
  message: string;
}
const Success: React.FC<Props> = ({ message }) => {
  return (
    <div className="flex items-center justify-center w-full h-12 bg-green-100">
      <div className="font-medium text-green-500 truncate">{message}</div>
    </div>
  );
};

export default Success;

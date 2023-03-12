import sad from 'assets/sad.png';

type FetchErrorProps = {
  message: string;
};

const FetchError = ({ message }: FetchErrorProps) => (
  <div className="flex align-middle justify-center bg-red-400 w-48 py-1 rounded-lg m-auto my-2">
    <img src={sad} alt="sad" className="w-5 h-5 mr-1" />
    <div className="text-white text-base leading-5">{message}</div>
  </div>
);

export default FetchError;

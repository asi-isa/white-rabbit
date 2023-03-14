import { IoIosClose } from "react-icons/io";

import Card from "./animated/Card";
import Divider from "./Divider";

export type ResultType = {
  error: boolean;
  msg: string;
};

interface Props {
  result: ResultType;
  onTryAgain: () => void;
  onClose: () => void;
}

const Result = ({ result, onTryAgain, onClose }: Props) => {
  return (
    <Card>
      {/* TODO lottiefiles */}
      <div className="flex flex-col gap-6">
        {/* TODO card title */}
        <div>
          <div className="flex justify-between">
            <p className="text-lg">{result.error ? "Error" : "OK"}</p>
            <IoIosClose
              onClick={onClose}
              className="text-2xl cursor-pointer transition-colors text-white/60 hover:text-white"
            />
          </div>

          <Divider direction="horizontal" />
        </div>

        <p>{result.msg}</p>

        {result.error && (
          <p
            className="border border-white/10 py-1 px-2 rounded-md self-end cursor-pointer"
            onClick={onTryAgain}
          >
            Try Again
          </p>
        )}
      </div>
    </Card>
  );
};

export default Result;

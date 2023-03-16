import Card from "./animated/Card";
import Btn from "./Btn";

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
    <Card title={result.error ? "Error" : "OK"} onClose={onClose}>
      {/* TODO lottiefiles */}
      <div className="flex flex-col gap-6">
        <p>{result.msg}</p>

        {result.error && <Btn title="Try Again" onClick={onTryAgain} />}
      </div>
    </Card>
  );
};

export default Result;

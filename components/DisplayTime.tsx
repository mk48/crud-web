import { format, formatDistanceToNowStrict, parseISO } from "date-fns";

interface props {
  time: string;
}

const DisplayTime: React.FC<props> = ({ time }) => {
  return (
    <>
      <span className="text-xs text-muted-foreground">
        {formatDistanceToNowStrict(parseISO(time), { addSuffix: true })}
      </span>
      <span className="text-muted-foreground"> | </span>
      <span className="text-xs text-muted-foreground">
        {format(time, "yyyy-MM-dd HH:mm:ss")}
      </span>
    </>
  );
};

export default DisplayTime;

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface props {
  children: React.ReactNode;
  title: string;
  className?: string;
}

const ErrorMessage: React.FC<props> = ({ title, children, className }) => {
  return (
    <Alert variant="destructive" className={className}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription> {children}</AlertDescription>
    </Alert>
  );
};

export default ErrorMessage;

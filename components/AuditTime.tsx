import DisplayTime from "./DisplayTime";
import { AuditColumn } from "./project/types";

interface props {
  auditModel: AuditColumn;
}

const AuditTime: React.FC<props> = ({ auditModel }) => {
  //--------- Delete -----------------
  if (auditModel.deletedAt) {
    return <DisplayTime time={auditModel.deletedAt} />;
  }

  //--------- Update -----------------
  if (auditModel.updatedAt) {
    return <DisplayTime time={auditModel.updatedAt} />;
  }

  //--------- Create -----------------
  if (auditModel.createdAt) {
    return <DisplayTime time={auditModel.createdAt} />;
  }

  return <>(no actions)</>;
};

export default AuditTime;

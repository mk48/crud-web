import { useState } from "react";
import { useTranslation } from "react-i18next";
import UserName from "./UserName";
import { FilePlus, Pencil, Trash2 } from "lucide-react";
import { AuditColumn } from "./project/types";

interface props {
  auditModel: AuditColumn;
}

const AuditUserName: React.FC<props> = ({ auditModel }) => {
  const { t } = useTranslation();

  //--------- Delete -----------------
  if (auditModel.deletedAt) {
    return (
      <div className="flex items-center gap-2 text-red-400">
        <Trash2 size="0.9rem" />
        <UserName userId={auditModel.deletedBy!} />
      </div>
    );
  }

  //--------- Update -----------------
  if (auditModel.updatedAt) {
    return (
      <div className="flex items-center gap-2">
        <Pencil size="0.9rem" />
        <UserName userId={auditModel.updatedBy!} />
      </div>
    );
  }

  //--------- Create -----------------
  if (auditModel.createdAt) {
    return (
      <div className="flex items-center gap-2 text-green-700">
        <FilePlus size="0.9rem" />
        <UserName userId={auditModel.createdBy!} />
      </div>
    );
  }

  return <>(no actions)</>;
};

export default AuditUserName;

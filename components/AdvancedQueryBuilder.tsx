import {
  Field,
  formatQuery,
  QueryBuilder,
  RuleGroupArray,
  RuleGroupType,
  RuleType,
  ValueEditorType,
} from "react-querybuilder";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Button } from "./ui/button";
import "react-querybuilder/dist/query-builder.css";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowBigLeftDash, Loader2 } from "lucide-react";
import { Separator } from "./ui/separator";
import { useQuery } from "@tanstack/react-query";
import { serverAPIwithAuthGetNoQuery } from "@/lib/ServerAPI";
import PageLoadingIcon from "./PageLoadingIcon";
import ErrorMessage from "./ErrorMessage";
import { ListMetaDataResponseModel } from "./project/types";

interface props {
  columnMetaDataUrl: string;
  isBusy: boolean;
  defaultRules?: RuleGroupArray<RuleGroupType<RuleType, string>, RuleType>;
  onSearch: (whereCondition: string, whereConditionParameters: string) => void;
}

const apiDataTypeToValueEditor: { [key: string]: ValueEditorType } = {
  Boolean: "checkbox",
};

const AdvancedQueryBuilder: React.FC<props> = ({ columnMetaDataUrl, isBusy, defaultRules, onSearch }) => {
  const { t } = useTranslation();
  const [dirty, setDirty] = useState(false);
  const [query, setQuery] = useState<RuleGroupType>({
    combinator: "and",
    rules: defaultRules ?? [{ field: "id", operator: "notNull", value: "" }],
  });

  //------------------------- Query: get column meta data -----------------------------------
  const { data, isLoading, isError } = useQuery({
    queryKey: ["column-meta-data", columnMetaDataUrl],
    queryFn: async () => {
      console.log("column meta data");
      const response = await serverAPIwithAuthGetNoQuery<ListMetaDataResponseModel>(columnMetaDataUrl);
      return response.data;
    },
    select: (data) => {
      const fields: Field[] = data.columns.map((col) => ({
        name: col.name,
        label: col.name,
        valueEditorType: apiDataTypeToValueEditor[col.dataType],
      }));
      return fields;
    },
  });

  const onQueryChanged = (q: RuleGroupType<RuleType<string, string, any, string>, string>) => {
    setQuery(q);
    setDirty(true);
  };

  const onSearchClicked = () => {
    const q = formatQuery(query, {
      format: "parameterized",
      //preset: "postgresql",
      //paramPrefix: "@p",
    });

    const where = q.sql;
    const paramString = JSON.stringify(q.params);

    console.log(where);
    console.log(paramString);

    setDirty(false);
    onSearch(where, paramString);
  };

  //---------------------------------- Render ----------------------------------
  if (isLoading) {
    return <PageLoadingIcon />;
  }

  if (isError) {
    return <ErrorMessage title="Error!">{t("err-loading-data")}</ErrorMessage>;
  }

  return (
    <Card>
      <CardContent>
        <div className="mt-4">
          <QueryBuilder fields={data} query={query} onQueryChange={onQueryChanged} />
        </div>

        <div className="mt-4 flex h-5 items-center space-x-4 text-sm">
          <div>
            <Button onClick={onSearchClicked} disabled={isBusy}>
              {isBusy && <Loader2 className="animate-spin" />}
              {t("translation:search")}
            </Button>
          </div>
          <Separator orientation="vertical" />

          {dirty && (
            <div className="flex animate-bounce">
              <ArrowBigLeftDash />
              <div className="text-sm text-muted-foreground">{t("translation:advancedQuery.clik-search")}</div>
            </div>
          )}
          <div className="text-sm text-muted-foreground">{formatQuery(query, "natural_language")}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedQueryBuilder;

import { Breadcrumbs, Divider, Typography } from "@mui/material";
import { LinkBreadCrumb } from "./styled";

export const toPascalCase = (url: string) => {
  return url.replace(/\w+/g, (w) => {
    return w[0].toLocaleUpperCase() + w.slice(1).toLocaleLowerCase();
  });
};

const urlBase = ["professores", "cursos"];

const BreadCrumb = ({ route }: { route: string }) => {
  const removeQuestionMark = route.replace(/\?/g, "/");
  const removeEquals = removeQuestionMark.replace(/\=/g, "/").split("/");
  const breadCrumb: any = [];

  removeEquals.forEach((element, idx) => {
    if (element === "") {
      return;
    }
    if (removeEquals.length - 1 === idx) {
      breadCrumb.push(
        <Typography key={idx} color="text.secondary">
          {toPascalCase(element === "[page]" ? "listagem" : element)}
        </Typography>
      );
      return;
    }
    breadCrumb.push(
      <LinkBreadCrumb
        key={idx}
        href={`/${urlBase.includes(element) ? `${element}/1` : element}`}
      >
        {toPascalCase(element)}
      </LinkBreadCrumb>
    );
  });

  return (
    <>
      {route !== "/" && (
        <>
          <Breadcrumbs aria-label="breadcrumb">{breadCrumb}</Breadcrumbs>
          <Divider variant="fullWidth" style={{ marginTop: "10px" }} />
        </>
      )}
    </>
  );
};
export default BreadCrumb;

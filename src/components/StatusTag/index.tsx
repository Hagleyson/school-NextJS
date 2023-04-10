import { Status } from "./styled";

export default function StatusTag({
  status,
  children,
}: {
  status: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Status status={status}>{children}</Status>
    </>
  );
}

import styled from "@emotion/styled";

export const Status = styled.div`
  width: 100px;
  padding: 2px;
  display: flex;
  font-size: 0.8rem;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  border-radius: 2px;
  ${({ status }: { status: string }) => {
    switch (status) {
      case "Ativo":
        return {
          background: "#81C784",
        };
      case "Inativo":
        return {
          background: "#EF476F",
        };
      default:
        return {
          background: "#a0a1a3",
        };
    }
  }};
`;

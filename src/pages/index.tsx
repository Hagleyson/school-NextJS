import { Button, ButtonGroup } from "@mui/material";

export default function Home() {
  return (
    <>
      <h1>hagleyson</h1>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </>
  );
}

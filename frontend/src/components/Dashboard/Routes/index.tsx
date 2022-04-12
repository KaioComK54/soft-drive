import { Route } from "react-router-dom";
import { Container } from "./styles";

import Drive from "./Drive";
import Upload from "./Upload";

const RoutesContent = () => {
  return (
    <Container>
      <Route path="meu-drive" element={<Drive />}></Route>
      <Route path="upload" element={<Upload />}></Route>
    </Container>
  );
};

export default RoutesContent;

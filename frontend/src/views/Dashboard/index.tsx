import Header from "components/Dashboard/Header";
import SideBar from "components/Dashboard/Sidebar";
import Routes from "components/Dashboard/Routes";
import { Container } from "styles/_global.style";

const Dashboard = () => {
  return (
    <Container>
      <Header />
      <SideBar />
      <Routes />
    </Container>
  );
};

export default Dashboard;

import { useContext, useEffect } from "react";
import Header from "components/Dashboard/Header";
import SideBar from "components/Dashboard/Sidebar";
import Routes from "components/Dashboard/Routes";
import { Container } from "styles/_global.style";

import UserContext from "context/UserContext";

const Dashboard = () => {
  const { fetchUserData } = useContext(UserContext);

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Container>
      <Header />
      <SideBar />
      <Routes />
    </Container>
  );
};

export default Dashboard;

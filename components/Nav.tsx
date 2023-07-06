import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styled from "styled-components";
import Container from "@components/Container";
import Grid from "@components/Grid";
import Modal from "@components/Modal";
import Text from "@components/Text";
import Title from "@components/Title";
import Button from "@components/Button";
import Link from "@components/Link";

const states: { [key: string]: React.CSSProperties } = {
  "/": {
    left: "6px",
    width: "61px",
  },
  "/about": {
    left: "81px",
    width: "65px",
  },
  "/projects": {
    left: "157px",
    width: "80px",
  },
};

const NavLink = styled.a`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  border-bottom: none;
  margin: 0;
  padding: 0;
  z-index: 1;
  font-weight: 500;
  transition: opacity 0.3s ease 0s;

  &:hover {
    opacity: 0.5;
  }
`;

export interface NavProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const Links = (): JSX.Element => (
  <>
    <NavLink href="/">Home</NavLink>
    <NavLink href="/about">About</NavLink>
    <NavLink href="/projects">Projects</NavLink>
  </>
);

const Nav = ({ isOpen, onOpen, onClose }: NavProps): JSX.Element => {
  const [showModal, setShowModal] = React.useState(false);

  const router = useRouter();
  let navStyle = states["/"];

  if (router.asPath !== "/") {
    for (const path of Object.keys(states).slice(1)) {
      if (router.asPath.startsWith(path)) {
        navStyle = states[path];
        break;
      }
    }
  }

  return (
    <Container padding="0 2rem">
      <Head>
      </Head>
      <Grid
        as="nav"
        px={["2rem", "2rem", "2rem", "0"]}
        gridTemplateColumns={["1fr", "1fr", "1fr 1fr 1fr"]}
        alignContent="center"
        justifyContent={["center", "center", "space-between"]}
        margin="3rem auto"
      >
        <Container display={["none", "none", "flex"]}>
          <NavLink href="/">Arm Wonghirundacha</NavLink>
        </Container>

        {isOpen && (
          <Grid
            gridTemplateColumns="1fr"
            style={{ fontSize: "2rem" }}
            py="3rem"
          >
            <Links />
          </Grid>
        )}

        <Container alignContent="center" display={["none", "flex", "flex"]}>
          <Grid
            width="fit-content"
            gridGap="2rem"
            alignItems="center"
            justifyItems="center"
            gridTemplateColumns="repeat(3, auto)"
            style={{
              borderRadius: "25px",
              background: "rgba(0, 0, 0, 0.04)",
              padding: "15px",
              position: "relative",
            }}
          >
            <div
              style={{
                background: "white",
                position: "absolute",
                borderRadius: "25px",
                height: "85%",
                left: "6px",
                width: "60px",
                ...navStyle,
              }}
            />
            <Links />
          </Grid>
        </Container>

        <Container alignContent="flex-end" display={["none", "none", "flex"]}>
          <NavLink onClick={() => setShowModal(true)}>Contact</NavLink>
          <Modal
            onClose={() => setShowModal(false)}
            show={showModal}
            title={
              <Title fontSize="2rem" textAlign="left">
                Contact
              </Title>
            }
          >
            <Container margin="5px 0 50px 0">
              <Text margin="0 0 40px 0">
                I&apos;m actively looking for full-time job
                opportunities and internships! I would also love to chat 
                about all things statistics, ML, AI and of course K-pop!
                Feel free to ask me anything! 

                <br></br>
                Email: arm_wonghirundacha [at] berkeley.edu
              </Text>
              <div > 
              <Link href="mailto:arm_wonghirundacha[at]berkeley.edu">
                  <Button>Email me!</Button>
                </Link>
                </div>
               

            </Container>

          </Modal>
        </Container>
      </Grid>
    </Container>
  );
};

export default Nav;

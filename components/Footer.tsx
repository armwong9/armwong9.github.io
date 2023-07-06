import React from "react";
import styled from "styled-components";
import { SiGithub, SiLinkedin, SiTwitter } from "react-icons/si";
import { MdMail } from "react-icons/md";
import Container from "@components/Container";
import Grid from "@components/Grid";
import Link from "@components/Link";
import Text from "@components/Text";

const StyledFooter = styled.footer`
  width: 100%;
  height: 100px;
  padding: 60px 20px 100px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  left: 0;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-bottom: 30px;
  margin-top: 20px;
  justify-content: center;
`;

const Footer = (): JSX.Element => {
  const links = React.useMemo(
    () => [
      {
        url: "https://github.com/armwong9",
        icon: SiGithub,
      },
      {
        url: "https://www.linkedin.com/in/anapat-wonghirundacha-81a900208/",
        icon: SiLinkedin,
      },
      {
        url: "mailto:arm_wonghirundacha[at]berkeley.edu",
        icon: MdMail,
      },
      {
        url: "https://twitter.com/armwong9",
        icon: SiTwitter,
      },
    ],
    [],
  );

  return (
    <StyledFooter>
      <Container paddingY="25px">
        <Grid gridGap="30px">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/projects">Projects</Link>
        </Grid>
      </Container>
      <FooterGrid>
        {links.map(({ url, icon: Icon }) => (
          <Link key={url} target="_blank" opacity={0.7} href={url}>
            <Icon size={22} />
          </Link>
        ))}
      </FooterGrid>
      <Text margin={0} fontSize="0.6rem" color="rgba(0,0,0,0.7)">
      Website template kindly provided by{" "}
        <a href={"https://github.com/mjenrungrot"}>{"Teerapat Jenrungrot"}</a>
      </Text>
    </StyledFooter>
  );
};

export default Footer;

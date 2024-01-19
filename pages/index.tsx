import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Container from "@components/Container";
import Title from "@components/Title";
import Text from "@components/Text";
import Grid from "@components/Grid";

import styles from "@styles/Home.module.css";

const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addEventListener("change", updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener("change", updateTarget);
  }, [updateTarget, width]);

  return targetReached;
};

const Home = (): JSX.Element => {
  const smallBreak = useMediaQuery(600);
  const mediumBreak = useMediaQuery(900);

  const meSmall = (
    <Container>
      <Title fontSize="2rem">Anapat (Arm) Wonghirundacha</Title>
      <Title
        fontSize="1.5rem"
        color="rgba(0,0,0,0.6)"
        fontWeight="500"
        as="h2"
      >
        Statistical Learner, ML/AI enthusiast 
      </Title>
    </Container>
  );

  const meMedium = (
    <Container>
      <Title fontSize="2.5rem">Anapat (Arm) Wonghirundacha</Title>
      <Title
        fontSize="1.4rem"
        color="rgba(0,0,0,0.6)"
        fontWeight="500"
        as="h2"
      >
        Statistical Learner, ML/AI enthusiast 
      </Title>
    </Container>
  );

  const meFull = (
    <Container>
      <Title>Anapat (Arm) Wonghirundacha</Title>
      <Title fontSize="2rem" color="rgba(0,0,0,0.6)" fontWeight="500" as="h2">
        Statistical Learner, occasionally an ML/AI enthusiast 
      </Title>
    </Container>
  );

  const meComponent = smallBreak ? meSmall : mediumBreak ? meMedium : meFull;

  return (
    <Container>
      <Container
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        textAlign="center"
        paddingY="25px"
        paddingBottom="40px"
        gridGap="4rem"
      >
        <Container alignItems="center" alignContent="center">
          {meComponent}
        </Container>

        <Container maxWidth="700px" gridGap="3rem">
          <Container>
            <Text textAlign="center">
              Arm is a Master's student interested in Statistical Learning (ML + AI) with applications in sequential data.
            </Text>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default Home;


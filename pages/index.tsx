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
    <>
      <Image
        src="/me.png"
        alt="Teerapat Jenrungrot"
        width="130px"
        height="130px"
        objectFit="cover"
        className={styles.image}
      />
      <Container>
        <Title fontSize="2rem">Teerapat Jenrungrot</Title>
        <Title
          fontSize="1.5rem"
          color="rgba(0,0,0,0.6)"
          fontWeight="500"
          as="h2"
        >
          AI Researcher (Audio + Computer Vision)
        </Title>
      </Container>
    </>
  );
  const meMedium = (
    <Grid
      gridTemplateColumns="1fr 3.5fr"
      justifyItems="flex-start"
      gridGap="3rem"
      paddingY="5rem"
    >
      <Container>
        <Image
          src="/me.png"
          alt="Teerapat Jenrungrot"
          width="130px"
          height="130px"
          objectFit="cover"
          className={styles.image}
        />
      </Container>
      <Container>
        <Title fontSize="2.5rem">Teerapat Jenrungrot</Title>
        <Title
          fontSize="1.4rem"
          color="rgba(0,0,0,0.6)"
          fontWeight="500"
          as="h2"
        >
          AI Researcher (Audio + Computer Vision)
        </Title>
      </Container>
    </Grid>
  );
  const meFull = (
    <Grid
      gridTemplateColumns="1fr 3.5fr"
      justifyItems="flex-start"
      gridGap="3rem"
      paddingY="5rem"
    >
      <Container>
        <Image
          src="/me.png"
          alt="Teerapat Jenrungrot"
          width="160px"
          height="160px"
          objectFit="cover"
          className={styles.image}
        />
      </Container>
      <Container>
        <Title>Teerapat Jenrungrot</Title>
        <Title fontSize="2rem" color="rgba(0,0,0,0.6)" fontWeight="500" as="h2">
          AI Researcher (Audio + Computer Vision)
        </Title>
      </Container>
    </Grid>
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
              Teerapat is a Ph.D. student doing research in AI, with a primary
              emphasis on the intersection of audio and computer vision. Living
              in Seattle.
            </Text>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default Home;

import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "@components/Container";
import Grid from "@components/Grid";
import Text from "@components/Text";
import Title from "@components/Title";
import TransparentLink from "@components/TransparentLink";

import { Post, getPosts } from "../../lib/notion";

interface AboutProps {
  experiences: Post[];
}

const About = ({ experiences }: AboutProps): JSX.Element => (
  <Container>
    <Head>
      <title>About</title>
    </Head>

    <Container alignContent="center" alignItems="center">
      <Title fontSize={["3rem", "4rem"]} as="h2">
        About
      </Title>
      <Container maxWidth={["100%", "700px"]} marginY="2rem">
        <Text>
          Teerapat&apos;s research interests are in the domain of audio, music,
          and computer vision, for instance, audio-visual representation, deep
          learning, music information retrieval, AR/VR, computer vision, and
          computer graphics. The overarching question is how we can leverage
          visual features to make auditory experience more immersive or audio
          features to make visual experience more immersive.
        </Text>
        <Text>
          Teerapat&apos;s personal interests are about cooking, traveling,
          photographing, gaming, learning languages, watching series, and
          reading light novels. Currently, he knows Thai, English, Japanese, and
          Korean. In his free time, he loves to cook new recipes and think about
          cool ideas to work on. He is also interested in applied ethics on
          areas related to CS technology.
        </Text>
      </Container>
    </Container>

    <Container
      alignContent="center"
      alignItems="center"
      textAlign="center"
      width="100%"
      paddingBottom="4rem"
      gridGap="3rem"
    >
      <Title fontSize="40px" as="h2">
        Work Experiences
      </Title>
      <Container width="100%">
        {experiences.map(({ data }, i) => {
          return (
            <TransparentLink href={`/about/${data.slug}`} key={data.slug}>
              <Grid
                gridTemplateColumns="1fr 4fr"
                justifyItems="flex-start"
                gridGap="1rem"
                paddingY="2rem"
                borderBottom="1px solid rgba(0,0,0,0.1)"
              >
                <Container width="100%">
                  <Text>0{experiences.length - i}</Text>
                </Container>

                <Grid width="100%" gridTemplateColumns="4fr 1fr">
                  <Container
                    width="100%"
                    alignItems="flex-start"
                    textAlign="start"
                  >
                    <Grid
                      width="100%"
                      gridTemplateColumns="repeat(2, auto)"
                      justifyItems="flex-start"
                      justifyContent="flex-start"
                      gridGap="1rem"
                    >
                      <Text color="black" fontSize="1.5rem" margin={0} as="h3">
                        {data.title}
                      </Text>
                      <Text
                        fontSize="smaller"
                        margin={0}
                        color="rgba(0, 0, 0, 0.1)"
                      >
                        {data.date}
                      </Text>
                    </Grid>
                    <Text fontSize="1rem">{data.caption}</Text>
                  </Container>
                  <Text fontSize="1.5rem">&rarr;</Text>
                </Grid>
              </Grid>
            </TransparentLink>
          );
        })}
      </Container>
    </Container>
  </Container>
);

export const getStaticProps: GetStaticProps = async () => {
  const experiences = await getPosts("experiences");
  experiences.sort((a, b) =>
    b.data.date.toString().localeCompare(a.data.date.toString()),
  );

  return {
    props: {
      experiences,
    },
    revalidate: 60,
  };
};

export default About;

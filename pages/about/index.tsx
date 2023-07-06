import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "@components/Container";
import Grid from "@components/Grid";
import Text from "@components/Text";
import Title from "@components/Title";
import TransparentLink from "@components/TransparentLink";
import Image from 'next/image';

import { Post, getPosts } from "../../lib/notion";

interface AboutProps {
  experiences: Post[];
  education: Post[];
}

const About = ({ experiences, education }: AboutProps): JSX.Element => (
  <Container>
    <Head>
      <title>About</title>
    </Head>

    <Container alignContent="center" alignItems="center">
      <Title fontSize={["3rem", "4rem"]} as="h2">
        About
      </Title>
      <Container
      maxWidth={["100%", "700px"]}
      marginTop="-1.5rem"
      marginBottom="1rem"
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      >
        <Text
          fontSize="1rem"
          onClick={() => {
            const educationSection = document.getElementById("education");
            if (educationSection) {
              educationSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <a href="#education">Education</a>
        </Text>
        <div style={{ width: '20px' }} />
        <Text
          fontSize="1rem"
          onClick={() => {
            const workExperiencesSection = document.getElementById(
              "work-experiences"
            );
            if (workExperiencesSection) {
              workExperiencesSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <a href="#work-experiences">Work Experiences</a>
        </Text>
      </Container>
      <Container maxWidth={["100%", "700px"]} marginY="1rem">
        <Text>
          Arm&apos;s research interests are at the intersection between statistical learning and signal processing, 
          focusing on applications in high frequency sequential data, including music, speech and financial data, 
          with a heavy emphasis placed on intepretability and explainability of methods. 

          He also enjoys thinking about the data science education, with a firm belief that the curriculum should 
          align with societal betterment incentives and reflect the interdisiplinary nature of the field, 
          beyond a simple <code>lm.fit()</code>, or a <code>torch.nn</code>. 

        </Text>
        <Text>
          Arm&apos;s personal interests revolve around K-pop, food and NBA. He follows most of mainstream K-pop but is 
          undeniably a <a href="https://www.jype.com/ko/Artist">JYP</a> stan. 
          He also enjoys trying out new restaurants, watching NBA and ocassionally competes in a fantasy league. 
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
      id="education"
    >
      <Title fontSize="40px" as="h2">
        Education
      </Title>
      <Container width="100%">
      {education.map(({ data }, i) => {
          return (
            <TransparentLink href={`/about/${data.slug}`} key={data.slug}>
              <Grid
                gridTemplateColumns="1fr 4fr"
                justifyItems="flex-start"
                gridGap="1rem"
                paddingY="2rem"
                borderBottom="1px solid rgba(0,0,0,0.1)"
              >
                <Container width="100%" height="100%">
                <Image 
                src={data.image} 
                alt={data.title} 
                width={100} 
                height={100}
                />
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

    <Container
      alignContent="center"
      alignItems="center"
      textAlign="center"
      width="100%"
      paddingBottom="4rem"
      gridGap="3rem"
      id="work-experiences"
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
    b.data.date.toString().localeCompare(a.data.date.toString())
  );

  const education = await getPosts("education");
  education.sort((a, b) =>
    b.data.date.toString().localeCompare(a.data.date.toString())
  );

  return {
    props: {
      experiences,
      education,
    },
    revalidate: 60,
  };
};

export default About;


import Container from "@components/Container";
import Title from "@components/Title";
import Text from "@components/Text";

const NotFound = (): JSX.Element => (
  <Container alignItems="center">
    <Title>404 - Not found</Title>
    <Text>The page does not exist.</Text>
  </Container>
);

export default NotFound;

import { FunctionalComponent, h } from "preact";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import * as style from "./style.css";

interface Props {
    build: BuildData;
    artifact?: string;
}

const BuildInfo: FunctionalComponent<Props> = ({ build, artifact }) => {
    const commitList = build.all_commit_details.map(commit => (
        <Card body>
            <Card.Title>{commit.subject}</Card.Title>
            <Card.Subtitle>{commit.commit.substring(0,7)} - {commit.committer_name}</Card.Subtitle>
            <Card.Text>{commit.body}</Card.Text>
        </Card>
    ));
    return (
        <div>
            <Container id={style.container}>
                <Row>
                    <Col>
                        <h2>Build #{build.build_num}</h2>
                        <Button href={artifact}>Download File</Button>
                    </Col>
                </Row>
                <Row>
                    <Col><h2>Commits:</h2>
                        {commitList}</Col>
                </Row>
            </Container>
        </div>
    );
};

export default BuildInfo;

import React, {Component} from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import {Link} from "react-router-dom";
import {Col, Row, Container} from "../../components/Grid";
import {List, ListItem} from "../../components/List";
import {Input, TextArea, FormBtn} from "../../components/Form";

class Books extends Component {
    state = {
        books: [],
        title: "",
        author: "",
        synopsis: ""
    };

    componentDidMount() {
        this.loadBooks();
    }

    loadBooks = () => {
        API
            .getBooks()
            .then(res => this.setState({books: res.data, title: "", author: "", synopsis: ""}))
            .catch(err => console.log(err));
    };

    deleteBook = id => {
        API
            .deleteBook(id)
            .then(res => this.loadBooks())
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.title && this.state.author) {
            API
                .saveBook({title: this.state.title, author: this.state.author, synopsis: this.state.synopsis})
                .then(res => this.loadBooks())
                .catch(err => console.log(err));
        }
    };

    render() {
        return (
            <Container fluid>
                <Jumbotron>
                    <h1>New York Times Article Scrubber</h1>
                    <h3>Search for and annotate articles of interest!</h3>
                </Jumbotron>
                <Row>
                    <Col size="md-2"></Col>
                    <Col size="md-8">
                        <h2>Search</h2>
                        <form>
                            <h4>Topic</h4>
                            <Input value={this.state.topic} onChange={this.handleInputChange} name="topic"/>
                            <h4>Start Year</h4>
                            <Input
                                value={this.state.startYear}
                                onChange={this.handleInputChange}
                                name="startYear"/>
                            <h4>End Year</h4>
                            <TextArea
                                value={this.state.endYear}
                                onChange={this.handleInputChange}
                                name="endYear"/>
                            <FormBtn
                                disabled={!(this.state.topic && this.state.startYear && this.state.endYear)}
                                onClick={this.handleFormSubmit}>
                                Search
                            </FormBtn>
                        </form>
                        <Col size="md-2"></Col>
                    </Col>
                </Row>
                <Row>
                    <Col size="md-2"></Col>
                    <Col size="md-8">
                        <h2>Results</h2>
                        {this.state.books.length
                            ? (
                                <List>
                                    {this
                                        .state
                                        .books
                                        .map(book => (
                                            <ListItem key={book._id}>
                                                <Link to={"/books/" + book._id}>
                                                    <strong>
                                                        {book.title}
                                                        by {book.author}
                                                    </strong>
                                                </Link>
                                                <DeleteBtn onClick={() => this.deleteBook(book._id)}/>
                                            </ListItem>
                                        ))}
                                </List>
                            )
                            : (
                                <h4>No Results to Display</h4>
                            )}
                    </Col>
                    <Col size="md-2"></Col>
                </Row>
                <Row>
                  <Col size="md-2"></Col>
                    <Col size="md-8">
                      <h2>Saved Articles</h2>
                      {this.state.books.length
                            ? (
                                <List>
                                    {this
                                        .state
                                        .books
                                        .map(book => (
                                            <ListItem key={book._id}>
                                                <Link to={"/books/" + book._id}>
                                                    <strong>
                                                        {book.title}
                                                        by {book.author}
                                                    </strong>
                                                </Link>
                                                <DeleteBtn onClick={() => this.deleteBook(book._id)}/>
                                            </ListItem>
                                        ))}
                                </List>
                            )
                            : (
                                <h4>No Results to Display</h4>
                            )}
                    </Col>
                  <Col size="md-2"></Col>
                </Row>
            </Container>
        );
    }
}

export default Books;

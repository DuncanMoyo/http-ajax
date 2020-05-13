import React, { Component } from "react";
import "./Blog.css";
import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
// import axios from "axios";
import axios from '../../axios'

const url = 'https://api.imgur.com/3/gallery/hot/viral/1?showViral=true';

const clientId = '130410711';

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false
  };

  componentDidMount () {

    this.doStuff();

    axios.get("/posts").then((response) => {
      
      const posts = response.data.slice(0, 3);
      const updatedPosts = posts.map((post) => {
        return {
          ...post,
          author: "Naomi",
        };
      });
      this.setState({ posts: updatedPosts });
      // console.log(response);
      
    }).catch(error => {
      // console.log(error);
      this.setState({error: true})
    });
  }

  doStuff = async() => {
    const apiResponse = await fetch(url).then(response => response.json());
    console.log(apiResponse);
    
  }

  postSelectedHandler = (id) => {
    this.setState({ selectedPostId: id });
  };

  render() {
    let posts = <p style={{textAlign: "center"}}>Oops! Something went wrong</p>
    if (!this.state.error) {
        posts = this.state.posts.map((post) => {
        return (
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
          />
        );
      });
    }

    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;

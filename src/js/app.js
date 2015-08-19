import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div>
        <SiteNav name="Instagramps"></SiteNav>
        <Photos/>
      </div>
    )
  }
}

class AccountDropdown extends React.Component {
  render() {
    return (
      <div className="account">{this.props.user}</div>
    )
  }
}

class SiteNav extends React.Component {
  render() {
    return (
      <header className="top">
        <div className="wrapper">
          <h1>{this.props.name}</h1>
          <nav>
            <input type="text" placeholder="search"/>
            <AccountDropdown user='julie'/>
          </nav>
        </div>
      </header>
    )
  }
}

class Photos extends React.Component {
  render() {
    let photos = [
      {
        likes: 1,
        created: '1h',
        url: 'http://lorempixel.com/output/city-q-c-600-600-3.jpg',
        user: 'julie',
        comments: [
          {user: 'ben', content: 'cool pic!'}
        ]
      },

      {
        likes: 16,
        created: '12h',
        url: 'http://lorempixel.com/output/city-q-c-600-600-4.jpg',
        user: 'tyler',
        comments: [
          {user: 'adam', content: 'way cool'}
        ]
      },

      {
        likes: 250,
        created: '3d',
        url: 'http://lorempixel.com/output/city-q-c-600-600-7.jpg',
        user: 'adam',
        comments: [
          {user: 'bryce', content: 'awesome'},
          {user: 'jordan', content: 'love this!'}
        ]
      }
    ];

    return (
      <div className="photos">
        {
          photos.map((photo) => {
            return <Photo {...photo}/>
          })
        }
      </div>
    )
  }
}

class Photo extends React.Component {
  render() {
    return (
      <div className="photo">
        <header>
          <UserAvatar user={this.props.user}/>
          <TimeStamp created={this.props.created}/>
        </header>
        <img src={this.props.url}/>
        <Likes likes={this.props.likes}/>
        <Comments comments={this.props.comments}/>
        <footer>
          <ToggleLike/>
          <AddComment/>
          <PhotoControls/>
        </footer>
      </div>
    )
  }
}

class UserAvatar extends React.Component {
  render() {
    return (
      <div>
        <img src="https://en.gravatar.com/userimage/618378/42fa7959870f08db4d723d6d8aa97d77.jpg"/>
        <a href="#">{this.props.user}</a>
      </div>
    )
  }
}

class TimeStamp extends React.Component {
  render() {
    return (
      <div className="timestamp">
        {this.props.created}
      </div>
    )
  }
}
class Likes extends React.Component {
  render() {
    return (
      <div className="likes">
        {this.props.likes} likes
      </div>

    )
  }
}
class Comments extends React.Component {
  render() {
    let comments = this.props.comments;

    return (
      <div className="comments">
        {
          comments.map((comment) => {
            return <Comment {...comment}/>
          })
        }
      </div>
    )
  }
}

class Comment extends React.Component {
  render() {
    return (
      <div className="comment">
        <p>
          <a href="#">{this.props.user}</a>
          {this.props.content}
        </p>
      </div>
    )
  }
}

class ToggleLike extends React.Component {
  render() {
    return (
      <div>
        <button><i className="fa fa-heart-o"></i></button>
      </div>
    )
  }
}

class AddComment extends React.Component {
  render() {
    return (
      <div>
        <input placeholder="Add Comment..."/>
      </div>
    )
  }
}

class PhotoControls extends React.Component {
  render() {
    return (
      <div>
        <button className="controls"><i className="fa fa-ellipsis-h"></i></button>
      </div>
    )
  }
}



React.render(<App/>, document.getElementById('app'));

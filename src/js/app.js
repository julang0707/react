import React from 'react/addons';
import $ from 'jquery';
import {_} from 'lodash';

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class App extends React.Component {
  render() {
    let comments = {
      foo: 'foo'
    };
    return (
      <div className="wrapper">
        <SiteNav name="Instagramps"/>
        <Photos comments={comments}/>
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
            <AccountDropdown user='will'/>
          </nav>
        </div>
      </header>
    )
  }
}

class Photos extends React.Component {
  static propTypes: {
    comments: React.PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      photos: []
    };
  }

  componentDidMount() {
    let url = 'https://tiny-starburst.herokuapp.com/collections/posts';
    let self = this;

    $.ajax(url).done((response) => {
      self.setState({
        photos: response
      });
    });
  }

  onCommentAdd(photoId, comment) {
    let photoIndex = _.findIndex(this.state.photos, (photo) => {
      return photo._id === photoId;
    });

    let photos = _.cloneDeep(this.state.photos);
    photos[photoIndex].comments.push(comment);

    this.setState({
      photos: photos
    });
  }

  render() {
    let photos = this.state.photos.sort((a, b) => {
      return a._id - b._id;
    });

    let items = [];

    if (!photos.length) {
      return (
        <div className="photos">
          No photos yet.
        </div>
      )
    }

    return (
      <div className="photos">
        <ReactCSSTransitionGroup transitionName="photos" transitionAppear={true}>
          {
            photos.map((photo) => {
              return <Photo {...photo} key={photo._id} onCommentAdd={this.onCommentAdd.bind(this)}/>
            })
          }
        </ReactCSSTransitionGroup>
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
          <AddComment photo={this.props} onCommentAdd={this.props.onCommentAdd.bind(this)}/>
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
        <img src="https://en.gravatar.com/userimage/4939165/7de72dc8d20ee0d593e0dd5774d64609.jpeg"/>
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
            comments.map((comment, i) => {
              return <Comment {...comment} key={i}/>
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
      <button className="toggleLikeBtn"><i className="fa fa-heart-o"></i></button>
    )
  }
}

class AddComment extends React.Component {
  onAdd(e) {
    if (e.which === 13) {
      let photo = _.cloneDeep(this.props.photo);

      let url = `https://tiny-starburst.herokuapp.com/collections/posts/${photo._id}`;
      let self = this;
      let comment = {
        user: 'will',
        content: this.refs.input.getDOMNode().value
      };

      photo.comments.push(comment);

      $.ajax(url, {
        method: 'PUT',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(photo)
      }).always(() => {
        self.props.onCommentAdd(photo._id, comment);
        self.refs.input.getDOMNode().value = '';
      })
    }
  }

  render() {
    return (
      <input ref="input" placeholder="Add Comment..." onKeyPress={this.onAdd.bind(this)}/>
    )
  }
}

class PhotoControls extends React.Component {
  render() {
    return (
      <button className="controls"><i className="fa fa-ellipsis-h"></i></button>
    )
  }
}

React.render(<App/>, document.getElementById('app'));

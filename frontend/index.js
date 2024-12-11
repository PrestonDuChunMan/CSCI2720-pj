
import ReactDOM from 'react-dom/client';
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'API_KEY';
// API KEY 

class App extends React.Component {
  constructor(props) {
    super(props);
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    this.state = {
      venues: {},
      favorites: storedFavorites,
    };
  }

  setVenues = (venues) => {
    this.setState({ venues });
  };

  addFavorite = (venue) => {
    this.setState((prevState) => {
      const newFavorites = [...prevState.favorites, venue];
      localStorage.setItem('favorites', JSON.stringify(newFavorites)); // Update localStorage
      return { favorites: newFavorites };
    });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          
          <Routes>
            <Route path="/" element={<Home setVenues={this.setVenues} addFavorite={this.addFavorite} favorites={this.state.favorites} />} />
            {/* <Route path="/venue/:id" element={<Venue />} /> */}
            <Route path="/venue/62" element={<Venue62 />} />
            <Route path="/venue/58" element={<Venue58 />} />
            <Route path="/venue/55" element={<Venue55 />} />
            <Route path="/venue/65" element={<Venue65 />} />
            <Route path="/venue/53" element={<Venue53 />} />
            <Route path="/venue/60" element={<Venue60 />} />
            <Route path="/venue/56" element={<Venue56 />} />
            <Route path="/venue/57" element={<Venue57 />} />
            <Route path="/venue/61" element={<Venue61 />} />
            <Route path="/venue/59" element={<Venue59 />} />
            <Route path="/map" element={<Maps />} />
            <Route path="/events" element={<Events venues={this.state.venues} />} />
            <Route path="/favorites" element={<Favorites favorites={this.state.favorites} />} />
          </Routes>
          <Footer/>
        </div>
        
      </BrowserRouter>
    );
  }
}

class Venue62 extends React.Component {
  
  constructor(props) {
    super(props);
    this.mapContainerRef = React.createRef(); // Create a ref for the map container
    this.state = {
      comments: [], 
      newComment: '' 
    };
  }

  componentDidMount() {
    const savedComments = localStorage.getItem('comments_62');
    if (savedComments) {
      this.setState({ comments: JSON.parse(savedComments) }); // Parse and set comments from localStorage
    }
    // Initialize the map
    this.map = new mapboxgl.Map({
      container: this.mapContainerRef.current, // Use the ref to get the container
      style: 'mapbox://styles/mapbox/streets-v11', // Map style
      center: [114.18968325348676, 22.28007358913171], // Initial map center [lng, lat]
      zoom: 15, // Initial zoom level
    });

    // Add navigation controls
    this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Locations array
    const locations = [
      { venueId: 62, name: 'Hong Kong Central Library', lat: 22.28007358913171, lng: 114.18968325348676 },
      { venueId: 58, name: 'City Hall Public Library', lat: 22.282349750318563, lng: 114.16087618088974 },
      { venueId: 55, name: 'Butterfly Estate Public Library', lat: 22.376768566786705, lng: 113.96292875020889 },
      { venueId: 65, name: 'Kowloon Public Library', lat: 22.319365062899053, lng: 114.17607469996017 },
      { venueId: 53, name: 'Aberdeen Public Library', lat: 22.24932365024293, lng: 114.15446548088862 },
      { venueId: 60, name: 'Fa Yuen Street Public Library', lat: 22.32093220347748, lng: 114.17061268089115 },
      { venueId: 56, name: 'Chai Wan Public Library', lat: 22.263462331180513, lng: 114.24014279623111 },
      { venueId: 57, name: 'Cheung Chau Public Library', lat: 22.2070950419937, lng: 114.02874155390018 },
      { venueId: 61, name: 'Fanling Public Library', lat: 22.50079026602015, lng: 114.1444150612374 },
      { venueId: 59, name: 'Electric Road Public Library', lat: 22.289897695508305, lng: 114.19364766554797 },
    ];

    
      const marker = new mapboxgl.Marker()
        .setLngLat([locations[0].lng, locations[0].lat]) // Set marker position
        .addTo(this.map); // Add marker to the map

      
      const popup = new mapboxgl.Popup({ offset: 25 }) 
        .setHTML(`<h6>Hong Kong Central Library</h6>
                  <small>66 Causeway Rd, Causeway Bay</small>        
          `);

      
      marker.setPopup(popup);
    
  }

  componentWillUnmount() {
    // Clean up the map on unmount
    if (this.map) {
      this.map.remove();
    }
  }

  handleCommentChange = (event) => {
    this.setState({ newComment: event.target.value });
  };

  addComment = () => {
    const { newComment, comments } = this.state;

    if (!newComment) {
      alert("Please enter a comment.");
      return;
    }

    const updatedComments = [...comments, newComment];

    // Save comments to localStorage
    localStorage.setItem('comments_62', JSON.stringify(updatedComments));

    //***********************
    // Update state with new comment
    this.setState({
      comments: updatedComments,
      newComment: '' // Reset the input
    });
  };

  render() {
    const { comments, newComment } = this.state;
    return (
      <div className="mx-2">
        <div className="row">
          <div className="col-12 col-lg-6">
            <h1>Hong Kong Central Library</h1>
            <div ref={this.mapContainerRef} style={{ width: '100%', height: '500px' }}></div> {/* Map container */}
          </div>
          <div className="col-12 col-lg-6">
            <h2>User Comments</h2>
            <div id="comments">
              {comments.map((comment, index) => (
                <div key={index} className="d-flex" id={`c${index + 1}`}>
                  <div className="flex-grow-1">
                    <p>{comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <hr />
            <h6>Add your comment:</h6>
            <form onSubmit={(e) => { e.preventDefault(); this.addComment(); }}>
              <div className="mb-3">
                <label htmlFor="new-comment" className="form-label">Comment</label>
                <textarea
                  className="form-control"
                  id="new-comment"
                  rows="3"
                  value={newComment}
                  onChange={this.handleCommentChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Add Comment</button>
            </form>
          </div>
        </div>
        
      </div>
    );
  }
}
class Venue58 extends React.Component {

  constructor(props) {
    super(props);
    this.mapContainerRef = React.createRef(); // Create a ref for the map container
    this.state = {
      comments: [],
      newComment: ''
    };
  }

  componentDidMount() {
    const savedComments = localStorage.getItem('comments_58');
    if (savedComments) {
      this.setState({ comments: JSON.parse(savedComments) }); // Parse and set comments from localStorage
    }
    // Initialize the map
    this.map = new mapboxgl.Map({
      container: this.mapContainerRef.current, // Use the ref to get the container
      style: 'mapbox://styles/mapbox/streets-v11', // Map style
      center: [114.16087618088974, 22.282349750318563], // Initial map center [lng, lat]
      zoom: 15, // Initial zoom level
    });

    // Add navigation controls
    this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Locations array
    const locations = [
      { venueId: 62, name: 'Hong Kong Central Library', lat: 22.28007358913171, lng: 114.18968325348676 },
      { venueId: 58, name: 'City Hall Public Library', lat: 22.282349750318563, lng: 114.16087618088974 },
      { venueId: 55, name: 'Butterfly Estate Public Library', lat: 22.376768566786705, lng: 113.96292875020889 },
      { venueId: 65, name: 'Kowloon Public Library', lat: 22.319365062899053, lng: 114.17607469996017 },
      { venueId: 53, name: 'Aberdeen Public Library', lat: 22.24932365024293, lng: 114.15446548088862 },
      { venueId: 60, name: 'Fa Yuen Street Public Library', lat: 22.32093220347748, lng: 114.17061268089115 },
      { venueId: 56, name: 'Chai Wan Public Library', lat: 22.263462331180513, lng: 114.24014279623111 },
      { venueId: 57, name: 'Cheung Chau Public Library', lat: 22.2070950419937, lng: 114.02874155390018 },
      { venueId: 61, name: 'Fanling Public Library', lat: 22.50079026602015, lng: 114.1444150612374 },
      { venueId: 59, name: 'Electric Road Public Library', lat: 22.289897695508305, lng: 114.19364766554797 },
    ];


    const marker = new mapboxgl.Marker()
      .setLngLat([locations[1].lng, locations[1].lat]) // Set marker position
      .addTo(this.map); // Add marker to the map


    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`<h6>City Hall Public Library</h6>
                  <small>5, Edinburgh Pl, Central</small>        
          `);


    marker.setPopup(popup);

  }

  componentWillUnmount() {
    // Clean up the map on unmount
    if (this.map) {
      this.map.remove();
    }
  }

  handleCommentChange = (event) => {
    this.setState({ newComment: event.target.value });
  };

  addComment = () => {
    const { newComment, comments } = this.state;

    if (!newComment) {
      alert("Please enter a comment.");
      return;
    }

    const updatedComments = [...comments, newComment];

    // Save comments to localStorage
    localStorage.setItem('comments_58', JSON.stringify(updatedComments));

    //***********************
    // Update state with new comment
    this.setState({
      comments: updatedComments,
      newComment: '' // Reset the input
    });
  };

  render() {
    const { comments, newComment } = this.state;
    return (
      <div className="mx-2">
        <div className="row">
          <div className="col-12 col-lg-6">
            <h1>City Hall Public Library</h1>
            <div ref={this.mapContainerRef} style={{ width: '100%', height: '500px' }}></div> {/* Map container */}
          </div>
          <div className="col-12 col-lg-6">
            <h2>User Comments</h2>
            <div id="comments">
              {comments.map((comment, index) => (
                <div key={index} className="d-flex" id={`c${index + 1}`}>
                  <div className="flex-grow-1">
                    <p>{comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <hr />
            <h6>Add your comment:</h6>
            <form onSubmit={(e) => { e.preventDefault(); this.addComment(); }}>
              <div className="mb-3">
                <label htmlFor="new-comment" className="form-label">Comment</label>
                <textarea
                  className="form-control"
                  id="new-comment"
                  rows="3"
                  value={newComment}
                  onChange={this.handleCommentChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Add Comment</button>
            </form>
          </div>
        </div>

      </div>
    );
  }
}
class Venue55 extends React.Component {
  constructor(props) {
    super(props);
    this.mapContainerRef = React.createRef();
    this.state = {
      comments: [],
      newComment: ''
    };
  }

  componentDidMount() {
    const savedComments = localStorage.getItem('comments_55');
    if (savedComments) {
      this.setState({ comments: JSON.parse(savedComments) });
    }

    this.map = new mapboxgl.Map({
      container: this.mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [113.96292875020889, 22.376768566786705],
      zoom: 15,
    });

    this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    const marker = new mapboxgl.Marker()
      .setLngLat([113.96292875020889, 22.376768566786705])
      .addTo(this.map);

    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`<h6>Butterfly Estate Public Library</h6><small>Tuen Mun, Butterfly Estate Tip Chui House, 123-130</small>`);

    marker.setPopup(popup);
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.remove();
    }
  }

  handleCommentChange = (event) => {
    this.setState({ newComment: event.target.value });
  };

  addComment = () => {
    const { newComment, comments } = this.state;
    if (!newComment) {
      alert("Please enter a comment.");
      return;
    }

    const updatedComments = [...comments, newComment];
    localStorage.setItem('comments_55', JSON.stringify(updatedComments));
    this.setState({ comments: updatedComments, newComment: '' });
  };

  render() {
    const { comments, newComment } = this.state;

    return (
      <div className="mx-2">
        <div className="row">
          <div className="col-12 col-lg-6">
            <h1>Butterfly Estate Public Library</h1>
            <div ref={this.mapContainerRef} style={{ width: '100%', height: '500px' }}></div>
          </div>
          <div className="col-12 col-lg-6">
            <h2>User Comments</h2>
            <div id="comments">
              {comments.map((comment, index) => (
                <div key={index} className="d-flex" id={`c${index + 1}`}>
                  <div className="flex-grow-1"><p>{comment}</p></div>
                </div>
              ))}
            </div>
            <hr />
            <h6>Add your comment:</h6>
            <form onSubmit={(e) => { e.preventDefault(); this.addComment(); }}>
              <div className="mb-3">
                <label htmlFor="new-comment" className="form-label">Comment</label>
                <textarea className="form-control" id="new-comment" rows="3" value={newComment} onChange={this.handleCommentChange} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Add Comment</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
class Venue65 extends React.Component {
  constructor(props) {
    super(props);
    this.mapContainerRef = React.createRef();
    this.state = {
      comments: [],
      newComment: ''
    };
  }

  componentDidMount() {
    const savedComments = localStorage.getItem('comments_65');
    if (savedComments) {
      this.setState({ comments: JSON.parse(savedComments) });
    }

    this.map = new mapboxgl.Map({
      container: this.mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [114.17607469996017, 22.319365062899053],
      zoom: 15,
    });

    this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    const marker = new mapboxgl.Marker()
      .setLngLat([114.17607469996017, 22.319365062899053])
      .addTo(this.map);

    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`<h6>Kowloon Public Library</h6><small>Kowloon Public Library, 5 Pui Ching Rd, Ho Man Tin</small>`);

    marker.setPopup(popup);
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.remove();
    }
  }

  handleCommentChange = (event) => {
    this.setState({ newComment: event.target.value });
  };

  addComment = () => {
    const { newComment, comments } = this.state;
    if (!newComment) {
      alert("Please enter a comment.");
      return;
    }

    const updatedComments = [...comments, newComment];
    localStorage.setItem('comments_65', JSON.stringify(updatedComments));
    this.setState({ comments: updatedComments, newComment: '' });
  };

  render() {
    const { comments, newComment } = this.state;

    return (
      <div className="mx-2">
        <div className="row">
          <div className="col-12 col-lg-6">
            <h1>Kowloon Public Library</h1>
            <div ref={this.mapContainerRef} style={{ width: '100%', height: '500px' }}></div>
          </div>
          <div className="col-12 col-lg-6">
            <h2>User Comments</h2>
            <div id="comments">
              {comments.map((comment, index) => (
                <div key={index} className="d-flex" id={`c${index + 1}`}>
                  <div className="flex-grow-1"><p>{comment}</p></div>
                </div>
              ))}
            </div>
            <hr />
            <h6>Add your comment:</h6>
            <form onSubmit={(e) => { e.preventDefault(); this.addComment(); }}>
              <div className="mb-3">
                <label htmlFor="new-comment" className="form-label">Comment</label>
                <textarea className="form-control" id="new-comment" rows="3" value={newComment} onChange={this.handleCommentChange} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Add Comment</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
class Venue53 extends React.Component {
  constructor(props) {
    super(props);
    this.mapContainerRef = React.createRef();
    this.state = {
      comments: [],
      newComment: ''
    };
  }

  componentDidMount() {
    const savedComments = localStorage.getItem('comments_53');
    if (savedComments) {
      this.setState({ comments: JSON.parse(savedComments) });
    }

    this.map = new mapboxgl.Map({
      container: this.mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [114.15446548088862, 22.24932365024293],
      zoom: 15,
    });

    this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    const marker = new mapboxgl.Marker()
      .setLngLat([114.15446548088862, 22.24932365024293])
      .addTo(this.map);
    
    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`<h6>Aberdeen Public Library</h6><small>Aberdeen Municipal Services Building, 203 Aberdeen Main Rd, Aberdeen</small>`);
    
    marker.setPopup(popup);
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.remove();
    }
  }

  handleCommentChange = (event) => {
    this.setState({ newComment: event.target.value });
  };

  addComment = () => {
    const { newComment, comments } = this.state;
    if (!newComment) {
      alert("Please enter a comment.");
      return;
    }

    const updatedComments = [...comments, newComment];
    localStorage.setItem('comments_53', JSON.stringify(updatedComments));
    this.setState({ comments: updatedComments, newComment: '' });
  };

  render() {
    const { comments, newComment } = this.state;

    return (
      <div className="mx-2">
        <div className="row">
          <div className="col-12 col-lg-6">
            <h1>Aberdeen Public Library</h1>
            <div ref={this.mapContainerRef} style={{ width: '100%', height: '500px' }}></div>
          </div>
          <div className="col-12 col-lg-6">
            <h2>User Comments</h2>
            <div id="comments">
              {comments.map((comment, index) => (
                <div key={index} className="d-flex" id={`c${index + 1}`}>
                  <div className="flex-grow-1"><p>{comment}</p></div>
                </div>
              ))}
            </div>
            <hr />
            <h6>Add your comment:</h6>
            <form onSubmit={(e) => { e.preventDefault(); this.addComment(); }}>
              <div className="mb-3">
                <label htmlFor="new-comment" className="form-label">Comment</label>
                <textarea className="form-control" id="new-comment" rows="3" value={newComment} onChange={this.handleCommentChange} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Add Comment</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

class Venue60 extends React.Component {
  constructor(props) {
    super(props);
    this.mapContainerRef = React.createRef();
    this.state = {
      comments: [],
      newComment: ''
    };
  }

  componentDidMount() {
    const savedComments = localStorage.getItem('comments_60');
    if (savedComments) {
      this.setState({ comments: JSON.parse(savedComments) });
    }

    this.map = new mapboxgl.Map({
      container: this.mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [114.17061268089115, 22.32093220347748],
      zoom: 15,
    });

    this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    const marker = new mapboxgl.Marker()
      .setLngLat([114.17061268089115, 22.32093220347748])
      .addTo(this.map);

    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`<h6>Fa Yuen Street Public Library</h6><small>4-5/F, Fa Yuen Street Municipal Services Building, 123A Fa Yuen St, Mong Kok</small>`);

    marker.setPopup(popup);
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.remove();
    }
  }

  handleCommentChange = (event) => {
    this.setState({ newComment: event.target.value });
  };

  addComment = () => {
    const { newComment, comments } = this.state;
    if (!newComment) {
      alert("Please enter a comment.");
      return;
    }

    const updatedComments = [...comments, newComment];
    localStorage.setItem('comments_60', JSON.stringify(updatedComments));
    this.setState({ comments: updatedComments, newComment: '' });
  };

  render() {
    const { comments, newComment } = this.state;

    return (
      <div className="mx-2">
        <div className="row">
          <div className="col-12 col-lg-6">
            <h1>Fa Yuen Street Public Library</h1>
            <div ref={this.mapContainerRef} style={{ width: '100%', height: '500px' }}></div>
          </div>
          <div className="col-12 col-lg-6">
            <h2>User Comments</h2>
            <div id="comments">
              {comments.map((comment, index) => (
                <div key={index} className="d-flex" id={`c${index + 1}`}>
                  <div className="flex-grow-1"><p>{comment}</p></div>
                </div>
              ))}
            </div>
            <hr />
            <h6>Add your comment:</h6>
            <form onSubmit={(e) => { e.preventDefault(); this.addComment(); }}>
              <div className="mb-3">
                <label htmlFor="new-comment" className="form-label">Comment</label>
                <textarea className="form-control" id="new-comment" rows="3" value={newComment} onChange={this.handleCommentChange} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Add Comment</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
class Venue56 extends React.Component {
  constructor(props) {
    super(props);
    this.mapContainerRef = React.createRef();
    this.state = {
      comments: [],
      newComment: ''
    };
  }

  componentDidMount() {
    const savedComments = localStorage.getItem('comments_56');
    if (savedComments) {
      this.setState({ comments: JSON.parse(savedComments) });
    }

    this.map = new mapboxgl.Map({
      container: this.mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [114.24014279623111, 22.263462331180513],
      zoom: 15,
    });

    this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    const marker = new mapboxgl.Marker()
      .setLngLat([114.24014279623111, 22.263462331180513])
      .addTo(this.map);

    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`<h6>Chai Wan Public Library</h6><small>4-5/F, Chai Wan Municipal Services Building, 338 Chai Wan Rd, Chai Wan</small>`);

    marker.setPopup(popup);
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.remove();
    }
  }

  handleCommentChange = (event) => {
    this.setState({ newComment: event.target.value });
  };

  addComment = () => {
    const { newComment, comments } = this.state;
    if (!newComment) {
      alert("Please enter a comment.");
      return;
    }

    const updatedComments = [...comments, newComment];
    localStorage.setItem('comments_56', JSON.stringify(updatedComments));
    this.setState({ comments: updatedComments, newComment: '' });
  };

  render() {
    const { comments, newComment } = this.state;

    return (
      <div className="mx-2">
        <div className="row">
          <div className="col-12 col-lg-6">
            <h1>Chai Wan Public Library</h1>
            <div ref={this.mapContainerRef} style={{ width: '100%', height: '500px' }}></div>
          </div>
          <div className="col-12 col-lg-6">
            <h2>User Comments</h2>
            <div id="comments">
              {comments.map((comment, index) => (
                <div key={index} className="d-flex" id={`c${index + 1}`}>
                  <div className="flex-grow-1"><p>{comment}</p></div>
                </div>
              ))}
            </div>
            <hr />
            <h6>Add your comment:</h6>
            <form onSubmit={(e) => { e.preventDefault(); this.addComment(); }}>
              <div className="mb-3">
                <label htmlFor="new-comment" className="form-label">Comment</label>
                <textarea className="form-control" id="new-comment" rows="3" value={newComment} onChange={this.handleCommentChange} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Add Comment</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
class Venue57 extends React.Component {
  constructor(props) {
    super(props);
    this.mapContainerRef = React.createRef();
    this.state = {
      comments: [],
      newComment: ''
    };
  }

  componentDidMount() {
    const savedComments = localStorage.getItem('comments_57');
    if (savedComments) {
      this.setState({ comments: JSON.parse(savedComments) });
    }

    this.map = new mapboxgl.Map({
      container: this.mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [114.02874155390018, 22.2070950419937],
      zoom: 15,
    });

    this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    const marker = new mapboxgl.Marker()
      .setLngLat([114.02874155390018, 22.2070950419937])
      .addTo(this.map);

    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`<h6>Cheung Chau Public Library</h6><small>Cheung Chau Municipal Services Building, 2 Tai Hing Tai Rd, Cheung Chau</small>`);

    marker.setPopup(popup);
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.remove();
    }
  }

  handleCommentChange = (event) => {
    this.setState({ newComment: event.target.value });
  };

  addComment = () => {
    const { newComment, comments } = this.state;
    if (!newComment) {
      alert("Please enter a comment.");
      return;
    }

    const updatedComments = [...comments, newComment];
    localStorage.setItem('comments_57', JSON.stringify(updatedComments));
    this.setState({ comments: updatedComments, newComment: '' });
  };

  render() {
    const { comments, newComment } = this.state;

    return (
      <div className="mx-2">
        <div className="row">
          <div className="col-12 col-lg-6">
            <h1>Cheung Chau Public Library</h1>
            <div ref={this.mapContainerRef} style={{ width: '100%', height: '500px' }}></div>
          </div>
          <div className="col-12 col-lg-6">
            <h2>User Comments</h2>
            <div id="comments">
              {comments.map((comment, index) => (
                <div key={index} className="d-flex" id={`c${index + 1}`}>
                  <div className="flex-grow-1"><p>{comment}</p></div>
                </div>
              ))}
            </div>
            <hr />
            <h6>Add your comment:</h6>
            <form onSubmit={(e) => { e.preventDefault(); this.addComment(); }}>
              <div className="mb-3">
                <label htmlFor="new-comment" className="form-label">Comment</label>
                <textarea className="form-control" id="new-comment" rows="3" value={newComment} onChange={this.handleCommentChange} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Add Comment</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
class Venue61 extends React.Component {
  constructor(props) {
    super(props);
    this.mapContainerRef = React.createRef();
    this.state = {
      comments: [],
      newComment: ''
    };
  }

  componentDidMount() {
    const savedComments = localStorage.getItem('comments_61');
    if (savedComments) {
      this.setState({ comments: JSON.parse(savedComments) });
    }

    this.map = new mapboxgl.Map({
      container: this.mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [114.1444150612374, 22.50079026602015],
      zoom: 15,
    });

    this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    const marker = new mapboxgl.Marker()
      .setLngLat([114.1444150612374, 22.50079026602015])
      .addTo(this.map);

    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`<h6>Fanling Public Library</h6><small>9 Wo Mun St, Fanling</small>`);

    marker.setPopup(popup);
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.remove();
    }
  }

  handleCommentChange = (event) => {
    this.setState({ newComment: event.target.value });
  };

  addComment = () => {
    const { newComment, comments } = this.state;
    if (!newComment) {
      alert("Please enter a comment.");
      return;
    }

    const updatedComments = [...comments, newComment];
    localStorage.setItem('comments_61', JSON.stringify(updatedComments));
    this.setState({ comments: updatedComments, newComment: '' });
  };

  render() {
    const { comments, newComment } = this.state;

    return (
      <div className="mx-2">
        <div className="row">
          <div className="col-12 col-lg-6">
            <h1>Fanling Public Library</h1>
            <div ref={this.mapContainerRef} style={{ width: '100%', height: '500px' }}></div>
          </div>
          <div className="col-12 col-lg-6">
            <h2>User Comments</h2>
            <div id="comments">
              {comments.map((comment, index) => (
                <div key={index} className="d-flex" id={`c${index + 1}`}>
                  <div className="flex-grow-1"><p>{comment}</p></div>
                </div>
              ))}
            </div>
            <hr />
            <h6>Add your comment:</h6>
            <form onSubmit={(e) => { e.preventDefault(); this.addComment(); }}>
              <div className="mb-3">
                <label htmlFor="new-comment" className="form-label">Comment</label>
                <textarea className="form-control" id="new-comment" rows="3" value={newComment} onChange={this.handleCommentChange} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Add Comment</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

class Venue59 extends React.Component {
  constructor(props) {
    super(props);
    this.mapContainerRef = React.createRef();
    this.state = {
      comments: [],
      newComment: ''
    };
  }

  componentDidMount() {
    const savedComments = localStorage.getItem('comments_59');
    if (savedComments) {
      this.setState({ comments: JSON.parse(savedComments) });
    }

    this.map = new mapboxgl.Map({
      container: this.mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [114.19364766554797, 22.289897695508305],
      zoom: 15,
    });

    this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    const marker = new mapboxgl.Marker()
      .setLngLat([114.19364766554797, 22.289897695508305])
      .addTo(this.map);

    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`<h6>Electric Road Public Library</h6><small>2/F, Electric Road Municipal Services Building, 229 Electric Rd, North Point</small>`);

    marker.setPopup(popup);
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.remove();
    }
  }

  handleCommentChange = (event) => {
    this.setState({ newComment: event.target.value });
  };

  addComment = () => {
    const { newComment, comments } = this.state;
    if (!newComment) {
      alert("Please enter a comment.");
      return;
    }

    const updatedComments = [...comments, newComment];
    localStorage.setItem('comments_59', JSON.stringify(updatedComments));
    this.setState({ comments: updatedComments, newComment: '' });
  };

  render() {
    const { comments, newComment } = this.state;

    return (
      <div className="mx-2">
        <div className="row">
          <div className="col-12 col-lg-6">
            <h1>Electric Road Public Library</h1>
            <div ref={this.mapContainerRef} style={{ width: '100%', height: '500px' }}></div>
          </div>
          <div className="col-12 col-lg-6">
            <h2>User Comments</h2>
            <div id="comments">
              {comments.map((comment, index) => (
                <div key={index} className="d-flex" id={`c${index + 1}`}>
                  <div className="flex-grow-1"><p>{comment}</p></div>
                </div>
              ))}
            </div>
            <hr />
            <h6>Add your comment:</h6>
            <form onSubmit={(e) => { e.preventDefault(); this.addComment(); }}>
              <div className="mb-3">
                <label htmlFor="new-comment" className="form-label">Comment</label>
                <textarea className="form-control" id="new-comment" rows="3" value={newComment} onChange={this.handleCommentChange} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Add Comment</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      selectedVenueId: '', // Track the selected venue ID
      lastUpdated: '', // Track the last updated time
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/events');
      const parser = new DOMParser();
      const xml = parser.parseFromString(response.data, 'text/xml');

      const eventItems = Array.from(xml.getElementsByTagName('event'));
      const eventData = eventItems.map(event => ({
        id: event.getAttribute('id'),
        venueId: event.getElementsByTagName('venueid')[0].textContent.trim(),
        title: event.getElementsByTagName('titlee')[0].textContent,
        date: event.getElementsByTagName('predateE')[0].textContent,
        description: event.getElementsByTagName('desce')[0].textContent,
        presenter: event.getElementsByTagName('presenterorge')[0].textContent,
      }));

      const targetVenueIds = ['62', '58', '55', '65', '53', '60', '56', '57', '61', '59'];
      const filteredEvents = eventData.filter(event => targetVenueIds.includes(event.venueId));

      // Sort the filtered events by venueId
      filteredEvents.sort((a, b) => a.venueId.localeCompare(b.venueId));

      this.setState({ events: filteredEvents, lastUpdated: new Date().toLocaleString('en-US'), });
    } catch (error) {
      console.error("Error fetching the events:", error);
    }
  };

  handleVenueChange = (event) => {
    this.setState({ selectedVenueId: event.target.value });
  };

  render() {
    // Filter events based on selected venue ID
    const { events, selectedVenueId, lastUpdated } = this.state;
    const venueIds = ['53', '55', '56', '57', '58', '59', '60', '61', '62', '65'];

    const displayedEvents = selectedVenueId
      ? events.filter(event => event.venueId === selectedVenueId)
      : events;

    return (
      <div className="container mt-4">
        <h1>Events List</h1>

        {/* Dropdown for venue selection */}
        <div className="mb-3">
          <label htmlFor="venueSelect" className="form-label">Select Venue:</label>
          <select
            id="venueSelect"
            className="form-select"
            value={selectedVenueId}
            onChange={this.handleVenueChange}
          >
            <option value="">--All Venues--</option>
            {venueIds.map(venueId => (
              <option key={venueId} value={venueId}>
                Venue ID: {venueId} 
              </option>
            ))}
          </select>
        </div>
        <p>
          Number of events: {displayedEvents.length} (Last updated: {lastUpdated})
        </p>
        <ol>
          {displayedEvents.map(event => (
            <li key={event.id}>
              Event ID: {event.id}, Title: {event.title}, Venue ID: {event.venueId}
              <br />Date/Time: {event.date}
              <br />Description: {event.description}
              <br />Presenter: {event.presenter}
              <hr />
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.mapContainerRef = React.createRef(); // Create a ref for the map container
  }

  componentDidMount() {
    // Initialize the map
    this.map = new mapboxgl.Map({
      container: this.mapContainerRef.current, // Use the ref to get the container
      style: 'mapbox://styles/mapbox/streets-v11', // Map style
      center: [114.18968325348676, 22.36007358913171], // Initial map center [lng, lat]
      zoom: 10, // Initial zoom level
    });

    // Add navigation controls
    this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Locations array
    const locations = [
      { venueId:62, name: 'Hong Kong Central Library', lat: 22.28007358913171, lng: 114.18968325348676 },
      { venueId:58, name: 'City Hall Public Library', lat: 22.282349750318563, lng: 114.16087618088974 },
      { venueId:55, name: 'Butterfly Estate Public Library', lat: 22.376768566786705, lng: 113.96292875020889 },
      { venueId:65, name: 'Kowloon Public Library', lat: 22.319365062899053, lng: 114.17607469996017 },
      { venueId:53, name: 'Aberdeen Public Library', lat: 22.24932365024293, lng: 114.15446548088862 },
      { venueId:60, name: 'Fa Yuen Street Public Library', lat: 22.32093220347748, lng: 114.17061268089115 },
      { venueId:56, name: 'Chai Wan Public Library', lat: 22.263462331180513, lng: 114.24014279623111 },
      { venueId:57, name: 'Cheung Chau Public Library', lat: 22.2070950419937, lng: 114.02874155390018 },
      { venueId:61, name: 'Fanling Public Library', lat: 22.50079026602015, lng: 114.1444150612374 },
      { venueId:59, name: 'Electric Road Public Library', lat: 22.289897695508305, lng: 114.19364766554797 },
    ];

    // Add markers and popups for each location
    locations.forEach(location => {
      const marker = new mapboxgl.Marker()
        .setLngLat([location.lng, location.lat]) // Set marker position
        .addTo(this.map); // Add marker to the map

      // Create a popup for the marker
      const popup = new mapboxgl.Popup({ offset: 25 }) // Popup options
        .setHTML(`<a href="/venue/${location.venueId}" >${location.name}</a>`);

      // Attach the popup to the marker
      marker.setPopup(popup);
    });
  }

  componentWillUnmount() {
    // Clean up the map on unmount
    if (this.map) {
      this.map.remove();
    }
  }

  render() {
    return (
      <div>
        <h1>Venue Locations</h1>
        <div ref={this.mapContainerRef} style={{ width: '100%', height: '500px' }}></div> {/* Map container */}
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand mb-0 h1">Venue Events</Link>
          <Link to="/map" className="navbar-brand mb-0 h1">Maps</Link>
          <Link to="/events" className="navbar-brand mb-0 h1">Events list</Link>
          <Link to="/favorites" className="navbar-brand mb-0 h1">Favorites</Link>
        </div>
      </nav>
    );
  }
}

class Footer extends React.Component {
  render() {
    return (
      <footer className="text-center mt-4">
        <p>&copy; 2024 Venue Events. All rights reserved.</p>
      </footer>
    );
  }
}


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      venues: {},
      venueCounts: {},
      sortOrder: 'descending',
      lastUpdated: '',
      addedStatus: {},
      searchTerm: '',
    };
  }

  componentDidMount() {
    this.loadAddedStatus();
    this.fetchData();
  }

  fetchData = async () => {
    try {
      //fetching events 
      const response = await axios.get('http://localhost:3000/events');
      const parser = new DOMParser();
      const xml = parser.parseFromString(response.data, 'text/xml');

      const eventItems = Array.from(xml.getElementsByTagName('event'));
      const eventData = eventItems.map(event => ({
        id: event.getAttribute('id'),
        venueId: event.getElementsByTagName('venueid')[0].textContent,
        title: event.getElementsByTagName('titlee')[0].textContent,
        date: event.getElementsByTagName('predateE')[0].textContent,
        description: event.getElementsByTagName('desce')[0].textContent,
        presenter: event.getElementsByTagName('presenterorge')[0].textContent,
      }));

      const venueCounts = {};
      eventData.forEach(event => {
        const { venueId } = event;
        venueCounts[venueId] = (venueCounts[venueId] || 0) + 1;
      });

      //Fetching venue locations
      const venuesResponse = await axios.get('http://localhost:3000/venues');
      const venuesParser = new DOMParser();
      const venuesXml = venuesParser.parseFromString(venuesResponse.data, 'text/xml');

      const venueItems = Array.from(venuesXml.getElementsByTagName('venue'));
      const venueData = {};
      venueItems.forEach(venue => {
        const id = venue.getAttribute('id');
        const location = venue.getElementsByTagName('venuee')[0].textContent;
        venueData[id] = location; // Store by venue ID
      });

      this.props.setVenues(venueData);
      this.setState({ events: eventData, venueCounts, venues: venueData, lastUpdated: new Date().toLocaleString('en-US'), });
    } catch (error) {
      console.error("Error fetching the venues:", error);
    }
  };
  handleSortOrderChange = (event) => {
    this.setState({ sortOrder: event.target.value });
  };

  loadAddedStatus = () => {
    const { favorites } = this.props;
    const addedStatus = {};
    favorites.forEach(venue => {
      addedStatus[venue.id] = true; // Mark as added if it's in favorites
    });
    this.setState({ addedStatus });
  };

  addToFavorites = (venue) => {
    if (!this.state.addedStatus[venue.id]) {
      this.props.addFavorite(venue);
      this.setState(prevState => ({
        addedStatus: {
          ...prevState.addedStatus,
          [venue.id]: true, // Mark as added
        },
      }));
    }
  };

  handleSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    const { lastUpdated, searchTerm } = this.state;
    const filteredVenues = Object.entries(this.state.venueCounts)
      .filter(([, count]) => count >= 3)
      .slice(0, 10) 
      .map(([venueId]) => ({
        id: venueId,
        location: this.state.venues[venueId],
        eventCount: this.state.venueCounts[venueId],
      }));
    const searchedVenues = filteredVenues.filter(venue =>
      venue.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sortedVenues = searchedVenues.sort((a, b) => {
      return this.state.sortOrder === 'ascending'
        ? a.eventCount - b.eventCount
        : b.eventCount - a.eventCount;
    });

    return (
      <div className="container mt-4">

        <h1>Venue List</h1>
        <div className="mb-3">
          <label htmlFor="search" className="form-label">Search Locations:</label>
          <input
            type="text"
            id="search"
            className="form-control"
            value={this.state.searchTerm}
            onChange={this.handleSearchChange}
            placeholder="Enter location name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="sortOrder" className="form-label">Sort by Number of Events:</label>
          <select id="sortOrder" className="form-select" value={this.state.sortOrder} onChange={this.handleSortOrderChange}>
            <option value="descending">Descending</option>
            <option value="ascending">Ascending</option>
          </select>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Venue ID</th>
              <th scope="col">Location</th>
              <th scope="col">Number of Events (Last Updated: {lastUpdated})</th>
              <th scope="col">Add to Favourite</th>
            </tr>
          </thead>
          <tbody>
            {sortedVenues.length > 0 ? (
              sortedVenues.map(venue => (
                <tr key={venue.id}>
                  <td>{venue.id}</td>
                  <td><Link to={`/venue/${venue.id}`}>{venue.location}</Link></td>
                  <td>{venue.eventCount}</td>
                  <td>
                    <button
                      className={`btn ${this.state.addedStatus[venue.id] ? 'btn-success' : 'btn-secondary'}`}
                      onClick={() => this.addToFavorites(venue)}
                      disabled={this.state.addedStatus[venue.id]}
                    >
                      {this.state.addedStatus[venue.id] ? 'Added' : 'Add'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              searchedVenues.length === 0 && ( // *********************** Check if searchedVenues is empty
                <tr>
                  <td colSpan="4" className="text-center">No venues found.</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

class Favorites extends React.Component {
  render() {
    const { favorites } = this.props;

    return (
      <div className="container mt-4">
        <h1>Your Favorite Venues</h1>
        {favorites.length > 0 ? (
          <ul>
            {favorites.map((venue, index) => (
              <li key={index}>
                {venue.location} (Venue ID: {venue.id}) - Events: {venue.eventCount}
              </li>
            ))}
          </ul>
        ) : (
          <p>No favorite venues added.</p>
        )}
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(<App />);

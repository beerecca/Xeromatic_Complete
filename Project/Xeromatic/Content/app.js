//React component that takes in some text as a property and displays it
var Tweet = React.createClass({
	render: function() {
		var image = (this.props.image) ? <img className="col-md-2 img-responsive img-rounded" src={this.props.image} /> : null;
		var colSize = (this.props.image) ? 'col-md-8' : 'col-md-10';
		var retweets = (this.props.retweets !== 0) ? <span className="label label-primary" style={{marginRight:"10px"}}>Retweets: {this.props.retweets}</span> : null;
		var time = (this.props.time) ? <span className="label label-primary">Created: {this.props.time}</span> : null;

		return (
			<li className="clearfix list-group-item">
				{image}
				<div className={colSize}>
					<p>{this.props.text}</p>
					{retweets}
					{time}
				</div>
				<div className="col-md-2">
					{this.props.children}
				</div>
			</li>
		)
	}
});

//React component that takes in a link and a label and displays it as a button
var Button = React.createClass({
	render: function() {
		return <button onClick={this.props.link} className="btn btn-info pull-right" disabled={this.props.disabled}>{this.props.label}</button>
	}
});

//React component that displays a select box, and takes in a function that runs when an option is clicked
var Dropdown = React.createClass({
	handleChange() {
		this.props.sort(this.refs.select.value);
	},

	render: function() {
		return (
			<select ref="select" onChange={this.handleChange} className="form-control" style={{marginLeft:"10px"}}>
  				<option value="default"></option>
  				<option value="retweets">Reweets</option>
			</select>
		)
	}
});

//Smart, stateful React component that makes a call to the API in the HomeController. If more than one tweet is returned, it displays a Tweet component for each.
var App = React.createClass({
	//React function that sets the initial state of the app (where changeable data is stored)
	getInitialState: function() {
		return {
			recentTweets: [],
			pinnedTweets: []
		};
	},

	//React function that runs after the app first loads
	componentDidMount: function() {
		var self = this;

		var recentFetch = fetch('/recentTweets', {method: 'get'})
			.then(function(response) {
				return response.json();
			})

		var pinnedFetch = fetch('/pinnedTweets', {method: 'get'})
			.then(function(response) {
				return response.json();
			})

		Promise.all([recentFetch, pinnedFetch])
			.then(function(data) {
				self.setState({recentTweets: data[0], pinnedTweets: data[1]});
			})
			.catch(function(error) {
				console.error("Error", error);
			})

	},

	//Function that runs when a user clicks to pin a tweet
	pin: function(tweet) {
		var self = this;

		fetch('/pinTweet', {
			method: 'post',
			headers: new Headers({
				'Content-Type' : 'application/json'
			}),
			body: JSON.stringify(tweet)
		})
		.then(function(response) {
			var data = self.state.pinnedTweets;
			data.push(tweet);
			self.setState({pinnedTweets: data});
		})
		.catch(function(error) {
			console.error("Error", error);
		});
	},

	//Function that runs when a user clicks to unpin a tweet
	unpin: function(tweet) {
		var self = this;

		fetch('/unpinTweet', {
			method: 'post',
			headers: new Headers({
				'Content-Type' : 'application/json'
			}),
			body: JSON.stringify(tweet)
		})
		.then(function(response) {
			var data = self.state.pinnedTweets.filter(function(item) {
				return item.Id !== tweet.Id;
			});
			self.setState({pinnedTweets: data});
		})
		.catch(function(error) {
			console.error("Error", error);
		});
	},

	//Function that runs when a user clicks to sort the recent tweets
	sort: function(value) {
		switch(value) {
			case "retweets":
				var sortedTweets = this.state.recentTweets.sort(function(a, b) {
					return b.RetweetCount - a.RetweetCount;
				});
				this.setState({recentTweets: sortedTweets});
			break;
			default:
		}
	},

	//React function that runs on first load and whenever the state is changed
	render: function() {
		var self = this;
		var pinnedTweets = (this.state.pinnedTweets.length > 0) ? this.state.pinnedTweets.map(function(tweet) {
			return (
				<Tweet key={tweet.Id} text={tweet.Text} retweets={tweet.RetweetCount} image={tweet.Image} time={tweet.Time}>
					<Button link={function(){self.unpin(tweet)}} label="Unpin" />
				</Tweet>
			)
			})
		: null;

		var recentTweets = (this.state.recentTweets.length > 0) ? this.state.recentTweets.map(function(tweet) {
			var disabled = self.state.pinnedTweets.includes(tweet);
			return (
				<Tweet key={tweet.Id} text={tweet.Text} retweets={tweet.RetweetCount} image={tweet.Image} time={tweet.Time}>
					<Button link={function(){self.pin(tweet)}} label="Pin" disabled={disabled} />
				</Tweet>
			)
			})
		: null;

		return (
			<div className="container">
				<h2>Welcome to the Xeromatic!</h2>
				<div className="panel panel-info">
					<div className="panel-heading clearfix">
						<div className="col-md-12">
							<h3 className="panel-title">Pinned Tweets</h3>
						</div>
					</div>
					<ul className="list-group">{pinnedTweets}</ul>
				</div>
				<div className="panel panel-info">
					<div className="panel-heading clearfix">
						<div className="col-md-8">
							<h3 className="panel-title" style={{marginTop:"8px"}}>Recent Tweets</h3>
						</div>
						<div className="col-md-4 form-inline">
							<div className="form-group pull-right">
								<label>Sort by: </label>
								<Dropdown sort={self.sort} />
							</div>
						</div>
					</div>
					<ul className="list-group">{recentTweets}</ul>
				</div>
			</div>
		);
	}
});

//This function will render our App to the page
ReactDOM.render(<App />, document.getElementById('app'));
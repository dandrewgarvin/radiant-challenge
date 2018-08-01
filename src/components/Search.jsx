import React from 'react';
import axios from 'axios';

import spinner from '../assets/images/loading_spinner.gif';
import close from '../assets/images/close-icon.png';

import Header from './Header';

class Search extends React.Component {

    state = {
        inputValue: '',
        loading: false,
        photos: [],
        selected: undefined
    }

    componentDidMount() {
        let query = undefined;

        if (this.props.location.search) {
            query = this.props.location.search.replace(/\?input=/g, '')
                .replace(/%20/g, ' ');

            this.setState({
                inputValue: query
            });
        }

        this.makeRequest(query);
    }

    makeRequest = (query = this.state.inputValue) => {
        let url = process.env.REACT_APP_SERVER_URL || 'http://104.236.162.105:3005/api/images?string=';

        this.setState({ loading: true });
        axios.get(url + query).then(response => {
            this.setState({
                loading: false,
                photos: response.data.photos
            });
        });
    }

    handleInput = e => {
        this.setState({ inputValue: e.target.value });
    }

    handleSearch = e => {
        if (e.keyCode === 13) {
            this.props.history.push('/search?input=' + this.state.inputValue);
            this.makeRequest();
        }
    }

    selectImage = index => {
        let selected = this.state.photos[index];
        window.scrollTo(0,0);
        this.setState({ selected })
    }

    render() {

        let s = this.state.selected;
        const selectedUrl = s ? `https://farm${s.farm}.staticflickr.com/${s.server}/${s.id}_${s.secret}.jpg` : undefined;

        const photoDisplay = this.state.photos.map((e, i) => {
            let url = `https://farm${e.farm}.staticflickr.com/${e.server}/${e.id}_${e.secret}.jpg`;
            let title = e.title.length > 20 ? e.title.slice(0, 17) + '...' : e.title;
            return (
                <div key={i} className="photo_box" onClick={() => this.selectImage(i)}>
                    <img src={url} className="photo" alt="img" />
                    <p className="title">{title}</p>
                </div>
            )
        });

        return (
            <main className="Search">
                <Header
                    inputValue={this.state.inputValue}
                    inputChange={this.handleInput}
                    inputKeyDown={this.handleSearch}
                    history={this.props.history}
                />

                {this.state.loading &&
                    <img src={spinner} alt="spinner" className="spinner" />
                }
                {!this.state.loading && !this.state.photos.length ?
                    <h1 className="no_photos">No photos to display. Try another search term!</h1>
                    :
                    <div className="photo_container">
                        {photoDisplay}
                    </div>
                }

                {this.state.selected &&
                    <React.Fragment>
                        <div className="modal" onClick={() => this.setState({ selected: undefined })} />
                        <div className="modal_photo_container">
                            <img src={close} alt="close modal" className="close" onClick={() => this.setState({ selected: undefined })} />
                            <img src={selectedUrl} alt="photo viewer" className="selected_photo" />
                            <p className="selected_title">{s.title}</p>
                        </div>
                    </React.Fragment>
                }
            </main>
        )
    }
}

export default Search;
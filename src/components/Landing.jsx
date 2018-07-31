import React from 'react';

import Logo from '../assets/images/Logo.png';

class Landing extends React.Component {

    state = {
        input: ''
    }

    handleInput = e => {
        this.setState({ input: e.target.value });
    }

    handleEnterPress = e => {
        if (e.keyCode === 13) {
            this.handleSearch();
        }
    }

    handleSearch = () => {
        this.props.history.push('/search?input=' + this.state.input);
    }

    handleLucky = () => {
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    }

    render() {
        return (
            <main className="Landing">
                <section>
                    <img src={Logo} id="logo-lg" alt="Not Google" />
                    <input className="searchbar" value={this.state.input} onChange={this.handleInput} onKeyDown={this.handleEnterPress} />
                    <div className="btn_containers">
                        <button onClick={this.handleSearch}>(Not) Google Search</button>
                        <button onClick={this.handleLucky}>I'm Feeling Lucky</button>
                    </div>
                </section>
            </main>
        )
    }
}

export default Landing;
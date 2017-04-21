import React, {Component} from 'react';
import {connect} from 'react-redux';
import AnnouncementPreview from '../../announcement/announcement-preview';
import Loader from '../../loader';
import './search-results.scss';

class SearchResult extends Component {


    render() {
        const {
            result
        } = this.props;


        if (result.pending) {
            return <Loader/>
        }

        if (!result.data.content.length) {
            return <div>Nothing found</div>
        }

        return (
            <div className="search-results-field">
                {result.data.content.map(a => <AnnouncementPreview vertical={true} {...a}/>)}
            </div>
        )
    }

}

export default connect(
    ({
         search: {
             searchResult
         }
     }) => ({
        result: searchResult,
    }))(SearchResult);

import React, {Component} from 'react';
import {connect} from 'react-redux';
import AnnouncementPreview from '../../announcement/announcement-preview';
import Loader from '../../loader';

class SearchResult extends Component {


    render() {
        const {
            result
        } = this.props;


        if (result.pending) {
            return <Loader/>
        }

        if (!result.data.length) {
            return <div>Nothing found</div>
        }

        return (
            <div>
                {result.data.map(a => <AnnouncementPreview {...a}/>)}
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

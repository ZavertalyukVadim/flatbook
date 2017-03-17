import React, {Component, PropTypes} from 'react';
import './grid.scss';

class GridExample extends Component {

    render() {
      

        return (
            <div className="row">
                <div className="col-1 offset-11">Col 1</div>
                <div className="col-2 offset-10">Col 2</div>
                <div className="col-3 offset-9">Col 3</div>
                <div className="col-4 offset-8">Col 4</div>
                <div className="col-5 offset-7">Col 5</div>
                <div className="col-6 offset-6">Col 6</div>
                <div className="col-7 offset-5">Col 7</div>
                <div className="col-8 offset-4">Col 8</div>
                <div className="col-9 offset-3">Col 9</div>
                <div className="col-10 offset-2">Col 10</div>
                <div className="col-11 offset-1">Col 11</div>
                <div className="col-12">Col 12</div>
            </div>
        );
    }
}

export default GridExample;
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {isNull, noop} from 'lodash';
import classNames from 'classnames';
import Dropdown from '../dropdown';
import Slider from '../slider';
import Radio from '../radio';
import Button, {ButtonSizes, ButtonTypes} from '../button';
import InputRange from '../input-range';
import './search-form.scss';
import {
    getCountries,
    getRegions,
    getCities,
    search
} from '../../actions/search-actions';

class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chosenCountryID: null,
            chosenRegionID: null,
            chosenCityID: null,
            priceValue: [0, 10000],
            priceType: 'PRICE_PER_DAY',
            rooms: 1,
            livingPlaces: 2
        }
    }

    componentDidMount() {
        this.props.getCountries();
    }

    changeCountry = id => {
        this.setState({
            chosenCountryID: id,
            chosenRegionID: null,
            chosenCityID: null
        });
        this.props.getRegions(id);
    };
    changeRegion = id => {
        this.setState({
            chosenRegionID: id,
            chosenCityID: null
        });
        this.props.getCities(id);
    };
    changeCities = id => this.setState({chosenCityID: id});
    savePriceValue = v => this.setState({sliderValue: v});
    changePriceType = type => () => this.setState({priceType: type});
    changeRooms = v => this.setState({rooms: v});
    changeLeavingPlaces = v => this.setState({livingPlaces: v});
    search = () => {
        this.props.search({
            cityId: this.state.chosenCityID,
            finalPrice: this.state.priceValue[1],
            livingPlaces: this.state.livingPlaces,
            price: this.state.priceType,
            rooms: this.state.rooms,
            startingPrice: this.state.priceValue[0]
        });
        this.props.redirect('/search');
    };

    render() {
        const {
            countries,
            regions,
            cities,
            type
        } = this.props;
        const {
            chosenCountryID,
            chosenRegionID,
            chosenCityID,
            priceValue,
            priceType,
            rooms,
            livingPlaces
        } = this.state;

        const formClassName = classNames('search-form', {['search-vertical']: type === 'vertical'});
        const containerClassName = classNames('search-form-options-container', {['search-vertical']: type === 'vertical'});

        return (
            <div className={formClassName}>
                <div className={containerClassName}>
                    <div className="search-form-address">
                        <Dropdown
                            options={countries.data.map(c => ({value: c.name, id: c.id}))}
                            selectedID={chosenCountryID}
                            onOptionChange={this.changeCountry}
                            loader={countries.pending}
                            defaultMassage="Choose country"
                            className="search-form-dropdown"
                        />
                        <Dropdown
                            options={regions.data.map(c => ({value: c.name, id: c.id}))}
                            selectedID={chosenRegionID}
                            onOptionChange={this.changeRegion}
                            loader={regions.pending || isNull(chosenCountryID)}
                            defaultMassage="Choose region"
                            disabled={isNull(chosenCountryID)}
                            className="search-form-dropdown"
                        />
                        <Dropdown
                            options={cities.data.map(c => ({value: c.name, id: c.id}))}
                            selectedID={chosenCityID}
                            onOptionChange={this.changeCities}
                            loader={cities.pending || isNull(chosenRegionID)}
                            defaultMassage="Choose city"
                            disabled={isNull(chosenRegionID)}
                            className="search-form-dropdown"
                        />
                    </div>
                    <div className="search-form-options">
                        Price
                        <div className="search-form-price">
                            <div className="search-form-price-radio">
                                <Radio
                                    value={priceType === 'PRICE_PER_DAY'}
                                    onCheck={this.changePriceType('PRICE_PER_DAY')}
                                    label="Per Day"
                                />
                                <Radio
                                    value={priceType === 'PRICE_PER_MONTH'}
                                    onCheck={this.changePriceType('PRICE_PER_MONTH')}
                                    label="Per Month"
                                />
                            </div>
                            <div className="search-form-price-slider">
                                <Slider
                                    from={priceValue[0]}
                                    to={priceValue[1]}
                                    value={[100, 900]}
                                    onSave={this.savePriceValue}
                                />
                            </div>
                        </div>
                        <div className="search-form-options-ranges">
                            <div className="search-form-options-label">
                                Rooms
                                <InputRange
                                    value={rooms}
                                    maxValue={30}
                                    onChangeValue={this.changeRooms}/>
                            </div>
                            <div className="search-form-options-label">
                                Leaving Places
                                <InputRange
                                    value={livingPlaces}
                                    maxValue={50}
                                    onChangeValue={this.changeLeavingPlaces}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Button
                    onClick={this.search}
                    caption="Search"
                    size={ButtonSizes.block}
                    type={ButtonTypes.primary}
                    disabled={isNull(chosenCountryID) || isNull(chosenRegionID) || isNull(chosenCityID)}
                    className="search-form-button"
                />
            </div>
        )
    }
}

SearchForm.defaultProps = {
    type: 'horizontal',
    redirect: noop
};

SearchForm.propTypes = {
    type: PropTypes.string,
    redirect: PropTypes.func
};

export default connect(
    ({
         search: {
             countries,
             regions,
             cities
         }
     }) => ({
        countries: countries,
        regions: regions,
        cities: cities
    }), {
        getCountries,
        getRegions,
        getCities,
        search
    })(SearchForm);

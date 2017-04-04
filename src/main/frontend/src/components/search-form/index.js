import React, {Component} from 'react';
import {connect} from 'react-redux';
import {isNull} from 'lodash';
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
        console.log(this.props);
        console.log(this.props.history);
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
    search = () => this.props.search({
        cityId: this.state.chosenCityID,
        finalPrice: this.state.priceValue[1],
        livingPlaces: this.state.livingPlaces,
        price: this.state.priceType,
        rooms: this.state.rooms,
        startingPrice: this.state.priceValue[0]
    });

    render() {
        const {
            countries,
            regions,
            cities
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

        return (
            <div className="search-form">
                <div className="search-form-options-container">
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
                        <div className="search-form-price">
                            <span className="search-form-options-label">Price</span>
                            <div>
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
                            <Slider
                                from={priceValue[0]}
                                to={priceValue[1]}
                                value={[100, 900]}
                                onSave={this.savePriceValue}
                            />
                        </div>
                        <span className="search-form-options-label">Rooms</span>
                        <InputRange value={rooms} maxValue={30} onChangeValue={this.changeRooms}/>
                        <span className="search-form-options-label">Leaving Places</span>
                        <InputRange value={livingPlaces} maxValue={50} onChangeValue={this.changeLeavingPlaces}/>
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

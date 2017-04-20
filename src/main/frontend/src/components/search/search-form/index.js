import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {isNull, noop} from 'lodash';
import classNames from 'classnames';
import moment from 'moment';
import Dropdown from '../../dropdown';
import Slider from '../../slider';
import Radio from '../../radio';
import Button, {ButtonSizes, ButtonTypes} from '../../button';
import InputRange from '../../input-range';
import DatePickerRange from '../../datepicker-range';
import Checkbox from "../../checkbox/index";
import './search-form.scss';
import {
    getCountries,
    getRegions,
    getCities,
    getWorldMaxPrice,
    getCountyMaxPrice,
    getRegionMaxPrice,
    getCityMaxPrice,
    search,
    advancedSearch
} from '../../../actions/search-actions';
import {redirect} from "../../../utils/history";
import {getAmenity} from "../../../actions/amenity-actions";

class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chosenCountryID: null,
            chosenRegionID: null,
            chosenCityID: null,
            maxPrice: 10000,
            priceValue: [0, 10000],
            priceType: 'PRICE_PER_DAY',
            rooms: 1,
            livingPlaces: 2,
            startDate: moment(),
            endDate: moment().add(5, 'days'),
            amenities: []
        }
    }

    componentDidMount() {
        const {
            getCountries,
            getWorldMaxPrice,
            getAmenity,
            type
        } = this.props;

        if (type === 'vertical') {
            getAmenity();
        }

        getCountries();
        getWorldMaxPrice();
    }

    componentWillUpdate() {
        this.checkPriceValue()
    }

    componentWillReceiveProps(nextProps) {
        const {
            chosenCountryID,
            chosenRegionID,
            chosenCityID,
            priceType
        } = this.state;

        if (nextProps.maxPrice !== this.props.maxPrice) {

            if (nextProps.maxPrice.world !== this.props.maxPrice.world && !nextProps.maxPrice.world.pending && isNull(chosenCountryID)) {
                this.setState({
                    maxPrice: priceType === 'PRICE_PER_DAY' ?
                        nextProps.maxPrice.world.data.pricePerDay : nextProps.maxPrice.world.data.pricePerMonth
                });
            } else if (nextProps.maxPrice.country !== this.props.maxPrice.country && !nextProps.maxPrice.country.pending && isNull(chosenRegionID)) {
                this.setState({
                    maxPrice: priceType === 'PRICE_PER_DAY' ?
                        nextProps.maxPrice.country.data.pricePerDay : nextProps.maxPrice.country.data.pricePerMonth

                })
            } else if (nextProps.maxPrice.region !== this.props.maxPrice.region && !nextProps.maxPrice.region.pending && isNull(chosenCityID)) {
                this.setState({
                    maxPrice: priceType === 'PRICE_PER_DAY' ?
                        nextProps.maxPrice.region.data.pricePerDay : nextProps.maxPrice.region.data.pricePerMonth
                })
            } else if (nextProps.maxPrice.city !== this.props.maxPrice.city && !nextProps.maxPrice.city.pending) {
                this.setState({
                    maxPrice: priceType === 'PRICE_PER_DAY' ?
                        nextProps.maxPrice.city.data.pricePerDay : nextProps.maxPrice.city.data.pricePerMonth
                })
            }
        }

        if (nextProps.allAmenities !== this.props.allAmenities) {
            this.setState({
                amenities: nextProps.allAmenities.data.map(A => ({...A, checked: false}))
            })
        }
    }

    checkPriceValue = () => {
        const {priceValue, maxPrice} = this.state;
        if (priceValue[1] > maxPrice) {
            this.setState({priceValue: [priceValue[0], maxPrice]})
        }
    };

    changeCountry = id => {
        this.setState({
            chosenCountryID: id,
            chosenRegionID: null,
            chosenCityID: null
        });
        this.props.getCountyMaxPrice(id);
        this.props.getRegions(id);
    };
    changeRegion = id => {
        this.setState({
            chosenRegionID: id,
            chosenCityID: null
        });
        this.props.getRegionMaxPrice(id);
        this.props.getCities(id);
    };
    changeCities = id => {
        this.props.getCityMaxPrice(id);
        this.setState({chosenCityID: id});
    };
    savePriceValue = v => this.setState({sliderValue: v});
    changePriceType = type => () => {
        const {
            chosenCountryID,
            chosenRegionID,
            chosenCityID
        } = this.state;
        const {
            maxPrice: {
                world,
                country,
                region,
                city
            }
        } = this.props;

        this.setState({priceType: type});
        if (isNull(chosenCountryID)) {
            this.setState({
                maxPrice: type === 'PRICE_PER_DAY' ? world.data.pricePerDay : world.data.pricePerMonth
            })
        } else if (isNull(chosenRegionID)) {
            this.setState({
                maxPrice: type === 'PRICE_PER_DAY' ? country.data.pricePerDay : country.data.pricePerMonth
            })
        } else if (isNull(chosenCityID)) {
            this.setState({
                maxPrice: type === 'PRICE_PER_DAY' ? region.data.pricePerDay : region.data.pricePerMonth
            })
        } else {
            this.setState({
                maxPrice: type === 'PRICE_PER_DAY' ? city.data.pricePerDay : city.data.pricePerMonth
            })
        }
    };
    changeRooms = v => this.setState({rooms: v});
    changeLeavingPlaces = v => this.setState({livingPlaces: v});
    saveStartDate = d => this.setState({startDate: d});
    saveEndDate = d => this.setState({endDate: d});
    checkAmenity = id => () => this.setState({
        amenities: this.state.amenities.map(a => a.id === id ? {name: a.name, checked: !a.checked, id: a.id} : a)
    });
    search = () => {
        const {
            chosenCityID,
            priceValue,
            livingPlaces,
            priceType,
            rooms,
            startDate,
            endDate,
            amenities
        } = this.state;

        const searchProps = {
            cityId: chosenCityID,
            finalPrice: priceValue[1],
            livingPlaces: livingPlaces,
            price: priceType,
            rooms: rooms,
            startingPrice: priceValue[0],
            itemsPerPage: 20,
            pageNum: 0,
            startDate: startDate.format(),
            endDate: endDate.format()
        };

        if (this.props.type === 'vertical') {
            this.props.advancedSearch({
                ...searchProps,
                amenities: amenities.filter(a => a.checked).map(a => ({id: a.id, name: a.name}))
            })
        } else {
            this.props.search(searchProps);
            redirect('/search');
        }
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
            livingPlaces,
            startDate,
            endDate,
            maxPrice,
            amenities
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
                        <DatePickerRange
                            endDate={endDate}
                            startDate={startDate}
                            handleChangeEnd={this.saveEndDate}
                            handleChangeStart={this.saveStartDate}
                        />
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
                                    from={0}
                                    to={maxPrice}
                                    value={priceValue}
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
                {
                    type === 'vertical' ?
                        amenities.map(
                            (a, i) =>
                                <div key={i} className="search-form-amenities">
                                    <Checkbox
                                        className="hide-announcement"
                                        onClick={this.checkAmenity(a.id)}
                                        checked={a.checked}
                                        disabled={false}
                                    >{a.name}</Checkbox>
                                </div>
                        )
                        : null
                }
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
    redirect: noop,
    allAmenities: []
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
             cities,
             maxPrice
         },
         amenity
     }) => ({
        countries: countries,
        regions: regions,
        cities: cities,
        maxPrice: maxPrice,
        allAmenities: amenity
    }), {
        getCountries,
        getRegions,
        getCities,
        getWorldMaxPrice,
        getCountyMaxPrice,
        getRegionMaxPrice,
        getCityMaxPrice,
        search,
        advancedSearch,
        getAmenity
    })(SearchForm);

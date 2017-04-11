import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {isNull, noop} from 'lodash';
import Checkbox from '../../checkbox';
import Input from '../../input';
import Button, {ButtonTypes, ButtonSizes} from '../../button';
import Dropdown from '../../dropdown';
import Header, {HeaderTypes} from '../../header';
import './announcement-form.scss';
import Textarea from '../../textarea';
import Toggle from '../../toggle';
import InputRange from '../../input-range';
import {
    getCountries,
    getRegions,
    getCities
} from '../../../actions/search-actions';
import {getAmenity} from '../../../actions/amenity-actions';
import {saveAnnouncement} from '../../../actions/announcement-actions';

const PRICE_PER_DAY = 'pricePerDay';
const PRICE_PER_MONTH = 'pricePerMonth';

class AnnouncementForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chosenCountryID: props.chosenCountryID,
            chosenRegionID: props.chosenRegionID,
            chosenCityID: props.chosenCityID,
            title: props.title,
            amenities: props.amenities,
            description: props.description,
            rooms: props.rooms,
            street: props.street,
            livingPlaces: props.livingPlaces,
            pricePerDay: props.pricePerDay,
            pricePerMonth: props.pricePerMonth,
            priceType: isNull(props.pricePerDay) ? PRICE_PER_MONTH : PRICE_PER_DAY,
            photos: props.photos,
            toggleValue: isNull(props.pricePerDay)
        }
    }

    componentDidMount() {
        this.props.getCountries();
        this.props.getAmenity().then(
            r => this.setState({amenities: this.props.allAmenities.data})
        );
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
    changeCities = id => {
        this.setState({chosenCityID: id});
    };
    onInputChange = name => e => this.setState({[name]: e.target.value});
    checkAmenity = id => () => this.setState({
        amenities: this.state.amenities.map(a => a.id === id ? {name: a.name, checked: !a.checked, id: a.id} : a)
    });
    changeRooms = v => this.setState({rooms: v});
    changeLeavingPlaces = v => this.setState({livingPlaces: v});
    changePriceType = v => this.setState({
        priceType: !this.state.toggleValue ? PRICE_PER_MONTH : PRICE_PER_DAY,
        toggleValue: !this.state.toggleValue
    });
    onSaveAnnouncement = () => {
        const {
            title,
            description,
            street,
            rooms,
            livingPlaces,
            chosenCountryID,
            chosenRegionID,
            chosenCityID,
            amenities,
            priceType
        } = this.state;

        this.props.saveAnnouncement({
            chosenCountryID: chosenCountryID,
            chosenRegionID: chosenRegionID,
            chosenCityID: chosenCityID,
            title: title,
            description: description,
            rooms: rooms,
            street: street,
            livingPlaces: livingPlaces,
            [priceType]: this.state[priceType],
            amenities: amenities.filter(a => a.checked).map(a => ({id: a.id, name: a.name}))
        }).then(
            () => this.props.redirect('/profile'), noop
        );
    };
    onDiscard = () => this.setState({
        chosenCountryID: null,
        chosenRegionID: null,
        chosenCityID: null,
        title: '',
        amenities: this.props.amenities.map(a => ({...a, checked: false})),
        description: '',
        rooms: 1,
        street: '',
        livingPlaces: 1,
        pricePerDay: null,
        pricePerMonth: null,
        photos: []
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
            description,
            pricePerDay,
            pricePerMonth,
            title,
            amenities,
            street,
            rooms,
            livingPlaces,
            toggleValue,
            priceType
        } = this.state;

        const saveDisabled = !(
            !isNull(chosenCountryID) && !isNull(chosenRegionID) && !isNull(chosenCityID)
                && (!isNull(pricePerDay) || !isNull(pricePerMonth)) && title
        );

        return (
            <div className="announcement-form">
                <Header
                    type={HeaderTypes.primary}
                    value="Create announcement"
                    className="announcement-form-item"
                />
                <Input
                    placeholder='Title'
                    value={title}
                    onChange={this.onInputChange('title')}
                    maxLength={100}
                />
                <Dropdown
                    options={countries.data.map(c => ({value: c.name, id: c.id}))}
                    selectedID={chosenCountryID}
                    onOptionChange={this.changeCountry}
                    loader={countries.pending}
                    defaultMassage="Choose country"
                    className="announcement-form-item"
                />
                <Dropdown
                    options={regions.data.map(c => ({value: c.name, id: c.id}))}
                    selectedID={chosenRegionID}
                    onOptionChange={this.changeRegion}
                    loader={regions.pending || isNull(chosenCountryID)}
                    defaultMassage="Choose region"
                    disabled={isNull(chosenCountryID)}
                    className="announcement-form-item"
                />
                <Dropdown
                    options={cities.data.map(c => ({value: c.name, id: c.id}))}
                    selectedID={chosenCityID}
                    onOptionChange={this.changeCities}
                    loader={cities.pending || isNull(chosenRegionID)}
                    defaultMassage="Choose city"
                    disabled={isNull(chosenRegionID)}
                    className="announcement-form-item"
                />
                <Input
                    placeholder='Street'
                    value={street}
                    onChange={this.onInputChange('street')}
                    className="announcement-form-item"
                />
                <div className="announcement-form-custom-field ">
                    <div className="announcement-form-custom-field-toggle">
                        <Toggle
                            isToggled={toggleValue}
                            changeToggle={this.changePriceType}
                            icons={[<i className="fa fa-clock-o"/>, <i className="fa fa-calendar"/>]}
                        />
                    </div>
                    {
                        priceType === PRICE_PER_DAY ?
                            <Input
                                placeholder='Price per day'
                                value={isNull(pricePerDay) ? '' : pricePerDay}
                                onChange={this.onInputChange(PRICE_PER_DAY)}
                                className="announcement-form-custom-field-input"
                            /> :
                            <Input
                                placeholder='Price per month'
                                value={isNull(pricePerMonth) ? '' : pricePerMonth}
                                onChange={this.onInputChange(PRICE_PER_MONTH)}
                                className="announcement-form-custom-field-input"
                            />
                    }
                </div>
                <div className="announcement-form-custom-field announcement-form-item">
                    <div>Room
                        <InputRange
                            value={rooms}
                            maxValue={30}
                            onChangeValue={this.changeRooms}
                        />
                    </div>
                    <div>Living Places
                        <InputRange
                            value={livingPlaces}
                            maxValue={50}
                            onChangeValue={this.changeLeavingPlaces}
                        />
                    </div>
                </div>
                <div className="announcement-form-amenities">
                    {
                        amenities.map(
                            (a, i) =>
                                <div key={i}>
                                    <Checkbox
                                        className="hide-announcement"
                                        onClick={this.checkAmenity(a.id)}
                                        checked={a.checked}
                                        disabled={false}
                                    >{a.name}</Checkbox>
                                </div>
                        )
                    }
                </div>
                <Textarea
                    value={description}
                    onChange={this.onInputChange('description')}
                    placeholder="Description"
                    className="announcement-form-item"
                />
                <div className="announcement-form-custom-field announcement-form-item">
                    <Button
                        type={ButtonTypes.primary}
                        size={ButtonSizes.block}
                        caption="Publish"
                        className="announcement-btn"
                        disabled={saveDisabled}
                        onClick={this.onSaveAnnouncement}
                    />
                    <Button
                        type={ButtonTypes.danger}
                        size={ButtonSizes.block}
                        caption="Discard"
                        onClick={this.onDiscard}
                    />
                </div>
            </div>
        )
    }
}

AnnouncementForm.defaultProps = {
    description: '',
    pricePerDay: null,
    pricePerMonth: null,
    title: '',
    amenities: [],
    rooms: 4,
    livingPlaces: 4,
    chosenCountryID: null,
    chosenRegionID: null,
    chosenCityID: null,
    photos: []
};

AnnouncementForm.propTypes = {
    description: PropTypes.string,
    pricePerDay: PropTypes.number,
    pricePerMonth: PropTypes.number,
    title: PropTypes.string,
    amenities: PropTypes.array,
    rooms: PropTypes.number,
    livingPlaces: PropTypes.number,
    photos: PropTypes.array
};

export default connect(
    ({
         search: {
             countries,
             regions,
             cities
         },
         amenity
     }) => ({
        countries: countries,
        regions: regions,
        cities: cities,
        allAmenities: amenity
    }), {
        getCountries,
        getRegions,
        getCities,
        saveAnnouncement,
        getAmenity
    })(AnnouncementForm);

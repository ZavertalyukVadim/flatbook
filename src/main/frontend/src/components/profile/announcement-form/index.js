import React, {Component, propTypes} from 'react';
import {connect} from 'react-redux';
import {isNull} from 'lodash';
import Checkbox from '../../checkbox';
import Input from '../../input';
import Button, {ButtonTypes, ButtonSizes} from '../../button';
import Dropdown from '../../dropdown';
import Header, {HeaderTypes} from '../../header';
import './announcement-form.scss';
import Textarea from '../../textarea';
import InputRange from '../../input-range';
import {
    getCountries,
    getRegions,
    getCities
} from '../../../actions/search-actions';
import {saveAnnouncement} from '../../../actions/announcement-actions';

class AnnouncementForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenCountryID: null,
            chosenRegionID: null,
            chosenCityID: null,
            title: props.title,
            amenties: props.amenties,
            description: props.description,
            rooms: props.rooms,
            street: props.street,
            livingPlaces: props.livingPlaces,
            pricePerDay: props.pricePerDay,
            pricePerMonth: props.pricePerMonth,
            photos: props.photos,
            apartment: props.apartment
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
    changeCities = id => {
        this.setState({chosenCityID: id});
    };
    onInputChange = name => e => this.setState({[name]: e.target.value});
    onInputRangeChange = (name, value) => e => this.setState({[name]: value});
    checkAmenity = id => () => this.setState({
        amenties: this.state.amenties.map(a => a.id === id ? {name: a.name, checked: !a.checked, id: a.id} : a)
    });
    changeRooms = v => this.setState({rooms: v});
    changeLeavingPlaces = v => this.setState({livingPlaces: v});
    onSaveAnnouncement = () => this.props.saveAnnouncement(this.state);

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
            amenties,
            street,
            rooms,
            apartment,
            livingPlaces,
        } = this.state;

        return (
            <div className="announcement-form-field">
                <Header
                    type={HeaderTypes.primary}
                    value="Create announcement"
                />
                <Input
                    placeholder='Fill in title'
                    value={title}
                    onChange={this.onInputChange('title')}
                />
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
                <Input
                    placeholder='Street'
                    value={street}
                    onChange={this.onInputChange('street')}
                />
                <Input
                    placeholder='Apartment'
                    value={apartment}
                    onChange={this.onInputChange('apartment')}
                />
                <Input
                    placeholder='Price per day'
                    value={pricePerDay}
                    onChange={this.onInputChange('pricePerDay')}
                />
                <Input
                    placeholder='Price per month'
                    value={pricePerMonth}
                    onChange={this.onInputChange('pricePerMonth')}
                />
                <div className="announcement-range-field">
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
                {
                    amenties.map((a, i) =>
                        <div key={i}>
                            <Checkbox
                                className="hide-announcement"
                                onClick={this.checkAmenity(a.id)}
                                checked={a.checked}
                                disabled={false}
                            >{a.name}</Checkbox>
                        </div>
                    )}
                <Textarea
                    value={description}
                    onChange={this.onInputChange('description')}
                    placeholder="description"
                />
                <div className="announcement-btn-field">

                    <Button
                        type={ButtonTypes.primary}
                        size={ButtonSizes.block}
                        caption="Publish"
                        className="announcement-btn"
                        onClick={this.onSaveAnnouncement}
                    />

                    <Button
                        type={ButtonTypes.danger}
                        size={ButtonSizes.block}
                        caption="Discard"
                    />
                </div>
            </div>


        )
    }
}

AnnouncementForm.defaultProps = {
    description: '',
    pricePerDay: '',
    pricePerMonth: '',
    title: '',
    amenties: [
        {
            checked: false,
            name: 'WI FI',
            id: 1
        },
        {
            checked: false,
            name: 'Iron',
            id: 2
        },
        {
            checked: false,
            name: 'Balcony',
            id: 3
        }
    ],
    rooms: 4,
    apartment: '',
    livingPlaces: 4,
    country: 0,
    city: 1,
    region: 2
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
        saveAnnouncement
    })(AnnouncementForm);

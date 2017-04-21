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
import UploadImage from '../../upload-image';
import {
    getCountries,
    getRegions,
    getCities
} from '../../../actions/search-actions';
import {getAmenity} from '../../../actions/amenity-actions';
import urlResolver from "../../../api/urlResolver";
import {uploadImage} from "../../../actions/image-actions";

const pricePerDay = 'PRICE_PER_DAY';
const pricePerMonth = 'PRICE_PER_MONTH';

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
            PRICE_PER_DAY: props.PRICE_PER_DAY,
            PRICE_PER_MONTH: props.PRICE_PER_MONTH,
            priceType: isNull(props.PRICE_PER_DAY) ? pricePerMonth : pricePerDay,
            photos: typeof props.photos[0] === 'object' ? props.photos.map(p => p.id) : props.photos,
            toggleValue: isNull(props.PRICE_PER_DAY)
        }
    }

    componentDidMount() {
        const {
            getCountries,
            getRegions,
            getCities,
            chosenRegionID,
            getAmenity,
            chosenCountryID,
            allAmenities,
            chosenAmenities
        } = this.props;

        getCountries();

        if (!isNull(chosenCountryID)) {
            getRegions(chosenCountryID);
        }

        if (!isNull(chosenRegionID)) {
            getCities(chosenRegionID);
        }
        getAmenity();

        this.setState({
            amenities: allAmenities.data.map(A => ({
                ...A,
                checked: !!(chosenAmenities.filter(a => a.id === A.id).length)
            }))
        })
    }

    componentWillReceiveProps(nextProps) {
        const {allAmenities, chosenAmenities} = this.props;

        if (allAmenities.data !== nextProps.allAmenities.data) {

            this.setState({
                amenities: nextProps.allAmenities.data.map(A => ({
                    ...A,
                    checked: !!(chosenAmenities.filter(a => a.id === A.id).length)
                }))
            })
        }
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
    onChangePrice = name => e => {
        if (e.target.value.match(new RegExp('^[0-9]*$'))) {
            this.setState({[name]: e.target.value});
        }
    };
    checkAmenity = id => () => this.setState({
        amenities: this.state.amenities.map(a => a.id === id ? {name: a.name, checked: !a.checked, id: a.id} : a)
    });
    changeRooms = v => this.setState({rooms: v});
    changeLeavingPlaces = v => this.setState({livingPlaces: v});
    changePriceType = v => this.setState({
        priceType: !this.state.toggleValue ? pricePerMonth : pricePerDay,
        toggleValue: !this.state.toggleValue
    });
    addImage = id => !isNull(id) ? this.setState({photos: [...this.state.photos, id]}) : noop;
    removePhoto = id => () => this.setState({photos: this.state.photos.filter(p => p !== id)});
    onSaveAnnouncement = () => {
        const {
            title,
            description,
            street,
            rooms,
            livingPlaces,
            chosenCityID,
            amenities,
            priceType,
            photos
        } = this.state;

        this.props.onSave({
            cityId: chosenCityID,
            title: title,
            description: description,
            rooms: rooms,
            street: street,
            livingPlaces: livingPlaces,
            priceType: priceType,
            priceValue: +this.state[priceType],
            amenities: amenities.filter(a => a.checked).map(a => ({id: a.id, name: a.name})),
            photos: photos
        });
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
            PRICE_PER_DAY,
            PRICE_PER_MONTH,
            title,
            amenities,
            street,
            rooms,
            livingPlaces,
            toggleValue,
            priceType,
            photos
        } = this.state;

        const saveDisabled = !(
            !isNull(chosenCountryID) && !isNull(chosenRegionID) && !isNull(chosenCityID)
            && (!isNull(PRICE_PER_DAY) || !isNull(PRICE_PER_MONTH)) && title
        );

        return (
            <div className="announcement-form">
                <Header
                    type={HeaderTypes.primary}
                    value="Create announcement"
                    className="announcement-form-item"
                />
                <Input
                    placeholder='Title *'
                    value={title}
                    onChange={this.onInputChange('title')}
                    maxLength={100}
                />
                <Dropdown
                    options={countries.data.map(c => ({value: c.name, id: c.id}))}
                    selectedID={chosenCountryID}
                    onOptionChange={this.changeCountry}
                    loader={countries.pending}
                    defaultMassage="Choose country *"
                    className="announcement-form-item"
                />
                <Dropdown
                    options={regions.data.map(c => ({value: c.name, id: c.id}))}
                    selectedID={chosenRegionID}
                    onOptionChange={this.changeRegion}
                    loader={regions.pending || isNull(chosenCountryID)}
                    defaultMassage="Choose region *"
                    disabled={isNull(chosenCountryID)}
                    className="announcement-form-item"
                />
                <Dropdown
                    options={cities.data.map(c => ({value: c.name, id: c.id}))}
                    selectedID={chosenCityID}
                    onOptionChange={this.changeCities}
                    loader={cities.pending || isNull(chosenRegionID)}
                    defaultMassage="Choose city *"
                    disabled={isNull(chosenRegionID)}
                    className="announcement-form-item"
                />
                <Input
                    placeholder='Street'
                    value={street}
                    onChange={this.onInputChange('street')}
                    className="announcement-form-item"
                    maxLength={100}
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
                        priceType === pricePerDay ?
                            <Input
                                placeholder='Price per day *'
                                value={isNull(PRICE_PER_DAY) ? '' : PRICE_PER_DAY}
                                onChange={this.onChangePrice(pricePerDay)}
                                className="announcement-form-custom-field-input"
                            /> :
                            <Input
                                placeholder='Price per month *'
                                value={isNull(PRICE_PER_MONTH) ? '' : PRICE_PER_MONTH}
                                onChange={this.onChangePrice(pricePerMonth)}
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
                <div className="announcement-form-item">
                    <span className="announcement-form-required-field">* - this fields are required</span>
                </div>
                <div className="announcement-form-item">
                    <UploadImage
                        caption="Add Photo"
                        newImageCallback={this.addImage}
                        saveImage={this.props.uploadImage}
                    />
                    <ul className="announcement-form-photo-list">
                        {
                            photos.map(
                                (p, i) =>
                                    <li className="announcement-form-photo-item">
                                        <img className="announcement-form-photo"
                                             src={urlResolver(`photo/${p}`)}
                                             key={i}/>
                                        <Button
                                            type={ButtonTypes.danger}
                                            size={ButtonSizes.small}
                                            onClick={this.removePhoto(p)}
                                            caption="Remove photo"
                                        />
                                    </li>
                            )
                        }
                    </ul>
                </div>
                <div className="announcement-form-custom-field announcement-form-item">
                    <Button
                        type={ButtonTypes.info}
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

AnnouncementForm
    .defaultProps = {
    description: '',
    PRICE_PER_DAY: null,
    PRICE_PER_MONTH: null,
    title: '',
    street: '',
    amenities: [],
    rooms: 4,
    livingPlaces: 4,
    chosenCountryID: null,
    chosenRegionID: null,
    chosenCityID: null,
    photos: [],
    chosenAmenities: []
};

AnnouncementForm.propTypes = {
    description: PropTypes.string,
    PRICE_PER_DAY: PropTypes.number,
    PRICE_PER_MONTH: PropTypes.number,
    title: PropTypes.string,
    amenities: PropTypes.array,
    rooms: PropTypes.number,
    livingPlaces: PropTypes.number,
    photos: PropTypes.array,
    chosenAmenities: PropTypes.array
};

export default connect(
    ({
         search: {
             countries,
             regions,
             cities
         }
         ,
         amenity
     }) =>
        ({
            countries: countries,
            regions: regions,
            cities: cities,
            allAmenities: amenity
        }), {
        getCountries,
        getRegions,
        getCities,
        getAmenity,
        uploadImage
    }
)
(AnnouncementForm);

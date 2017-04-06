import React, {Component, propTypes} from 'react';
import Checkbox from '../../checkbox';
import Input from '../../input';
import Button, {ButtonTypes, ButtonSizes} from '../../button';
import Dropdown from '../../dropdown';
import Header, {HeaderTypes} from '../../header';
import './announcement-form.scss';
import Textarea from '../../textarea';
import InputRange from '../../input-range';

let example = [
    {
        id: 0,
        value: 'option 1'
    }, {
        id: 1,
        value: 'option 2'
    }, {
        id: 2,
        value: 'option 3'
    }
];
class AnnouncementForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            country: props.country,
            amenties: props.amenties,
            description: props.description,
            region: props.region,
            city: props.city,
            room: props.room,
            street: props.street,
            livingPlaces: props.livingPlaces,
            pricePerDay: props.pricePerDay,
            pricePerMonth: props.pricePerMonth,
            photos: props.photos,
            apartment: props.apartment
        }
    }

    onInputChange = e => this.setState({value: e.target.value});
    onCheckboxClick = () => this.setState({visibility: !this.state.visibility});
    onInputRangeChange = value => this.setState({inputRange: value});

    render() {
        const {
            region,
            description,
            photos,
            pricePerDay,
            pricePerMonth,
            title,
            amenties,
            city,
            street,
            room,
            apartment,
            livingPlaces,
            country
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
                    onChange={this.onCheckboxClick}
                />
                <Dropdown
                    defaultMassage="Choose country"
                    selectedID={country}
                    options={example}
                    onOptionChange={this.onCheckboxClick}
                />
                <Dropdown
                    selectedID={region}
                    defaultMassage="Choose region"
                    options={example}
                    onOptionChange={this.onCheckboxClick}
                />
                <Dropdown
                    selectedID={city}
                    defaultMassage="Choose city"
                    options={example}
                    onOptionChange={this.onCheckboxClick}
                />
                <Input
                    placeholder='Street'
                    value={street}
                    onChange={this.onCheckboxClick}
                />
                <Input
                    placeholder='Apartment'
                    value={apartment}
                    onChange={this.onCheckboxClick}
                />
                <Input
                    placeholder='Price per day'
                    value={pricePerDay}
                    onChange={this.onCheckboxClick}
                />
                <Input
                    placeholder='Price per month'
                    value={pricePerMonth}
                    onChange={this.onCheckboxClick}
                />
                <div className="announcement-range-field">
                    <p>Room<InputRange
                        value={room}
                        maxValue={10}
                        onChangeValue={this.onInputRangeChange}/></p>
                    <p>Living Places<InputRange
                        value={livingPlaces}
                        maxValue={10}
                        onChangeValue={this.onInputRangeChange}/></p>
                </div>
                {amenties.map((item, index) =>
                    <div key={index}>
                        <Checkbox
                            className="hide-announcement"
                            onClick={this.onCheckboxClick}
                            checked={item.checked}
                            disabled={false}
                        >{item.value}</Checkbox>
                    </div>
                )}
                <Textarea value={description} onChange={this.onInputChange}/>
                <div className="announcement-btn-field">
                    <Button
                        type={ButtonTypes.primary}
                        size={ButtonSizes.block}
                        caption="Publish"
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
            value: 'WI FI'
        },
        {
            checked: false,
            value: 'Iron'
        },
        {
            checked: false,
            value: 'Balcony'
        }
    ],
    room: 4,
    apartment: '',
    livingPlaces: 4,
    country: 0,
    city: 1,
    region: 2
};

export default AnnouncementForm;


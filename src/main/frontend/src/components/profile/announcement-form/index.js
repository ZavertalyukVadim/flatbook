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

    onInputChange = name => e => this.setState({[name]: e.target.value});
    onInputRangeChange = (name, value) => e => this.setState({[name]: value});
    onArrayChange = (name, idx) => e => this.setState({
        [name]: this.state[name].map((item, index) => idx === index ? {value: e.target.value} : item)
    });

    render() {
        const {
            region,
            description,
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
                    onChange={this.onInputChange('title')}
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
                            value={room}
                            maxValue={10}
                            onChangeValue={this.onInputRangeChange('room')}
                        />
                    </div>
                    <div>Living Places
                        <InputRange
                            value={livingPlaces}
                            maxValue={10}
                            onChangeValue={this.onInputRangeChange('livingPlaces')}
                        />
                    </div>
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
                <Textarea value={description} onChange={this.onInputChange('description')}/>
                <div className="announcement-btn-field">

                    <Button
                        type={ButtonTypes.primary}
                        size={ButtonSizes.block}
                        caption="Publish"
                        className="announcement-btn"
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


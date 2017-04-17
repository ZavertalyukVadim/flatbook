import React, {Component} from 'react';
import moment from 'moment';
import GridExample from './grid-example';
import Input, {inputValidationStateTypes} from '../input';
import Checkbox from '../checkbox';
import Button, {ButtonTypes, ButtonSizes} from '../button';
import Textarea from '../textarea';
import Image, {ImageSizes} from '../image';
import Avatar from '../avatar';
import Dropdown from '../dropdown';
import InputRange from '../input-range';
import SocialIcons from '../social-icons';
import Modal from '../modal';
import {noop} from 'lodash';
import './showroom.scss';
import Carousel from '../carousel';
import Toggle from '../toggle';
import Slider from '../slider';
import Loader from '../loader';
import Radio from '../radio';
import DatePickerRange from '../datepicker-range';
import UploadImage from "../upload-image/index";

let slides = [
    'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?fit=crop&fm=jpg&h=825&q=80&w=1325',
    'https://images.unsplash.com/photo-1445251836269-d158eaa028a6?fit=crop&fm=jpg&h=825&q=80&w=1325',
    'https://images.unsplash.com/photo-1443926818681-717d074a57af?fit=crop&fm=jpg&h=825&q=80&w=1325'
];


export default class Showroom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'text',
            checked: false,
            inputRange: 4,
            selectedOptionID: 2,
            isModalOpen: false,
            sliderValue: [121, 194],
            startDate: moment(),
            endDate: moment().add(5, 'days')
        };
    }

    onInputChange = e => this.setState({value: e.target.value});
    onInputRangeChange = value => this.setState({inputRange: value});
    onCheckboxClick = () => this.setState({checked: !this.state.checked});
    onOptionChange = id => this.setState({selectedOptionID: id});
    openModal = () => this.setState({isModalOpen: true});
    closeModal = () => this.setState({isModalOpen: false});
    saveSliderValue = v => this.setState({sliderValue: v});
    saveStartDate = d => this.setState({startDate: d});
    saveEndDate = d => this.setState({endDate: d});

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-4">
                        <UploadImage/>
                    </div>
                    <div className="col-4">
                        <div className="panel-heading">
                            Date Picker Range
                        </div>
                        <div className="panel-body">
                            <DatePickerRange
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                handleChangeStart={this.saveStartDate}
                                handleChangeEnd={this.saveEndDate}
                            />
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="panel-heading">
                            Loader
                        </div>
                        <div className="panel-body">
                            <Loader/>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="panel-heading">
                            Radio
                        </div>
                        <div className="panel-body">
                            <Radio
                                value={this.state.checked}
                                label="Awesome radio"
                                onCheck={this.onCheckboxClick}
                            />
                            <Radio
                                value={!this.state.checked}
                                label="Awesome radio"
                                onCheck={this.onCheckboxClick}
                            />
                            <Radio
                                value={!this.state.checked}
                                label="Awesome radio"
                                onCheck={this.onCheckboxClick}
                                disabled={true}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="row">
                        <div className="col-4">
                            <div className="panel-heading">
                                Slider
                            </div>
                            <div className="panel-body">
                                <Slider from={100} to={200}
                                        value={this.state.sliderValue} onSave={this.saveSliderValue}/>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="panel">
                                <div className="panel-heading">
                                    Toggle
                                </div>
                                <div className="panel-body">
                                    <Toggle
                                        isToggled={this.state.checked}
                                        changeToggle={this.onCheckboxClick}
                                        icons={[<i className="fa fa-th-list"/>, <i className="fa fa-th-large"/>]}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="panel">
                                <div className="panel-heading">
                                    Modal
                                </div>
                                <div className="panel-body">
                                    <Modal
                                        isOpen={this.state.isModalOpen}
                                        close={this.closeModal}
                                    >
                                        I am awesome modal!<br/>
                                        I am awesome modal!<br/>
                                        I am awesome modal!<br/>
                                        I am awesome modal!<br/>
                                        I am awesome modal!<br/>
                                        I am awesome modal!<br/>
                                        I am awesome modal!<br/>
                                        I am awesome modal!<br/>
                                    </Modal>
                                    <Button
                                        type={ButtonTypes.primary}
                                        size={ButtonSizes.large}
                                        onClick={this.openModal}
                                        caption="Open modal"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="panel">
                                <div className="panel-heading">
                                    Dropdown
                                </div>
                                <div className="panel-body">
                                    <Dropdown
                                        selectedID={this.state.selectedOptionID}
                                        options={[
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
                                        ]}
                                        onOptionChange={this.onOptionChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="panel">
                                <div className="panel-heading">Input Range</div>
                                <div className="panel-body">
                                    <InputRange value={this.state.inputRange} maxValue={10}
                                                onChangeValue={this.onInputRangeChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="panel">
                                <div className="panel-heading">Social Icons</div>
                                <div className="panel-body">
                                    <SocialIcons/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="panel">
                        <div className="panel-heading">Default input</div>
                        <div className="panel-body">
                            <Input placeholder="input" type="text" value={this.state.value}
                                   onChange={this.onInputChange}
                            />
                        </div>
                    </div>
                    <div className="panel">
                        <div className="panel-heading">Textarea</div>
                        <div className="panel-body">
                            <Textarea value={this.state.value} onChange={this.onInputChange}/>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="panel">
                        <div className="panel-heading">Inputs with different states</div>
                        <div className="panel-body">
                            <Input placeholder="success" type="text" value={this.state.value}
                                   onChange={this.onInputChange}
                                   validationState={inputValidationStateTypes.success}
                            />
                            <Input placeholder="disabled" type="text" value={this.state.value}
                                   onChange={this.onInputChange}
                                   disabled={true}
                            />
                            <Input placeholder="error" type="text" value={this.state.value}
                                   onChange={this.onInputChange}
                                   validationState={inputValidationStateTypes.error} errorMessage="Error message..."
                            />
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="panel">
                        <div className="panel-heading">Grid</div>
                        <div className="panel-body">
                            <GridExample/>
                        </div>
                    </div>
                </div>
                <div className="col-7">
                    <div className="panel">
                        <div className="panel-heading">Button types</div>
                        <div className="panel-body">
                            <Button
                                type={ButtonTypes.primary}
                                size={ButtonSizes.large}
                                onClick={noop}
                                caption="Primary Button"
                            />
                            <Button
                                type={ButtonTypes.success}
                                size={ButtonSizes.large}
                                onClick={noop}
                                caption="Success Button"
                            />
                            <Button
                                type={ButtonTypes.danger}
                                size={ButtonSizes.large}
                                onClick={noop}
                                caption="Danger Button"
                            />
                            <Button
                                type={ButtonTypes.info}
                                size={ButtonSizes.large}
                                onClick={noop}
                                caption="Info Button"
                            />
                            <Button
                                size={ButtonSizes.large}
                                onClick={noop}
                                disabled={true}
                                caption="Disabled button"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="panel">
                        <div className="panel-heading">Button sizes</div>
                        <div className="panel-body">
                            <Button
                                type={ButtonTypes.success}
                                size={ButtonSizes.large}
                                onClick={noop}
                                caption="Large"
                            />
                            <Button
                                type={ButtonTypes.danger}
                                size={ButtonSizes.medium}
                                onClick={noop}
                                caption="Medium"
                            />
                            <Button
                                type={ButtonTypes.primary}
                                size={ButtonSizes.small}
                                onClick={noop}
                                caption="Small"
                            />
                            <Button
                                type={ButtonTypes.info}
                                size={ButtonSizes.block}
                                onClick={noop}
                                caption="Block-level button"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-2">
                    <div className="panel">
                        <div className="panel-heading">Checkbox</div>
                        <div className="panel-body">
                            <Checkbox onClick={this.onCheckboxClick} className="checkbox" checked={true}
                                      disabled={false}
                            >
                                Checked </Checkbox>
                            <Checkbox onClick={this.onCheckboxClick} className="checkbox" checked={this.state.checked}
                                      disabled={false}
                            >
                                Unchecked </Checkbox>
                            <Checkbox onClick={this.onCheckboxClick} className="checkbox" checked={this.state.checked}
                                      disabled={true}
                            >
                                Disabled </Checkbox>
                        </div>
                    </div>
                </div>
                <div className="col-10">
                    <div className="panel">
                        <div className="panel-heading">Images</div>
                        <div className="panel-body">
                            <Image
                                size={ImageSizes.large}
                                src="http://www.hotel-r.net/im/hotel/rs/luxury-apartments-21.jpg"
                            />
                            <Image
                                size={ImageSizes.small}
                                src="http://www.hotel-r.net/im/hotel/rs/luxury-apartments-21.jpg"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-2">
                    <div className="panel">
                        <div className="panel-heading">Avatars</div>
                        <div className="panel-body">
                            <Avatar
                                src="http://www.pnas.org/site/misc/images/16-01910.500.jpg"
                            />
                            <Avatar/>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="panel">
                        <div className="panel-heading">Carousel</div>
                        <div className="panel-body">
                            <Carousel slides={slides}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

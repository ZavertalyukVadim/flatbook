import React, {Component} from 'react';
import GridExample from './grid-example';
import Input, {inputValidationStateTypes} from '../input';
import Checkbox from '../checkbox';
import Button, {ButtonTypes, ButtonSizes} from '../button';
import Textarea from '../textarea';
import Image, {ImageSizes} from '../image';
import Avatar from '../avatar';
import './showroom.scss';

export default class Showroom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'text',
            checked: false
        };
    }

    onInputChange = e => this.setState({value: e.target.value});
    onCheckboxClick = () => this.setState({checked: !this.state.checked});

    render() {
      return (
        <div>
          <div className="col-6">         
            <div className="panel">
              <div className="panel-heading">Default input</div>
                <div className="panel-body">
                    <Input placeholder="input" type="text" value={this.state.value} onChange={this.onInputChange}/>
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
                    <Input placeholder="success" type="text" value={this.state.value} onChange={this.onInputChange}
                       validationState={inputValidationStateTypes.success}/>
                    <Input placeholder="disabled" type="text" value={this.state.value} onChange={this.onInputChange}
                       disabled={true}/>
                    <Input placeholder="error" type="text" value={this.state.value} onChange={this.onInputChange}
                       validationState={inputValidationStateTypes.error} errorMessage="Error message..."/>
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
          <div className="col-6">
            <div className="panel">
              <div className="panel-heading">Button types</div>
                <div className="panel-body">
                   <Button 
                        type={ButtonTypes.primary}
                        size={ButtonSizes.large}
                        caption="Primary Button"
                    />
                    <Button
                        type={ButtonTypes.success}
                        size={ButtonSizes.large}
                        caption="Success Button"
                    />
                    <Button
                        type={ButtonTypes.danger}
                        size={ButtonSizes.large}
                        caption="Danger Button"
                    />
                    <Button
                        type={ButtonTypes.info}
                        size={ButtonSizes.large}
                        caption="Info Button"
                    />
                    
                    <Button
                        size={ButtonSizes.large}
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
                        caption="Large"
                    />
                    <Button
                        type={ButtonTypes.danger}
                        size={ButtonSizes.medium}
                        caption="Medium"
                    />
                    <Button
                        type={ButtonTypes.primary}
                        size={ButtonSizes.small}
                        caption="Small"
                    />
                </div>
              </div>
          </div>
          <div className="col-3">          
                <div className="panel">
                  <div className="panel-heading">Checkbox</div>
                    <div className="panel-body">
                        <Checkbox onClick={this.onCheckboxClick} className="checkbox" checked={true} disabled={false}>
                        Checked </Checkbox>
                        <Checkbox onClick={this.onCheckboxClick} className="checkbox" checked={this.state.checked} disabled={false}>
                        Unchecked </Checkbox>
                        <Checkbox onClick={this.onCheckboxClick} className="checkbox" checked={this.state.checked} disabled={true}>
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
                      <Image
                          size={ImageSizes.small}
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
        </div>
      );
    }
}

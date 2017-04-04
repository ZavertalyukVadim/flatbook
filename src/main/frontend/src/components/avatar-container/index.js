import React, {Component} from 'react';
import Avatar from '../avatar';
import Button, {ButtonTypes, ButtonSizes} from '../button';

class AvatarContainer extends Component {
 constructor(props) {
     super(props);
     this.state = {
         avatar: this.props.avatar
     }
 }

 render() {
     const {firstName, lastName} = this.props;

     return (
         <div>
             <Avatar
                 src={this.state.avatar}
             />
             <p>{firstName} {lastName}</p>
             <Button
                 type={ButtonTypes.primary}
                 size={ButtonSizes.medium}
                 caption="Add Photo"
             />
         </div>
     );
 }
}

export default AvatarContainer;
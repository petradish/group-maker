import React, {Component} from 'react';

class SingleProject extends Component {
   
    render(){
        let {student, group, name, idx} = this.props
        let rgb = []
        for (let i = 0; i < 3; i++) {
          let r = Math.floor(Math.random() * 256)
          rgb.push(r)
        }
        return (
            <div class="project-swatch" style={{backgroundColor: `rgb(${rgb})`}} onClick={!this.props.isSelected ? ()=> this.props.handleSelect(student, name, idx) : null} >
                <h2>{name}</h2>
                <div class='group'>
                {group.length===4 ? 
                group.map(studentName => {
                    return (
                    <p>{studentName}</p>
                    )
                })
                
                : null}
                </div>
            </div>
           
        )
    }
    
}

export default SingleProject
import React, {Component} from 'react';
import Popup from '../src/components/Popup'
import './App.css';
import SingleProject from './components/SingleProject';
import socketIOClient from "socket.io-client";

const projects = [
  { name: 'Morocco', students: [], isFull: false },
  { name: 'Mexico', students: [], isFull: false },
  { name: 'Ecuador', students: [], isFull: false },
  { name: 'Brazil', students: [], isFull: false },
  { name: 'Bangladesh', students: [], isFull: false },
  { name: 'Colombia', students: [], isFull: false }
];


class App extends Component {
  constructor (){
    super()
    this.state = {
      endpoint: "http://school-project-group.herokuapp.com/",
      showPopup: true,
      name: 'student',
      projects: projects,
      isSelected: false
    }
    this.togglePopup = this.togglePopup.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  handleSelect(student, project, key){
    if (this.state.projects[key].students.length < 4){
      const socket = socketIOClient(this.state.endpoint);
      socket.emit('select-project', {
        student: student,
        project: project,
        key: key
      })
      alert(`You chose well! Let's see who else joins your group on ${project}`)
      this.setState({
        isSelected: true
      })
    } else {
      alert('The group is now full! Choose another!')
    }
}
  componentDidUpdate(prevProps, prevState){
      if (prevState.name !== sessionStorage.getItem('name'))
          this.setState({
          name: sessionStorage.getItem('name')
      })
  }
  componentDidMount(){
    const socket = socketIOClient(this.state.endpoint);
    socket.on('select-project', (data) => {
       if (this.state.projects[data.key].students.length < 4){
        console.log(`${data.project} was chosen by ${data.student}`)
        this.setState({
          projects: [...this.state.projects, projects[data.key].students.push(data.student)].slice(0,6)
    
        })
      }
    })
   }
  
render() { 

  return (
    <React.Fragment>
    {this.state.showPopup ?
      <Popup
       closePopup={this.togglePopup}
      />
      : (<h1>
       Hi, {this.state.name}! Choose your topic quickly!</h1>)
    }  
    
    <div className="App">
      {this.state.projects.map((project, i) => {
        return <SingleProject key={i} idx={i} student={this.state.name} name={project.name} group={project.students} isSelected={this.state.isSelected} handleSelect={this.handleSelect} isFull={project.isFull}/>
      })}
    </div>
    </React.Fragment>
  );
}
}
export default App;

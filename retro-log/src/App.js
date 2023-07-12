import React from 'react';
import './App.css';
import Class from './components/Class';

class App extends React.Component {
  state = {
    departments: [
      {
        id: 1,
        name: 'Engineering',
        classes: [
          {
            id: 1,
            name: 'Class 1',
            backwork: ['Assignment 1', 'Assignment 2', 'Assignment 3']
          },
          {
            id: 2,
            name: 'Class 2',
            backwork: ['Homework 1', 'Homework 2', 'Homework 3']
          },
        ],
      },
      {
        id: 2,
        name: 'Science',
        classes: [
          {
            id: 1,
            name: 'Class 1',
            backwork: ['Quiz 1', 'Quiz 2', 'Quiz 3']
          },
          {
            id: 4,
            name: 'Class 2',
            backwork: ['Lab 1', 'Lab 2', 'Lab 3']
          },
        ],
      },
      // Add more departments as needed
    ],
    currentDepartment: null,
    currentClass: null,
  };

  handleDepartmentClick = (id) => {
    this.setState({ currentDepartment: id, currentClass: null });
  };

  handleClassClick = (id) => {
    this.setState({ currentClass: id });
  };

  handleBackClick = () => {
    if (this.state.currentClass !== null) {
      this.setState({ currentClass: null });
    } else if (this.state.currentDepartment !== null) {
      this.setState({ currentDepartment: null });
    }
  };

  render() {
    const { departments, currentDepartment, currentClass } = this.state;

    if (currentClass !== null) {
      const classData = departments
        .find((dept) => dept.id === currentDepartment)
        .classes.find((cls) => cls.id === currentClass);
      return <Class data={classData} onBack={this.handleBackClick} />;
    }

    if (currentDepartment !== null) {
      const deptData = departments.find((dept) => dept.id === currentDepartment);
      return (
        <div>
          <button onClick={this.handleBackClick}>Go Back</button>
          <h2>{deptData.name}</h2>
          <ul>
            {deptData.classes.map((cls) => (
              <li key={cls.id} onClick={() => this.handleClassClick(cls.id)} className='class-item'>
                {cls.name}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to RetroLog</h1>
        </header>
        <nav>
          <ul>
            {departments.map((dept) => (
              <li key={dept.id} onClick={() => this.handleDepartmentClick(dept.id)} className= 'class-item'>
                {dept.name}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  }
}

export default App;

import React from 'react';
import './App.css';
import Class from './components/Class';

class App extends React.Component {
  state = {
    departments: [
      {
        id: 1,
        name: 'Science',
        majors: [
          {
            id: 2,
            name: 'CSCI - Computer Science',
            classes: [
              {
                id: 2,
                name: 'Computer Science 1',
                backwork: [
                  {type: 'Lab', name: 'Lab 1'},
                  {type: 'Lab', name: 'Lab 2'},
                  {type: 'Homework', name: 'Homework 1'},
                  {type: 'Exam', name: 'Midterm'},
                  {type: 'Homework', name: 'Homework 2'},
                ],
              },
            ],
          },
          // Other majors...
          {
            id:3,
            name: 'CHEM - Chemistry',
            classes: [
              {
                id: 3,
                name: 'Chemsitry 1',
                backwork: [
                  {type: 'Lab', name: 'Lab 1'},
                  {type: 'Lab', name: 'Lab 2'},
                  {type: 'Homework', name: 'Homework 1'},
                  {type: 'Exam', name: 'Midterm'},
                  {type: 'Homework', name: 'Homework 2'},
                ],
              },
            ],
          },


        ],
      },
      // Other departments...
      {
        id: 4,
        name: 'Engineering',
        majors: [
          {
            id: 5,
            name: 'BMED - Biomedical Engineering',
            classes: [
              {
                id: 5,
                name: 'Biomechanics',
                backwork: [
                  {type: 'Lab', name: 'Lab 1'},
                  {type: 'Lab', name: 'Lab 2'},
                  {type: 'Homework', name: 'Homework 1'},
                  {type: 'Exam', name: 'Midterm'},
                  {type: 'Homework', name: 'Homework 2'},
                ],
              },
            ],
          },
          // Other majors...
          {
            id: 6,
            name: 'CHME - Chemical Engineering',
            classes: [
              {
                id: 6,
                name: 'Introuction To Computational Chemical Engineering',
                backwork: [
                  {type: 'Lab', name: 'Lab 1'},
                  {type: 'Lab', name: 'Lab 2'},
                  {type: 'Homework', name: 'Homework 1'},
                  {type: 'Exam', name: 'Midterm'},
                  {type: 'Homework', name: 'Homework 2'},
                ],
              },
            ],
          },


        ],
      },

    ],
    currentDepartment: null,
    currentMajor: null,
    currentClass: null,
  };

  handleDepartmentClick = (id) => {
    this.setState({ currentDepartment: id, currentMajor: null, currentClass: null });
  };

  handleMajorClick = (id) => {
    this.setState({ currentMajor: id, currentClass: null });
  };

  handleClassClick = (id) => {
    this.setState({ currentClass: id });
  };

  handleBackClick = () => {
    if (this.state.currentClass !== null) {
      this.setState({ currentClass: null });
    } else if (this.state.currentMajor !== null) {
      this.setState({ currentMajor: null });
    } else if (this.state.currentDepartment !== null) {
      this.setState({ currentDepartment: null });
    }
  };

  render() {
    const { departments, currentDepartment, currentMajor, currentClass } = this.state;

    if (currentClass !== null) {
      const classData = departments
        .find((dept) => dept.id === currentDepartment)
        .majors.find((major) => major.id === currentMajor)
        .classes.find((cls) => cls.id === currentClass);
      return <Class data={classData} onBack={this.handleBackClick} />;
    }

    if (currentMajor !== null) {
      const majorData = departments
        .find((dept) => dept.id === currentDepartment)
        .majors.find((major) => major.id === currentMajor);
      return (
        <div>
          <button onClick={this.handleBackClick}>Go Back</button>
          <h2>{majorData.name}</h2>
          <ul>
            {majorData.classes.map((cls) => (
              <li key={cls.id} onClick={() => this.handleClassClick(cls.id)} className="class-item">
                {cls.name}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    if (currentDepartment !== null) {
      const deptData = departments.find((dept) => dept.id === currentDepartment);
      return (
        <div>
          <button onClick={this.handleBackClick}>Go Back</button>
          <h2>{deptData.name}</h2>
          <ul>
            {deptData.majors.map((major) => (
              <li key={major.id} onClick={() => this.handleMajorClick(major.id)} className="class-item">
                {major.name}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to Retrolog</h1>
        </header>
        <nav>
          <ul>
            {departments.map((dept) => (
              <li key={dept.id} onClick={() => this.handleDepartmentClick(dept.id)} className="class-item">
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

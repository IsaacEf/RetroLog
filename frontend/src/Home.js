import React from 'react';
import './Home.css';
import axios from 'axios'

const setAuthToken = token => {
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
}



class Home extends React.Component {



  constructor() {
    super();     
    this.state = { 
      professorsData: [],
      jwtToken: localStorage.getItem('jwtToken'),
      dept: 'CSCI'
    };
  }

  componentDidMount() {
    setAuthToken(this.state.jwtToken);
    this.fetchProfessorsData();
  }

  fetchProfessorsData = () => {
    axios.get('http://localhost:8000/api/professors', {
      dept: this.state.dept
    }) // Replace '/api/professors' with your API endpoint
      .then((response) => {
        this.setState({professorsData: response.data.professors});
      })
      .catch((error) => {
        console.error('Error fetching professors data:', error);
      });
  }

  //This data can now be accessed anywhere inside Home class component by referring to this.state.professorsData.

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
                name: 'CSCI-1100 Computer Science 1 (4 Credits)',
                professors: [
                    this.state.professorsData
                ],

                backwork: [
                  {type: 'Lab', name: 'Lab 1'},
                  {type: 'Lab', name: 'Lab 2'},
                  {type: 'Homework', name: 'Homework 1'},
                  {type: 'Exam', name: 'Midterm'},
                  {type: 'Homework', name: 'Homework 2'},
                ],
              },
              {
                id: 0,
                name: 'CSCI-1200 Data Structures (4 Credits)',
                professors: ["Professor A", "Professor B"], 
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
                name: 'CHME-1100 Chemistry 1 (4 Credits)',
                professors: ["Professor A", "Professor B"], 
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
            professors: ["Professor A", "Professor B"], 
            classes: [
              {
                id: 5,
                name: 'BMED-2540 Biomechanics (4 Credits)',
                professors: ["Professor A", "Professor B"], 
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
                name: 'CHME-2050 Introuction To Computational Chemical Engineering (3 Credits)',
                professors: ["Professor A", "Professor B"], 
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
          id: 7,
          name: 'Humanities, Arts, and Social Sciences',
          majors: [
            {
              id: 8,
              name: 'ARTS - Arts',
              classes: [
                {
                  id: 8,
                  name: 'ARTS-2180 Deep Listening (4 Credits)',
                  professors: ["Professor A", "Professor B"], 
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
              id: 9,
              name: 'COGS - Cognitive Science',
           
              classes: [
                {
                  id: 9,
                  name: 'COGS-2120 Intro to Cognitive Science (4 Credits)',
                  professors: ["Professor A", "Professor B"], 
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
        id: 10,
        name: 'Business',
        majors: [
          {
            id: 11,
            name: 'BMED - Biomedical Engineering',
            classes: [
              {
                id: 11,
                name: 'BMED-2540 Biomechanics (4 Credits)',
                professors: ["Professor A", "Professor B"], 
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
         
          {
            id: 12,
            name: 'CHME - Chemical Engineering',
            classes: [
              {
                id: 12,
                name: 'CHME-2050 Introuction To Computational Chemical Engineering (3 Credits)',
                professors: ["Professor A", "Professor B"], 
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
    search: '',
    selectedProfessor: '',
  };

  handleSearchChange = (event) => {
    this.setState({ search: event.target.value });
  };

  handleProfessorChange = (event) => {
    this.setState({ selectedProfessor: event.target.value });
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
    const { departments, currentDepartment, currentMajor, currentClass, search, selectedProfessor } = this.state;

    if (currentClass !== null) {
      const classData = departments
        .find((dept) => dept.id === currentDepartment)
        .majors.find((major) => major.id === currentMajor)
        .classes.find((cls) => cls.id === currentClass);
      
      const filteredBackwork = classData.backwork.filter(bw => bw.name.toLowerCase().includes(search.toLowerCase()));

      return (
        <div>
          <button onClick={this.handleBackClick}>Go Back</button>
          <h2>{classData.name}</h2>
          
          <label>
            Search Backwork:
            <input type="text" value={search} onChange={this.handleSearchChange} />
          </label>

          <label>
            Select Professor:
            <select value={selectedProfessor} onChange={this.handleProfessorChange}>
            {this.state.professorsData.length > 0 ? (
              this.state.professorsData.map((professor, index) => (
                <option key={index} value={professor.name}>{professor.name}</option>
              ))
            ) : (
              <option>Loading...</option>
            )}
          </select>

          </label>

          <ul>
            {filteredBackwork.map((bw, index) => (
              <li key={index}>{bw.type}: {bw.name}</li>
            ))}
          </ul>
        </div>
      );
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
          <div className="search-bar">
            <input type="text" placeholder="Search Courses" />
          </div>
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

export default Home;

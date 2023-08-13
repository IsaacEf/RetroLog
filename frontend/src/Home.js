import React from 'react';
import { useLocation } from 'react-router-dom';
import './Home.css';
import Upload from './Upload'
import axios from 'axios';
import CheckBox from './CheckBox'; 



/* ur code */
class Home extends React.Component {


  
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
                id: 1,
                name: 'CSCI-1100 Computer Science 1 (4 Credits)',
                professors: ["Professor A", "Professor B"], 
                backwork: [
                  {type: 'Lab', name: 'Lab 1'},
                  {type: 'Lab', name: 'Lab 2'},
                  {type: 'Homework', name: 'Homework 1'},
                  {type: 'Exam', name: 'Midterm'},
                  {type: 'Homework', name: 'Homework 2'},
                ],
              },
              {
                id: 2,
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
        name: 'Management and Technology',
        majors: [
          {
            id: 11,
            name: 'BUSN - Business',
            classes: [
              {
                id: 11,
                name: 'BUSN-6012 Managing Dynamic (4 Credits)',
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
    backworkData: null,
    professorData: null,
    currentClass: null,
    selectedDepartment: null,
    search: '',
    ProfID: null,
  };


  resetToDepartments = () => {
    this.setState({
      currentDepartment: null,
      currentMajor: null,
      currentClass: null,
    });
  };

  handleProfessorChange = async (event) => {
    const ProfID = parseInt(event.target.value, 10);
    

    this.setState({ ProfID });

    const { currentClass } = this.state;
    
    if (currentClass !== null) {
      const jwt = localStorage.getItem('jwtToken');
      const headers = {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      };
      
      try {
        const response = await axios.post('http://localhost:8000/api/backworks', {
          courseid: currentClass,
          professorid: ProfID ,
          verified: false, // You can set the verified flag accordingly
        }, { headers });
        
        const backworkData = response.data.backworks;
        this.setState({ backworkData });
      } catch (err) {
        console.error(err);
      }
    }
  };

  handleDepartmentClick = (id) => {
    this.setState({ currentDepartment: id, currentMajor: null, currentClass: null });
  };

  handleMajorClick = (id, majorName) => {
    const departmentID = majorName.split('-')[0].trim();
    this.setState({ currentMajor: id, currentClass: null, selectedDepartment: departmentID });
  };

  handleClassClick = async (id, verifiedOnly) => {
    this.setState({ currentClass: id });
  
    const jwt = localStorage.getItem('jwtToken');
    const headers = {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.post('http://localhost:8000/api/backworks', {
        courseid: id,
        professorid: null,
        verified: verifiedOnly,
      }, { headers });
  
      const backworkData = response.data.backworks;
      this.setState({ backworkData }); // Set the retrieved data in the state

      const departmentName = this.state.selectedDepartment
      const professorResponse = await axios.post('http://localhost:8000/api/professors', {
      dept: departmentName,
      }, { headers });
      const professorData = professorResponse.data.professors;
      this.setState({ professorData });
  
    } catch (err) {
      console.error(err);
    }
  };

  handleDownload = async (url, filename) => {
    try {
      const response = await axios.get(url, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'application/octet-stream' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    } catch (err) {
      console.error(err);
    }
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

  handleSearchChange = (event) => {
  const { currentClass, currentDepartment, currentMajor } = this.state;
  const searchQuery = event.target.value.toLowerCase();

  if (currentClass !== null) {
    const classData = this.state.departments
      .find((dept) => dept.id === currentDepartment)
      .majors.find((major) => major.id === currentMajor)
      .classes.find((cls) => cls.id === currentClass);

    if (classData && classData.backwork) {
      const filteredBackwork = classData.backwork.filter(bw =>
        bw.name.toLowerCase().includes(searchQuery)
      );

      this.setState({ search: searchQuery, filteredBackwork });
    }
  } else {
    this.setState({ search: searchQuery });
  }
};


  render() {
    const { departments, currentDepartment, currentMajor, currentClass, search, ProfID } = this.state;
    if (currentClass !== null) {
      const classData = departments
        .find((dept) => dept.id === currentDepartment)
        .majors.find((major) => major.id === currentMajor)
        .classes.find((cls) => cls.id === currentClass);
      
      const filteredBackwork = classData.backwork.filter(bw => bw.name.toLowerCase().includes(search.toLowerCase()));

      return (
        <div className="backwork-page"> {/* Add this class here */}
        <button onClick={this.handleBackClick}>Go Back</button>
        <h2>{classData.name}</h2>
  
          <div>
          
            <input
              className="search_box"
              type="text"
              value={search}
              onChange={this.handleSearchChange} 
              placeholder="Search Backwork"
            />
        
            {this.state.professorData && (
            <label className = "box">
              Select Professor:   
              <select value={ProfID} onChange={this.handleProfessorChange}>
                <option value="">All Professors</option>
                {this.state.professorData.map(professor => (
                  <option key={professor.ID} value={professor.ID}>{professor.name}</option>
                ))}
              </select>
            </label>
            )}
            <CheckBox 
              onCheckBoxToggle={(checked) => this.handleClassClick(currentClass, checked)}
            /> 

            {this.state.backworkData && (
            <div className="uploaded-items">
              {this.state.backworkData.map((backwork) => (
                <div key={backwork.uuid} className="uploaded-item">
                  <h2>{backwork.fileName}</h2>
                  <button onClick={() => this.handleDownload(backwork.url, backwork.fileName)}>Download File</button>
                  
                  {/*<p>Course ID: {backwork.courseId}</p>
                  <p>Professor ID: {backwork.professorId}</p>
                    <p>Verified: {backwork.verified ? 'Yes' : 'No'}</p>
              <p>User ID: {backwork.userId}</p> */}
                </div>
              ))}
            </div>
          )}

          <Upload 
          selectedDepartment={this.state.selectedDepartment}
          CourseId={this.state.currentClass}
          />
          </div>
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
              <li key={cls.id} onClick={() => this.handleClassClick(cls.id, false)} className="class-item">
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
              <li key={major.id} onClick={() => this.handleMajorClick(major.id, major.name)} className="class-item">
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
    
        {currentClass !== null && ( // Only render the search bar if a class is selected
          <div className="search-bar">
            <input type="text" placeholder="Search Courses" />
          </div>
        )}
      </header>
      <p className = "top"></p>
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
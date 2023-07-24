package model

type BackworkInput struct {
	Filename    string `json:"filename" binding:required`
	CourseID    uint   `json:"courseid" binding:required`
	ProfessorID uint   `json:"professorid" binding:required`
	UserID      uint
}

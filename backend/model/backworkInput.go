package model

type BackworkInput struct {
	Filename    string `form:"filename" binding:required`
	CourseID    uint   `form:"courseid" binding:required`
	ProfessorID uint   `form:"professorid" binding:required`
	UserID      uint
}

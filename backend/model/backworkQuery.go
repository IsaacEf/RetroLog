package model

type BackworksQuery struct {
	CourseID    uint `json:"courseid" binding:required`
	ProfessorID uint `json:"professorid"`
	Verified    bool `json:"verified"`
}

type BackworkQuery struct {
	ID uint `json:"id" binding:required`
}

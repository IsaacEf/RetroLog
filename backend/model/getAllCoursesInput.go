package model

type GetAllCoursesInput struct {
	Department string `json:"dept" binding:"required"`
}

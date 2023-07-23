package model

type GetAllProfessorsInput struct {
	Department string `json:"dept" binding:"required"`
}

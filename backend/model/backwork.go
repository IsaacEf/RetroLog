package model

import (
	"backend/database"

	"gorm.io/gorm"
)

type Backwork struct {
	gorm.Model
	FileName       string    `gorm:"type:varchar(255);not null;index" json:"fileName"`
	Course         Course    `gorm:"foreignKey:CourseID" json:"course,omitempty"`
	CourseID       uint      `gorm:"not null;index" json:"courseId"`
	Professor      Professor `gorm:"foreignKey:ProfessorID" json:"professor,omitempty"`
	ProfessorID    uint      `gorm:"not null;index" json:"professorId"`
	Verified       bool      `gorm:"type:boolean;default:false;index" json:"verified,omitempty"`
	User           User      `gorm:"foreignKey:UserID" json:"user,omitempty"`
	UserID         uint      `gorm:"not null;index" json:"userId"`
	RelevanceScore int       `gorm:"type:int;default:0" json:"relevanceScore,omitempty"`
}

// save the backwork to the database
func (bw *Backwork) Save() (*Backwork, error) {
	err := database.Database.Create(&bw).Error

	if err != nil {
		return &Backwork{}, err
	}

	return bw, nil
}

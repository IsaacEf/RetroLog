package model

import (
	"backend/database"

	"gorm.io/gorm"
)

type Backwork struct {
	gorm.Model
	FileName       string    `gorm:"type:varchar(255);not null;index" json:"filename"`
	Course         Course    `gorm:"foreignKey:CourseID"`
	CourseID       uint      `gorm:"not null;index"`
	Professor      Professor `gorm:"foreignKey:ProfessorID"`
	ProfessorID    uint      `gorm:"not null;index"`
	Verified       bool      `gorm:"type:boolean;default:false;index"`
	User           User      `gorm:"foreignKey:UserID"`
	UserID         uint      `gorm:"not null;index"`
	RelevanceScore int       `gorm:"type:int;default:0"`
}

// save the backwork to the database
func (bw *Backwork) Save() (*Backwork, error) {
	err := database.Database.Create(&bw).Error

	if err != nil {
		return &Backwork{}, err
	}

	return bw, nil
}

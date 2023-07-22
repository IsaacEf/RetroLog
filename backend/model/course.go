package model

import (
	"backend/database"

	"gorm.io/gorm"
)

type Course struct {
	gorm.Model
	CourseID   uint   `gorm:"not null;index"`
	Department string `gorm:"type:varchar(255);not null;index"`
	Backworks  []Backwork
}

// search database for CourseID
func findCourseByID(id uint) (Course, error) {
	var course Course
	err := database.Database.Preload("Backworks").Where("ID=?", id).Find(&course).Error

	if err != nil {
		return Course{}, err
	}

	return course, nil
}

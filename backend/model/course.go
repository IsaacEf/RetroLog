package model

import (
	"backend/database"

	"gorm.io/gorm"
)

type Course struct {
	gorm.Model
	CourseID   uint       `gorm:"not null;index" json:"courseId"`
	Department string     `gorm:"type:varchar(4);not null; index" json:"dept"`
	Backworks  []Backwork `json:"backworks,omitempty"`
}

// search database for CourseID
func FindCourseByID(id uint) (Course, error) {
	var course Course
	err := database.Database.Preload("Backworks").Where("ID=?", id).Find(&course).Error

	if err != nil {
		return Course{}, err
	}

	return course, nil
}

func FindCourse(course *Course) error {
	err := database.Database.Preload("Backworks").Where("department=?", course.Department).Where("course_id=?", course.CourseID).Find(course).Error
	if err != nil {
		return err
	}

	return nil
}
